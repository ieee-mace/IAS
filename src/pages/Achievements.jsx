import { motion } from 'framer-motion'
import AchievementCard from '../components/AchievementCard'
import { achievements } from '../data/achievements'

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0 },
}

const Achievements = () => {
  return (
    <motion.div variants={pageV} initial="initial" animate="animate" exit="exit" className="pt-20 min-h-screen bg-brand-bg">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Left-aligned heading */}
          <span className="font-mono text-xs text-brand-bright tracking-wider">[ RECORD ]</span>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-brand-text mt-1 mb-2 tracking-tight leading-[1.1]">
            Achievements
          </h1>
          <p className="text-sm text-brand-textMuted mb-10 max-w-md">
            Milestones that define our chapter's technical journey.
          </p>

          {/* Mosaic layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((a, i) => (
              <AchievementCard key={a.id} achievement={a} index={i} large={i === 0} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Achievements
