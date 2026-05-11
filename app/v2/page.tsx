'use client'

import { useState, useEffect, useRef } from 'react'
import { Playfair_Display, Outfit } from 'next/font/google'
import Link from 'next/link'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--ff-display',
  display: 'swap',
})
const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--ff-body',
  display: 'swap',
})

// ─── Tokens ──────────────────────────────────────────────────────────────────
const C = {
  bg:      '#060810',
  surface: '#0C1018',
  card:    '#121820',
  border:  '#1C2030',
  border2: '#262E40',
  text:    '#F0EDE6',
  mid:     '#A0A0BC',
  subtle:  '#3A3E50',
  blue:    '#4285F4',
  red:     '#EA4335',
  yellow:  '#FBBC05',
  green:   '#34A853',
}

const GC = [C.blue, C.red, C.yellow, C.green] as const
const sp = 'clamp(24px, 5vw, 88px)'
const fd = 'var(--ff-display), Georgia, serif'
const fb = 'var(--ff-body), system-ui, sans-serif'

// ─── Data ─────────────────────────────────────────────────────────────────────
const HERO_IMAGES = [
  '/images/66aa560baad8581f0be2b211_WhatsApp Image 2024-07-31 at 8.48.22 PM.jpeg',
  '/images/1748101997106.jpeg',
  '/images/xoogler-v3.jpg',
]

const COMPANIES = [
  'YouTube', 'Stripe', 'Pinterest', 'Quora', 'Reddit', 'Figma',
  'Medium', 'Slack', 'Square', 'Nest', 'Niantic', 'Waymo',
  'Coursera', 'Lyft', 'Asana', 'Cloudflare', 'Bumble', 'Robinhood',
]

const PILLARS = [
  { num: '01', color: C.blue,   title: 'Network & Connect',    desc: 'Join 35,000 Google alumni across 50+ countries. Founders, operators, investors, engineers: people who shipped products used by billions, still in each other\'s corner.', img: '/images/66aa547f84d08a08be4ea67e_WhatsApp Image 2024-07-31 at 8.40.26 PM.jpeg', date: 'Jul 2024', caption: 'Xoogler SF Community Mixer' },
  { num: '02', color: C.red,    title: 'Launch & Get Funded',  desc: 'Capital from people who understand what great looks like. Our 2,000-member syndicate and two Xoogler venture funds have backed 100+ startups from idea to Series B.', img: '/images/66aa5495ff11edbde0f8a518_WhatsApp Image 2024-07-31 at 8.42.24 PM.jpeg', date: 'Mar 2024', caption: 'Founders Demo Day, New York' },
  { num: '03', color: C.green,  title: 'Access Expert Talent', desc: 'Verified Google-pedigree consultants, advisors, and fractional hires. Every expert matched against their employment record. Engaged in days, not months.', img: '/images/66aa560baad8581f0be2b211_WhatsApp Image 2024-07-31 at 8.48.22 PM.jpeg', date: 'Jan 2024', caption: 'Expert Office Hours, London' },
  { num: '04', color: C.yellow, title: 'Grow & Learn Together', desc: '300+ events per year, from intimate dinners to city-wide summits. Led by operators who\'ve scaled things most people only read about. Not speakers. Practitioners.', img: '/images/1748101997106.jpeg', date: 'Nov 2023', caption: 'Annual Summit, San Francisco' },
]

const EXPERT_FILTERS = ['All', 'Product', 'Engineering', 'Growth', 'Finance'] as const
type EF = typeof EXPERT_FILTERS[number]

const EXPERTS = [
  { name: 'Priya Nair',    role: 'Product Strategy',       co: 'ex-Google Ads',      yrs: '9 yrs',  tags: ['GTM', 'B2B SaaS'],   loc: 'San Francisco', img: '/images/6876412cd46ddb6d9b49e242_stef.png',    color: C.blue,   n: 14, spec: 'Product'     as EF, bio: 'Led product strategy for Google\'s $10B+ Ads business. Specializes in B2B SaaS GTM, pricing strategy, and market entry for Series A-C startups.' },
  { name: 'Marcus Chen',   role: 'Engineering Leadership',  co: 'ex-Chrome TL',       yrs: '11 yrs', tags: ['Scale', 'Infra'],     loc: 'Seattle',       img: '/images/test1.jpeg',                           color: C.red,    n: 9,  spec: 'Engineering' as EF, bio: 'Technical Lead on Chrome\'s rendering engine. Helps engineering teams scale from 10 to 1,000+ engineers, infra architecture, and senior hiring.' },
  { name: 'Sofia Larsson', role: 'Growth & Marketing',     co: 'ex-Google EMEA',     yrs: '7 yrs',  tags: ['Growth', 'EU GTM'],   loc: 'London',        img: '/images/6876436ec73737b6194f5498_anna.png',   color: C.green,  n: 21, spec: 'Growth'      as EF, bio: 'Built Google\'s EMEA growth machine across 30 markets. Expert in international expansion, localization strategy, and performance marketing at scale.' },
  { name: 'James Okafor',  role: 'AI & ML Strategy',       co: 'ex-Google Brain',    yrs: '8 yrs',  tags: ['AI/ML', 'MLOps'],    loc: 'New York',      img: '/images/6876436e52f3de30547676b8_sal.png',    color: C.yellow, n: 7,  spec: 'Engineering' as EF, bio: 'Research engineer at Google Brain. Helps companies build AI/ML infrastructure, evaluate model fit, and translate research into shipped product.' },
  { name: 'Rachel Kim',    role: 'Finance & Fundraising',  co: 'ex-Google Finance',  yrs: '6 yrs',  tags: ['Series A', 'M&A'],   loc: 'Austin',        img: '/images/test2.jpeg',                           color: C.blue,   n: 12, spec: 'Finance'     as EF, bio: 'Finance lead for Google\'s M&A team. Advises founders on Series A/B fundraising strategy, financial modeling, and investor positioning.' },
  { name: 'Tariq Hassan',  role: 'Product Design',         co: 'ex-Material Design', yrs: '10 yrs', tags: ['Design Sys', 'UX'],  loc: 'New York',      img: '/images/6878ca90f80fd8b93ffc0cd1_alex.png',   color: C.red,    n: 18, spec: 'Product'     as EF, bio: 'One of the original Material Design team members. Builds design systems from scratch, leads product design for Series A/B companies.' },
]

const EVENTS = [
  { date: 'May 28', type: 'Demo Day',          title: 'Xoogler SF Demo Day',    loc: 'San Francisco, CA', desc: '10 Xoogler-founded startups pitch to 300 investors and operators. Networking dinner follows.', color: C.blue,   spots: '48 spots left',   img: '/images/66aa560baad8581f0be2b211_WhatsApp Image 2024-07-31 at 8.48.22 PM.jpeg' },
  { date: 'Jun 3',  type: "Founders' Dinner",  title: 'AI Founders Dinner NYC', loc: 'New York, NY',      desc: 'Off-the-record dinner for 30 AI founders. Private venue in Tribeca. No slides, no pitches.',  color: C.red,    spots: '12 spots left',   img: '/images/66aa5495ff11edbde0f8a518_WhatsApp Image 2024-07-31 at 8.42.24 PM.jpeg' },
  { date: 'Jun 12', type: 'Community Mixer',   title: 'London Mixer',           loc: 'London, UK',        desc: 'Casual evening for London-based Xooglers. 150+ attendees across product, engineering, VC.',   color: C.green,  spots: 'Open to members', img: '/images/66aa547f84d08a08be4ea67e_WhatsApp Image 2024-07-31 at 8.40.26 PM.jpeg' },
]

const TESTIMONIALS = [
  { quote: "The Xoogler community is one of the best groups in Silicon Valley's startup ecosystem: a curated mix of operators, investors, and advisors who actually help each other.", name: 'Qasar Younis', title: 'CEO, Applied Intuition · ex-Partner, Y Combinator', img: 'https://i.pravatar.cc/100?img=53', color: C.blue  },
  { quote: 'I met my co-founder at a Xoogler event. Six months later we closed a $4M seed round. This community delivers at every stage of the journey.',                             name: 'Anya Mercer',  title: 'Co-founder & CEO, DataLayer',                       img: 'https://i.pravatar.cc/100?img=9',  color: C.green },
  { quote: "We've engaged four Xoogler experts. Each one was exceptional. They understand scale from day one and don't waste time on fundamentals.",                                   name: 'Daniel Park',  title: 'VP Engineering, NovaTech',                          img: 'https://i.pravatar.cc/100?img=60', color: C.red   },
]

// ─── CountUp ──────────────────────────────────────────────────────────────────
function CountUp({ target, active }: { target: number; active: boolean }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const dur = 2000, t0 = Date.now()
    let raf: number
    const tick = () => {
      const t = Math.min((Date.now() - t0) / dur, 1)
      setVal(Math.round((1 - Math.pow(1 - t, 3)) * target))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target])
  if (target >= 10000) return <>{Math.floor(val / 1000)}K+</>
  if (target >= 1000)  return <>{(val / 1000).toFixed(1)}K+</>
  return <>{val}+</>
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function V2Page() {
  const [scrolled,    setScrolled]    = useState(false)
  const [heroIdx,     setHeroIdx]     = useState(0)
  const [pillarIdx,   setPillarIdx]   = useState(0)
  const [tIdx,        setTIdx]        = useState(0)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [statsActive,     setStatsActive]     = useState(false)

  const pillarsRef = useRef<HTMLDivElement>(null)
  const statsRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setHeroIdx(i => (i + 1) % HERO_IMAGES.length), 5000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const fn = () => {
      const el = pillarsRef.current
      if (!el) return
      const s = -el.getBoundingClientRect().top
      const seg = el.offsetHeight / PILLARS.length
      setPillarIdx(Math.min(PILLARS.length - 1, Math.max(0, Math.floor(s / seg))))
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setTIdx(i => (i + 1) % TESTIMONIALS.length), 4500)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsActive(true) }, { threshold: 0.3 })
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])



  const ap = PILLARS[pillarIdx]

  return (
    <div className={`${playfair.variable} ${outfit.variable}`} style={{ background: C.bg, color: C.text, fontFamily: fb }}>
      <a href="#main" className="skip-nav">Skip to main content</a>

      {/* 4-color stripe */}
      <div aria-hidden="true" style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 100,
        background: `linear-gradient(90deg, ${C.blue} 25%, ${C.red} 25% 50%, ${C.yellow} 50% 75%, ${C.green} 75%)`,
      }} />

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav aria-label="Main navigation" style={{
        position: 'fixed', top: 3, left: 0, right: 0, zIndex: 50, height: 58,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        paddingLeft: sp, paddingRight: sp,
        background: scrolled || mobileOpen ? 'rgba(6,8,16,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
        transition: 'background 0.3s, border-color 0.3s',
      }}>
        <Link href="/" aria-label="Xoogler home" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <img src="/images/xoogler-logo-3.png" alt="" aria-hidden="true" style={{ height: 30, width: 'auto' }} />
          <span style={{ fontFamily: fd, fontWeight: 700, fontSize: 19, color: C.text, letterSpacing: '-0.5px' }}>Xoogler</span>
        </Link>

        <div className="hidden md:flex items-center">
          {[['About', '#pillars'], ['Events', '#events'], ['Experts', '#experts']].map(([l, h]) => (
            <a key={l} href={h} style={{ fontSize: 14, fontWeight: 500, color: C.mid, textDecoration: 'none', padding: '6px 16px', fontFamily: fb, letterSpacing: '0.02em', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = C.text)}
              onMouseLeave={e => (e.currentTarget.style.color = C.mid)}>
              {l}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="#membership" className="hidden md:inline-flex"
            style={{ background: C.blue, color: '#fff', fontSize: 12, fontWeight: 600, padding: '8px 20px', borderRadius: 3, textDecoration: 'none', fontFamily: fb, letterSpacing: '0.03em', transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
            Apply for membership
          </a>
          <button className="md:hidden" onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            style={{ width: 36, height: 36, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 5 }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block', width: 20, height: 1.5, background: C.text, transition: 'all .25s',
                transform: i === 0 && mobileOpen ? 'rotate(45deg) translate(3px,3px)' : i === 2 && mobileOpen ? 'rotate(-45deg) translate(3px,-3px)' : 'none',
                opacity: i === 1 && mobileOpen ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className="md:hidden" style={{
        position: 'fixed', top: 61, left: 0, right: 0, bottom: 0, zIndex: 40,
        background: C.bg, paddingLeft: sp, paddingRight: sp, paddingTop: 48,
        opacity: mobileOpen ? 1 : 0, pointerEvents: mobileOpen ? 'auto' : 'none',
        transform: mobileOpen ? 'none' : 'translateY(-8px)', transition: 'all 0.3s',
      }}>
        {[['About', '#pillars'], ['Events', '#events'], ['Experts', '#experts']].map(([l, h]) => (
          <a key={l} href={h} onClick={() => setMobileOpen(false)} style={{
            display: 'block', fontFamily: fd, fontStyle: 'italic', fontSize: 36, fontWeight: 400,
            color: C.text, textDecoration: 'none', paddingTop: 18, paddingBottom: 18, borderBottom: `1px solid ${C.border}`,
          }}>{l}</a>
        ))}
        <a href="#membership" onClick={() => setMobileOpen(false)} style={{
          display: 'inline-block', marginTop: 32, background: C.blue, color: '#fff',
          fontSize: 14, fontWeight: 600, padding: '12px 28px', borderRadius: 3, textDecoration: 'none', fontFamily: fb,
        }}>Apply for membership</a>
      </div>

      <main id="main">

        {/* ══════════════════════════════════════════════════════════════
            HERO — stacked editorial: text → stats ribbon → full-bleed photo
        ══════════════════════════════════════════════════════════════ */}
        <section aria-labelledby="hero-h1" style={{ paddingTop: 61 }}>

          {/* Text block */}
          <div style={{ paddingLeft: sp, paddingRight: sp, paddingTop: 'clamp(64px, 9vw, 130px)', paddingBottom: 'clamp(36px, 5vw, 64px)' }}>

            {/* Spaced headline + network label */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.25em' }}>
              <h1 id="hero-h1" className="animate-fade-up" style={{
                fontFamily: fd, fontWeight: 900, textTransform: 'uppercase',
                fontSize: 'clamp(36px, 7.5vw, 118px)',
                letterSpacing: '0.1em', lineHeight: 1.0,
                color: C.text, margin: 0, flex: 1,
              }}>
                Still Building.
              </h1>
            </div>

            {/* Italic sub-headline */}
            <p className="animate-fade-up-d1" style={{
              fontFamily: fd, fontStyle: 'italic', fontWeight: 400,
              fontSize: 'clamp(22px, 3.8vw, 56px)',
              color: C.mid, lineHeight: 1.1, margin: 0,
              marginBottom: 'clamp(28px, 5vw, 60px)',
            }}>
              Since Google.
            </p>

            {/* Body + CTAs in same row */}
            <div className="animate-fade-up-d2" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 28 }}>
              <p style={{ fontSize: 'clamp(14px, 1.6vw, 18px)', lineHeight: 1.8, color: C.mid, fontWeight: 300, maxWidth: '46ch', margin: 0 }}>
                35,000 ex-Googlers: founders, investors, operators, engineers. One community. Apply once. Stay connected for life.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, flexShrink: 0 }}>
                <a href="#membership" style={{ background: C.blue, color: '#fff', fontSize: 13, fontWeight: 600, padding: '12px 28px', borderRadius: 3, textDecoration: 'none', fontFamily: fb, transition: 'opacity 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                  Apply for membership
                </a>
                <a href="#experts" style={{ border: `1px solid ${C.border2}`, color: C.mid, fontSize: 13, fontWeight: 500, padding: '12px 28px', borderRadius: 3, textDecoration: 'none', fontFamily: fb, transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.text; e.currentTarget.style.color = C.text }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border2; e.currentTarget.style.color = C.mid }}>
                  Meet our experts
                </a>
              </div>
            </div>
          </div>

          {/* Stats ribbon */}
          <div ref={statsRef} style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, padding: '16px 0' }}>
            <div style={{ paddingLeft: sp, paddingRight: sp, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px 0' }}>
              {[
                { target: 35000, label: 'Members worldwide', color: C.blue   },
                { target: 100,   label: 'Startups funded',   color: C.red    },
                { target: 2400,  label: 'Verified experts',  color: C.green  },
                { target: 300,   label: 'Events per year',   color: C.yellow },
              ].map((s, i) => (
                <div key={s.label} style={{ display: 'flex', alignItems: 'center' }}>
                  {i > 0 && <span style={{ fontSize: 13, color: C.subtle, padding: '0 clamp(14px, 2.5vw, 36px)' }}>·</span>}
                  <span style={{ fontFamily: fd, fontWeight: 900, fontSize: 'clamp(20px, 2.4vw, 30px)', color: s.color, letterSpacing: '-0.03em', lineHeight: 1 }}>
                    <CountUp target={s.target} active={statsActive} />
                  </span>
                  <span style={{ fontFamily: fb, fontSize: 10, color: C.mid, letterSpacing: '0.1em', textTransform: 'uppercase', marginLeft: 9 }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Full-bleed hero photo */}
          <div style={{ position: 'relative', height: 'clamp(420px, 74vh, 860px)', overflow: 'hidden' }} aria-hidden="true">
            {HERO_IMAGES.map((src, i) => (
              <div key={src} style={{ position: 'absolute', inset: 0, transition: 'opacity 1.4s ease', opacity: heroIdx === i ? 1 : 0 }}>
                <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%' }} />
              </div>
            ))}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(6,8,16,0.15) 0%, transparent 25%, transparent 75%, rgba(6,8,16,0.35) 100%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 18, right: sp, display: 'flex', gap: 6 }}>
              {HERO_IMAGES.map((_, i) => (
                <button key={i} onClick={() => setHeroIdx(i)} aria-label={`Photo ${i + 1}`} style={{
                  width: i === heroIdx ? 22 : 6, height: 6, borderRadius: 50,
                  background: i === heroIdx ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.3)',
                  border: 'none', cursor: 'pointer', transition: 'all 0.4s', padding: 0,
                }} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            COMPANIES — editorial byline band
        ══════════════════════════════════════════════════════════════ */}
        <div style={{ borderBottom: `1px solid ${C.border}`, background: C.surface, padding: '22px 0', overflow: 'clip' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ flexShrink: 0, paddingLeft: sp, paddingRight: 28, borderRight: `1px solid ${C.border}`, marginRight: 36, whiteSpace: 'nowrap' }}>
              <span style={{ fontFamily: fb, fontSize: 9, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.subtle }}>Alumni built</span>
            </div>
            <div style={{ overflow: 'clip', flex: 1 }}>
              <div className="animate-marquee" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
                {[...COMPANIES, ...COMPANIES].map((co, i) => (
                  <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 18, paddingRight: 32, fontFamily: fb, fontSize: 20, fontWeight: 500, color: C.mid, whiteSpace: 'nowrap', letterSpacing: '-0.01em' }}>
                    {co}
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: GC[i % GC.length], display: 'inline-block', opacity: 0.7 }} />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            PILLARS — scroll-driven, photo left / editorial rows right
        ══════════════════════════════════════════════════════════════ */}
        <section id="pillars" aria-labelledby="pillars-h"
          ref={pillarsRef}
          style={{ height: `${PILLARS.length * 80 + 100}vh`, position: 'relative', background: C.bg }}>

          <div className="sticky" style={{ top: 61, height: 'calc(100vh - 61px)', overflow: 'hidden' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">

              {/* Left — full-height crossfading photo */}
              <div className="hidden lg:block" style={{ position: 'relative', height: '100%' }}>
                {PILLARS.map((p, i) => (
                  <img key={p.num} src={p.img} alt={p.title} style={{
                    position: 'absolute', inset: 0, width: '100%', height: '100%',
                    objectFit: 'cover', objectPosition: 'center',
                    transition: 'opacity 0.7s ease, transform 0.7s ease',
                    opacity: pillarIdx === i ? 1 : 0,
                    transform: pillarIdx === i ? 'scale(1)' : 'scale(1.03)',
                  }} />
                ))}
                <div style={{ position: 'absolute', inset: 0, background: `${ap.color}12`, transition: 'background 0.7s', mixBlendMode: 'screen', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, transparent 60%, rgba(6,8,16,0.65) 100%), linear-gradient(to bottom, transparent 80%, rgba(6,8,16,0.3) 100%)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: 24, right: 24, textAlign: 'right' }}>
                  <p style={{ fontFamily: fb, fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: ap.color, margin: '0 0 5px', transition: 'color 0.7s' }}>{ap.date}</p>
                  <p style={{ fontFamily: fb, fontSize: 15, fontWeight: 500, color: 'rgba(255,255,255,0.85)', margin: 0, letterSpacing: '0.01em' }}>{ap.caption}</p>
                </div>
              </div>

              {/* Right — editorial rows */}
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', borderLeft: `1px solid ${C.border}` }}>

                {/* Section header row */}
                <div style={{ padding: 'clamp(24px, 3vw, 44px) clamp(24px, 3.5vw, 52px)', borderBottom: `1px solid ${C.border}`, flexShrink: 0 }}>
                  <p style={{ fontFamily: fb, fontSize: 8, letterSpacing: '0.24em', textTransform: 'uppercase', color: C.blue, marginBottom: 10, margin: '0 0 10px' }}>What We Do</p>
                  <h2 id="pillars-h" style={{
                    fontFamily: fd, fontWeight: 400, fontStyle: 'italic',
                    fontSize: 'clamp(22px, 2.6vw, 36px)',
                    color: C.text, lineHeight: 1.2, margin: 0,
                  }}>
                    Built for every path after Google.
                  </h2>
                </div>

                {/* Pillar rows — fill remaining height */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                  {PILLARS.map((p, i) => {
                    const on = pillarIdx === i
                    return (
                      <button key={p.num} onClick={() => setPillarIdx(i)}
                        aria-expanded={on}
                        style={{
                          display: 'block', width: '100%', textAlign: 'left', cursor: 'pointer',
                          padding: on
                            ? 'clamp(18px, 2.2vw, 32px) clamp(24px, 3.5vw, 52px)'
                            : 'clamp(12px, 1.5vw, 20px) clamp(24px, 3.5vw, 52px)',
                          borderBottom: i < PILLARS.length - 1 ? `1px solid ${C.border}` : 'none',
                          borderLeft: on ? `3px solid ${p.color}` : '3px solid transparent',
                          background: on ? `${p.color}07` : 'transparent',
                          flex: on ? '1 1 auto' : '0 0 auto',
                          transition: 'all 0.35s ease',
                        }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, flex: 1 }}>
                            <span style={{
                              fontFamily: fb, fontSize: 9, fontWeight: 700, letterSpacing: '0.18em',
                              textTransform: 'uppercase', color: on ? p.color : C.subtle,
                              transition: 'color 0.35s', flexShrink: 0,
                            }}>{p.num}</span>
                            <h3 style={{
                              fontFamily: on ? fd : fb,
                              fontStyle: on ? 'italic' : 'normal',
                              fontSize: on ? 'clamp(22px, 2.6vw, 34px)' : 13,
                              fontWeight: on ? 400 : 500,
                              color: on ? C.text : C.mid,
                              margin: 0, lineHeight: 1.25, transition: 'all 0.35s ease',
                            }}>{p.title}</h3>
                          </div>
                          <span style={{ fontFamily: fb, fontSize: 22, color: on ? p.color : C.subtle, flexShrink: 0, lineHeight: 1, transition: 'color 0.35s' }}>
                            {on ? '−' : '+'}
                          </span>
                        </div>
                        {on && (
                          <div style={{ paddingTop: 14, paddingLeft: 'calc(9px + 14px)' }}>
                            <p style={{ fontSize: 13, lineHeight: 1.8, color: C.mid, fontFamily: fb, maxWidth: '44ch', margin: 0 }}>
                              {p.desc}
                            </p>
                          </div>
                        )}
                      </button>
                    )
                  })}
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            EXPERTS — editorial roster rows
        ══════════════════════════════════════════════════════════════ */}
        <section id="experts" aria-labelledby="experts-h"
          style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: `80px ${sp}` }}>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 40 }}>
            <div>
              <p style={{ fontFamily: fb, fontSize: 8, letterSpacing: '0.24em', textTransform: 'uppercase', color: C.green, margin: '0 0 12px' }}>Expert Marketplace</p>
              <h2 id="experts-h" style={{ fontFamily: fd, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.3px', color: C.text, lineHeight: 1.1, margin: 0 }}>
                Google-pedigree talent.
              </h2>
            </div>
            <a href="#" style={{ fontSize: 12, fontWeight: 600, color: C.text, textDecoration: 'none', fontFamily: fb, whiteSpace: 'nowrap', letterSpacing: '0.04em', border: `1px solid ${C.border2}`, padding: '10px 20px', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.text; e.currentTarget.style.background = `${C.text}08` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border2; e.currentTarget.style.background = 'transparent' }}>
              Browse all experts →
            </a>
          </div>

          {/* Photo cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: 12 }}>
            {EXPERTS.map(e => (
              <article key={e.name} style={{ background: C.card, overflow: 'hidden', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
                onMouseEnter={ev => { const img = ev.currentTarget.querySelector('.xp-photo') as HTMLElement | null; if (img) img.style.transform = 'scale(1.05)' }}
                onMouseLeave={ev => { const img = ev.currentTarget.querySelector('.xp-photo') as HTMLElement | null; if (img) img.style.transform = 'scale(1)' }}>

                {/* Photo */}
                <div style={{ height: 260, background: '#EDEAE5', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                  <img className="xp-photo" src={e.img} alt={e.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 15%', transition: 'transform 0.55s ease', display: 'block' }} />
                  {/* Verified badge */}
                  <div style={{ position: 'absolute', top: 12, left: 12, display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: 'rgba(6,8,16,0.82)', backdropFilter: 'blur(4px)', border: `1px solid ${e.color}44` }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: e.color, display: 'inline-block' }} />
                    <span style={{ fontFamily: fb, fontSize: 9, fontWeight: 700, color: '#fff', letterSpacing: '0.06em' }}>Verified</span>
                  </div>
                  {/* Spec tag */}
                  <div style={{ position: 'absolute', bottom: 12, right: 12 }}>
                    <span style={{ fontFamily: fb, fontSize: 9, fontWeight: 700, padding: '3px 9px', background: e.color, color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{e.spec}</span>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '18px 18px 0', flex: 1 }}>
                  <p style={{ fontFamily: fb, fontWeight: 700, fontSize: 16, color: C.text, margin: '0 0 3px', letterSpacing: '-0.01em', lineHeight: 1.2 }}>{e.name}</p>
                  <p style={{ fontFamily: fb, fontSize: 12, color: C.mid, margin: '0 0 2px' }}>{e.role}</p>
                  <p style={{ fontFamily: fb, fontSize: 11, color: C.subtle, margin: '0 0 12px', letterSpacing: '0.02em' }}>{e.co} · {e.yrs} · {e.loc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {e.tags.map(t => (
                      <span key={t} style={{ fontSize: 10, padding: '3px 8px', background: `${e.color}18`, color: e.color, fontFamily: fb, fontWeight: 600, letterSpacing: '0.03em' }}>{t}</span>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div style={{ padding: '14px 18px 16px', marginTop: 14, borderTop: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: fb, fontSize: 11, color: C.mid }}>
                    Advised <span style={{ fontWeight: 700, color: C.text }}>{e.n}</span> companies
                  </span>
                  <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700, color: e.color, textDecoration: 'none', fontFamily: fb, transition: 'opacity 0.2s' }}
                    onMouseEnter={ev => (ev.currentTarget.style.opacity = '0.7')}
                    onMouseLeave={ev => (ev.currentTarget.style.opacity = '1')}>
                    Request intro
                    <svg width="10" height="10" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M2 7h10M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            EVENTS — editorial mixed grid: 1 feature + 2 stacked
        ══════════════════════════════════════════════════════════════ */}
        <section id="events" aria-labelledby="events-h"
          style={{ background: C.bg, borderTop: `1px solid ${C.border}`, padding: `80px ${sp}` }}>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 40, flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontFamily: fb, fontSize: 8, letterSpacing: '0.24em', textTransform: 'uppercase', color: C.red, marginBottom: 12, margin: '0 0 12px' }}>Community Events</p>
              <h2 id="events-h" style={{ fontFamily: fd, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.3px', color: C.text, lineHeight: 1.1, margin: 0 }}>
                Where the community gathers.
              </h2>
            </div>
            <a href="#" style={{ fontSize: 12, fontWeight: 600, color: C.text, textDecoration: 'none', fontFamily: fb, whiteSpace: 'nowrap', letterSpacing: '0.04em', border: `1px solid ${C.border2}`, padding: '10px 20px', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.text; e.currentTarget.style.background = `${C.text}08` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border2; e.currentTarget.style.background = 'transparent' }}>
              View all events →
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]" style={{ gap: 3 }}>

            {/* Feature event */}
            <article style={{ position: 'relative', overflow: 'hidden', cursor: 'pointer', background: C.card, display: 'block' }}
              onMouseEnter={e => { const img = e.currentTarget.querySelector('img') as HTMLImageElement | null; if (img) img.style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { const img = e.currentTarget.querySelector('img') as HTMLImageElement | null; if (img) img.style.transform = 'scale(1)' }}>
              <div style={{ height: 'clamp(280px, 46vw, 540px)', overflow: 'hidden', position: 'relative' }}>
                <img src={EVENTS[0].img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.65s ease' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.82) 100%)' }} />
                <div style={{ position: 'absolute', inset: 0, padding: 'clamp(20px, 2.5vw, 36px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: fb, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', padding: '4px 10px', border: '1px solid rgba(255,255,255,0.2)' }}>
                      {EVENTS[0].type}
                    </span>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: EVENTS[0].color, display: 'block', boxShadow: `0 0 0 3px ${EVENTS[0].color}30` }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: fd, fontWeight: 900, fontSize: 'clamp(40px, 6vw, 80px)', color: '#fff', lineHeight: 1.0, margin: '0 0 8px', letterSpacing: '-0.02em' }}>
                      {EVENTS[0].date}
                    </p>
                    <p style={{ fontFamily: fb, fontWeight: 600, fontSize: 'clamp(16px, 1.8vw, 22px)', color: 'rgba(255,255,255,0.95)', margin: '0 0 6px', letterSpacing: '-0.01em' }}>
                      {EVENTS[0].title}
                    </p>
                    <p style={{ fontFamily: fb, fontSize: 12, color: 'rgba(255,255,255,0.5)', margin: '0 0 18px' }}>{EVENTS[0].loc}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <span style={{ fontSize: 11, padding: '5px 12px', background: EVENTS[0].color, color: '#fff', fontFamily: fb, fontWeight: 600, letterSpacing: '0.03em' }}>
                        {EVENTS[0].spots}
                      </span>
                      <a href="#" style={{ fontSize: 12, fontWeight: 600, color: '#fff', textDecoration: 'none', fontFamily: fb, letterSpacing: '0.04em' }}>RSVP →</a>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Two stacked smaller events */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {EVENTS.slice(1).map(ev => (
                <article key={ev.title} style={{ flex: 1, position: 'relative', overflow: 'hidden', cursor: 'pointer', background: C.card }}
                  onMouseEnter={e => { const img = e.currentTarget.querySelector('img') as HTMLImageElement | null; if (img) img.style.transform = 'scale(1.05)' }}
                  onMouseLeave={e => { const img = e.currentTarget.querySelector('img') as HTMLImageElement | null; if (img) img.style.transform = 'scale(1)' }}>
                  <div style={{ height: 'clamp(130px, 21vw, 265px)', overflow: 'hidden', position: 'relative' }}>
                    <img src={ev.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.65s ease' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.8) 100%)' }} />
                    <div style={{ position: 'absolute', inset: 0, padding: 'clamp(14px, 1.8vw, 20px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ fontFamily: fb, fontSize: 8, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', padding: '3px 8px', border: '1px solid rgba(255,255,255,0.15)' }}>{ev.type}</span>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: ev.color, display: 'block' }} />
                      </div>
                      <div>
                        <p style={{ fontFamily: fd, fontWeight: 900, fontSize: 'clamp(24px, 3.2vw, 44px)', color: '#fff', lineHeight: 1, margin: '0 0 4px', letterSpacing: '-0.01em' }}>{ev.date}</p>
                        <p style={{ fontFamily: fb, fontWeight: 600, fontSize: 'clamp(13px, 1.4vw, 17px)', color: 'rgba(255,255,255,0.9)', margin: '0 0 6px', letterSpacing: '-0.01em' }}>{ev.title}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <span style={{ fontFamily: fb, fontSize: 10, color: 'rgba(255,255,255,0.45)' }}>{ev.loc}</span>
                          <span style={{ fontSize: 10, padding: '3px 8px', background: ev.color, color: '#fff', fontFamily: fb, fontWeight: 600 }}>{ev.spots}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            TESTIMONIALS — three cards, cycling active state
        ══════════════════════════════════════════════════════════════ */}
        <section aria-label="Member stories"
          style={{ background: C.surface, borderTop: `1px solid ${C.border}`, padding: `80px ${sp}` }}>

          {/* 4-color rule */}
          <div style={{ display: 'flex', height: 2, marginBottom: 56 }}>
            {GC.map(c => <div key={c} style={{ flex: 1, background: c }} />)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 16, alignItems: 'stretch' }}>
            {TESTIMONIALS.map((t, i) => {
              const active = tIdx === i
              return (
                <div key={t.name} onClick={() => setTIdx(i)} style={{
                  position: 'relative',
                  background: active ? C.card : 'transparent',
                  border: `1px solid ${active ? t.color + '55' : C.border}`,
                  borderTop: `2px solid ${active ? t.color : C.border}`,
                  padding: 'clamp(24px, 2.5vw, 36px)',
                  cursor: 'pointer',
                  opacity: active ? 1 : 0.5,
                  transform: active ? 'scale(1.025) translateY(-4px)' : 'scale(1) translateY(0)',
                  transition: 'all 0.55s cubic-bezier(0.4, 0, 0.2, 1)',
                  zIndex: active ? 1 : 0,
                  display: 'flex', flexDirection: 'column',
                }}>
                  <span style={{ fontFamily: fb, fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', color: active ? t.color : C.subtle, textTransform: 'uppercase', display: 'block', marginBottom: 20, transition: 'color 0.55s' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <blockquote style={{ margin: '0 0 28px', flex: 1 }}>
                    <p style={{
                      fontFamily: fd, fontStyle: 'italic', fontWeight: 400,
                      fontSize: 'clamp(18px, 1.9vw, 26px)',
                      color: C.text, lineHeight: 1.6, margin: 0,
                    }}>
                      "{t.quote}"
                    </p>
                  </blockquote>
                  <div style={{ borderTop: `1px solid ${active ? t.color + '30' : C.border}`, paddingTop: 18, transition: 'border-color 0.55s' }}>
                    <p style={{ fontFamily: fb, fontWeight: 700, fontSize: 13, color: C.text, margin: '0 0 3px' }}>{t.name}</p>
                    <p style={{ fontFamily: fb, fontSize: 11, color: C.mid, margin: 0 }}>{t.title}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            MEMBERSHIP CTA
        ══════════════════════════════════════════════════════════════ */}
        <section id="membership" aria-labelledby="member-h"
          style={{ background: C.bg, borderTop: `1px solid ${C.border}`, padding: `96px ${sp}` }}>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr]" style={{ gap: 'clamp(48px, 6vw, 96px)', alignItems: 'center' }}>

            <div>
              <p style={{ fontFamily: fb, fontSize: 8, letterSpacing: '0.24em', textTransform: 'uppercase', color: C.blue, margin: '0 0 20px' }}>Membership</p>
              <h2 id="member-h" style={{
                fontFamily: fd, fontWeight: 900, textTransform: 'uppercase',
                fontSize: 'clamp(44px, 7.5vw, 104px)',
                letterSpacing: '0.06em', lineHeight: 0.95,
                color: C.text, margin: '0 0 0.4em',
              }}>
                Your<br />next<br />chapter.
              </h2>
              <p style={{ fontFamily: fd, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(16px, 2vw, 22px)', lineHeight: 1.65, color: C.mid, maxWidth: '28ch', margin: 0 }}>
                Join 35,000+ Xooglers who kept Google's spirit alive and built something new with it.
              </p>
            </div>

            <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 'clamp(28px, 4vw, 52px)' }}>
              <p style={{ fontFamily: fd, fontStyle: 'italic', fontWeight: 400, fontSize: 'clamp(18px, 2vw, 24px)', color: C.text, lineHeight: 1.55, margin: '0 0 32px' }}>
                Doesn't matter if you were there six months or sixteen years. You worked at Google. That's it.
              </p>

              <div style={{ borderTop: `1px solid ${C.border}`, marginBottom: 36 }}>
                {[
                  { dot: C.blue,   text: 'Any Google or Alphabet role, any year, any tenure'              },
                  { dot: C.green,  text: 'Every event, forum, and expert intro in one place'              },
                  { dot: C.yellow, text: 'Syndicate access: 100+ startups backed and counting'            },
                  { dot: C.red,    text: 'Free to join, always'                                           },
                ].map(item => (
                  <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: `1px solid ${C.border}` }}>
                    <span style={{ width: 5, height: 5, borderRadius: '50%', background: item.dot, display: 'inline-block', flexShrink: 0 }} />
                    <p style={{ fontSize: 13, color: C.mid, fontFamily: fb, lineHeight: 1.5, margin: 0 }}>{item.text}</p>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 28 }}>
                <a href="#" style={{ background: C.blue, color: '#fff', fontSize: 13, fontWeight: 600, padding: '12px 28px', borderRadius: 3, textDecoration: 'none', fontFamily: fb, transition: 'opacity 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                  Apply for membership
                </a>
                <a href="#pillars" style={{ border: `1px solid ${C.border2}`, color: C.mid, fontSize: 13, fontWeight: 500, padding: '12px 28px', borderRadius: 3, textDecoration: 'none', fontFamily: fb, transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.text; e.currentTarget.style.color = C.text }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border2; e.currentTarget.style.color = C.mid }}>
                  See how it works
                </a>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 14, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
                <div style={{ display: 'flex', gap: 5, flexShrink: 0 }}>
                  {GC.map(c => <span key={c} style={{ width: 5, height: 5, borderRadius: '50%', background: c, display: 'inline-block' }} />)}
                </div>
                <p style={{ fontSize: 12, color: C.mid, fontFamily: fb, margin: 0 }}>
                  <span style={{ fontWeight: 600, color: C.text }}>35,000 members</span> across 50+ countries
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer role="contentinfo" style={{ background: '#030408', borderTop: `1px solid ${C.border}`, padding: `52px ${sp} 36px` }}>
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr]" style={{ gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <img src="/images/xoogler-logo-3.png" alt="" aria-hidden="true" style={{ height: 26, width: 'auto' }} />
              <span style={{ fontFamily: fd, fontWeight: 700, fontSize: 17, color: C.text, letterSpacing: '-0.4px' }}>Xoogler</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.75, color: C.mid, maxWidth: 250, fontFamily: fb, fontWeight: 300, margin: 0 }}>
              The global community keeping Google's spirit alive, connecting founders, investors, and operators.
            </p>
          </div>
          {[['Community', ['About', 'Events', 'Experts', 'Investment', 'Blog']], ['Legal', ['Privacy Policy', 'Terms of Service', 'Cookie Policy']]].map(([heading, links]) => (
            <nav key={heading as string} aria-label={`${heading} links`}>
              <h3 style={{ fontFamily: fb, fontSize: 8, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.subtle, margin: '0 0 16px' }}>{heading}</h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {(links as string[]).map(l => (
                  <li key={l} style={{ marginBottom: 10 }}>
                    <a href="#" style={{ fontSize: 13, color: C.mid, textDecoration: 'none', fontFamily: fb, transition: 'color 0.2s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = C.text)}
                      onMouseLeave={e => (e.currentTarget.style.color = C.mid)}>{l}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
          <p style={{ fontSize: 11, color: C.subtle, fontFamily: fb, margin: 0 }}>© 2026 Xoogler. All rights reserved. A Network Institute company.</p>
          <div style={{ display: 'flex', gap: 6 }} role="list" aria-label="Social links">
            {[['LinkedIn', 'in'], ['X (Twitter)', 'X'], ['Instagram', 'IG'], ['YouTube', 'YT']].map(([label, abbr]) => (
              <a key={label} href="#" aria-label={`Xoogler on ${label}`} style={{
                width: 30, height: 30, border: `1px solid ${C.border}`, color: C.subtle,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 600, textDecoration: 'none', fontFamily: fb, transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.text; e.currentTarget.style.color = C.text }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.subtle }}>
                {abbr}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
