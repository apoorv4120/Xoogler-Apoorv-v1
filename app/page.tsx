import Link from 'next/link'

export default function IndexPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0B', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '8px' }}>
        {['#4285F4','#EA4335','#FBBC05','#34A853'].map(c => (
          <span key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c, display: 'inline-block' }} />
        ))}
      </div>
      <h1 style={{ color: '#fff', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '0.5rem', textAlign: 'center' }}>
        Xoogler Redesign
      </h1>
      <p style={{ color: '#71717a', marginBottom: '3rem', textAlign: 'center', fontSize: 16 }}>
        Two variations for Chris — pick one to explore
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', width: '100%', maxWidth: '640px' }}>
        <Link href="/v1" style={{ display: 'block', textDecoration: 'none', borderRadius: 16, overflow: 'hidden', border: '1px solid #27272a', transition: 'transform 0.2s, box-shadow 0.2s' }}>
          <div style={{ background: '#fff', padding: '2rem' }}>
            <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
              {['#4285F4','#EA4335','#FBBC05','#34A853'].map(c => (
                <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'inline-block' }} />
              ))}
            </div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#4285F4', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>Version 1</p>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#202124', lineHeight: 1.2, marginBottom: 8, letterSpacing: '-0.5px' }}>The Network</h2>
            <p style={{ fontSize: 13, color: '#5F6368', lineHeight: 1.6 }}>Google full-color palette. Community-scale hero. Stats front and center. Warm and approachable.</p>
          </div>
          <div style={{ background: '#202124', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: '#9AA0A6' }}>Light theme</span>
            <span style={{ color: '#4285F4', fontSize: 20 }}>→</span>
          </div>
        </Link>

        <Link href="/v2" style={{ display: 'block', textDecoration: 'none', borderRadius: 16, overflow: 'hidden', border: '1px solid #27272a', transition: 'transform 0.2s, box-shadow 0.2s' }}>
          <div style={{ background: '#09090B', padding: '2rem', border: '1px solid #18181b' }}>
            <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
              {['#4285F4','#EA4335','#FBBC05','#34A853'].map(c => (
                <span key={c} style={{ width: 10, height: 3, borderRadius: 2, background: c, display: 'inline-block' }} />
              ))}
            </div>
            <p style={{ fontSize: 11, fontWeight: 700, color: '#4285F4', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 8 }}>Version 2</p>
            <h2 style={{ fontSize: 22, fontWeight: 900, color: '#fff', lineHeight: 1.2, marginBottom: 8, letterSpacing: '-0.5px' }}>The Prestige</h2>
            <p style={{ fontSize: 13, color: '#71717a', lineHeight: 1.6 }}>Dark premium theme. Prestige-first hero. Audience segmentation. Google accents as precision signals.</p>
          </div>
          <div style={{ background: '#111113', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #27272a' }}>
            <span style={{ fontSize: 13, color: '#52525b' }}>Dark theme</span>
            <span style={{ color: '#4285F4', fontSize: 20 }}>→</span>
          </div>
        </Link>
      </div>
    </main>
  )
}
