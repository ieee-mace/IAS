import { useState, useEffect } from 'react'

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 })
  const [hovering, setHovering] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Only on pointer-fine (mouse) devices
    if (!window.matchMedia('(pointer: fine)').matches) return

    setVisible(true)

    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY })
    }

    const handleEnter = () => setHovering(true)
    const handleLeave = () => setHovering(false)

    document.addEventListener('mousemove', handleMove)

    // Observe DOM for interactive elements
    const addListeners = () => {
      const targets = document.querySelectorAll('a, button, [role="button"], input, textarea, select')
      targets.forEach((el) => {
        el.addEventListener('mouseenter', handleEnter)
        el.addEventListener('mouseleave', handleLeave)
      })
      return targets
    }

    let targets = addListeners()

    // Re-scan on DOM changes
    const observer = new MutationObserver(() => {
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
      })
      targets = addListeners()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', handleMove)
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter)
        el.removeEventListener('mouseleave', handleLeave)
      })
      observer.disconnect()
    }
  }, [])

  if (!visible) return null

  return (
    <>
      {/* Hide default cursor site-wide */}
      <style>{`
        @media (pointer: fine) {
          *, *::before, *::after { cursor: none !important; }
        }
      `}</style>

      {/* Crosshair / circle */}
      <div
        className="fixed pointer-events-none z-[99999] mix-blend-difference"
        style={{
          left: pos.x,
          top: pos.y,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.15s, height 0.15s, border-radius 0.15s, opacity 0.15s',
          width: hovering ? '40px' : '20px',
          height: hovering ? '40px' : '20px',
        }}
      >
        {hovering ? (
          /* Circle with center dot */
          <div className="w-full h-full rounded-full border border-[#22C55E] flex items-center justify-center">
            <div className="w-1 h-1 rounded-full bg-[#22C55E]" />
          </div>
        ) : (
          /* Crosshair + */
          <svg width="20" height="20" viewBox="0 0 20 20" className="block">
            <line x1="10" y1="3" x2="10" y2="17" stroke="#22C55E" strokeWidth="1" />
            <line x1="3" y1="10" x2="17" y2="10" stroke="#22C55E" strokeWidth="1" />
          </svg>
        )}
      </div>
    </>
  )
}

export default CustomCursor
