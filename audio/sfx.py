import numpy as np
from scipy.signal import butter, sosfilt
SR = 48000
rng = np.random.default_rng(7)

def bp(x, lo, hi, order=2):
    return sosfilt(butter(order, [lo, hi], 'band', fs=SR, output='sos'), x)
def lp(x, f, order=2): return sosfilt(butter(order, f, 'low', fs=SR, output='sos'), x)
def hp(x, f, order=2): return sosfilt(butter(order, f, 'high', fs=SR, output='sos'), x)
def env(n, a, d, curve=3.0):
    t = np.arange(n)/SR
    e = np.minimum(1, t/max(a, 1e-4)) * np.exp(-np.maximum(0, t-a)/max(d, 1e-4)*curve/3)
    return e
def noise(sec): return rng.standard_normal(int(sec*SR))

class Mix:
    def __init__(self, dur):
        self.L = np.zeros(int(dur*SR)); self.R = np.zeros(int(dur*SR))
    def add(self, t, x, g=1.0, pan=0.0):
        i = int(t*SR); n = min(len(x), len(self.L)-i)
        if n <= 0: return
        gl, gr = g*np.sqrt((1-pan)/2)*1.414, g*np.sqrt((1+pan)/2)*1.414
        self.L[i:i+n] += x[:n]*gl; self.R[i:i+n] += x[:n]*gr
    def out(self):
        st = np.stack([self.L, self.R], 1)
        pk = np.abs(st).max()
        return st/pk*0.89 if pk > 0 else st

# ---------------- sounds ----------------
def wind(sec, strength=1.0):
    n = noise(sec); x = lp(n, 500)
    t = np.arange(len(x))/SR
    lfo = 0.6+0.4*np.sin(2*np.pi*0.13*t+1)*np.sin(2*np.pi*0.07*t)
    return x*lfo*0.25*strength

def chirp_bird(base=3200):
    out = []
    for k in range(rng.integers(2, 5)):
        d = rng.uniform(0.05, 0.11); t = np.arange(int(d*SR))/SR
        f = base*(1+0.5*np.sin(np.pi*t/d))+rng.uniform(-300, 300)
        ph = 2*np.pi*np.cumsum(f)/SR
        out.append(np.sin(ph)*np.sin(np.pi*t/d)**2)
        out.append(np.zeros(int(rng.uniform(0.03, 0.08)*SR)))
    return np.concatenate(out)*0.18

def step(heavy=1.0):
    x = noise(0.16)
    g = bp(x, 900, 5000)*env(len(x), 0.004, 0.05) + lp(x, 220)*env(len(x), 0.003, 0.03)*3*heavy
    # gravel crackle
    c = np.zeros_like(x); idx = rng.integers(0, len(x)//2, 18); c[idx] = rng.uniform(-1, 1, 18)
    return (g*0.5+hp(c, 2500)*0.5)*0.7

def pole_tap():
    x = noise(0.06); t = np.arange(len(x))/SR
    tone = np.sin(2*np.pi*2100*t)*np.exp(-t*90)+0.5*np.sin(2*np.pi*3400*t)*np.exp(-t*120)
    return (bp(x, 2000, 7000)*env(len(x), 0.001, 0.012)*0.6+tone*0.35)

def breath(sec=0.9, gain=1.0):
    x = noise(sec); t = np.arange(len(x))/SR
    e = np.sin(np.pi*np.clip(t/sec, 0, 1))**1.5
    return bp(x, 500, 2400)*e*0.22*gain

def whoosh(sec=0.35, up=True, gain=1.0):
    x = noise(sec); n = len(x); out = np.zeros(n); blk = 480
    for i in range(0, n, blk):
        u = i/n; f = 300+(4000 if up else 2500)*(u if up else 1-u)
        out[i:i+blk] = bp(x[i:i+blk+0], max(80, f*0.6), min(20000, f*1.5+200))[:len(out[i:i+blk])]
    e = np.sin(np.pi*np.arange(n)/n)**2
    return lp(out*e, 9000)*0.5*gain

def thump(gain=1.0):
    t = np.arange(int(0.45*SR))/SR
    f = 95*np.exp(-t*7)+42
    x = np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*6.5)
    return x*0.9*gain

def pop(f=900, gain=1.0):
    t = np.arange(int(0.12*SR))/SR
    fr = f*(1+0.6*np.exp(-t*60))
    return np.sin(2*np.pi*np.cumsum(fr)/SR)*np.exp(-t*38)*0.45*gain

def ding(f=1318.5, gain=1.0, dec=1.6):
    t = np.arange(int(dec*SR))/SR
    x = sum(a*np.sin(2*np.pi*f*m*t)*np.exp(-t*(2.5+m*1.5)) for a, m in [(1, 1), (0.45, 2.0), (0.22, 3.01), (0.12, 4.2)])
    return x*np.minimum(1, t/0.003)*0.35*gain

def alert(gain=1.0):
    return np.concatenate([ding(587, 0.7, 0.35)[:int(0.14*SR)], ding(494, 0.7, 0.5)])*gain

def click(gain=1.0):
    x = noise(0.03)
    a = bp(x, 1500, 8000)*env(len(x), 0.0005, 0.006)
    b = np.zeros(int(0.05*SR)); b2 = bp(noise(0.02), 1000, 6000)*env(int(0.02*SR), 0.0005, 0.004)
    return np.concatenate([a, b, b2*0.7])*0.9*gain

def swell(sec=1.2, gain=1.0):
    t = np.arange(int(sec*SR))/SR
    x = sum(np.sin(2*np.pi*f*t+rng.uniform(0, 6)) for f in [196, 246.9, 293.7, 392])/4
    x = x + lp(noise(sec), 1200)*0.15
    e = (t/sec)**2
    e[-int(0.04*SR):] *= np.linspace(1, 0, int(0.04*SR))
    return x*e*0.35*gain
