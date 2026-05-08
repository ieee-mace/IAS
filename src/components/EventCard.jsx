import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

const EventRow = ({ event, index = 0 }) => {
  const dateObj = new Date(event.date)
  const day = dateObj.getDate()
  const month = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
  const year = dateObj.getFullYear()

  const isOpen = event.registrationOpen

  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <motion.div
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.4), ease: 'easeOut' }}
      onClick={() => setIsExpanded(!isExpanded)}
      className="group flex items-stretch border-b border-brand-border hover:bg-brand-surface transition-colors duration-150 cursor-pointer w-full overflow-hidden"
    >
      {/* Left green accent on hover */}
      <div className="w-[3px] bg-transparent group-hover:bg-brand-bright transition-colors duration-150 shrink-0" />

      {/* Date block */}
      <div className="w-16 shrink-0 bg-brand-muted/30 flex flex-col items-center justify-center py-4 px-2">
        <span className="font-mono font-bold text-xl text-brand-text leading-none">{day}</span>
        <span className="font-mono text-[10px] text-brand-textMuted tracking-wider mt-0.5">{month}</span>
        <span className="font-mono text-[9px] text-brand-textMuted/60">{year}</span>
      </div>

      {/* Vertical divider */}
      <div className="w-px bg-brand-border shrink-0" />

      {/* Optional Image Thumbnail */}
      {event.image && (
        <div className="w-16 sm:w-24 h-full shrink-0 border-r border-brand-border">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = './images/logo.png'
              e.target.className = 'w-full h-full object-contain p-2 bg-brand-muted/10'
            }}
          />
        </div>
      )}

      {/* Center content */}
      <div className="flex-1 py-4 px-4 md:px-6 min-w-0 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <h3 className={`font-heading font-bold text-sm md:text-base text-brand-text leading-tight ${isExpanded ? '' : 'truncate'}`}>
            {event.title}
          </h3>
          <span className="font-mono text-[10px] px-2 py-0.5 border border-brand-border text-brand-textMuted tracking-wider uppercase shrink-0">
            {event.type}
          </span>
        </div>
        
        <AnimatePresence initial={false}>
          {isExpanded ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <p className="text-xs text-brand-textMuted mb-2 mt-1 whitespace-pre-wrap leading-relaxed">
                {event.description}
              </p>
              {event.speaker && (
                <p className="font-mono text-[11px] text-brand-gold mt-2 block">
                  SPEAKER: <span className="text-brand-text">{event.speaker}</span> 
                  {event.speakerTitle && <span className="text-brand-textMuted"> — {event.speakerTitle}</span>}
                </p>
              )}
            </motion.div>
          ) : (
            <>
              <p className="text-xs text-brand-textMuted line-clamp-1 mb-1">
                {event.description}
              </p>
              {event.speaker && (
                <p className="font-mono text-[11px] text-brand-gold">
                  {event.speaker}
                </p>
              )}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Right: status + arrow */}
      <div className="flex items-center gap-3 pr-4 md:pr-6 shrink-0">
        {isOpen && (
          <span className="font-mono text-[10px] text-brand-bright animate-blink tracking-wider">
            OPEN
          </span>
        )}
        <motion.span 
          animate={{ rotate: isExpanded ? 90 : 0 }}
          className="text-brand-textMuted group-hover:text-brand-bright transition-colors duration-200 text-lg origin-center inline-block"
        >
          →
        </motion.span>
      </div>
    </motion.div>
  )
}

export default EventRow
