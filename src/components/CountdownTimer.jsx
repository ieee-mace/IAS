import { useState, useEffect } from 'react'

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calcTimeLeft())

  function calcTimeLeft() {
    const diff = new Date(targetDate) - new Date()
    if (diff <= 0) return { h: 0, m: 0, s: 0, expired: true }
    return {
      h: Math.floor(diff / (1000 * 60 * 60)),
      m: Math.floor((diff / (1000 * 60)) % 60),
      s: Math.floor((diff / 1000) % 60),
      expired: false,
    }
  }

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calcTimeLeft()), 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const pad = (n) => String(n).padStart(2, '0')

  if (timeLeft.expired) {
    return <span className="font-mono text-xs text-brand-gold tracking-wider">EVENT STARTED</span>
  }

  return (
    <span className="font-mono text-sm text-brand-bright tracking-widest">
      {pad(timeLeft.h)}:{pad(timeLeft.m)}:{pad(timeLeft.s)}
    </span>
  )
}

export default CountdownTimer
