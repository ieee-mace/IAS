import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const StartupAnimation = ({ onComplete }) => {
  const [phase, setPhase] = useState(1)
  const text = "IAS SBC MACE"
  const [audioContext, setAudioContext] = useState(null)

  useEffect(() => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (AudioContext) {
        setAudioContext(new AudioContext())
      }
    } catch (e) {
      console.warn("Audio Context not supported", e)
    }

    const timer2 = setTimeout(() => setPhase(2), 400)
    const timer3 = setTimeout(() => setPhase(3), 1400)
    const timer4 = setTimeout(() => setPhase(4), 2200)
    const timerEnd = setTimeout(() => onComplete(), 3500)

    return () => {
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timerEnd)
    }
  }, [onComplete])

  const playBeep = () => {
    if (audioContext && audioContext.state === 'running') {
      try {
        const osc = audioContext.createOscillator()
        const gain = audioContext.createGain()
        osc.type = 'sine'
        osc.frequency.setValueAtTime(880, audioContext.currentTime)
        gain.gain.setValueAtTime(0.05, audioContext.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.08)
        osc.connect(gain)
        gain.connect(audioContext.destination)
        osc.start()
        osc.stop(audioContext.currentTime + 0.08)
      } catch (e) {}
    }
  }

  const containerVariants = {
    initial: { clipPath: 'circle(150% at 50% 50%)' },
    exit: { clipPath: 'circle(0% at 50% 50%)', transition: { duration: 0.8, ease: "easeInOut" } }
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    useEffect(() => {
      setPhase(3)
      const timer = setTimeout(() => onComplete(), 1000)
      return () => clearTimeout(timer)
    }, [onComplete])
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-brand-bg">
        <img src="./images/logo.png" alt="IEEE IAS Logo" className="w-24 h-24 mb-6" />
        <h1 className="text-2xl font-bold text-white tracking-wider">{text}</h1>
      </div>
    )
  }

  const drawLine = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: i => {
      const delay = 0.4 + i * 0.1;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "tween", duration: 0.6, ease: "easeInOut" },
          opacity: { delay, duration: 0.01 }
        }
      };
    }
  };

  const nodeDrop = {
    hidden: { scale: 0, opacity: 0 },
    visible: i => {
      const delay = 1.0 + i * 0.05;
      return {
        scale: 1,
        opacity: 1,
        transition: { delay, type: "spring", stiffness: 300, damping: 20 }
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 1.6 + i * 0.06,
        type: "spring",
        damping: 12,
        stiffness: 200
      }
    })
  }

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black crt-scanlines"
      initial="initial"
      animate={phase === 4 ? "exit" : "initial"}
      variants={containerVariants}
    >
      <motion.div
        animate={phase === 4 ? { scale: 0.8, opacity: 0, transition: { duration: 0.4 } } : { scale: 1, opacity: 1 }}
        className="relative w-[300px] h-[300px] flex items-center justify-center"
      >
        <AnimatePresence>
          {phase === 1 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [1, 1.5, 1] }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute w-1.5 h-1.5 bg-brand-bright rounded-full"
            />
          )}
        </AnimatePresence>

        {phase >= 2 && (
          <motion.svg
            width="300"
            height="300"
            viewBox="0 0 300 300"
            className="absolute inset-0"
            animate={phase >= 3 ? { opacity: 0.3 } : { opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.path d="M150,150 L150,80 L200,80" fill="none" stroke="#22C55E" strokeWidth="2" variants={drawLine} custom={0} initial="hidden" animate="visible" />
            <motion.path d="M150,150 L150,220 L100,220" fill="none" stroke="#22C55E" strokeWidth="2" variants={drawLine} custom={1} initial="hidden" animate="visible" />
            <motion.path d="M150,150 L80,150 L80,100" fill="none" stroke="#22C55E" strokeWidth="2" variants={drawLine} custom={2} initial="hidden" animate="visible" />
            <motion.path d="M150,150 L220,150 L220,200" fill="none" stroke="#22C55E" strokeWidth="2" variants={drawLine} custom={3} initial="hidden" animate="visible" />
            
            <motion.rect x="196" y="76" width="8" height="8" fill="#22C55E" variants={nodeDrop} custom={0} initial="hidden" animate="visible" onAnimationStart={playBeep} />
            <motion.rect x="96" y="216" width="8" height="8" fill="#22C55E" variants={nodeDrop} custom={1} initial="hidden" animate="visible" onAnimationStart={playBeep} />
            <motion.rect x="76" y="96" width="8" height="8" fill="#22C55E" variants={nodeDrop} custom={2} initial="hidden" animate="visible" onAnimationStart={playBeep} />
            <motion.rect x="216" y="196" width="8" height="8" fill="#22C55E" variants={nodeDrop} custom={3} initial="hidden" animate="visible" onAnimationStart={playBeep} />
          </motion.svg>
        )}

        {phase >= 3 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 pt-4"
          >
            <img src="./images/logo.png" alt="IEEE IAS Logo" className="w-24 h-24 mb-4 object-contain" />
            
            <div className="flex space-x-1">
              {text.split('').map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-white font-bold tracking-widest text-lg"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "120px", opacity: 1 }}
              transition={{ delay: 2.1, duration: 0.5, ease: "easeInOut" }}
              className="h-[2px] bg-brand-gold mt-2"
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default StartupAnimation
