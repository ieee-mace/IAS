import { motion } from 'framer-motion'
import { useState } from 'react'

const TeamCard = ({ member, index = 0 }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      initial={{ clipPath: 'inset(0 100% 0 0)' }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
      className="group w-full relative aspect-[3/4] perspective-1000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="w-full h-full relative preserve-3d"
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden border border-brand-border bg-brand-surface flex flex-col">
          <div className="relative flex-1 overflow-hidden">
            <img
              src={member.image}
              alt={member.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-500"
              onError={(e) => {
                e.target.src = './images/logo.png'
                e.target.className = 'w-full h-full object-contain p-6 img-placeholder'
              }}
            />
          </div>
          <div className="flex items-center justify-between px-3 py-2.5 bg-brand-surface border-t border-brand-border">
            <span className="font-heading font-bold text-sm text-brand-text truncate">
              {member.name}
            </span>
            <span className="font-mono text-[10px] text-brand-textMuted tracking-wider uppercase shrink-0 ml-2">
              {member.role}
            </span>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden border border-brand-bright bg-[#0D1411] flex flex-col items-center justify-center p-6 text-center" style={{ transform: 'rotateY(180deg)' }}>
          <div className="w-16 h-16 rounded-full overflow-hidden border border-brand-border mb-4">
            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
          </div>
          <p className="font-heading font-bold text-lg text-brand-text leading-tight">{member.name}</p>
          <p className="font-mono text-[10px] text-brand-bright tracking-wider uppercase mt-1 mb-6">{member.role}</p>
          
          <div className="flex gap-3">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-brand-border hover:border-brand-bright text-brand-textMuted hover:text-brand-bright transition-colors"
                aria-label={`${member.name} LinkedIn`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
            {member.showPhone && member.phone && (
              <a
                href={`tel:${member.phone}`}
                className="p-2 border border-brand-border hover:border-brand-bright text-brand-textMuted hover:text-brand-bright transition-colors"
                aria-label={`Call ${member.name}`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default TeamCard
