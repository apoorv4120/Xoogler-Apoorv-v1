'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { Calendar } from 'lucide-react'

const GS  = "'Google Sans', 'Nunito', sans-serif"
const GST = "'Google Sans Text', 'Nunito', sans-serif"

const C = {
  bg:     '#FAFAF7',
  white:  '#FFFFFF',
  dark:   '#3D3D3A',
  mid:    '#5C5C58',
  muted:  '#9A9A96',
  border: '#E0E0DA',
  blue:   '#4285F4',
  red:    '#EA4335',
  yellow: '#FBBC05',
  green:  '#34A853',
}

const sp   = 'clamp(28px, 5vw, 88px)'
const elev1 = '0 1px 3px rgba(14,14,12,.07), 0 4px 12px rgba(14,14,12,.05)'
const elev2 = '0 8px 24px rgba(14,14,12,.14), 0 24px 56px rgba(14,14,12,.10)'

// ── Data ─────────────────────────────────────────────────────────

// Hero gallery — add more images to either column as the library grows
const COL1_IMGS = [
  '/images/0c795c2c-e4b9-4c28-a627-93d96074b29b.webp',
  '/images/xoogler-v3.jpg',
  '/images/1748101997106.jpeg',
  '/images/66aa547f84d08a08be4ea67e_WhatsApp%20Image%202024-07-31%20at%208.40.26%20PM.jpeg',
  '/images/66aa560baad8581f0be2b211_WhatsApp%20Image%202024-07-31%20at%208.48.22%20PM.jpeg',
  '/images/21dfe91b-bda8-481b-874f-0cd44b9f8ba2.avif',
  '/images/IMG_2391.JPG.webp',
  '/images/66c5d9627bbcc549e2635862_Frame%20427322829.png',
]
const COL2_IMGS = [
  '/images/5943b6085d3e4e023318e9a1.webp',
  '/images/105172840-xoogle-3406.jpg',
  '/images/66c5b2dc534cb23d570df069_Container.png',
  '/images/66aa5495ff11edbde0f8a518_WhatsApp%20Image%202024-07-31%20at%208.42.24%20PM.jpeg',
  '/images/66aa04c88664b0bff6c25c6f_Frame%207.png',
  '/images/8d9702b1-2fb3-4768-a97c-f9eccbd7b7a3.avif',
  '/images/e1403304-daa5-498c-88d9-bb22506c73cd.avif',
]

const PORTFOLIO_ROW1 = [
  { company: 'Neeva',              logo: '/images/logo-neeva.png',               domain: 'neeva.com'            },
  { company: 'Applied Intuition',  logo: '/images/logo-applied-intuition.png',  domain: 'appliedintuition.com' },
  { company: 'Sierra',             logo: '/images/logo-sierra.webp',            domain: 'sierra.ai'            },
  { company: 'Palo Alto Networks', logo: '/images/logo-palo-alto.webp',         domain: 'paloaltonetworks.com' },
]
const PORTFOLIO_ROW2 = [
  { company: 'Impossible Foods', logo: '/images/logo-impossible-foods.png', domain: 'impossiblefoods.com' },
  { company: 'Dialpad',          logo: '/images/logo-dialpad.png',          domain: 'dialpad.com'         },
  { company: 'Waymo',            logo: '/images/logo-waymo.png',            domain: 'waymo.com'           },
  { company: 'YouTube',          logo: '/images/logo-youtube.png',          domain: 'youtube.com'         },
  { company: 'Coursera',         logo: '/images/logo-coursera.png',         domain: 'coursera.org'        },
  { company: 'Figma',            logo: '/images/logo-figma.png',            domain: 'figma.com'           },
]

const STATS = [
  { target: 35,   suffix: 'K+', label: 'Community members',  sub: 'verified ex-Googlers',  color: C.blue   },
  { target: 300,  suffix: '+',  label: 'Events organised',   sub: 'and counting',           color: C.red    },
  { target: 100,  suffix: '+',  label: 'Startups got funded', sub: 'backed by the network', color: C.green  },
  { target: 1000, suffix: '+',  label: 'People found jobs',  sub: 'through the community',  color: C.yellow },
]

const PILLARS = [
  {
    num: '01', color: C.blue,
    title: 'Network & Connect',
    desc: 'Join 35,000 Google alumni across 50+ countries. Founders, operators, investors, and engineers who shipped products used by billions, still in each other\'s corner.',
    stat: 'Active in 50+ countries',
    img: '/images/0c795c2c-e4b9-4c28-a627-93d96074b29b.webp',
    caption: { event: 'Xoogler Global Meetup', location: 'San Francisco, CA', date: 'Mar 2024' },
  },
  {
    num: '02', color: C.red,
    title: 'Launch & Get Funded',
    desc: 'Capital from people who understand what great looks like. Our 2,000-member investment syndicate and two Xoogler venture funds have backed 100+ startups from idea to Series B.',
    stat: '$2B+ raised by members',
    img: '/images/5943b6085d3e4e023318e9a1.webp',
    caption: { event: 'Xoogler Demo Day', location: 'San Francisco, CA', date: 'Sep 2024' },
  },
  {
    num: '03', color: C.green,
    title: 'Access Expert Talent',
    desc: 'Connect with verified Google-pedigree consultants, advisors, and fractional hires. Every expert vetted against their Google record and matched to your exact needs in days, not months.',
    stat: '2,000+ verified experts',
    img: '/images/66c5b2dc534cb23d570df069_Container.png',
    caption: { event: 'Expert Network Dinner', location: 'Mountain View, CA', date: 'Nov 2023' },
  },
  {
    num: '04', color: C.yellow,
    title: 'Grow & Learn Together',
    desc: '300+ events per year: intimate dinners to city-wide summits. Workshops, mentorship roundtables, and deep dives led by operators who\'ve scaled things most people only read about.',
    stat: '300+ events every year',
    img: '/images/1748101997106.jpeg',
    caption: { event: 'Xoogler Annual Summit', location: 'New York, NY', date: 'Oct 2024' },
  },
]

const EXPERT_FILTERS = ['All', 'Product', 'Engineering', 'Growth', 'Finance'] as const
type ExpertFilter = typeof EXPERT_FILTERS[number]

const EXPERTS = [
  {
    name: 'Alex Papageorgiou',    role: 'GTM & Digital Strategy',       pedigree: 'ex-Googler · Verified',
    tags: ['GTM', 'Strategy'],        loc: 'Greece',
    color: C.blue,   specialty: 'Growth' as ExpertFilter,
    img: '/images/6878ca90f80fd8b93ffc0cd1_alex.png',
  },
  {
    name: 'Anna Buber',           role: 'Leadership & Growth',           pedigree: 'ex-Googler · Verified',
    tags: ['Growth', 'Talent'],       loc: 'Sydney, Australia',
    color: C.red,    specialty: 'Growth' as ExpertFilter,
    img: '/images/6876436ec73737b6194f5498_anna.png',
  },
  {
    name: 'Christopher Fong',     role: 'Venture Capital & Fundraising', pedigree: 'ex-Googler · Verified',
    tags: ['VC', 'Fundraising'],      loc: 'Mountain View, CA',
    color: C.green,  specialty: 'Finance' as ExpertFilter,
    img: '/images/6876436e3ef841143ac37617_chris.avif',
  },
  {
    name: 'Stef',                 role: 'Product & GTM',                 pedigree: 'ex-Googler · Verified',
    tags: ['Product', 'GTM'],         loc: 'Hong Kong',
    color: C.yellow, specialty: 'Product' as ExpertFilter,
    img: '/images/6876412cd46ddb6d9b49e242_stef.png',
  },
  {
    name: 'Jennifer Howard',      role: 'AI & Modern GTM',               pedigree: 'ex-Googler · Verified',
    tags: ['AI', 'GTM'],              loc: 'Sydney, Australia',
    color: C.blue,   specialty: 'Growth' as ExpertFilter,
    img: '/images/6878cbdbf737e017fa39a846_terry.png',
  },
  {
    name: 'Kushagra Shrivastava', role: 'VC & Marketing Strategy',       pedigree: 'ex-Googler · Verified',
    tags: ['VC', 'Strategy'],         loc: 'Menlo Park, CA',
    color: C.red,    specialty: 'Finance' as ExpertFilter,
    img: '/images/6878f44be051d68c7d51a740_32887d7cc93b148779525b094d2676b4_kushagrah.avif',
  },
  {
    name: 'Maggie Ma',            role: 'GTM & Product Marketing',       pedigree: 'ex-Googler · Verified',
    tags: ['GTM', 'AI & Emerging'],   loc: 'San Jose, CA',
    color: C.green,  specialty: 'Growth' as ExpertFilter,
    img: '/images/6878cb2ecb155650880f947a_maggie.png',
  },
  {
    name: 'Sal Mohammed',         role: 'AEO & Search Expert',           pedigree: 'ex-Googler · Verified',
    tags: ['AEO', 'SEO'],             loc: 'London, UK',
    color: C.yellow, specialty: 'Engineering' as ExpertFilter,
    img: '/images/6876436e52f3de30547676b8_sal.png',
  },
]

const EVENTS = [
  {
    date: 'May 28', type: 'Demo Day',
    title: 'Xoogler SF Demo Day',
    location: 'San Francisco, CA',
    desc: '10 Xoogler-founded startups pitch to 300 investors and operators. Open Q&A and networking dinner to follow.',
    color: C.blue,  spots: '48 spots left',
    img: '/images/105172840-xoogle-3406.jpg',
  },
  {
    date: 'Jun 3',  type: "Founders' Dinner",
    title: 'AI Founders Dinner NYC',
    location: 'New York, NY',
    desc: 'An intimate off-the-record dinner for 30 AI founders. Hosted at a private venue in Tribeca. No slides, no pitches.',
    color: C.red,   spots: '12 spots left',
    img: '/images/1748101997106.jpeg',
  },
  {
    date: 'Jun 12', type: 'Community Mixer',
    title: 'Xoogler London Mixer',
    location: 'London, UK',
    desc: 'Casual evening for London-based Xooglers and guests. 150+ attendees across product, engineering, and VC.',
    color: C.green, spots: 'Open to members',
    img: '/images/xoogler-v3.jpg',
  },
]

const TESTIMONIALS = [
  {
    quote: "The Xoogler community is one of the best groups in Silicon Valley startup ecosystem. For nearly 10 years, members have used it as a springboard into startups or founding something themselves. Invaluable!",
    name: 'Qasar Younis', title: 'Applied Intuition, Partner Y Combinator',
    color: C.blue, img: '/images/test1.jpeg' as string | null,
  },
  {
    quote: "The Xoogler community is a testament to the power of shared values and ambition. We look forward to seeing the next generation of global entrepreneurial leaders emerging from this very community. We are fans and appreciate the partnership!",
    name: 'Shiho Watabe', title: 'CEO, Shibuya Startups KK',
    color: C.green, img: '/images/test2.jpeg' as string | null,
  },
]

// ── PortfolioCard ────────────────────────────────────────────────

type PortfolioEntry = { company: string; logo: string | null; domain: string }

function PortfolioCard({ co }: { co: PortfolioEntry }) {
  const [useFallback, setUseFallback] = useState(false)
  const src = co.logo ?? `https://logo.clearbit.com/${co.domain}`

  return (
    <div style={{
      flexShrink: 0, marginRight: 32,
      background: C.white,
      borderRadius: 16,
      padding: '0 40px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: 80, minWidth: 220,
      boxShadow: elev1,
    }}>
      {useFallback ? (
        <span style={{ fontFamily: GS, fontWeight: 700, fontSize: 14, color: '#202124', whiteSpace: 'nowrap' }}>
          {co.company}
        </span>
      ) : (
        <img
          src={src}
          alt={co.company}
          style={{ maxHeight: 34, maxWidth: 160, objectFit: 'contain' }}
          onError={() => setUseFallback(true)}
        />
      )}
    </div>
  )
}

// ── Reveal (scroll-triggered fade-up) ───────────────────────────

function Reveal({
  children, delay = 0, className, style: extra,
}: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.12 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? 'none' : 'translateY(40px) scale(0.95)',
      transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      ...extra,
    }}>
      {children}
    </div>
  )
}

// ── InitialAvatar ────────────────────────────────────────────────

function initials(name: string) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

function InitialAvatar({ name, color, size, style }: { name: string; color: string; size: number; style?: React.CSSProperties }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `${color}22`, border: `2px solid ${color}44`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, ...style,
    }}>
      <span style={{ fontFamily: "'Google Sans', sans-serif", fontWeight: 700, fontSize: size * 0.38, color, lineHeight: 1 }}>
        {initials(name)}
      </span>
    </div>
  )
}

// ── PersonPhoto ──────────────────────────────────────────────────

function PersonPhoto({ name, img, size, style }: { name: string; img: string | null; size: number; style?: React.CSSProperties }) {
  if (img) {
    return (
      <img src={img} alt={name}
        style={{ width: size, height: size, borderRadius: '50%', objectFit: 'cover', objectPosition: 'top', flexShrink: 0, ...style }} />
    )
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: '#232321', flexShrink: 0, overflow: 'hidden',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      ...style,
    }}>
      {/* Silhouette */}
      <svg viewBox="0 0 60 60" style={{ width: '70%' }} aria-hidden="true">
        <ellipse cx="30" cy="22" rx="12" ry="13" fill="#3A3A38" />
        <ellipse cx="30" cy="58" rx="22" ry="18" fill="#3A3A38" />
      </svg>
    </div>
  )
}

// ── StatNumber ───────────────────────────────────────────────────

function StatNumber({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const dur = 1800, t0 = Date.now()
    let raf: number
    const tick = () => {
      const t = Math.min((Date.now() - t0) / dur, 1)
      setVal(Math.round((1 - Math.pow(1 - t, 3)) * target))
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target])
  return <>{val}{suffix}</>
}

// ── Page ─────────────────────────────────────────────────────────

export default function V1Page() {
  const [scrolled,     setScrolled]     = useState(false)
  const [pillarIdx,    setPillarIdx]    = useState(0)
  const [statsOn,      setStatsOn]      = useState(false)
  const [expertsOn,    setExpertsOn]    = useState(false)
const [tIdx,         setTIdx]         = useState(0)
  const [tFade,        setTFade]        = useState(true)
  const [mobileOpen,   setMobileOpen]   = useState(false)

  const pillarsRef = useRef<HTMLDivElement>(null)
  const statsRef   = useRef<HTMLDivElement>(null)
  const expertsRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const fn = () => {
      const el = pillarsRef.current
      if (!el) return
      const scrolled = -el.getBoundingClientRect().top
      const seg = el.offsetHeight / PILLARS.length
      setPillarIdx(Math.min(PILLARS.length - 1, Math.max(0, Math.floor(scrolled / seg))))
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsOn(true) },
      { threshold: 0.3 }
    )
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setExpertsOn(true) },
      { threshold: 0.1 }
    )
    if (expertsRef.current) obs.observe(expertsRef.current)
    return () => obs.disconnect()
  }, [])

  // Close mobile menu on desktop resize
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMobileOpen(false) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  const goToT = useCallback((i: number) => {
    setTFade(false)
    setTimeout(() => { setTIdx(i); setTFade(true) }, 320)
  }, [])

  useEffect(() => {
    const id = setInterval(() => goToT((tIdx + 1) % TESTIMONIALS.length), 6000)
    return () => clearInterval(id)
  }, [tIdx, goToT])

  const ap = PILLARS[pillarIdx]
const NAV_LINKS = [
    { label: 'About',   href: '#whatwedo' },
    { label: 'Events',  href: '#events'   },
    { label: 'Experts', href: '#experts'  },
  ]

  return (
    <div style={{ background: C.bg, color: C.dark, fontFamily: GST }}>
      <a href="#main" className="skip-nav">Skip to main content</a>

      {/* ── Nav ──────────────────────────────────────────────── */}
      <nav
        className="fixed inset-x-0 z-50 flex items-center justify-between transition-all duration-300"
        style={{
          top: 0, height: 60,
          paddingLeft: sp, paddingRight: sp,
          background: scrolled || mobileOpen ? 'rgba(250,250,247,0.97)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
        }}
        aria-label="Main navigation">

        <Link href="/" aria-label="Xoogler home" className="flex items-center gap-2" style={{ textDecoration: 'none' }}>
          <img src="/images/xoogler-logo-1.png" alt="" aria-hidden="true" style={{ width: 28, height: 28, objectFit: 'contain' }} />
          <span style={{ fontFamily: GS, fontWeight: 700, fontSize: 18, color: C.dark }}>Xoogler</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(l => (
            <a key={l.label} href={l.href}
              className="rounded-full transition-colors hover:bg-black/5"
              style={{ fontSize: 14, fontWeight: 500, color: C.mid, textDecoration: 'none', padding: '6px 14px', fontFamily: GST }}>
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a href="#join"
            className="hidden md:inline-block transition-all hover:bg-[#1557D6] hover:shadow-md"
            style={{ background: C.blue, color: '#fff', fontSize: 14, fontWeight: 500, padding: '9px 22px', borderRadius: 50, textDecoration: 'none', fontFamily: GS }}>
            Join the community
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col justify-center items-center"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            style={{ width: 36, height: 36, gap: 5, background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}>
            <span style={{ display: 'block', width: 18, height: 1.5, background: C.dark, transition: 'all .25s', transform: mobileOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none' }} />
            <span style={{ display: 'block', width: 18, height: 1.5, background: C.dark, transition: 'all .25s', opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 18, height: 1.5, background: C.dark, transition: 'all .25s', transform: mobileOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* ── Mobile menu ──────────────────────────────────────── */}
      <div
        className="md:hidden fixed inset-x-0 z-40 flex flex-col transition-all duration-300"
        style={{
          top: 60,
          bottom: 0,
          background: C.bg,
          paddingLeft: sp, paddingRight: sp, paddingTop: 32,
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'auto' : 'none',
          transform: mobileOpen ? 'translateY(0)' : 'translateY(-8px)',
        }}>
        {NAV_LINKS.map(l => (
          <a key={l.label} href={l.href}
            onClick={() => setMobileOpen(false)}
            style={{ fontFamily: GS, fontSize: 36, fontWeight: 700, color: C.dark, textDecoration: 'none', paddingTop: 20, paddingBottom: 20, borderBottom: `1px solid ${C.border}`, display: 'block' }}>
            {l.label}
          </a>
        ))}
        <a href="#join"
          onClick={() => setMobileOpen(false)}
          style={{ display: 'inline-block', marginTop: 32, background: C.blue, color: '#fff', fontSize: 16, fontWeight: 500, padding: '14px 32px', borderRadius: 50, textDecoration: 'none', fontFamily: GS, alignSelf: 'flex-start' }}>
          Join the community
        </a>
      </div>

      <main id="main">

        {/* ═══════════════════════════════════════════════════════
            HERO — left text / right two-column scrolling gallery
        ════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="hero-headline"
          className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] lg:h-screen"
          style={{ marginTop: 0 }}>

          {/* Left — text */}
          <div
            className="flex flex-col justify-center pt-24 lg:pt-[72px]"
            style={{ paddingLeft: sp, paddingRight: 'clamp(20px, 3vw, 56px)', paddingBottom: 48 }}>

            <h1 id="hero-headline" className="animate-fade-up-d1"
              style={{
                fontFamily: GS,
                fontSize: 'clamp(44px, 5.5vw, 88px)',
                fontWeight: 700,
                lineHeight: 1.02,
                letterSpacing: '-2.5px',
                color: C.dark,
                marginBottom: '0.45em',
              }}>
              Where ex-Googlers<br />
              never stop<br />
              <span className="text-gradient-g">building.</span>
            </h1>

            <p className="animate-fade-up-d2"
              style={{ fontSize: 18, lineHeight: 1.75, color: C.mid, maxWidth: 420, marginBottom: 36, fontFamily: GST }}>
              35,000 founders, investors, and operators still building together after Google.
            </p>

            <div className="animate-fade-up-d3 flex flex-wrap gap-3">
              <a href="#join"
                className="transition-all hover:bg-[#1557D6] hover:shadow-lg"
                style={{ background: C.blue, color: '#fff', fontSize: 15, fontWeight: 500, padding: '13px 30px', borderRadius: 50, textDecoration: 'none', fontFamily: GS }}>
                Join the community
              </a>
              <a href="#experts"
                className="transition-all hover:bg-black/5"
                style={{ border: `1.5px solid ${C.border}`, color: C.dark, fontSize: 15, fontWeight: 500, padding: '13px 30px', borderRadius: 50, textDecoration: 'none', fontFamily: GS }}>
                Meet our experts
              </a>
            </div>
          </div>

          {/* Mobile gallery — two horizontal scrolling rows */}
          <div aria-hidden="true" className="lg:hidden relative overflow-hidden" style={{ paddingBottom: 40 }}>
            {/* Left/right edge fades */}
            <div className="absolute inset-y-0 left-0 z-10 pointer-events-none"
              style={{ width: 48, background: `linear-gradient(to right, ${C.bg}, transparent)` }} />
            <div className="absolute inset-y-0 right-0 z-10 pointer-events-none"
              style={{ width: 48, background: `linear-gradient(to left, ${C.bg}, transparent)` }} />

            {/* Row 1 — scrolls left */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 10, animation: 'marquee 28s linear infinite', width: 'max-content' }}>
              {[...COL1_IMGS, ...COL1_IMGS].map((src, i) => (
                <div key={i} style={{ width: 130, height: 104, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>

            {/* Row 2 — scrolls right */}
            <div style={{ display: 'flex', gap: 10, animation: 'marqueeReverse 34s linear infinite', width: 'max-content' }}>
              {[...COL2_IMGS, ...COL2_IMGS].map((src, i) => (
                <div key={i} style={{ width: 130, height: 104, borderRadius: 12, overflow: 'hidden', flexShrink: 0 }}>
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Right — two-column scrolling community gallery */}
          <div aria-hidden="true"
            className="hidden lg:flex gap-3 relative overflow-hidden"
            style={{ height: '100%', padding: '0 24px 0 8px' }}>

            {/* Top fade */}
            <div className="absolute inset-x-0 top-0 z-10 pointer-events-none"
              style={{ height: 160, background: `linear-gradient(to bottom, ${C.bg} 20%, transparent 100%)` }} />
            {/* Bottom fade */}
            <div className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
              style={{ height: 160, background: `linear-gradient(to top, ${C.bg} 20%, transparent 100%)` }} />

            {/* Column 1 — scrolls upward */}
            <div className="flex-1 flex flex-col"
              style={{ animation: 'scrollUp 28s linear infinite', willChange: 'transform' }}>
              {[...COL1_IMGS, ...COL1_IMGS].map((src, i) => (
                <div key={i} className="overflow-hidden flex-shrink-0" style={{ borderRadius: 16, aspectRatio: '4/5', marginBottom: 12 }}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Column 2 — scrolls downward */}
            <div className="flex-1 flex flex-col"
              style={{ animation: 'scrollDown 34s linear infinite', willChange: 'transform' }}>
              {[...COL2_IMGS, ...COL2_IMGS].map((src, i) => (
                <div key={i} className="overflow-hidden flex-shrink-0" style={{ borderRadius: 16, aspectRatio: '4/5', marginBottom: 12 }}>
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            STATS — numbers with context, asymmetric weight
        ════════════════════════════════════════════════════════ */}
        <section aria-label="Community statistics" ref={statsRef}
          style={{ background: '#06080C', position: 'relative', overflow: 'hidden' }}>

          {/* Ambient color orbs — blue → red → yellow → green, left to right */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            <div style={{ position: 'absolute', top: '50%', left: '-5%',  transform: 'translateY(-50%)', width: '36vw', height: '36vw', borderRadius: '50%', background: C.blue,   opacity: 0.17, filter: 'blur(100px)' }} />
            <div style={{ position: 'absolute', top: '50%', left: '22%',  transform: 'translateY(-50%)', width: '30vw', height: '30vw', borderRadius: '50%', background: C.red,    opacity: 0.12, filter: 'blur(120px)' }} />
            <div style={{ position: 'absolute', top: '50%', left: '50%',  transform: 'translateY(-50%)', width: '28vw', height: '28vw', borderRadius: '50%', background: C.yellow, opacity: 0.09, filter: 'blur(120px)' }} />
            <div style={{ position: 'absolute', top: '50%', right: '-5%', transform: 'translateY(-50%)', width: '36vw', height: '36vw', borderRadius: '50%', background: C.green,  opacity: 0.12, filter: 'blur(100px)' }} />
          </div>

          <div style={{ paddingTop: 56, paddingBottom: 0, paddingLeft: sp, paddingRight: sp, position: 'relative' }}>
            <dl className="grid grid-cols-2 md:grid-cols-4">
              {STATS.map((s, i) => (
                <div key={s.label}
                  style={{
                    textAlign: 'center',
                    padding: '12px 24px 40px',
                    borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                    opacity: statsOn ? 1 : 0,
                    transform: statsOn ? 'none' : 'translateY(36px) scale(0.93)',
                    transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.1}s`,
                  }}>
                  <dd style={{
                    fontFamily: GS,
                    fontSize: 'clamp(56px, 6vw, 88px)',
                    fontWeight: 700,
                    color: s.color,
                    lineHeight: 1,
                    letterSpacing: '-2px',
                  }}>
                    <StatNumber target={s.target} suffix={s.suffix} active={statsOn} />
                  </dd>
                  <dt style={{ fontFamily: GS, fontSize: 14, fontWeight: 600, color: '#C0C0BC', marginTop: 8 }}>{s.label}</dt>
                  <p style={{ fontSize: 12, color: '#909090', fontFamily: GST, marginTop: 3 }}>{s.sub}</p>
                </div>
              ))}
            </dl>
          </div>

        </section>

        {/* ═══════════════════════════════════════════════════════
            WHAT WE DO — scroll accordion, 75vh per pillar
        ════════════════════════════════════════════════════════ */}
        <section
          id="whatwedo"
          aria-labelledby="whatwedo-heading"
          ref={pillarsRef}
          style={{ height: `${PILLARS.length * 100 + 150}vh`, position: 'relative', background: C.bg }}>

          <div
            className="sticky overflow-hidden"
            style={{ top: 60, height: 'calc(100vh - 60px)' }}>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full">

              {/* Left — accordion */}
              <div
                className="flex flex-col justify-center"
                style={{ paddingLeft: sp, paddingRight: 'clamp(24px, 4vw, 72px)', paddingTop: 32, paddingBottom: 32 }}>

                <p style={{ fontSize: 11, fontWeight: 700, color: C.blue, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 14, fontFamily: GST }}>
                  What we do
                </p>
                <h2 id="whatwedo-heading"
                  style={{ fontFamily: GS, fontSize: 'clamp(28px, 3vw, 44px)', fontWeight: 700, letterSpacing: '-0.5px', color: C.dark, marginBottom: 32, lineHeight: 1.1 }}>
                  Built for every Xoogler path.
                </h2>

                <div>
                  {PILLARS.map((p, i) => {
                    const on = pillarIdx === i
                    return (
                      <button key={p.num}
                        onClick={() => setPillarIdx(i)}
                        className="w-full text-left"
                        style={{
                          display: 'block',
                          background: 'transparent',
                          borderTop: '1px solid rgba(14,14,12,0.08)',
                          borderLeft: 'none',
                          borderRight: 'none',
                          borderBottom: 'none',
                          padding: on ? '22px 0' : '14px 0',
                          cursor: 'pointer',
                          transition: 'padding 0.4s ease',
                          width: '100%',
                        }}>
                        <span style={{
                          display: 'block',
                          fontSize: 11,
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          fontFamily: GS,
                          color: on ? p.color : `${p.color}55`,
                          marginBottom: 6,
                          transition: 'color 0.4s',
                        }}>
                          {p.num}
                        </span>
                        <h3 style={{
                          fontFamily: GS,
                          fontSize: on ? 'clamp(22px, 2.4vw, 30px)' : 13,
                          fontWeight: on ? 700 : 400,
                          color: on ? C.dark : C.muted,
                          margin: 0,
                          lineHeight: 1.15,
                          letterSpacing: on ? '-0.5px' : '0',
                          transition: 'all 0.4s ease',
                        }}>
                          {p.title}
                        </h3>
                        {on && (
                          <div style={{ paddingTop: 14 }}>
                            <p style={{ fontSize: 14, lineHeight: 1.75, color: C.mid, fontFamily: GST, marginBottom: 20, maxWidth: 420 }}>
                              {p.desc}
                            </p>
                            <p style={{ fontFamily: GS, fontSize: 22, fontWeight: 700, color: p.color, letterSpacing: '-0.5px', lineHeight: 1 }}>
                              {p.stat}
                            </p>
                            {/* Mobile-only inline image */}
                            <div className="lg:hidden" style={{ marginTop: 20, borderRadius: 16, overflow: 'hidden', position: 'relative', aspectRatio: '16/9' }}>
                              <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                              <div style={{ position: 'absolute', inset: 0, background: `${p.color}22`, mixBlendMode: 'multiply' }} />
                              <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
                                <div style={{
                                  display: 'inline-flex', flexDirection: 'column', gap: 4,
                                  padding: '10px 14px', borderRadius: 10,
                                  background: 'rgba(0,0,0,0.62)',
                                  backdropFilter: 'blur(18px)', WebkitBackdropFilter: 'blur(18px)',
                                  border: '1px solid rgba(255,255,255,0.12)',
                                }}>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                    <Calendar size={10} color={p.color} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                                    <span style={{ fontFamily: GST, fontWeight: 600, fontSize: 10, color: p.color, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1 }}>{p.caption.date}</span>
                                  </span>
                                  <span style={{ fontFamily: GS, fontWeight: 700, fontSize: 13, color: '#fff', lineHeight: 1.2 }}>{p.caption.event}</span>
                                  <span style={{ fontFamily: GST, fontSize: 10, color: 'rgba(255,255,255,0.55)', lineHeight: 1.2 }}>{p.caption.location}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </button>
                    )
                  })}
                  <div style={{ borderTop: '1px solid rgba(14,14,12,0.08)' }} />
                </div>

                {/* Scroll progress */}
                <div className="flex items-center" style={{ gap: 6, marginTop: 24 }}>
                  {PILLARS.map((p, i) => (
                    <button key={i} onClick={() => setPillarIdx(i)}
                      aria-label={`Go to ${p.title}`}
                      style={{ width: i === pillarIdx ? 24 : 6, height: 6, borderRadius: 50, background: i === pillarIdx ? ap.color : C.border, border: 'none', cursor: 'pointer', transition: 'all 0.35s ease', padding: 0 }} />
                  ))}
                </div>
              </div>

              {/* Right — image, bleeds to edge */}
              <div className="hidden lg:block relative overflow-hidden" style={{ height: '100%' }}>
                {PILLARS.map((p, i) => (
                  <img key={p.num} src={p.img} alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                    style={{ opacity: pillarIdx === i ? 1 : 0, transform: pillarIdx === i ? 'scale(1)' : 'scale(1.04)' }} />
                ))}
                <div
                  className="absolute inset-0 pointer-events-none transition-all duration-700"
                  style={{ background: `${ap.color}22`, mixBlendMode: 'multiply' }} />

                {/* Caption chip */}
                <div
                  className="absolute pointer-events-none transition-all duration-500"
                  style={{ bottom: 24, left: 24, opacity: 1 }}>
                  <div style={{
                    display: 'inline-flex', flexDirection: 'column', gap: 6,
                    padding: '12px 16px',
                    borderRadius: 12,
                    background: 'rgba(0, 0, 0, 0.62)',
                    backdropFilter: 'blur(18px)',
                    WebkitBackdropFilter: 'blur(18px)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Calendar size={11} color={ap.color} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                      <span style={{ fontFamily: GST, fontWeight: 600, fontSize: 11, color: ap.color, letterSpacing: '0.08em', textTransform: 'uppercase', lineHeight: 1 }}>
                        {ap.caption.date}
                      </span>
                    </span>
                    <span style={{ fontFamily: GS, fontWeight: 700, fontSize: 14, color: '#fff', lineHeight: 1.2 }}>
                      {ap.caption.event}
                    </span>
                    <span style={{ fontFamily: GST, fontSize: 11, color: 'rgba(255,255,255,0.55)', lineHeight: 1.2 }}>
                      {ap.caption.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            PORTFOLIO — two-row scrolling company logos
        ════════════════════════════════════════════════════════ */}
        <section aria-labelledby="portfolio-heading"
          style={{ background: C.bg, paddingTop: 72, paddingBottom: 72, overflow: 'hidden' }}>

          {/* Header */}
          <Reveal style={{ paddingLeft: sp, paddingRight: sp, marginBottom: 48 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: C.blue, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10, fontFamily: GST }}>
              Community Portfolio
            </p>
            <h2 id="portfolio-heading"
              style={{ fontFamily: GS, fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 700, letterSpacing: '-1px', color: C.dark, lineHeight: 1.1, whiteSpace: 'nowrap' }}>
              From Google to <span className="text-gradient-g">what's next.</span>
            </h2>
            <p style={{ fontSize: 15, color: C.mid, fontFamily: GST, marginTop: 12, maxWidth: 480 }}>
              Xooglers have gone on to found and lead some of the world's most consequential companies.
            </p>
          </Reveal>

          {/* Row 1 — scrolls left */}
          <div className="overflow-x-clip" style={{ marginBottom: 20 }}>
            <div className="marquee-track animate-marquee" style={{ animationDuration: '36s' }}>
              {[...PORTFOLIO_ROW1, ...PORTFOLIO_ROW1].map((co, i) => (
                <PortfolioCard key={i} co={co} />
              ))}
            </div>
          </div>

          {/* Row 2 — scrolls right */}
          <div className="overflow-x-clip">
            <div className="marquee-track animate-marquee-reverse" style={{ animationDuration: '40s' }}>
              {[...PORTFOLIO_ROW2, ...PORTFOLIO_ROW2].map((co, i) => (
                <PortfolioCard key={i} co={co} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            EVENTS — photo headers, descriptions, no eyebrow
        ════════════════════════════════════════════════════════ */}
        <section id="events" aria-labelledby="events-heading"
          style={{ background: C.bg, paddingTop: 80, paddingBottom: 80, paddingLeft: sp, paddingRight: sp }}>

          {/* Header — split layout, no eyebrow label */}
          <Reveal className="flex flex-wrap items-end justify-between" style={{ gap: 16, marginBottom: 48 }}>
            <h2 id="events-heading"
              style={{ fontFamily: GS, fontSize: 'clamp(32px, 4vw, 60px)', fontWeight: 700, letterSpacing: '-1.5px', color: C.dark, lineHeight: 1.0, margin: 0 }}>
              Where the<br />community meets.
            </h2>
            <div className="flex flex-wrap items-center" style={{ gap: 20 }}>
              <a href="https://calendar.google.com/calendar/ical/xoogler.co_events%40group.calendar.google.com/public/basic.ics"
                className="flex items-center gap-2 transition-all hover:bg-[#1557D6] hover:shadow-md"
                style={{
                  fontSize: 13, fontWeight: 600, color: '#fff', textDecoration: 'none', fontFamily: GS,
                  background: C.blue, borderRadius: 50, padding: '10px 20px',
                }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <rect x="1" y="2" width="11" height="10" rx="2" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M1 5h11" stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M4 1v2M9 1v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
                Subscribe to calendar
              </a>
              <a href="#"
                className="flex items-center gap-1 transition-colors hover:text-[#1557D6]"
                style={{ fontSize: 14, fontWeight: 500, color: C.blue, textDecoration: 'none', fontFamily: GS }}>
                View all events →
              </a>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 16 }}>
            {EVENTS.map((ev, i) => (
              <Reveal key={ev.title} delay={i * 0.1}>
              <article
                className="rounded-2xl overflow-hidden bg-white group cursor-pointer transition-all duration-300 hover:-translate-y-1"
                style={{ boxShadow: elev1 }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = elev2)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = elev1)}>

                {/* Photo header with date overlay */}
                <div style={{ height: 160, position: 'relative', overflow: 'hidden' }}>
                  <img src={ev.img} alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,.15) 0%, rgba(0,0,0,.65) 100%)' }} />
                  <div style={{ position: 'absolute', bottom: 16, left: 20, right: 20 }}>
                    <p style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.14em', fontFamily: GS, marginBottom: 2 }}>
                      {ev.type}
                    </p>
                    <p style={{ fontFamily: GS, fontSize: 30, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{ev.date}</p>
                  </div>
                  <div style={{ position: 'absolute', top: 14, right: 16, display: 'flex', gap: 3 }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: ev.color, display: 'block', boxShadow: '0 0 0 2px rgba(255,255,255,0.4)' }} />
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding: '20px 24px 24px' }}>
                  <h3 style={{ fontFamily: GS, fontSize: 15, fontWeight: 700, color: C.dark, marginBottom: 4 }}>{ev.title}</h3>
                  <p style={{ fontSize: 12, color: C.mid, fontFamily: GST, marginBottom: 10 }}>{ev.location}</p>
                  <p style={{ fontSize: 13, color: C.mid, lineHeight: 1.6, fontFamily: GST, marginBottom: 16 }}>{ev.desc}</p>
                  <div className="flex items-center justify-between">
                    <span style={{ display: 'inline-block', fontSize: 12, padding: '4px 12px', borderRadius: 50, background: `${ev.color}14`, color: ev.color, fontFamily: GS, fontWeight: 600 }}>
                      {ev.spots}
                    </span>
                    <a href="#"
                      style={{ fontSize: 13, fontWeight: 600, color: ev.color, textDecoration: 'none', fontFamily: GS }}>
                      RSVP →
                    </a>
                  </div>
                </div>
              </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            EXPERT MARKETPLACE
        ════════════════════════════════════════════════════════ */}
        <section id="experts" aria-labelledby="experts-heading"
          ref={expertsRef as React.RefObject<HTMLElement>}
          style={{ background: C.bg, paddingTop: 80, paddingBottom: 80, paddingLeft: sp, paddingRight: sp }}>

          <Reveal className="flex flex-wrap items-end justify-between" style={{ gap: 16, marginBottom: 36 }}>
            <div>
              <p style={{ fontSize: 11, fontWeight: 700, color: C.blue, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 8, fontFamily: GST }}>
                Expert Marketplace
              </p>
              <h2 id="experts-heading"
                style={{ fontFamily: GS, fontSize: 'clamp(28px, 3.5vw, 52px)', fontWeight: 700, letterSpacing: '-1px', color: C.dark, lineHeight: 1.1 }}>
                Connect with <span className="text-gradient-g">Google-pedigree</span> experts.
              </h2>
            </div>
            <a href="#"
              className="transition-colors hover:text-[#1557D6]"
              style={{ fontSize: 14, fontWeight: 500, color: C.blue, textDecoration: 'none', fontFamily: GST, whiteSpace: 'nowrap' }}>
              Browse all experts →
            </a>
          </Reveal>

          <div className="grid grid-cols-2 lg:grid-cols-4" style={{ gap: 16 }}>
            {EXPERTS.map((e, i) => (
              <article key={e.name}
                className="rounded-2xl overflow-hidden bg-white group cursor-pointer transition-all duration-300 hover:-translate-y-1"
                style={{
                  boxShadow: elev1,
                  opacity: expertsOn ? 1 : 0,
                  transform: expertsOn ? 'none' : 'translateY(40px) scale(0.94)',
                  transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${i * 0.08}s, box-shadow 0.2s`,
                }}
                onMouseEnter={ev => (ev.currentTarget.style.boxShadow = elev2)}
                onMouseLeave={ev => (ev.currentTarget.style.boxShadow = elev1)}>

                <div style={{ aspectRatio: '1/1', overflow: 'hidden', position: 'relative', background: e.img ? '#f0f0ee' : `linear-gradient(145deg, ${e.color}18 0%, ${e.color}08 100%)` }}>
                  {e.img ? (
                    <img src={e.img} alt={e.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                  ) : (
                    <>
                      {/* Watermark initials */}
                      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ fontFamily: "'Google Sans', sans-serif", fontWeight: 700, fontSize: 128, color: e.color, opacity: 0.07, lineHeight: 1, userSelect: 'none', letterSpacing: '-6px' }}>
                          {initials(e.name)}
                        </span>
                      </div>
                      {/* Centered monogram circle */}
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ width: 80, height: 80, borderRadius: '50%', background: `${e.color}1A`, border: `2px solid ${e.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontFamily: "'Google Sans', sans-serif", fontWeight: 700, fontSize: 28, color: e.color, lineHeight: 1 }}>
                            {initials(e.name)}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                  {/* Verified badge */}
                  <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 50, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)' }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                      <circle cx="5" cy="5" r="5" fill={e.color} />
                      <path d="M3 5.2l1.3 1.3L7 3.5" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: 11, fontWeight: 700, color: C.dark, fontFamily: GS }}>Verified</span>
                  </div>
                </div>

                <div style={{ padding: '20px 20px 0' }}>
                  <p style={{ fontWeight: 700, fontSize: 16, color: C.dark, fontFamily: GS, marginBottom: 2 }}>{e.name}</p>
                  <p style={{ fontSize: 14, color: C.mid, fontFamily: GST, marginBottom: 4 }}>{e.role}</p>
                  <p style={{ fontSize: 12, color: C.muted, fontFamily: GST, marginBottom: 20 }}>ex-Googler</p>
                </div>

                <div style={{ padding: '14px 20px 20px', borderTop: `1px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p style={{ fontSize: 12, color: C.muted, fontFamily: GST }}>{e.loc}</p>
                  <a href="#"
                    style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 600, color: e.color, textDecoration: 'none', fontFamily: GS }}>
                    Connect
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                      <path d="M2 7h10M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                </div>
              </article>
            ))}

          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            TESTIMONIALS — photo bg, split layout, strong active
        ════════════════════════════════════════════════════════ */}
        <section aria-label="Member stories"
          style={{ position: 'relative', overflow: 'hidden', paddingTop: 96, paddingBottom: 96 }}>

          {/* Blurred community photo background */}
          <div aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
            <img src="/images/0c795c2c-e4b9-4c28-a627-93d96074b29b.webp" alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover',
                       filter: 'blur(28px) brightness(0.13) saturate(0.6)',
                       transform: 'scale(1.06)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,9,0.72)' }} />
          </div>

          {/* Ambient color glow — shifts with active person */}
          <div aria-hidden="true" style={{
            position: 'absolute', top: '50%', right: '-8%',
            width: '50vw', height: '50vw', borderRadius: '50%',
            backgroundColor: TESTIMONIALS[tIdx].color,
            opacity: 0.15, filter: 'blur(100px)',
            transform: 'translateY(-50%)',
            transition: 'background-color 0.9s ease', pointerEvents: 'none',
          }} />

          {/* Section heading */}
          <div style={{ paddingLeft: sp, paddingRight: sp, marginBottom: 64, position: 'relative' }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: C.blue, letterSpacing: '0.16em',
                         textTransform: 'uppercase', fontFamily: GST, marginBottom: 12 }}>
              Member Stories
            </p>
            <h2 style={{ fontFamily: GS, fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700,
                          letterSpacing: '-1px', color: '#fff', lineHeight: 1.1, margin: 0 }}>
              What the community says.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[4fr_6fr]"
            style={{ paddingLeft: sp, paddingRight: sp,
                     gap: 'clamp(40px, 5vw, 96px)', alignItems: 'flex-start', position: 'relative' }}>

            {/* ── Left: person switcher — fixed anatomy, no layout shift ── */}
            <div role="tablist" aria-label="Testimonials">
              {TESTIMONIALS.map((t, i) => {
                const active = i === tIdx
                return (
                  <button key={t.name}
                    role="tab" aria-selected={active}
                    onClick={() => goToT(i)}
                    className="w-full text-left"
                    style={{
                      background: active ? `${t.color}14` : 'transparent',
                      border: 'none', cursor: 'pointer',
                      borderRadius: 10,
                      padding: '20px 24px',
                      display: 'flex', alignItems: 'center', gap: 20,
                      width: '100%', marginBottom: 6,
                      transition: 'background 0.35s ease, border-color 0.35s ease',
                    }}>

                    {/* Avatar — fixed 64px wrapper; only opacity + ring change */}
                    <div style={{ position: 'relative', flexShrink: 0, width: 64, height: 64 }}>
                      <PersonPhoto
                        name={t.name} img={t.img} size={64}
                        style={{ opacity: active ? 1 : 0.28, transition: 'opacity 0.35s ease' }} />
                      {/* SVG arc timer — remounts on tIdx change to restart animation */}
                      {active && (
                        <svg key={tIdx} viewBox="0 0 84 84" aria-hidden="true"
                          style={{ position: 'absolute', top: -10, left: -10, width: 84, height: 84, pointerEvents: 'none' }}>
                          {/* Track */}
                          <circle cx="42" cy="42" r="38" fill="none"
                            stroke={t.color} strokeWidth="1.5" opacity="0.15"
                            strokeDasharray="238.8" />
                          {/* Animated fill */}
                          <circle cx="42" cy="42" r="38" fill="none"
                            stroke={t.color} strokeWidth="1.5" strokeLinecap="round"
                            strokeDasharray="238.8" strokeDashoffset="238.8"
                            style={{ animation: 'ringFill 6s linear forwards',
                                     transform: 'rotate(-90deg)', transformOrigin: '42px 42px' }} />
                        </svg>
                      )}
                    </div>

                    {/* Text — both lines always rendered, stable height */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontFamily: GS, fontWeight: 700, fontSize: 17,
                        color: active ? '#fff' : '#3A3A38',
                        marginBottom: 4,
                        transition: 'color 0.35s ease',
                      }}>
                        {t.name}
                      </p>
                      <p style={{
                        fontSize: 13, fontFamily: GST,
                        color: active ? '#9A9A98' : '#252523',
                        transition: 'color 0.35s ease',
                        lineHeight: 1.4,
                      }}>
                        {t.title}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* ── Right: quote — grid stack, all panels rendered, container = tallest ── */}
            <div style={{ display: 'grid' }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} style={{
                  gridArea: '1 / 1',
                  opacity: tFade && i === tIdx ? 1 : 0,
                  transform: tFade && i === tIdx ? 'none' : 'translateY(10px)',
                  transition: 'opacity 0.38s ease, transform 0.38s ease',
                  pointerEvents: i === tIdx ? 'auto' : 'none',
                }}>
                  <div aria-hidden="true" style={{
                    fontFamily: GS, fontWeight: 700,
                    fontSize: 'clamp(64px, 8vw, 96px)',
                    lineHeight: 0.8,
                    color: t.color,
                    marginBottom: 16,
                    userSelect: 'none',
                  }}>
                    &ldquo;
                  </div>
                  <blockquote style={{ margin: 0 }}>
                    <p style={{
                      fontFamily: GS, fontSize: 'clamp(20px, 2.2vw, 30px)',
                      fontWeight: 400, lineHeight: 1.65,
                      color: '#E8E8E2', letterSpacing: '-0.2px', margin: 0,
                    }}>
                      {t.quote}
                    </p>
                    <footer style={{ marginTop: 28 }}>
                      <p style={{ fontFamily: GS, fontWeight: 600, fontSize: 15, color: '#fff', marginBottom: 2 }}>
                        {t.name}
                      </p>
                      <p style={{ fontFamily: GST, fontSize: 13, color: '#5A5A58' }}>
                        {t.title}
                      </p>
                    </footer>
                  </blockquote>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════
            CTA — light mode
        ════════════════════════════════════════════════════════ */}
        <section id="join" aria-labelledby="join-heading"
          style={{ background: C.bg, paddingTop: 96, paddingBottom: 96, paddingLeft: sp, paddingRight: sp }}>

          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr]"
            style={{ gap: 'clamp(40px, 6vw, 96px)', alignItems: 'center' }}>

            {/* Left — big headline */}
            <Reveal>
            <h2 id="join-heading"
              style={{
                fontFamily: GS,
                fontSize: 'clamp(48px, 6.5vw, 104px)',
                fontWeight: 700,
                letterSpacing: '-3px',
                color: C.dark,
                lineHeight: 0.93,
                margin: 0,
              }}>
              Your next<br />chapter<br />starts here.
            </h2>
            </Reveal>

            {/* Right — copy + CTAs */}
            <Reveal delay={0.15}>
            <div>
              <p style={{ color: C.mid, fontSize: 17, lineHeight: 1.75, fontFamily: GST, marginBottom: 36 }}>
                Join 35,000+ Googlers who kept the spirit alive and built something new.
              </p>

              <div className="flex flex-wrap" style={{ gap: 12, marginBottom: 40 }}>
                <a href="#"
                  className="transition-all hover:bg-[#1557D6] hover:shadow-lg"
                  style={{ background: C.blue, color: '#fff', fontSize: 15, fontWeight: 600, padding: '14px 36px', borderRadius: 50, textDecoration: 'none', fontFamily: GS }}>
                  Join the community
                </a>
                <a href="#events"
                  className="transition-all hover:bg-black/5"
                  style={{ border: `1.5px solid ${C.border}`, color: C.dark, fontSize: 15, fontWeight: 500, padding: '14px 36px', borderRadius: 50, textDecoration: 'none', fontFamily: GS }}>
                  Browse events
                </a>
              </div>

              {/* Social proof — real member photos */}
              <div className="flex items-center" style={{ gap: 12 }}>
                <div className="flex -space-x-2">
                  {[
                    '/images/test1.jpeg',
                    '/images/test2.jpeg',
                    '/images/6876436ec73737b6194f5498_anna.png',
                    '/images/6876436e3ef841143ac37617_chris.avif',
                    '/images/6878ca90f80fd8b93ffc0cd1_alex.png',
                  ].map((src, i) => (
                    <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', border: `2px solid ${C.border}`, overflow: 'hidden', flexShrink: 0 }}>
                      <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 13, color: C.muted, fontFamily: GST }}>
                  <span style={{ fontWeight: 700, color: C.dark }}>35K+ members</span> · free to join
                </p>
              </div>
            </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer role="contentinfo"
        style={{ background: '#06080C', position: 'relative', overflow: 'hidden', paddingTop: 56, paddingBottom: 56, paddingLeft: sp, paddingRight: sp }}>

        {/* Ambient color orbs — blue → red → yellow → green, left to right */}
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{ position: 'absolute', top: '50%', left: '-5%',  transform: 'translateY(-50%)', width: '36vw', height: '36vw', borderRadius: '50%', background: C.blue,   opacity: 0.12, filter: 'blur(100px)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '22%',  transform: 'translateY(-50%)', width: '30vw', height: '30vw', borderRadius: '50%', background: C.red,    opacity: 0.08, filter: 'blur(120px)' }} />
          <div style={{ position: 'absolute', top: '50%', left: '50%',  transform: 'translateY(-50%)', width: '28vw', height: '28vw', borderRadius: '50%', background: C.yellow, opacity: 0.06, filter: 'blur(120px)' }} />
          <div style={{ position: 'absolute', top: '50%', right: '-5%', transform: 'translateY(-50%)', width: '36vw', height: '36vw', borderRadius: '50%', background: C.green,  opacity: 0.08, filter: 'blur(100px)' }} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr]" style={{ gap: 40, marginBottom: 48, position: 'relative' }}>
          <div>
            <div className="flex items-center" style={{ gap: 8, marginBottom: 20 }}>
              <img src="/images/xoogler-logo-1.png" alt="" aria-hidden="true" style={{ width: 24, height: 24, objectFit: 'contain' }} />
              <span style={{ fontFamily: GS, fontWeight: 700, fontSize: 17, color: '#fff' }}>Xoogler</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.75, color: '#6A6A68', maxWidth: 280, fontFamily: GST }}>
              The global community keeping the spirit alive, connecting founders, investors, and operators building what's next.
            </p>
          </div>
          <nav aria-label="Community links">
            <h3 style={{ fontSize: 11, fontWeight: 700, color: '#4A4A48', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16, fontFamily: GST }}>Community</h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {['About', 'Events', 'Experts', 'Investment', 'Blog'].map(l => (
                <li key={l} style={{ marginBottom: 10 }}>
                  <a href="#" className="transition-colors hover:text-white"
                    style={{ fontSize: 14, color: '#5A5A58', textDecoration: 'none', fontFamily: GST }}>{l}</a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Legal links">
            <h3 style={{ fontSize: 11, fontWeight: 700, color: '#4A4A48', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 16, fontFamily: GST }}>Legal</h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(l => (
                <li key={l} style={{ marginBottom: 10 }}>
                  <a href="#" className="transition-colors hover:text-white"
                    style={{ fontSize: 14, color: '#5A5A58', textDecoration: 'none', fontFamily: GST }}>{l}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center" style={{ gap: 16, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)', position: 'relative' }}>
          <p style={{ fontSize: 12, color: '#5A5A58', fontFamily: GST }}>
            © 2026 Xoogler. All rights reserved. A Network Institute company.
          </p>
          <div className="flex" style={{ gap: 10 }} role="list" aria-label="Social media links">
            {[{ label: 'LinkedIn', abbr: 'in' }, { label: 'X', abbr: 'X' }, { label: 'Instagram', abbr: 'IG' }, { label: 'YouTube', abbr: 'YT' }].map(s => (
              <a key={s.label} href="#" aria-label={`Xoogler on ${s.label}`}
                className="transition-colors hover:bg-white/10 hover:text-white"
                style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid #2A2A28', color: '#5A5A58', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600, textDecoration: 'none', fontFamily: GS }}>
                {s.abbr}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
