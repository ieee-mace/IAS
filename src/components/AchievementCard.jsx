import { motion } from 'framer-motion'

const AchievementCard = ({ achievement, index = 0 }) => {
  return (
    <motion.div
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.5, delay: index * 0.12, ease: 'easeOut' }}
      className="gold-sweep-container relative border-l-4 border-l-brand-gold bg-brand-surface group flex flex-col md:flex-row overflow-hidden col-span-full"
    >
      {/* Poster Side (Left on Desktop, Top on Mobile) */}
      <div className="w-full md:w-1/3 shrink-0 relative overflow-hidden border-b md:border-b-0 md:border-r border-brand-border min-h-[300px] md:min-h-full">
        <img
          src={achievement.image}
          alt={achievement.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = './images/logo.png'
            e.target.className = 'w-full h-full object-contain p-8 img-placeholder'
          }}
        />
        {/* Year badge */}
        <span className="absolute top-3 left-3 font-mono text-[10px] text-brand-gold tracking-widest uppercase px-2 py-0.5 bg-[#080C0A]/80 border border-brand-gold/30 z-10">
          {achievement.year}
        </span>
      </div>

      {/* Description Side (Right on Desktop, Bottom on Mobile) */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
        <h3 className="font-heading font-bold text-xl md:text-2xl text-brand-text leading-tight mb-4 group-hover:text-brand-bright transition-colors">
          {achievement.title}
        </h3>
        
        <p className="text-sm md:text-base text-brand-textMuted leading-relaxed whitespace-pre-wrap">
          {achievement.description}
        </p>

        {/* Decorative element */}
        <div className="mt-8 flex items-center gap-4">
          <div className="h-px bg-brand-border flex-1" />
          <span className="font-mono text-[10px] text-brand-textMuted/50 tracking-widest uppercase">
            Milestone
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default AchievementCard
