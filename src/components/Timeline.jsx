import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const TimelineItem = ({ item, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
      transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
      className="flex gap-4 md:gap-6 mb-8"
    >
      {/* Left: year + vertical line */}
      <div className="flex flex-col items-center shrink-0 w-12">
        <span className="font-mono text-xs text-brand-gold font-semibold">{item.year}</span>
        <div className="w-px flex-1 bg-brand-border mt-2" />
      </div>

      {/* Dot */}
      <div className="shrink-0 mt-1">
        <div className="w-2.5 h-2.5 border border-brand-bright bg-brand-muted" />
      </div>

      {/* Content */}
      <div className="pb-2 min-w-0">
        <h3 className="font-heading font-bold text-sm text-brand-text leading-tight">
          {item.title}
        </h3>
        <p className="text-xs text-brand-textMuted mt-1 leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}

const Timeline = ({ items }) => {
  return (
    <div className="relative">
      {items.map((item, i) => (
        <TimelineItem key={i} item={item} index={i} />
      ))}
    </div>
  )
}

export default Timeline
