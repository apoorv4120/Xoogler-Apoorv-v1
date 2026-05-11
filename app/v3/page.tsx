'use client'

import { useState, useEffect, useRef } from 'react'
import { Bricolage_Grotesque, DM_Sans } from 'next/font/google'

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], weight: ['400','500','600','700','800'], variable: '--ff-d', display: 'swap' })
const dm        = DM_Sans({ subsets: ['latin'], weight: ['300','400','500','600'], variable: '--ff-b', display: 'swap' })

const C = {
  bg:      '#080808',
  card:    '#0F0F0F',
  card2:   '#141414',
  border:  'rgba(255,255,255,0.07)',
  border2: 'rgba(255,255,255,0.15)',
  text:    '#F0EDE6',
  mid:     '#888888',
  subtle:  '#444444',
  blue:    '#4285F4',
  red:     '#EA4335',
  yellow:  '#FBBC05',
  green:   '#34A853',
}

// Deep tinted card backgrounds for each Google color
const TINT = {
  blue:   '#060F1E',
  red:    '#1C0907',
  green:  '#061309',
  yellow: '#130F00',
}

const fd  = 'var(--ff-d), sans-serif'
const fb  = 'var(--ff-b), system-ui, sans-serif'
const PAD = 'clamp(16px,3vw,44px)'
const GAP = 10

// ── Data ─────────────────────────────────────────────────────────────────────

const LOGOS = [
  { name: 'Neeva',              src: '/images/logo-neeva.png' },
  { name: 'Applied Intuition',  src: '/images/logo-applied-intuition.png' },
  { name: 'Sierra',             src: '/images/logo-sierra.webp' },
  { name: 'Palo Alto Networks', src: '/images/logo-palo-alto.webp' },
  { name: 'Impossible Foods',   src: '/images/logo-impossible-foods.png' },
  { name: 'Dialpad',            src: '/images/logo-dialpad.png' },
  { name: 'Waymo',              src: '/images/logo-waymo.png' },
  { name: 'YouTube',            src: '/images/logo-youtube.png' },
  { name: 'Coursera',           src: '/images/logo-coursera.png' },
  { name: 'Figma',              src: '/images/logo-figma.png' },
]

const STATS = [
  { num: '35K+', label: 'Members worldwide',    sub: 'verified ex-Googlers',         color: C.blue   },
  { num: '100+', label: 'Startups backed',       sub: 'from idea to Series B',        color: C.red    },
  { num: '$2B+', label: 'Raised by members',     sub: 'through Xoogler connections',  color: C.green  },
  { num: '300+', label: 'Events every year',     sub: 'across 50+ cities',            color: C.yellow },
]

const PILLARS = [
  {
    num: '01', color: C.blue, bg: TINT.blue,
    title: 'Network\n& Connect',
    desc: 'A global room of 35,000 builders who know what shipping at scale looks like. The right introduction — to a co-founder, investor, or operator — when you need it most.',
    cta: 'Join the network',
    img: '/images/0c795c2c-e4b9-4c28-a627-93d96074b29b.webp',
  },
  {
    num: '02', color: C.red, bg: TINT.red,
    title: 'Launch & Get Funded',
    desc: 'Capital from people who\'ve seen greatness from the inside. Our syndicate and two Xoogler venture funds back founders at every stage.',
    cta: 'Get funded',
    img: '/images/5943b6085d3e4e023318e9a1.webp',
  },
  {
    num: '03', color: C.green, bg: TINT.green,
    title: 'Access Expert Talent',
    desc: 'Every consultant and fractional hire verified against their Google record. Matched to your exact needs in days, not months.',
    cta: 'Find an expert',
    img: '/images/66c5b2dc534cb23d570df069_Container.png',
  },
  {
    num: '04', color: C.yellow, bg: TINT.yellow,
    title: 'Grow & Learn Together',
    desc: 'Intimate dinners to city-wide summits across 50+ cities. Practitioners only — no panels, no pitch decks.',
    cta: 'See events',
    img: '/images/1748101997106.jpeg',
  },
]

const TESTIMONIALS = [
  {
    quote: 'One introduction through Xoogler became our Series A lead. I\'d been working the room for six months — the right person in the Xoogler network got it done in a week.',
    name: 'Priya Mehta', role: 'Founder & CEO', co: 'Raised $11M Series A', color: C.blue, big: true,
  },
  {
    quote: 'We needed a senior ML engineer with infra experience. Three verified candidates showed up in 48 hours. Nothing in recruiting compares.',
    name: 'Daniel Osei', role: 'CTO', co: 'AI infrastructure startup', color: C.green, big: false,
  },
  {
    quote: 'The only events in tech where I have real conversations. No pitch, no agenda — just people who\'ve built things and want to keep building.',
    name: 'Sarah Lin', role: 'Partner', co: 'Early-stage venture fund', color: C.yellow, big: false,
  },
]

const EXPERTS = [
  { name: 'Alex Papageorgiou',    role: 'GTM & Digital Strategy',       tags: ['GTM','Strategy'],   loc: 'Greece',        color: C.blue,   img: '/images/6878ca90f80fd8b93ffc0cd1_alex.png' },
  { name: 'Anna Buber',           role: 'Leadership & Growth',           tags: ['Growth','Talent'],  loc: 'Sydney',        color: C.red,    img: '/images/6876436ec73737b6194f5498_anna.png' },
  { name: 'Christopher Fong',     role: 'Venture Capital & Fundraising', tags: ['VC','Fundraising'], loc: 'Mountain View', color: C.green,  img: '/images/6876436e3ef841143ac37617_chris.avif' },
  { name: 'Stef',                 role: 'Product & GTM',                 tags: ['Product','GTM'],    loc: 'Hong Kong',     color: C.yellow, img: '/images/6876412cd46ddb6d9b49e242_stef.png' },
  { name: 'Jennifer Howard',      role: 'AI & Modern GTM',               tags: ['AI','GTM'],         loc: 'Sydney',        color: C.blue,   img: '/images/6878cbdbf737e017fa39a846_terry.png' },
  { name: 'Kushagra Shrivastava', role: 'VC & Marketing Strategy',       tags: ['VC','Strategy'],    loc: 'Menlo Park',    color: C.red,    img: '/images/6878f44be051d68c7d51a740_32887d7cc93b148779525b094d2676b4_kushagrah.avif' },
  { name: 'Maggie Ma',            role: 'GTM & Product Marketing',       tags: ['GTM','AI'],         loc: 'San Jose',      color: C.green,  img: '/images/6878cb2ecb155650880f947a_maggie.png' },
  { name: 'Sal Mohammed',         role: 'AEO & Search Expert',           tags: ['AEO','SEO'],        loc: 'London',        color: C.yellow, img: '/images/6876436e52f3de30547676b8_sal.png' },
]

const EVENTS = [
  { date:'May 28', type:'Demo Day',         title:'Xoogler SF Demo Day',    loc:'San Francisco, CA', spots:'48 spots left', color:C.blue,   img:'/images/105172840-xoogle-3406.jpg' },
  { date:'Jun 3',  type:"Founders' Dinner", title:'AI Founders Dinner NYC', loc:'New York, NY',      spots:'12 spots left', color:C.red,    img:'/images/1748101997106.jpeg' },
  { date:'Jun 12', type:'Community Mixer',  title:'Xoogler London Mixer',   loc:'London, UK',        spots:'60 spots left', color:C.green,  img:'/images/66aa547f84d08a08be4ea67e_WhatsApp%20Image%202024-07-31%20at%208.40.26%20PM.jpeg' },
]

// ── Hooks ─────────────────────────────────────────────────────────────────────

function useVisible(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [on, setOn] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); obs.disconnect() }
    }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, on }
}

function useCounter(target: number, active: boolean, duration = 1400) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      setVal(Math.round((1 - Math.pow(1 - t, 3)) * target))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])
  return val
}

// ── StatCard ──────────────────────────────────────────────────────────────────

function StatCard({ num, label, sub, color }: typeof STATS[0]) {
  const { ref, on } = useVisible(0.2)
  const prefix  = num.startsWith('$') ? '$' : ''
  const numPart = parseInt(num.replace(/\D/g, ''))
  const suffix  = num.replace(/^[$\d,]+/, '')
  const count   = useCounter(numPart, on)

  return (
    <div ref={ref} className="bc" style={{
      padding: 'clamp(24px,3vw,36px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      minHeight: 170,
      borderBottom: `3px solid ${color}`,
    }}>
      <div style={{ fontFamily: fd, fontWeight: 800, fontSize: 'clamp(44px,4.5vw,64px)', letterSpacing: '-0.05em', color, lineHeight: 1 }}>
        {on ? `${prefix}${count.toLocaleString()}${suffix}` : `${prefix}—`}
      </div>
      <div style={{ marginTop: 20 }}>
        <div style={{ fontFamily: fd, fontWeight: 600, fontSize: 15, color: C.text, letterSpacing: '-0.01em' }}>{label}</div>
        <div style={{ fontFamily: fb, fontSize: 12, color: C.mid, marginTop: 4 }}>{sub}</div>
      </div>
    </div>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function V3() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const sStats  = useVisible(0.1)
  const sPill   = useVisible(0.06)
  const sTest   = useVisible(0.06)
  const sEv     = useVisible(0.06)
  const sExp    = useVisible(0.06)
  const sCta    = useVisible(0.06)

  return (
    <div className={`${bricolage.variable} ${dm.variable}`}
      style={{ background: C.bg, minHeight: '100vh', color: C.text, fontFamily: fb }}>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .bc {
          background: ${C.card};
          border: 1px solid ${C.border};
          border-radius: 16px;
          overflow: hidden;
          transition: border-color .25s, transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s;
        }
        .bc:hover {
          border-color: ${C.border2};
          transform: translateY(-3px);
          box-shadow: 0 28px 72px rgba(0,0,0,.6);
        }

        .fade { opacity: 0; transform: translateY(24px); transition: opacity .65s ease, transform .65s ease; }
        .fade.on { opacity: 1; transform: translateY(0); }
        .d1 { transition-delay: .1s; }
        .d2 { transition-delay: .2s; }
        .d3 { transition-delay: .3s; }

        @keyframes mq  { from { transform:translateX(0) }   to { transform:translateX(-50%) } }
        @keyframes dot { 0%,100% { opacity:1 } 50% { opacity:.15 } }
        @keyframes imgzoom { from { transform:scale(1.08) } to { transform:scale(1) } }

        .nav-a { font-size:13px; color:${C.mid}; text-decoration:none; font-family:${fb}; transition:color .2s; }
        .nav-a:hover { color:${C.text}; }

        .pillar-img { transition: transform .6s cubic-bezier(.2,.8,.2,1); }
        .bc:hover .pillar-img { transform: scale(1.04); }

        img { display:block; }
      `}</style>

      {/* ── Nav ─────────────────────────────────────────────────── */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: `0 ${PAD}`,
        background: scrolled ? 'rgba(8,8,8,.93)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: `1px solid ${scrolled ? C.border : 'transparent'}`,
        transition: 'background .3s, border-color .3s',
      }}>
        <div style={{ fontFamily: fd, fontWeight: 800, fontSize: 17, letterSpacing: '-0.03em' }}>
          <span style={{ color: C.blue }}>X</span>oogler
        </div>
        <nav style={{ display: 'flex', gap: 28 }}>
          {['Network', 'Events', 'Experts', 'Invest'].map(l => (
            <a key={l} href="#" className="nav-a">{l}</a>
          ))}
        </nav>
        <button style={{
          background: C.blue, color: '#fff', border: 'none', borderRadius: 8,
          padding: '7px 18px', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: fb,
        }}>Join Free</button>
      </header>

      <main>

        {/* ══════════════════════════════════════════════════════════
            1. HERO — full-bleed community photo, text over gradient
        ══════════════════════════════════════════════════════════ */}
        <section style={{ position: 'relative', minHeight: '88vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
          {/* Background photo */}
          <img
            src="/images/0c795c2c-e4b9-4c28-a627-93d96074b29b.webp"
            alt=""
            aria-hidden
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', animation: 'imgzoom 1.4s ease forwards' }}
          />
          {/* Gradient overlay — dark on left, lets photo breathe on right */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(8,8,8,.97) 0%, rgba(8,8,8,.88) 38%, rgba(8,8,8,.55) 62%, rgba(8,8,8,.15) 100%)' }} />
          {/* Bottom fade to bg */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 220, background: 'linear-gradient(0deg, #080808 0%, transparent 100%)' }} />

          {/* Content */}
          <div style={{ position: 'relative', padding: `80px ${PAD} 72px`, maxWidth: 1380, margin: '0 auto', width: '100%' }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(66,133,244,.12)', border: '1px solid rgba(66,133,244,.25)',
              borderRadius: 100, padding: '5px 14px', marginBottom: 36,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.blue, animation: 'dot 2.2s ease-in-out infinite' }} />
              <span style={{ fontSize: 11, color: C.blue, fontFamily: fb, fontWeight: 500, letterSpacing: '.07em', textTransform: 'uppercase' }}>
                35,000 verified members
              </span>
            </div>

            <h1 style={{
              fontFamily: fd, fontWeight: 800,
              fontSize: 'clamp(44px,6vw,84px)',
              lineHeight: 1.0, letterSpacing: '-0.04em', color: C.text,
              maxWidth: 700, marginBottom: 28,
            }}>
              Where Google alumni<br />
              <span style={{ color: C.blue }}>build what's next.</span>
            </h1>

            <p style={{
              fontFamily: fb, fontSize: 'clamp(15px,1.6vw,18px)',
              color: 'rgba(240,237,230,.65)', lineHeight: 1.7,
              maxWidth: 480, marginBottom: 44,
            }}>
              35,000 ex-Googlers spanning 50 countries — founders, investors, and engineers still in each other's corner. Find your next co-founder, investor, or hire.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button style={{
                background: C.text, color: C.bg, border: 'none', borderRadius: 10,
                padding: '15px 34px', fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: fd, letterSpacing: '-0.01em',
              }}>Join Free →</button>
              <button style={{
                background: 'rgba(255,255,255,.06)', color: C.mid, border: `1px solid rgba(255,255,255,.12)`,
                borderRadius: 10, padding: '15px 28px', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: fb,
                backdropFilter: 'blur(8px)',
              }}>See how it works</button>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            2. STATS — numbers are the visual, give them room
        ══════════════════════════════════════════════════════════ */}
        <section ref={sStats.ref} style={{ padding: `0 ${PAD}` }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: GAP }}>
            {STATS.map((s, i) => (
              <div key={i} className={`fade ${sStats.on ? 'on' : ''}`} style={{ transitionDelay: `${i * 80}ms` }}>
                <StatCard {...s} />
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            3. LOGOS — context strip
        ══════════════════════════════════════════════════════════ */}
        <section style={{ padding: `${GAP}px ${PAD} 0` }}>
          <div className="bc" style={{ background: C.card2, borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ padding: '11px clamp(16px,3vw,28px)', borderBottom: `1px solid ${C.border}` }}>
              <span style={{ fontSize: 11, color: C.subtle, fontFamily: fb, fontWeight: 500, letterSpacing: '.08em', textTransform: 'uppercase' }}>
                Companies co-founded by members
              </span>
            </div>
            <div style={{ padding: '18px 0', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 56, animation: 'mq 28s linear infinite', width: 'max-content', alignItems: 'center' }}>
                {[...LOGOS, ...LOGOS].map((l, i) => (
                  <img key={i} src={l.src} alt={l.name}
                    style={{ height: 20, width: 'auto', objectFit: 'contain', flexShrink: 0, filter: 'brightness(0) invert(1)', opacity: .35 }} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            4. PILLARS — featured large left, 3 right w/ color personalities
        ══════════════════════════════════════════════════════════ */}
        <section ref={sPill.ref} style={{ padding: `clamp(40px,5vw,68px) ${PAD} 0` }}>
          <div className={`fade ${sPill.on ? 'on' : ''}`}>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span style={{ fontFamily: fb, fontSize: 11, color: C.subtle, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 500 }}>02 — What you can do here</span>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: GAP }}>

              {/* Featured pillar — image bleeds top, colored bg */}
              <div className="bc" style={{ background: PILLARS[0].bg, display: 'flex', flexDirection: 'column', borderColor: 'rgba(66,133,244,.15)' }}>
                <div style={{ height: 'clamp(260px,30vw,380px)', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={PILLARS[0].img} alt={PILLARS[0].title} className="pillar-img"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: 'clamp(28px,3.5vw,44px)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontFamily: fd, fontWeight: 800, fontSize: 12, color: PILLARS[0].color, letterSpacing: '.1em', marginBottom: 16 }}>
                      {PILLARS[0].num}
                    </div>
                    <h3 style={{ fontFamily: fd, fontWeight: 800, fontSize: 'clamp(24px,2.8vw,34px)', letterSpacing: '-0.03em', color: C.text, lineHeight: 1.15, marginBottom: 18, whiteSpace: 'pre-line' }}>
                      {PILLARS[0].title}
                    </h3>
                    <p style={{ fontFamily: fb, fontSize: 15, color: C.mid, lineHeight: 1.7 }}>{PILLARS[0].desc}</p>
                  </div>
                  <div style={{ marginTop: 32 }}>
                    <span style={{ fontSize: 13, color: PILLARS[0].color, fontFamily: fb, fontWeight: 600, cursor: 'pointer', letterSpacing: '.01em' }}>
                      {PILLARS[0].cta} →
                    </span>
                  </div>
                </div>
              </div>

              {/* 3 compact pillars — each with its own Google-color personality */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: GAP }}>
                {PILLARS.slice(1).map((p, i) => (
                  <div key={i} className="bc" style={{
                    flex: 1, display: 'flex', overflow: 'hidden',
                    background: p.bg,
                    borderColor: `${p.color}22`,
                  }}>
                    <div style={{ width: 'clamp(90px,11vw,130px)', flexShrink: 0, overflow: 'hidden' }}>
                      <img src={p.img} alt={p.title} className="pillar-img"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: 'clamp(18px,2.5vw,28px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
                      <div>
                        <div style={{ fontFamily: fd, fontWeight: 800, fontSize: 11, color: p.color, letterSpacing: '.1em', marginBottom: 10 }}>{p.num}</div>
                        <div style={{ fontFamily: fd, fontWeight: 700, fontSize: 'clamp(15px,1.8vw,19px)', letterSpacing: '-0.025em', color: C.text, lineHeight: 1.2, marginBottom: 10 }}>
                          {p.title.replace('\n', ' ')}
                        </div>
                        <p style={{ fontFamily: fb, fontSize: 13, color: C.mid, lineHeight: 1.65 }}>{p.desc}</p>
                      </div>
                      <div style={{ marginTop: 16 }}>
                        <span style={{ fontSize: 12, color: p.color, fontFamily: fb, fontWeight: 600, cursor: 'pointer' }}>{p.cta} →</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            5. TESTIMONIALS — social proof, 1 big + 2 compact
        ══════════════════════════════════════════════════════════ */}
        <section ref={sTest.ref} style={{ padding: `clamp(40px,5vw,68px) ${PAD} 0` }}>
          <div className={`fade ${sTest.on ? 'on' : ''}`}>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
              <span style={{ fontFamily: fb, fontSize: 11, color: C.subtle, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 500 }}>03 — From the community</span>
              <div style={{ flex: 1, height: 1, background: C.border }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: GAP }}>

              {/* Big featured testimonial */}
              <div className="bc" style={{ padding: 'clamp(32px,4vw,52px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 280 }}>
                <div>
                  <div style={{ fontSize: 72, fontFamily: fd, fontWeight: 800, color: TESTIMONIALS[0].color, lineHeight: .75, marginBottom: 28, opacity: .5 }}>"</div>
                  <p style={{ fontFamily: fb, fontSize: 'clamp(16px,1.8vw,21px)', color: C.text, lineHeight: 1.6, fontWeight: 400 }}>
                    {TESTIMONIALS[0].quote}
                  </p>
                </div>
                <div style={{ marginTop: 36, paddingTop: 24, borderTop: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: TESTIMONIALS[0].color, opacity: .2, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontFamily: fd, fontWeight: 600, fontSize: 14, color: C.text, letterSpacing: '-0.01em' }}>{TESTIMONIALS[0].name}</div>
                    <div style={{ fontFamily: fb, fontSize: 12, color: C.mid, marginTop: 2 }}>{TESTIMONIALS[0].role} · {TESTIMONIALS[0].co}</div>
                  </div>
                </div>
              </div>

              {/* 2 compact */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: GAP }}>
                {TESTIMONIALS.slice(1).map((t, i) => (
                  <div key={i} className="bc" style={{ flex: 1, padding: 'clamp(24px,3vw,36px)', background: C.card2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: 44, fontFamily: fd, fontWeight: 800, color: t.color, lineHeight: .75, marginBottom: 20, opacity: .45 }}>"</div>
                      <p style={{ fontFamily: fb, fontSize: 14, color: C.mid, lineHeight: 1.7 }}>{t.quote}</p>
                    </div>
                    <div style={{ marginTop: 24, paddingTop: 18, borderTop: `1px solid ${C.border}` }}>
                      <div style={{ fontFamily: fd, fontWeight: 600, fontSize: 13, color: C.text }}>{t.name}</div>
                      <div style={{ fontFamily: fb, fontSize: 12, color: C.subtle, marginTop: 2 }}>{t.role} · {t.co}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            6. EVENTS
        ══════════════════════════════════════════════════════════ */}
        <section ref={sEv.ref} style={{ padding: `clamp(40px,5vw,68px) ${PAD} 0` }}>
          <div className={`fade ${sEv.on ? 'on' : ''}`}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontFamily: fb, fontSize: 11, color: C.subtle, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 500 }}>04 — Upcoming events</span>
                <div style={{ height: 1, width: 60, background: C.border }} />
              </div>
              <span style={{ fontSize: 12, color: C.blue, fontFamily: fb, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>View all 24 →</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: GAP }}>
              {EVENTS.map((ev, i) => (
                <div key={i} className={`bc fade ${sEv.on ? 'on' : ''} ${['','d1','d2'][i]}`}
                  style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                  <div style={{ height: 210, overflow: 'hidden', flexShrink: 0, position: 'relative' }}>
                    <img src={ev.img} alt={ev.title} className="pillar-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(0deg, rgba(8,8,8,.7) 0%, transparent 50%)' }} />
                    <div style={{ position: 'absolute', top: 14, left: 14 }}>
                      <span style={{
                        background: 'rgba(8,8,8,.72)', backdropFilter: 'blur(8px)',
                        border: `1px solid ${C.border}`, borderRadius: 6,
                        padding: '4px 10px', fontSize: 11, fontFamily: fb, fontWeight: 500, color: ev.color,
                      }}>{ev.type}</span>
                    </div>
                  </div>
                  <div style={{ padding: '22px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontFamily: fd, fontWeight: 700, fontSize: 17, letterSpacing: '-0.02em', color: C.text, lineHeight: 1.2, marginBottom: 6 }}>{ev.title}</div>
                      <div style={{ fontFamily: fb, fontSize: 13, color: C.mid }}>{ev.loc}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
                      <div>
                        <div style={{ fontFamily: fb, fontSize: 12, color: C.subtle }}>{ev.date}</div>
                        <div style={{ fontFamily: fb, fontSize: 12, color: ev.color, fontWeight: 500, marginTop: 2 }}>{ev.spots}</div>
                      </div>
                      <button style={{
                        background: 'transparent', color: C.text, border: `1px solid ${C.border2}`,
                        borderRadius: 7, padding: '8px 16px', fontSize: 12, fontWeight: 500,
                        cursor: 'pointer', fontFamily: fb, transition: 'background .2s',
                      }}>RSVP</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            7. EXPERTS — horizontal cards, legible and human
        ══════════════════════════════════════════════════════════ */}
        <section ref={sExp.ref} style={{ padding: `clamp(40px,5vw,68px) ${PAD} 0` }}>
          <div className={`fade ${sExp.on ? 'on' : ''}`}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontFamily: fb, fontSize: 11, color: C.subtle, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 500 }}>05 — Expert network</span>
                <div style={{ height: 1, width: 60, background: C.border }} />
              </div>
              <span style={{ fontSize: 12, color: C.green, fontFamily: fb, fontWeight: 500, cursor: 'pointer', whiteSpace: 'nowrap' }}>Browse 2,400+ →</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: GAP }}>
              {EXPERTS.map((ex, i) => (
                <div key={i} className={`bc fade ${sExp.on ? 'on' : ''}`}
                  style={{ display: 'flex', overflow: 'hidden', cursor: 'pointer', background: C.card2, transitionDelay: `${(i % 4) * 55}ms` }}>
                  <div style={{ width: 80, height: 80, flexShrink: 0, margin: 18, borderRadius: 12, overflow: 'hidden' }}>
                    <img src={ex.img} alt={ex.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '20px 18px 20px 0', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 4 }}>
                    <div style={{ fontFamily: fd, fontWeight: 600, fontSize: 14, letterSpacing: '-0.01em', color: C.text }}>{ex.name}</div>
                    <div style={{ fontFamily: fb, fontSize: 12, color: C.mid }}>{ex.role} · {ex.loc}</div>
                    <div style={{ display: 'flex', gap: 5, marginTop: 6, flexWrap: 'wrap' }}>
                      {ex.tags.map(t => (
                        <span key={t} style={{
                          fontSize: 10, padding: '2px 8px', borderRadius: 4, fontWeight: 500,
                          background: `${ex.color}14`, color: ex.color, fontFamily: fb,
                        }}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════
            8. CTA — direct, zero friction
        ══════════════════════════════════════════════════════════ */}
        <section ref={sCta.ref} style={{ padding: `clamp(40px,5vw,68px) ${PAD} clamp(52px,7vw,96px)` }}>
          <div className={`bc fade ${sCta.on ? 'on' : ''}`} style={{
            padding: 'clamp(52px,7vw,96px) clamp(44px,6vw,80px)',
            background: `linear-gradient(150deg, #0C1A2C 0%, #080808 45%, #0A1B0D 100%)`,
            position: 'relative', overflow: 'hidden',
            display: 'grid', gridTemplateColumns: '1fr auto', gap: 56, alignItems: 'center',
          }}>
            <div style={{ position: 'absolute', top: -80, left: '25%', width: 450, height: 450, borderRadius: '50%', background: C.blue,  opacity: .04, filter: 'blur(90px)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -60, right: '8%',  width: 350, height: 350, borderRadius: '50%', background: C.green, opacity: .04, filter: 'blur(70px)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative' }}>
              <h2 style={{ fontFamily: fd, fontWeight: 800, fontSize: 'clamp(28px,4vw,54px)', letterSpacing: '-0.04em', color: C.text, lineHeight: 1.05, marginBottom: 18 }}>
                Stop being an ex-Googler.<br />
                <span style={{ color: C.blue }}>Start being a Xoogler.</span>
              </h2>
              <p style={{ fontFamily: fb, fontSize: 15, color: C.mid, lineHeight: 1.7, maxWidth: 460 }}>
                The same people who built Search, Maps, and YouTube are building what's next. Free to join. Vetted and verified.
              </p>
            </div>

            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0, alignItems: 'center' }}>
              <button style={{
                background: C.text, color: C.bg, border: 'none', borderRadius: 12,
                padding: '17px 44px', fontSize: 15, fontWeight: 700, cursor: 'pointer',
                fontFamily: fd, letterSpacing: '-0.01em', whiteSpace: 'nowrap',
              }}>Join Free →</button>
              <span style={{ fontSize: 12, color: C.subtle, fontFamily: fb }}>No credit card required</span>
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
