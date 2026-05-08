import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import CountUp from 'react-countup'

const stats = [
  { label: 'Events Conducted', value: 20, suffix: '+', icon: '🎯' },
  { label: 'Active Members', value: 50, suffix: '+', icon: '👥' },
  { label: 'Awards Won', value: 5, suffix: '+', icon: '🏆' },
  { label: 'Years Active', value: 3, suffix: '+', icon: '📅' },
]

const StatsBar = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section-padding bg-light-bg dark:bg-dark-bg">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-light-card dark:bg-dark-card rounded-2xl p-6 text-center border border-light-border dark:border-dark-border card-glow transition-shadow cursor-default"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-ieee-blue dark:text-ieee-blue-light mb-1">
                {isInView ? (
                  <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                ) : (
                  `0${stat.suffix}`
                )}
              </div>
              <p className="text-sm text-light-text/60 dark:text-dark-text/60 font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default StatsBar
