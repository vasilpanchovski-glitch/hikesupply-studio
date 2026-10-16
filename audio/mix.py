import sys, json, numpy as np, soundfile as sf
import os
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__)))
import sfx
from sfx import *
from music import compose
from scipy.signal import resample_poly
spec=json.load(open(sys.argv[1])); out=sys.argv[2]
D=spec['dur']; SRm=SR
vo,vsr=sf.read(sys.argv[3] if len(sys.argv)>3 else spec['vo']); vo=resample_poly(vo, SRm, vsr) if vsr!=SRm else vo
sfx.rng=np.random.default_rng(spec.get('seed',3))
mus=compose(D, spec['drop'], key=spec.get('key',0), bpm=spec.get('bpm',100), prog_id=spec.get('prog',0), seed=spec.get('seed',3), b1=spec.get('b1',4), b2=spec.get('b2',12))
n=len(mus); t=np.arange(n)/SRm
voL=np.zeros(n); m=min(n,len(vo)); voL[:m]=vo[:m]
# duck envelope from VO energy
env=np.convolve(np.abs(voL),np.ones(int(0.05*SRm))/int(0.05*SRm),'same')
active=(env>0.01).astype(float)
k=int(0.25*SRm); active=np.convolve(active,np.ones(k)/k,'same').clip(0,1)
duck=1-0.62*active
# section gain: quieter early, open up at drop
sec=np.interp(t,[0,spec['drop']-0.2,spec['drop'],D],[0.55,0.6,0.9,0.85])
music=mus*(duck*sec)[:,None]
fx=Mix(D)
for a,b,kind in spec.get('amb',[]):
    if kind=='wind': fx.add(a,wind(b-a,1.0),0.35)
    if kind=='birds':
        fx.add(a,wind(b-a,0.6),0.2)
        for tt in np.arange(a+0.6,b,2.3): fx.add(tt,chirp_bird(3200),0.22,pan=0.3)
for tt,kind in spec.get('sfx',[]):
    if kind=='whoosh': fx.add(tt-0.2,whoosh(0.4),0.55)
    if kind=='pop': fx.add(tt,pop(900),0.4)
    if kind=='tick': fx.add(tt,click(),0.5)
    if kind=='ding': fx.add(tt,ding(1568,1.0,1.6),0.5)
    if kind=='alert': fx.add(tt,alert(),0.4)
    if kind=='thump': fx.add(tt,thump(),0.7)
    if kind=='chime':
        for i,f in enumerate([1046.5,1318.5,1568]): fx.add(tt+i*0.09,ding(f,0.8,1.6),0.35)
fxs=fx.out()[:n]
mix=music*0.5+fxs*0.32+np.stack([voL,voL],1)*1.0
fade=int(0.8*SRm); mix[-fade:]*=np.linspace(1,0,fade)[:,None]
mix/=np.abs(mix).max()/0.95
sf.write(out,mix,SRm)
print('ok',n/SRm)
