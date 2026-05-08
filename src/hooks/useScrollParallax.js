import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export function useScrollParallax(speed = 0.5) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * -100])
  return { ref, y, scrollYProgress }
}

export default useScrollParallax
