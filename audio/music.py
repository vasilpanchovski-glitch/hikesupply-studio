import numpy as np
from scipy.signal import fftconvolve
from sfx import SR, lp, hp, bp, rng

BPM = 104
BEAT = 60/BPM
def mf(m): return 440*2**((m-69)/12)

def T(dur): return np.arange(int(dur*SR))/SR

def saw(f, dur, detune=0.0):
    t = T(dur); ph = (f*(1+detune)*t + rng.uniform()) % 1.0
    return 2*ph-1

def supersaw(f, dur, n=5, spread=0.012):
    return sum(saw(f, dur, (i-(n-1)/2)*spread/(n-1)*2) for i in range(n))/n

def adsr(n, a, d, s, r, hold):
    t = np.arange(n)/SR
    e = np.where(t < a, t/max(a, 1e-4), 0)
    e = np.where((t >= a) & (t < a+d), 1-(1-s)*(t-a)/max(d, 1e-4), e)
    e = np.where((t >= a+d) & (t < hold), s, e)
    e = np.where(t >= hold, s*np.exp(-(t-hold)/max(r, 1e-4)), e)
    return e

def kick(g=1.0):
    t = T(0.5); f = 48+110*np.exp(-t*28)
    x = np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-t*5.5)
    x[:int(0.004*SR)] += np.random.default_rng(1).standard_normal(int(0.004*SR))*0.3
    return np.tanh(x*1.6)*g

def clap(g=1.0):
    n = rng.standard_normal(int(0.25*SR)); t = T(0.25)
    e = np.zeros_like(t)
    for o in [0, 0.011, 0.022]: e += np.where(t >= o, np.exp(-(t-o)*180), 0)
    e += np.where(t >= 0.03, np.exp(-(t-0.03)*22), 0)*0.6
    return bp(n, 900, 3200)*e*0.8*g

def hat(g=1.0, open_=False):
    d = 0.18 if open_ else 0.05
    n = rng.standard_normal(int(d*SR)); t = T(d)
    return hp(n, 7000)*np.exp(-t*(18 if open_ else 70))*0.35*g

def snare(g=1.0):
    t = T(0.2); n = rng.standard_normal(len(t))
    body = np.sin(2*np.pi*190*t)*np.exp(-t*30)
    return (bp(n, 1500, 7000)*np.exp(-t*25)*0.7+body*0.5)*g

class Track:
    def __init__(self, dur): self.x = np.zeros(int(dur*SR)+SR)
    def add(self, t, s, g=1.0):
        i = int(t*SR)
        if i < 0: s = s[-i:]; i = 0
        n = min(len(s), len(self.x)-i)
        if n > 0: self.x[i:i+n] += s[:n]*g

def reverb(x, dec=1.8, mix=0.25):
    t = T(dec); ir = rng.standard_normal(len(t))*np.exp(-t*4/dec)
    ir = lp(ir, 6000); ir /= np.sqrt((ir**2).sum())
    wet = fftconvolve(x, ir)[:len(x)]
    return x*(1-mix)+wet*mix*1.2

def compose(dur=20.0, drop=16.0, key=0, bpm=104, prog_id=0, seed=0, b1=3.2, b2=8.4):
    global rng
    import numpy as _np
    import sfx as _s
    rng = _np.random.default_rng(seed); _s.rng = rng
    BEAT = 60/bpm
    t0 = drop-28*BEAT                     # beat 28 lands exactly on the drop
    beat_t = lambda n: t0+n*BEAT
    drums, bass, pad, arp, fx = (Track(dur) for _ in range(5))
    # A minor: Am F C G per bar
    PROGS = [
        [(57, [69, 72, 76]), (53, [65, 69, 72]), (48, [64, 67, 72]), (55, [67, 71, 74])],   # i-VI-III-VII
        [(57, [69, 72, 76]), (55, [67, 71, 74]), (53, [65, 69, 72]), (52, [64, 68, 71])],   # i-VII-VI-V
        [(53, [65, 69, 72]), (48, [64, 67, 72]), (55, [67, 71, 74]), (57, [69, 72, 76])],   # VI-III-VII-i
        [(57, [69, 72, 76]), (50, [62, 65, 69]), (53, [65, 69, 72]), (55, [67, 71, 74])],   # i-iv-VI-VII
    ]
    prog = [(r+key, [c+key for c in ch]) for r, ch in PROGS[prog_id % 4]]
    kicks = []
    nb = int((dur-t0)/BEAT)+1
    for n in range(-64, nb):
        t = beat_t(n)
        if t < -0.1 or t > dur: continue
        bar = n//4; b = n % 4
        root, chord = prog[bar % 4]
        sec = 0 if t < b1 else 1 if t < b2 else 2 if t < drop else 3
        # --- drums
        if sec == 0 and b in (0, 2):
            drums.add(t, kick(0.55)); kicks.append(t)              # heartbeat
        if sec == 1:
            if b in (0, 2): drums.add(t, kick(0.7)); kicks.append(t)
            if b == 2: drums.add(t, clap(0.45))
            drums.add(t+BEAT/2, hat(0.5))
        if sec == 2:
            if t > 12.0 or b in (0, 2): drums.add(t, kick(0.85)); kicks.append(t)
            if b in (1, 3): drums.add(t, clap(0.55))
            drums.add(t+BEAT/2, hat(0.7)); drums.add(t, hat(0.35))
        if sec == 3:
            drums.add(t, kick(1.0)); kicks.append(t)
            if b in (1, 3): drums.add(t, clap(0.8))
            drums.add(t+BEAT/2, hat(0.9, open_=True))
            for k in (0.25, 0.75): drums.add(t+BEAT*k, hat(0.4))
        # --- bass (per beat, 8ths in later sections)
        if sec >= 1 and b == 0 or sec >= 1:
            f = mf(root-12 if sec < 3 else root-12)
            steps = [0] if sec == 1 else [0, 0.5]
            for k in steps:
                d = BEAT*(0.9 if sec == 1 else 0.45)
                x = (np.sin(2*np.pi*f*T(d))*0.8 + lp(saw(f, d), 600 if sec < 3 else 1100)*0.45)
                x *= adsr(len(x), 0.005, 0.08, 0.7, 0.05, d-0.03)
                bass.add(t+BEAT*k, x, 0.75 if sec < 3 else 1.0)
        # --- pad (per bar)
        if b == 0:
            d = BEAT*4
            if sec == 0:
                ch = [57+key, 60+key, 64+key]; g = 0.22; cut = 700
            elif sec == 1:
                ch = [r-12 for r in chord]; g = 0.26; cut = 1100
            elif sec == 2:
                ch = chord; g = 0.24; cut = 1800+min(1, max(0, (t-b2)/(drop-b2)))*2500
            else:
                ch = chord+[chord[0]+12]; g = 0.30; cut = 5200
            x = sum(supersaw(mf(m), d) for m in ch)/len(ch)
            x = lp(x, cut, 2)*adsr(len(x), 0.08 if sec < 3 else 0.01, 0.3, 0.8, 0.25, d-0.1)
            pad.add(t, x, g)
        # --- pluck arp (fix + payoff), 8th notes
        if sec >= 2:
            notes = chord+[chord[1]+12]
            for k in range(2):
                m = notes[(n*2+k) % len(notes)]+12
                d = BEAT/2
                tt = T(d)
                x = (np.sign(np.sin(2*np.pi*mf(m)*tt))*0.5+np.sin(2*np.pi*mf(m)*tt))*np.exp(-tt*14)
                arp.add(t+k*d, lp(x, 3500), 0.18 if sec == 2 else 0.22)
    # --- build into drop: riser + snare roll
    rs, re_ = drop-1.8, drop
    d = re_-rs; tt = T(d)
    nz = rng.standard_normal(len(tt)); out = np.zeros_like(nz); blk = 960
    for i in range(0, len(nz), blk):
        u = i/len(nz); out[i:i+blk] = hp(nz[i:i+blk], 400+u*6000)
    fx.add(rs, out*(tt/d)**2*0.35)
    f = 200*2**(tt/d*2); fx.add(rs, np.sin(2*np.pi*np.cumsum(f)/SR)*(tt/d)**2*0.12)
    k = 0; tr = drop-2*BEAT*2
    while tr < drop-0.02:
        step = BEAT/2 if tr < drop-2*BEAT else BEAT/4 if tr < drop-BEAT else BEAT/8
        drums.add(tr, snare(0.25+0.5*(1-(drop-tr)/(4*BEAT)))); tr += step
    # silence the kick/bass for the last half beat before the drop (tension gap)
    gap0, gap1 = int((drop-BEAT/2)*SR), int(drop*SR)
    # impact on the drop
    fx.add(drop, kick(1.0)*1.2); fx.add(drop, reverb(np.pad(clap(0.8), (0, SR)), 2.5, 0.6), 0.6)
    # sidechain
    sc = np.ones_like(bass.x)
    for kt in kicks:
        i = int(kt*SR)
        if 0 <= i < len(sc):
            n = min(int(0.3*SR), len(sc)-i)
            sc[i:i+n] = np.minimum(sc[i:i+n], 1-0.75*np.exp(-np.arange(n)/SR*14))
    padw = reverb(pad.x, 2.2, 0.35)*sc
    arpw = reverb(arp.x, 1.4, 0.3)
    bs = bass.x*sc
    for tr_ in (bs, drums.x):
        tr_[gap0:gap1] *= np.linspace(1, 0.05, gap1-gap0)
    mix = drums.x*0.9+bs*0.85+padw*0.9+arpw+fx.x
    mix = lp(hp(mix, 28), 16000)
    mix = np.tanh(mix*1.3)/1.3
    mix = mix[:int(dur*SR)]
    st = np.stack([mix*0.98+np.roll(arpw[:len(mix)], 300)*0.05, mix*0.98+np.roll(padw[:len(mix)], 480)*0.04], 1)
    return st/np.abs(st).max()*0.9
