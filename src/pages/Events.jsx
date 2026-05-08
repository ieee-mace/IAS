import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import EventRow from '../components/EventCard'
import SectionDivider from '../components/SectionDivider'
import { events, getEventTypes, getEventYears } from '../data/events'

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0 },
}

const Events = () => {
  const [typeFilter, setTypeFilter] = useState('All')
  const [yearFilter, setYearFilter] = useState('All')
  const types = ['All', ...getEventTypes()]
  const years = ['All', ...getEventYears()]
  const pastEvents = events.filter(e => !e.registrationOpen && new Date(e.date) <= new Date())

  const filtered = useMemo(() => {
    let result = pastEvents
    if (typeFilter !== 'All') result = result.filter(e => e.type === typeFilter)
    if (yearFilter !== 'All') result = result.filter(e => new Date(e.date).getFullYear() === Number(yearFilter))
    return result
  }, [typeFilter, yearFilter])

  return (
    <motion.div variants={pageV} initial="initial" animate="animate" exit="exit" className="pt-20 min-h-screen bg-brand-bg">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Left-aligned heading */}
          <span className="font-mono text-xs text-brand-bright tracking-wider">[ ARCHIVE ]</span>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-brand-text mt-1 mb-2 tracking-tight leading-[1.1]">
            Past Events
          </h1>
          <p className="text-sm text-brand-textMuted mb-8 max-w-md">
            A record of knowledge sharing and technical growth.
          </p>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {types.map(t => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`font-mono text-[10px] px-3 py-1.5 tracking-wider uppercase transition-colors border ${
                    typeFilter === t
                      ? 'border-brand-bright text-brand-bright bg-brand-bright/10'
                      : 'border-brand-border text-brand-textMuted hover:text-brand-text hover:border-brand-text'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {years.map(y => (
                <button
                  key={y}
                  onClick={() => setYearFilter(String(y))}
                  className={`font-mono text-[10px] px-3 py-1.5 tracking-wider uppercase transition-colors border ${
                    yearFilter === String(y)
                      ? 'border-brand-gold text-brand-gold bg-brand-gold/10'
                      : 'border-brand-border text-brand-textMuted hover:text-brand-text hover:border-brand-text'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          {/* Event rows */}
          {filtered.length === 0 ? (
            <p className="font-mono text-xs text-brand-textMuted py-12">NO EVENTS MATCH FILTERS</p>
          ) : (
            <div className="border-t border-brand-border mb-20">
              {filtered.map((e, i) => <EventRow key={e.id} event={e} index={i} />)}
            </div>
          )}

          {/* Posters Showcase */}
          <div className="pt-16 border-t border-brand-border">
            <span className="font-mono text-xs text-brand-bright tracking-wider">[ POSTERS ]</span>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-text mt-1 mb-8 tracking-tight">
              Event Posters
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pastEvents.filter(e => e.image).map((e, i) => (
                <div key={e.id} className="relative aspect-[3/4] border border-brand-border group overflow-hidden">
                  <img src={e.image} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  onError={(err) => { err.target.src = './images/logo.png'; err.target.className = 'w-full h-full object-contain p-6 img-placeholder' }} />
                  <div className="absolute inset-0 bg-brand-bg/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                    <p className="font-heading font-bold text-sm text-brand-text leading-tight">{e.title}</p>
                    <p className="font-mono text-[10px] text-brand-textMuted mt-1">{new Date(e.date).getFullYear()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Events
