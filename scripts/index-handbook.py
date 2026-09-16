"""Create reproducible page-aware chunks and sparse hashed TF-IDF embeddings."""
from pathlib import Path
from pypdf import PdfReader
import re, json, math, hashlib, collections
root = Path(__file__).resolve().parents[1]
source = root/'public/resources/data-science-handbook.pdf'
reader = PdfReader(source)
chunks = []
for page_number, page in enumerate(reader.pages, 1):
    text = re.sub(r'\s+', ' ', page.extract_text() or '').strip()
    words = text.split()
    for offset in range(0,len(words),180):
        excerpt = ' '.join(words[offset:offset+220])
        if len(excerpt) > 70:
            chunks.append({'page':page_number,'text':excerpt})
def tokens(text): return re.findall(r'[a-z0-9]{3,}',text.lower())
df=collections.Counter(t for c in chunks for t in set(tokens(c['text'])))
idf={t:math.log((1+len(chunks))/(1+n))+1 for t,n in df.items()}
def bucket(t):
    h=2166136261
    for b in t.encode(): h=((h^b)*16777619)&0xffffffff
    return str(h%2048)
for c in chunks:
    vector=collections.defaultdict(float)
    for t,n in collections.Counter(tokens(c['text'])).items(): vector[bucket(t)]+=(1+math.log(n))*idf[t]
    norm=math.sqrt(sum(x*x for x in vector.values())) or 1
    c['vector']={k:round(v/norm,5) for k,v in vector.items()}
out={'source':'Data Science Journey Handbook','sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'pages':len(reader.pages),'method':'2048-dimensional hashed TF-IDF, cosine similarity; lexical embeddings, not a neural model','idf':idf,'chunks':chunks}
target=root/'src/data/handbook-index.json'
target.write_text(json.dumps(out,separators=(',',':')),encoding='utf-8')
print(json.dumps({'pages':len(reader.pages),'chunks':len(chunks),'bytes':target.stat().st_size}))
