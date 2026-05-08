import { motion } from 'framer-motion'
import CountdownTimer from './CountdownTimer'

const DLPCard = ({ event }) => {
  const isUpcoming = event.registrationOpen || new Date(event.date) > new Date()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-ieee-blue/5 to-ias-gold/5 dark:from-ieee-blue-light/10 dark:to-ias-gold/10 rounded-2xl border border-ieee-blue/20 dark:border-ieee-blue-light/20 overflow-hidden"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <div className="relative overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            loading="lazy"
            className="w-full h-full object-cover min-h-[250px]"
            onError={(e) => {
              e.target.src = '/images/lgw.png'
              e.target.className = 'w-full h-full object-contain p-12 bg-ieee-blue/5 min-h-[250px]'
            }}
          />
          {isUpcoming && (
            <div className="absolute top-4 left-4 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full animate-pulse">
              UPCOMING
            </div>
          )}
        </div>
        <div className="p-6 flex flex-col justify-center">
          <span className="text-xs font-bold text-ias-gold uppercase tracking-wider mb-2">
            Distinguished Lecturer Program
          </span>
          <h3 className="text-xl font-bold text-light-text dark:text-dark-text mb-3">
            {event.title}
          </h3>
          <p className="text-sm text-light-text/60 dark:text-dark-text/60 mb-4">
            {event.description}
          </p>
          {event.speaker && (
            <div className="mb-4">
              <p className="text-sm font-semibold text-ieee-blue dark:text-ieee-blue-light">
                🎤 {event.speaker}
              </p>
              <p className="text-xs text-light-text/50 dark:text-dark-text/50">
                {event.speakerTitle}
              </p>
            </div>
          )}
          <div className="flex flex-wrap gap-3 text-xs text-light-text/60 dark:text-dark-text/60 mb-4">
            <span>📅 {new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            {event.time && <span>🕐 {event.time}</span>}
            {event.platform && <span>💻 {event.platform}</span>}
          </div>
          {isUpcoming && <div className="mb-4"><CountdownTimer targetDate={event.date} compact /></div>}
          {event.registrationOpen && event.registrationLink && (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex px-5 py-2.5 bg-ieee-blue dark:bg-ieee-blue-light text-white font-semibold rounded-lg hover:opacity-90 transition-opacity w-fit"
            >
              Register Now →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default DLPCard
