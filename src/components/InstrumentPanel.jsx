import { useState, useEffect, Suspense, lazy } from 'react'
import { Canvas } from '@react-three/fiber'

// Lazy load the 3D scene to split bundle and allow fallback
const PowerGridScene = lazy(() => import('./PowerGridScene'))

const InstrumentPanel = () => {
  const [stats, setStats] = useState({ nodes: 0, edges: 0, pulses: 0 })
  const [bootStep, setBootStep] = useState(0)

  // Loading sequence
  useEffect(() => {
    const s1 = setTimeout(() => setBootStep(1), 500)
    const s2 = setTimeout(() => setBootStep(2), 900)
    const s3 = setTimeout(() => setBootStep(3), 1300)
    const s4 = setTimeout(() => setBootStep(4), 1900)
    return () => { clearTimeout(s1); clearTimeout(s2); clearTimeout(s3); clearTimeout(s4); }
  }, [])

  return (
    <div className="relative border border-brand-bright/60 bg-[#080C0A] overflow-hidden rounded-sm">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-brand-bright/30 bg-brand-bright/5 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-bright animate-pulse" />
          <span className="text-brand-bright tracking-wider">LIVE</span>
          <span className="text-brand-textMuted tracking-wider ml-2">IAS SBC MACE</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-brand-textMuted tracking-wider">STATUS:</span>
          <span className="text-brand-bright tracking-wider">ACTIVE</span>
        </div>
        {/* Signal bars */}
        <div className="flex items-end gap-[2px] ml-3 h-4">
          {[2,4,6,8].map((h, i) => (
            <div key={i} style={{ height: `${h * 2}px` }} className="w-1 bg-brand-bright opacity-80" />
          ))}
        </div>
      </div>

      {/* 3D Canvas / Fallback */}
      <div className="relative" style={{ height: '340px' }}>
        {bootStep < 4 && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center font-mono text-xs space-y-2 text-brand-bright/80 bg-[#080C0A]">
            {bootStep >= 1 && <p className="animate-pulse">INITIALIZING GRID...</p>}
            {bootStep >= 2 && <p className="animate-pulse">MAPPING NODES...</p>}
            {bootStep >= 3 && <p className="animate-pulse">ESTABLISHING CONNECTIONS...</p>}
          </div>
        )}

        {bootStep >= 4 && (
          <div className="absolute inset-0 animate-fade-in">
            <Suspense fallback={
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="120" height="120" viewBox="0 0 120 120" className="text-brand-bright/20 animate-pulse">
                  <path d="M10,60 L40,60 L50,40 L70,40 L80,60 L110,60" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="50" cy="40" r="4" fill="currentColor" />
                  <circle cx="70" cy="40" r="4" fill="currentColor" />
                </svg>
              </div>
            }>
              <Canvas 
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
                style={{ background: 'transparent' }}
              >
                <ambientLight intensity={0.1} color="#0A1510" />
                <directionalLight position={[5, 5, 5]} intensity={0.3} color="#22C55E" />
                <PowerGridScene onCountsReady={setStats} />
              </Canvas>
            </Suspense>
          </div>
        )}

        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20 z-10" style={{
          background: 'repeating-linear-gradient(transparent 0px, transparent 3px, rgba(0,0,0,0.5) 3px, rgba(0,0,0,0.5) 4px)'
        }} />
      </div>

      {/* Bottom data strip */}
      <div className="border-t border-brand-bright/30 px-4 py-2 font-mono text-xs flex justify-between text-brand-textMuted bg-brand-bright/5">
        <span>NODES: <span className="text-brand-bright">{stats.nodes}</span></span>
        <span>EDGES: <span className="text-brand-bright">{stats.edges}</span></span>
        <span>PULSES: <span className="text-brand-bright animate-pulse">{stats.pulses > 0 ? 'LIVE' : 'WAIT'}</span></span>
      </div>
    </div>
  )
}

export default InstrumentPanel
