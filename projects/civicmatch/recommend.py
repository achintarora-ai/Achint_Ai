"""Run local retrieval. Example: python recommend.py recreation --query swimming."""
import argparse,json
from pathlib import Path
import numpy as np
from train import words
def recommend(track,query,category=None,k=5):
    path=Path(__file__).resolve().parent/'artifacts'/f'{track}-retrieval.json'
    data=json.loads(path.read_text(encoding='utf-8'))
    counts={t:words(query).count(t) for t in set(words(query))}
    x=np.array([np.log1p(counts.get(t,0)) for t in data['vocabulary']]+[3.0 if c==category else 0 for c in data['categories']])
    if not np.any(x): return []
    x/=np.linalg.norm(x)
    user=np.tanh(x@np.array(data['userWeights']))
    scores=user@np.array(data['itemVectors']).T
    return [{**data['items'][i],'similarity':float(scores[i])} for i in np.argsort(-scores)[:k]]
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('track',choices=['recreation','climate','skills']);p.add_argument('--query',required=True);p.add_argument('--category')
    a=p.parse_args();print(json.dumps(recommend(a.track,a.query,a.category),indent=2,ensure_ascii=True))
