import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { events } from '../data/events'

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0 },
}

const allImages = events.map(e => ({ src: e.image, title: e.title }))

const Gallery = () => {
  const [lightbox, setLightbox] = useState(null)

  return (
    <motion.div variants={pageV} initial="initial" animate="animate" exit="exit" className="pt-20 min-h-screen bg-brand-bg">
      <div className="section-padding">
        <div className="max-w-6xl mx-auto">
          <span className="font-mono text-xs text-brand-bright tracking-wider">[ GALLERY ]</span>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-brand-text mt-1 mb-2 tracking-tight leading-[1.1]">
            Photo Archive
          </h1>
          <p className="text-sm text-brand-textMuted mb-8 max-w-md">
            Moments captured from chapter events and activities.
          </p>

          {/* Grid — sharp corners */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {allImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ clipPath: 'inset(0 100% 0 0)' }}
                whileInView={{ clipPath: 'inset(0 0% 0 0)' }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.05, 0.4), duration: 0.4 }}
                className="relative aspect-square overflow-hidden cursor-pointer group"
                onClick={() => setLightbox(img)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                  onError={(e) => {
                    e.target.src = '/images/logo.png'
                    e.target.className = 'w-full h-full object-contain p-8 img-placeholder'
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                  <p className="text-white font-mono text-[10px] p-3 opacity-0 group-hover:opacity-100 transition-opacity line-clamp-2 tracking-wider">
                    {img.title}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[80vh]"
            >
              <img src={lightbox.src} alt={lightbox.title} className="max-w-full max-h-[80vh] object-contain" />
              <p className="text-brand-textMuted font-mono text-xs text-center mt-4 tracking-wider">{lightbox.title}</p>
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-3 -right-3 w-8 h-8 border border-brand-border bg-[#080C0A] text-brand-textMuted hover:text-brand-bright hover:border-brand-bright flex items-center justify-center text-sm transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Gallery
