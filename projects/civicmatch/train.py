"""CivicMatch: content-based two-tower retrieval with explicitly simulated preferences.

No real resident interactions, no claim of novel datasets or real-world effectiveness.
Run: python train.py --refresh
"""
from pathlib import Path
import argparse, collections, datetime, hashlib, json, re, urllib.request, urllib.parse
import numpy as np

ROOT=Path(__file__).resolve().parent
TORONTO='https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/'
CANADA='https://open.canada.ca/data/en/api/3/action/'
SEED=42

def get(url):
    with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'CivicMatchResearch/1.0'}),timeout=60) as r:
        return json.load(r)

def fetch_catalogs():
    """Keep full raw responses with a provenance manifest locally."""
    raw=ROOT/'data';raw.mkdir(exist_ok=True)
    meta=get(TORONTO+'package_show?id=registered-programs-and-drop-in-courses-offering')['result']
    resource=next(r for r in meta['resources'] if r['name']=='Registered Programs')
    response=get(TORONTO+'datastore_search?'+urllib.parse.urlencode({'resource_id':resource['id'],'limit':20000}))
    records=response['result']['records']
    # Collapse repeated sessions into distinct activities, retaining a real source link.
    unique={}
    for r in records:
        title=r.get('Activity Title','')
        if title and title not in unique:
            unique[title]={'id':str(r['Course_ID']),'title':title,'category':r.get('Program Category') or 'Other',
                'description':str(r.get('Section',''))+' '+str(r.get('Course Title','')),
                'url':r.get('Activity URL',''),'note':'Verify current dates, age limits, availability, price, and accessibility with the provider.'}
    catalogs={'recreation':list(unique.values())[:500]}
    provenance={'recreation':{'source':TORONTO+'package_show?id='+meta['name'],'modified':meta.get('metadata_modified'),'license':meta.get('license_title'),'raw_records':len(records),'definition':'Toronto recreation activity catalog; deduplicated by activity title, not a live booking feed.'}}
    (raw/'recreation-source.json').write_text(json.dumps({'metadata':meta,'response':response}),encoding='utf-8')
    for track,queries in {'climate':['climate energy','renewable energy','emissions'],'skills':['employment skills','education training','labour market']}.items():
        items={};responses=[]
        for query in queries:
            response=get(CANADA+'package_search?'+urllib.parse.urlencode({'q':query,'rows':100}))
            responses.append(response)
            for r in response['result']['results']:
                title=r.get('title_translated',{}).get('en') or r.get('title','')
                description=r.get('notes_translated',{}).get('en') or r.get('notes','')
                if isinstance(title,dict): title=title.get('en','')
                items[r['id']]={'id':r['id'],'title':str(title),'description':re.sub('<[^>]+>',' ',str(description))[:1600],
                    'category':query,'url':'https://open.canada.ca/data/en/dataset/'+r['id'],
                    'note':'Government data resource; not a job listing, job placement decision, or personalized energy advice.'}
        catalogs[track]=list(items.values())
        provenance[track]={'source':CANADA+'package_search','queries':queries,'definition':'Public government DATA RESOURCES for researchers and learners. Not jobs or courses.','license':'See individual source dataset license.'}
        (raw/(track+'-source.json')).write_text(json.dumps(responses),encoding='utf-8')
    payload={'catalogs':catalogs,'provenance':provenance,'fetched_at':datetime.datetime.now(datetime.timezone.utc).isoformat()}
    (raw/'catalogs.json').write_text(json.dumps(payload),encoding='utf-8')
    return payload

def words(text): return re.findall(r'[a-z]{3,}',text.lower())
STOP=set('the and for with that this are from have into data canada canadian program programs information about'.split())
def feature_spec(items):
    df=collections.Counter(t for x in items for t in set(words(x['title']+' '+x['description'])) if t not in STOP)
    vocab=[t for t,n in df.most_common(80) if n>=2]
    categories=sorted(set(x['category'] for x in items))
    return vocab,categories
def features(items,vocab,categories):
    x=np.zeros((len(items),len(vocab)+len(categories)),dtype=np.float64)
    for i,item in enumerate(items):
        tokens=collections.Counter(words(item['title']+' '+item['description']))
        x[i,:len(vocab)]=[np.log1p(tokens[t]) for t in vocab]
        x[i,len(vocab)+categories.index(item['category'])]=3
    return x/np.maximum(np.linalg.norm(x,axis=1,keepdims=True),1e-9)

class TwoTower:
    def __init__(self,dim,rng,latent=24):
        self.wu=rng.normal(0,.15,(dim,latent)); self.wi=rng.normal(0,.15,(dim,latent))
    def encode_user(self,x): return np.tanh(x@self.wu)
    def encode_item(self,x): return np.tanh(x@self.wi)
    def loss_grad(self,u,x,targets):
        a=self.encode_user(u);b=self.encode_item(x); logits=a@b.T/.2
        logits-=logits.max(axis=1,keepdims=True)
        p=np.exp(logits);p/=p.sum(axis=1,keepdims=True)
        loss=-np.log(np.maximum(p[np.arange(len(u)),targets],1e-12)).mean()
        p[np.arange(len(u)),targets]-=1;p/=len(u)
        ga=(p@b)/.2;gb=(p.T@a)/.2
        return float(loss),u.T@(ga*(1-a*a)),x.T@(gb*(1-b*b))
    def train(self,u,x,targets,epochs=180):
        moments=[np.zeros_like(self.wu),np.zeros_like(self.wi)]
        variances=[np.zeros_like(self.wu),np.zeros_like(self.wi)]
        losses=[]
        for epoch in range(1,epochs+1):
            loss,gu,gi=self.loss_grad(u,x,targets);losses.append(loss)
            for j,(w,g) in enumerate([(self.wu,gu),(self.wi,gi)]):
                g+=1e-4*w
                moments[j]=.9*moments[j]+.1*g;variances[j]=.999*variances[j]+.001*g*g
                w-=.015*(moments[j]/(1-.9**epoch))/(np.sqrt(variances[j]/(1-.999**epoch))+1e-8)
        return losses

def recall(scores,relevant,k=10):
    selected=np.argsort(-scores,axis=1)[:,:k]
    return float(np.mean([len(set(a)&set(b))/len(b) for a,b in zip(selected,relevant)]))

def train_track(track,items,provenance):
    if len(items)<20: raise ValueError(f'{track}: too few source records ({len(items)})')
    rng=np.random.default_rng(SEED);vocab,categories=feature_spec(items);x=features(items,vocab,categories)
    # Synthetic users blend three catalog items; this generator is NOT observed behavior.
    anchors=rng.integers(0,len(items),(600,3))
    u=np.sum(x[anchors]*rng.dirichlet([2,1,1],600)[:,:,None],axis=1)
    u+=rng.normal(0,.015,u.shape);u=np.maximum(u,0);u/=np.maximum(np.linalg.norm(u,axis=1,keepdims=True),1e-9)
    teacher=u@x.T
    relevant=np.argsort(-teacher,axis=1)[:,:10]
    targets=relevant[:420,0]
    model=TwoTower(x.shape[1],rng)
    initial=recall(model.encode_user(u[510:])@model.encode_item(x).T,relevant[510:])
    losses=model.train(u[:420],x,targets)
    val=recall(model.encode_user(u[420:510])@model.encode_item(x).T,relevant[420:510])
    test=recall(model.encode_user(u[510:])@model.encode_item(x).T,relevant[510:])
    random=recall(rng.random((90,len(x))),relevant[510:])
    # The content baseline is also the generator; expected to win by construction.
    baseline=recall(u[510:]@x.T,relevant[510:])
    result={'track':track,'items':len(items),'synthetic_users':600,'train_users':420,'validation_users':90,'test_users':90,
        'seed':SEED,'epochs':180,'latent_dimensions':24,'loss_start':losses[0],'loss_end':losses[-1],
        'recall_at_10':test,'validation_recall_at_10':val,'untrained_recall_at_10':initial,'random_recall_at_10':random,'content_oracle_recall_at_10':baseline,
        'evaluation':'Held-out synthetic users, same item catalog. No claim of human preference quality or cold-start validation.',
        'limitations':['Preferences and positives are synthetic and derived from content similarity.','Content baseline is the labeling oracle and has an inherent advantage.','No real user interactions, randomized trial, causal benefit, or fairness validation.','Resource availability and eligibility must be checked at source.'],
        'provenance':provenance}
    artifacts=ROOT/'artifacts';artifacts.mkdir(exist_ok=True)
    np.savez(artifacts/(track+'-model.npz'),wu=model.wu,wi=model.wi,item_features=x)
    export={'track':track,'vocabulary':vocab,'categories':categories,'userWeights':model.wu.round(6).tolist(),'itemVectors':model.encode_item(x).round(6).tolist(),'items':items,'metrics':result}
    (artifacts/(track+'-retrieval.json')).write_text(json.dumps(export),encoding='utf-8')
    print(json.dumps(result,ensure_ascii=True),flush=True)
    return result

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--refresh',action='store_true');args=parser.parse_args()
    data=fetch_catalogs() if args.refresh or not (ROOT/'data/catalogs.json').exists() else json.loads((ROOT/'data/catalogs.json').read_text(encoding='utf-8'))
    results=[train_track(k,v,{**data['provenance'][k],'fetched_at':data['fetched_at'],'catalog_sha256':hashlib.sha256(json.dumps(v,sort_keys=True).encode()).hexdigest()}) for k,v in data['catalogs'].items()]
    (ROOT/'artifacts/metrics.json').write_text(json.dumps(results,indent=2),encoding='utf-8')
if __name__=='__main__': main()
