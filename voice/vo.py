import json, re, sys, numpy as np, soundfile as sf
from kokoro_onnx import Kokoro
import os
M=os.path.join(os.path.dirname(os.path.abspath(__file__)),"models")
k=Kokoro(os.path.join(M,"kokoro-v1.0.onnx"),os.path.join(M,"voices-v1.0.bin"))
spec=json.load(open(sys.argv[1])); out=sys.argv[2]
voice=spec.get("voice","af_heart"); speed=spec.get("speed",1.0)
SR=24000; t=spec.get("lead",0.35); audio=[np.zeros(int(t*SR))]; words=[]; lines=[]
def syl(w):
    w=re.sub(r'[^a-z]','',w.lower()) or 'a'
    n=len(re.findall(r'[aeiouy]+',w)); n-= w.endswith('e') and n>1
    return max(1,n)+0.15*len(w)
for L in spec["lines"]:
    s,sr=k.create(L["text"],voice=voice,speed=speed,lang="en-us"); s=np.asarray(s)
    env=np.convolve(np.abs(s),np.ones(240)/240,'same'); thr=env.max()*0.06
    nz=np.where(env>thr)[0]; a,b=nz[0],nz[-1]; s=s[max(0,a-240):b+600]
    env=np.convolve(np.abs(s),np.ones(240)/240,'same')
    ws=L["text"].split(); wt=np.array([syl(w)+(0.6 if re.search(r'[,.?!]$',w) else 0) for w in ws])
    on=np.where(env>env.max()*0.06)[0]; s0,s1=on[0]/SR,on[-1]/SR
    edges=s0+np.concatenate([[0],np.cumsum(wt)])/wt.sum()*(s1-s0)
    # snap internal edges to local energy minima within +-90ms
    for i in range(1,len(edges)-1):
        c=int(edges[i]*SR); r=int(0.09*SR); lo,hi=max(0,c-r),min(len(env)-1,c+r)
        edges[i]=(lo+np.argmin(env[lo:hi]))/SR
    lines.append({"text":L["text"],"start":round(t,3),"end":round(t+len(s)/SR,3)})
    # optional "show": display words, same count as spoken words; "~" merges into the previous word
    sh=L.get("show",L["text"]).split(); sh=sh if len(sh)==len(ws) else ws
    for i,w in enumerate(sh):
        if w=="~" and words: words[-1]["e"]=round(t+edges[i+1],3); continue
        words.append({"w":w,"s":round(t+edges[i],3),"e":round(t+edges[i+1],3)})
    audio.append(s); t+=len(s)/SR
    gap=L.get("gap",0.28); audio.append(np.zeros(int(gap*SR))); t+=gap
a=np.concatenate(audio); sf.write(out+".wav",a,SR)
json.dump({"duration":round(t,3),"lines":lines,"words":words},open(out+".json","w"),indent=1)
print("total",round(t,2))
for l in lines: print(l)
