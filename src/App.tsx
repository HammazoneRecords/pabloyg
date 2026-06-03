import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { X, Instagram, Youtube, ShoppingBag } from 'lucide-react';
import WorkingDraftBanner from './components/WorkingDraftBanner';

/* ─── Palette ─────────────────────────────────────────────────────────── */
const C = {
  void:    '#060606',
  pit:     '#0C0C0C',
  card:    '#141414',
  wire:    '#1E1E1E',
  blood:   '#8C0F0F',
  bloodL:  '#B01515',
  bloodDim:'rgba(140,15,15,0.15)',
  bone:    '#EDE0CC',
  boneM:   'rgba(237,224,204,0.55)',
  boneD:   'rgba(237,224,204,0.25)',
} as const;

const FF = {
  display: "'Bebas Neue', Impact, sans-serif",
  ui:      "'Barlow Condensed', sans-serif",
  body:    "'DM Sans', sans-serif",
} as const;

const VIDEOS = [
  { id: 1, title: 'Rich N Richer',          videoId: '5bi5kuLXmKA', year: '2023', feat: '' },
  { id: 2, title: 'Galore',                 videoId: 'YTizW9g0hLM', year: '2023', feat: 'ft. Skillibeng' },
  { id: 3, title: 'D.I.E.',                 videoId: '5wuTGZOUb3A', year: '2023', feat: '' },
  { id: 4, title: 'Uptown',                 videoId: 'waaNc_lhp3E', year: '2023', feat: '' },
  { id: 5, title: 'Time',                   videoId: 'vHZYFDvEq7I', year: '2023', feat: '' },
  { id: 6, title: 'Rich N Richer (Live)',   videoId: 'LdgQbzBrS1w', year: '2023', feat: 'Vevo Ctrl' },
];

/* ─── Entry Gateway ───────────────────────────────────────────────────── */
function EntryGateway({ onEnter }: { onEnter: () => void }) {
  const [phase, setPhase] = useState<'drip' | 'name' | 'ready'>('drip');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('name'), 1500);
    const t2 = setTimeout(() => setPhase('ready'), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div onClick={phase === 'ready' ? onEnter : undefined}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, background: C.void, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: phase === 'ready' ? 'pointer' : 'default', overflow: 'hidden' }}>

      {/* Blood drip line — animates down from top */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 2, background: `linear-gradient(to bottom, ${C.blood}, ${C.bloodL})`, zIndex: 1 }}
        className="drip-line" />

      {/* BAD JUVI */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <p style={{ fontFamily: FF.ui, fontSize: 11, fontWeight: 700, letterSpacing: 8, textTransform: 'uppercase', color: C.blood, marginBottom: 16, opacity: phase === 'drip' ? 0 : 1, transition: 'opacity 0.6s 0.3s' }}>
          BAD JUVI RECORDS
        </p>
        <h1 style={{ fontFamily: FF.display, fontSize: 'clamp(80px,20vw,220px)', lineHeight: 0.85, letterSpacing: 6, color: C.bone, opacity: phase === 'drip' ? 0 : 1, transition: 'opacity 0.6s 0.5s' }}>
          PABLO<br />YG
        </h1>
        <div style={{ height: 2, background: C.blood, margin: '24px auto', width: phase === 'name' || phase === 'ready' ? 120 : 0, transition: 'width 0.6s 1s ease' }} />
        <p className={phase === 'ready' ? 'pulse-slow' : ''}
          style={{ fontFamily: FF.ui, fontSize: 11, letterSpacing: 6, textTransform: 'uppercase', color: C.boneD, opacity: phase === 'ready' ? 1 : 0, transition: 'opacity 0.5s' }}>
          Click anywhere to enter
        </p>
      </div>
    </div>
  );
}

/* ─── Nav ─────────────────────────────────────────────────────────────── */
function Nav() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const links = [
    { label: 'Home',      path: '/home'     },
    { label: 'Music',     path: '/music'    },
    { label: 'Bad Juvi',  path: '/bad-juvi' },
    { label: 'About',     path: '/about'    },
    { label: 'Merch',     path: '/merch'    },
  ];

  return (
    <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: 'rgba(6,6,6,0.97)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${C.wire}`, height: 54 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={() => navigate('/home')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontFamily: FF.display, fontSize: 20, letterSpacing: 3, color: C.bone }}>PABLO YG</span>
          <span style={{ fontFamily: FF.display, fontSize: 11, letterSpacing: 5, color: C.blood }}>BAD JUVI</span>
        </button>

        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 24 }}>
          {links.map(l => (
            <button key={l.path} onClick={() => navigate(l.path)}
              style={{ fontFamily: FF.ui, fontSize: 13, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', color: pathname === l.path ? C.blood : C.boneD, background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = C.bone)}
              onMouseLeave={e => (e.currentTarget.style.color = pathname === l.path ? C.blood : C.boneD)}>
              {l.label}
            </button>
          ))}
          <div style={{ width: 1, height: 16, background: C.wire }} />
          {[{ href: 'https://www.instagram.com/official_pablo_yg/', icon: <Instagram size={16} /> }, { href: 'https://www.youtube.com/@PabloYG', icon: <Youtube size={16} /> }].map(s => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{ color: C.boneD, transition: 'color 0.2s' }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.blood)}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.boneD)}>
              {s.icon}
            </a>
          ))}
        </div>

        <button className="md:hidden" onClick={() => setOpen(o => !o)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.bone }}>
          {open ? <X size={22} /> : <span style={{ fontFamily: FF.ui, fontSize: 11, letterSpacing: 3 }}>MENU</span>}
        </button>
      </div>

      {open && (
        <div style={{ background: C.pit, borderTop: `1px solid ${C.wire}`, padding: '20px 24px 28px' }}>
          {links.map(l => (
            <button key={l.path} onClick={() => { navigate(l.path); setOpen(false); }}
              style={{ display: 'block', width: '100%', textAlign: 'left', fontFamily: FF.display, fontSize: 30, letterSpacing: 3, color: C.bone, background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', borderBottom: `1px solid ${C.wire}` }}>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

/* ─── Home Page ───────────────────────────────────────────────────────── */
function HomePage() {
  const navigate = useNavigate();
  return (
    <div style={{ position: 'absolute', inset: 0, top: 54, overflow: 'hidden', background: C.void }}>

      {/* Background — Rich N Richer video playing muted */}
      <iframe
        src="https://www.youtube.com/embed/5bi5kuLXmKA?autoplay=1&mute=1&loop=1&playlist=5bi5kuLXmKA&controls=0&rel=0&playsinline=1&showinfo=0"
        allow="autoplay; encrypted-media"
        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '177.78vh', minWidth: '100%', height: '56.25vw', minHeight: '100%', border: 'none', pointerEvents: 'none' }}
      />

      {/* Dark overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,6,6,0.92) 0%, rgba(6,6,6,0.4) 50%, rgba(6,6,6,0.65) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(6,6,6,0.6) 0%, transparent 60%)' }} />

      {/* Content — bottom-left */}
      <div style={{ position: 'absolute', bottom: 48, left: 40, zIndex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{ width: 28, height: 2, background: C.blood }} />
          <span style={{ fontFamily: FF.ui, fontSize: 10, fontWeight: 700, letterSpacing: 5, textTransform: 'uppercase', color: C.blood }}>Bad Juvi · St. Ann, Jamaica</span>
        </div>
        <h1 style={{ fontFamily: FF.display, fontSize: 'clamp(80px,16vw,180px)', lineHeight: 0.85, letterSpacing: 4, color: C.bone, marginBottom: 12 }}>
          PABLO<br />YG
        </h1>
        <p style={{ fontFamily: FF.body, fontSize: 15, color: C.boneM, maxWidth: 440, lineHeight: 1.75, marginBottom: 32 }}>
          21. St. Ann. Bad Juvi. Bounty Killer mentored. VP Records. Trap-dancehall's next chapter.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/music')} style={{ fontFamily: FF.ui, fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', background: C.blood, color: C.bone, border: 'none', padding: '12px 28px', cursor: 'pointer', transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            Watch Videos
          </button>
          <button onClick={() => navigate('/bad-juvi')} style={{ fontFamily: FF.ui, fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', background: 'transparent', color: C.bone, border: `1px solid ${C.wire}`, padding: '12px 28px', cursor: 'pointer', transition: 'border-color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = C.blood)} onMouseLeave={e => (e.currentTarget.style.borderColor = C.wire)}>
            Bad Juvi
          </button>
        </div>
      </div>

      {/* Stats — top right */}
      <div style={{ position: 'absolute', top: 16, right: 28, zIndex: 1, display: 'flex', gap: 28 }}>
        {[{ n: '40M+', l: 'YouTube Views' }, { n: '156K', l: 'Instagram' }, { n: '26', l: 'Bad Juvi Tracks' }].map(s => (
          <div key={s.l} style={{ textAlign: 'right' }}>
            <p style={{ fontFamily: FF.display, fontSize: 22, letterSpacing: 2, color: C.blood, lineHeight: 1 }}>{s.n}</p>
            <p style={{ fontFamily: FF.ui, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: C.boneD, marginTop: 2 }}>{s.l}</p>
          </div>
        ))}
      </div>

      <WorkingDraftBanner artist="Pablo YG" />
    </div>
  );
}

/* ─── Music — Video Wall ──────────────────────────────────────────────── */
function MusicPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div style={{ position: 'absolute', inset: 0, top: 54, overflowY: 'auto', background: C.void, paddingBottom: 80 }}>

      {/* Header */}
      <div style={{ padding: '48px 40px 32px', borderBottom: `1px solid ${C.wire}` }}>
        <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 5, textTransform: 'uppercase', color: C.blood, marginBottom: 6 }}>Bad Juvi Catalogue</p>
        <h1 style={{ fontFamily: FF.display, fontSize: 56, letterSpacing: 3, color: C.bone, lineHeight: 1 }}>MUSIC</h1>
      </div>

      {/* 3×2 video wall */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, padding: 3 }}>
        {VIDEOS.map(v => (
          <div key={v.id}
            style={{ position: 'relative', background: '#000', cursor: 'pointer', overflow: 'hidden' }}
            onClick={() => setExpanded(expanded === v.videoId ? null : v.videoId)}>

            {expanded === v.videoId ? (
              /* Expanded — show live iframe */
              <div style={{ position: 'relative', paddingBottom: '56.25%' }}>
                <iframe key={v.videoId}
                  src={`https://www.youtube.com/embed/${v.videoId}?rel=0&autoplay=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }} />
                {/* Close hint */}
                <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(0,0,0,0.6)', color: C.bone, width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontFamily: FF.ui, zIndex: 2 }}>✕</div>
              </div>
            ) : (
              /* Collapsed — thumbnail */
              <div style={{ position: 'relative', paddingBottom: '56.25%', background: C.pit }}>
                <img src={`https://img.youtube.com/vi/${v.videoId}/maxresdefault.jpg`} alt={v.title}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'brightness(0.65)', transition: 'filter 0.25s' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.filter = 'brightness(0.85)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.filter = 'brightness(0.65)')} />
                {/* Play overlay */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(140,15,15,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 0, height: 0, borderTop: '8px solid transparent', borderBottom: '8px solid transparent', borderLeft: `14px solid ${C.bone}`, marginLeft: 3 }} />
                  </div>
                </div>
                {/* Title overlay */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '28px 14px 12px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                  <p style={{ fontFamily: FF.ui, fontSize: 13, fontWeight: 700, letterSpacing: 1, color: C.bone, lineHeight: 1 }}>{v.title}</p>
                  {v.feat && <p style={{ fontFamily: FF.body, fontSize: 10, color: C.boneD, marginTop: 2 }}>{v.feat}</p>}
                </div>
                {/* Blood left border on hover — done via CSS class we can't easily do inline, use top border instead */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: C.blood, opacity: 0 }}
                  onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.opacity = '1')}
                  onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.opacity = '0')} />
              </div>
            )}
          </div>
        ))}
      </div>

      <WorkingDraftBanner artist="Pablo YG" />
    </div>
  );
}

/* ─── Bad Juvi Brand Page ─────────────────────────────────────────────── */
function BadJuviPage() {
  const ITEMS = [
    { name: 'Bad Juvi Hoodie',   type: 'Hoodie',   desc: '"BAD JUVI" gothic script across the chest. Blood crimson on void black. 400gsm.' },
    { name: 'Rich N Richer Tee', type: 'T-Shirt',  desc: '"Rich N Richer" graphic. 100% cotton, oversized. Bone white on black.' },
    { name: 'Pablo YG Cap',      type: 'Headwear', desc: 'Embroidered PABLO YG front. Blood red on black. Structured six-panel.' },
  ];

  return (
    <div style={{ background: C.void, color: C.bone, minHeight: '100vh', paddingTop: 54, overflowX: 'hidden', paddingBottom: 100 }}>

      {/* Full-bleed hero statement */}
      <section style={{ minHeight: 'calc(80vh - 54px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 48px', position: 'relative', overflow: 'hidden', borderBottom: `1px solid ${C.wire}` }}>
        {/* Giant watermark */}
        <div style={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)', fontFamily: FF.display, fontSize: 'clamp(160px, 28vw, 320px)', color: 'rgba(140,15,15,0.05)', lineHeight: 1, pointerEvents: 'none', userSelect: 'none', letterSpacing: -4 }}>
          JUVI
        </div>

        <p style={{ fontFamily: FF.ui, fontSize: 10, fontWeight: 700, letterSpacing: 6, textTransform: 'uppercase', color: C.blood, marginBottom: 24 }}>The Brand</p>

        <blockquote style={{ fontFamily: FF.display, fontSize: 'clamp(36px, 7vw, 80px)', lineHeight: 1.05, letterSpacing: 2, color: C.bone, maxWidth: 700, marginBottom: 36 }}>
          "BAD JUVI IS NOT A NAME.<br />IT'S AN ENERGY."
        </blockquote>

        <div style={{ width: 56, height: 2, background: C.blood, marginBottom: 28 }} />

        <p style={{ fontFamily: FF.body, fontSize: 16, color: C.boneM, maxWidth: 520, lineHeight: 1.85 }}>
          Bad Juvi started as an alter ego and became an identity. Gothic energy, conscious lyricism, trap-dancehall frequency. From Shaw Park to the world — Pablo YG carries the Juvi wherever he goes. The brand follows.
        </p>
      </section>

      {/* Merch drop */}
      <section style={{ padding: '64px 48px', background: C.pit }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 40, flexWrap: 'wrap', gap: 12 }}>
            <div>
              <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 5, textTransform: 'uppercase', color: C.blood, marginBottom: 6 }}>Bad Juvi Store</p>
              <h2 style={{ fontFamily: FF.display, fontSize: 48, letterSpacing: 3, color: C.bone, lineHeight: 1 }}>MERCH</h2>
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid rgba(140,15,15,0.3)`, padding: '8px 18px', background: C.bloodDim }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.blood }} />
              <span style={{ fontFamily: FF.ui, fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: C.blood }}>First Drop Coming</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 3 }}>
            {ITEMS.map((item, i) => (
              <div key={i} style={{ background: C.card, overflow: 'hidden' }}>
                <div style={{ aspectRatio: '1', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <ShoppingBag size={40} style={{ color: C.blood, opacity: 0.10 }} />
                  <span style={{ position: 'absolute', bottom: 12, fontFamily: FF.ui, fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(140,15,15,0.35)' }}>Photo Coming</span>
                </div>
                <div style={{ padding: '16px 18px', borderTop: `2px solid ${C.blood}` }}>
                  <p style={{ fontFamily: FF.ui, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: C.boneD, marginBottom: 4 }}>{item.type}</p>
                  <p style={{ fontFamily: FF.display, fontSize: 20, letterSpacing: 1, color: C.bone, marginBottom: 8, lineHeight: 1 }}>{item.name.toUpperCase()}</p>
                  <p style={{ fontFamily: FF.body, fontSize: 13, color: C.boneM, lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 48px 100px', borderTop: `1px solid ${C.wire}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <p style={{ fontFamily: FF.display, fontSize: 24, letterSpacing: 4, color: C.bone }}>BAD JUVI</p>
        <p style={{ fontFamily: FF.body, fontSize: 11, color: C.boneD }}>A Pablo YG Brand · © 2025</p>
      </footer>
      <WorkingDraftBanner artist="Pablo YG" />
    </div>
  );
}

/* ─── About Page ──────────────────────────────────────────────────────── */
function AboutPage() {
  return (
    <div style={{ background: C.void, color: C.bone, minHeight: '100vh', paddingTop: 54, overflowX: 'hidden', paddingBottom: 100 }}>
      <div style={{ borderBottom: `3px solid ${C.blood}`, padding: '56px 48px 40px', background: C.pit }}>
        <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 6, textTransform: 'uppercase', color: C.blood, marginBottom: 8 }}>Romeo Hines</p>
        <h1 style={{ fontFamily: FF.display, fontSize: 'clamp(56px,10vw,100px)', lineHeight: 0.85, letterSpacing: 4, color: C.bone }}>PABLO YG</h1>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 48px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: 64, alignItems: 'start' }}>
        <div>
          <p style={{ fontFamily: FF.body, fontSize: 16, color: C.boneM, lineHeight: 1.9, marginBottom: 22 }}>
            <strong style={{ color: C.bone }}>Romeo Hines</strong> — born 2004, from Shaw Park, St. Ann Parish on Jamaica's north coast. He got his name in high school when a teacher compared his soccer footwork to Argentine footballer Pablo Aimar. The "YG" came from his father Mr. Groove's moniker. He started recording during COVID-19 in 2020 and didn't stop.
          </p>
          <p style={{ fontFamily: FF.body, fontSize: 16, color: C.boneM, lineHeight: 1.9, marginBottom: 22 }}>
            The <strong style={{ color: C.blood }}>Bad Juvi</strong> mixtape — 26 tracks, July 2023 — charted in the USA, UK, Barbados, Turks & Caicos, St Kitts & Nevis. "Rich N Richer" broke through as a soulful mission statement about resilience and ambition. By 21, he had 40 million YouTube views and was performing at Sting and Reggae Sumfest.
          </p>
          <p style={{ fontFamily: FF.body, fontSize: 16, color: C.boneM, lineHeight: 1.9 }}>
            Mentored by <strong style={{ color: C.bone }}>Bounty Killer</strong>. Distributed through <strong style={{ color: C.bone }}>VP Records</strong>. Collaborations with Skillibeng, Valiant, 450, Jahvillani, Kraff Gad. One of the main voices carrying the trap-dancehall wave alongside his St. Ann contemporaries.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 1, position: 'sticky', top: 80 }}>
          {[
            { label: 'Real Name',   value: 'Romeo Hines' },
            { label: 'Born',        value: '2004 · Age 21' },
            { label: 'From',        value: 'Shaw Park, St. Ann, JA' },
            { label: 'Label',       value: 'YGF Records' },
            { label: 'Distributed', value: 'VP Records' },
            { label: 'Mentor',      value: 'Bounty Killer' },
            { label: 'YouTube',     value: '40M+ Views' },
            { label: 'Instagram',   value: '156K Followers' },
            { label: 'Mixtape',     value: 'Bad Juvi (26 tracks)' },
            { label: 'Co-signs',    value: 'Skillibeng, Valiant, 450' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '11px 16px', background: C.card, borderLeft: `3px solid ${C.blood}`, gap: 10 }}>
              <span style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: C.boneD, flexShrink: 0 }}>{s.label}</span>
              <span style={{ fontFamily: FF.ui, fontSize: 13, fontWeight: 600, color: C.bone, textAlign: 'right' }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ padding: '40px 48px 100px', borderTop: `1px solid ${C.wire}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
        <div style={{ display: 'flex', gap: 18 }}>
          {[{ href: 'https://www.instagram.com/official_pablo_yg/', icon: <Instagram size={18} /> }, { href: 'https://www.youtube.com/@PabloYG', icon: <Youtube size={18} /> }].map(s => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{ color: C.boneD }} onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.blood)} onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = C.boneD)}>
              {s.icon}
            </a>
          ))}
        </div>
        <p style={{ fontFamily: FF.body, fontSize: 11, color: C.boneD }}>© 2025 Pablo YG. Built by <a href="https://mindwaveja.com" target="_blank" rel="noopener noreferrer" style={{ color: C.blood, textDecoration: 'none' }}>MindWave JA</a>.</p>
      </footer>
      <WorkingDraftBanner artist="Pablo YG" />
    </div>
  );
}

/* ─── Merch Page ──────────────────────────────────────────────────────── */
function MerchPage() {
  const ITEMS = [
    { name: 'Bad Juvi Hoodie',   type: 'Hoodie',   desc: '"BAD JUVI" gothic script. Blood crimson on black. 400gsm heavyweight.' },
    { name: 'Rich N Richer Tee', type: 'T-Shirt',  desc: '"Rich N Richer" graphic. 100% cotton, oversized. Bone on black.' },
    { name: 'Pablo YG Cap',      type: 'Headwear', desc: 'Embroidered PABLO YG. Blood red on black. Structured six-panel.' },
  ];
  return (
    <div style={{ background: C.void, color: C.bone, minHeight: '100vh', paddingTop: 54, overflowX: 'hidden', paddingBottom: 100 }}>
      <div style={{ padding: '56px 48px 36px', borderBottom: `1px solid ${C.wire}`, background: C.pit }}>
        <p style={{ fontFamily: FF.ui, fontSize: 10, letterSpacing: 5, textTransform: 'uppercase', color: C.blood, marginBottom: 8 }}>Official Store</p>
        <h1 style={{ fontFamily: FF.display, fontSize: 64, letterSpacing: 3, color: C.bone, lineHeight: 1, marginBottom: 16 }}>MERCH</h1>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: `1px solid rgba(140,15,15,0.3)`, padding: '8px 18px', background: C.bloodDim }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: C.blood }} />
          <span style={{ fontFamily: FF.ui, fontSize: 10, fontWeight: 700, letterSpacing: 4, textTransform: 'uppercase', color: C.blood }}>Drop Coming</span>
        </div>
      </div>
      <div style={{ padding: '48px', background: C.pit }}>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 3 }}>
          {ITEMS.map((item, i) => (
            <div key={i} style={{ background: C.card, overflow: 'hidden' }}>
              <div style={{ aspectRatio: '1', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <ShoppingBag size={40} style={{ color: C.blood, opacity: 0.10 }} />
                <span style={{ position: 'absolute', bottom: 12, fontFamily: FF.ui, fontSize: 9, letterSpacing: 4, textTransform: 'uppercase', color: 'rgba(140,15,15,0.35)' }}>Photo Coming</span>
              </div>
              <div style={{ padding: '16px 18px', borderTop: `2px solid ${C.blood}` }}>
                <p style={{ fontFamily: FF.ui, fontSize: 9, letterSpacing: 3, textTransform: 'uppercase', color: C.boneD, marginBottom: 4 }}>{item.type}</p>
                <p style={{ fontFamily: FF.display, fontSize: 20, letterSpacing: 1, color: C.bone, marginBottom: 8, lineHeight: 1 }}>{item.name.toUpperCase()}</p>
                <p style={{ fontFamily: FF.body, fontSize: 13, color: C.boneM, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <WorkingDraftBanner artist="Pablo YG" />
    </div>
  );
}

/* ─── App ─────────────────────────────────────────────────────────────── */
export default function App() {
  const [entered, setEntered] = useState(false);
  const navigate = useRef<ReturnType<typeof useNavigate> | null>(null);

  return (
    <BrowserRouter>
      <AppInner entered={entered} onEnter={() => setEntered(true)} navRef={navigate} />
    </BrowserRouter>
  );
}

function AppInner({ entered, onEnter, navRef }: { entered: boolean; onEnter: () => void; navRef: React.MutableRefObject<ReturnType<typeof useNavigate> | null> }) {
  const nav = useNavigate();
  const { pathname } = useLocation();
  navRef.current = nav;

  const handleEnter = () => {
    onEnter();
    if (pathname === '/') nav('/home');
  };

  return (
    <>
      {!entered && <EntryGateway onEnter={handleEnter} />}
      {entered && <Nav />}
      <Routes>
        <Route path="/"          element={<div style={{ position: 'absolute', inset: 0, background: C.void }} />} />
        <Route path="/home"      element={<HomePage />} />
        <Route path="/music"     element={<MusicPage />} />
        <Route path="/bad-juvi"  element={<BadJuviPage />} />
        <Route path="/about"     element={<AboutPage />} />
        <Route path="/merch"     element={<MerchPage />} />
      </Routes>
    </>
  );
}
