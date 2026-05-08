import { motion } from 'framer-motion'
import EventRow from '../components/EventCard'
import { getUpcomingEvents } from '../data/events'

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0 },
}

const Upcoming = () => {
  const upcoming = getUpcomingEvents()

  return (
    <motion.div variants={pageV} initial="initial" animate="animate" exit="exit" className="pt-20 min-h-screen bg-brand-bg">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          <span className="font-mono text-xs text-brand-bright tracking-wider">[ UPCOMING ]</span>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-brand-text mt-1 mb-2 tracking-tight leading-[1.1]">
            Upcoming Events
          </h1>
          <p className="text-sm text-brand-textMuted mb-8 max-w-md">
            What's next on the IAS SBC MACE calendar.
          </p>

          {upcoming.length === 0 ? (
            <div className="py-16 border border-brand-border p-8">
              <p className="font-mono text-xs text-brand-textMuted tracking-wider">NO UPCOMING EVENTS SCHEDULED</p>
              <p className="text-sm text-brand-textMuted mt-2">Check back soon — new events are being planned.</p>
            </div>
          ) : (
            <div className="border-t border-brand-border">
              {upcoming.map((e, i) => <EventRow key={e.id} event={e} index={i} />)}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Upcoming
