import { motion } from 'framer-motion'
import Timeline from '../components/Timeline'
import { timeline } from '../data/timeline'

const pageV = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0 },
}

const About = () => {
  return (
    <motion.div variants={pageV} initial="initial" animate="animate" exit="exit" className="pt-20 min-h-screen bg-brand-bg">
      {/* Header */}
      <section className="section-padding section-odd">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-xs text-brand-bright tracking-wider">[ ABOUT ]</span>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-brand-text mt-1 mb-4 tracking-tight leading-[1.1]">
            IEEE IAS SBC MACE
          </h1>
          <p className="text-sm text-brand-textMuted leading-relaxed max-w-2xl">
            Bridging Industry & Innovation at Mar Athanasius College of Engineering, Kothamangalam, Kerala.
          </p>
        </div>
      </section>

      {/* About IAS */}
      <section className="section-padding section-even">
        <div className="max-w-4xl mx-auto">
          <div className="border border-brand-border p-6 md:p-8 mb-8">
            <h2 className="font-heading text-xl font-bold text-brand-text mb-4">IEEE Industry Applications Society</h2>
            <p className="text-sm text-brand-textMuted leading-relaxed mb-4">
              The Industry Applications Society, as a transnational organization, is interested in the advancement of the theory and practice of electrical and electronic engineering in the development, design, manufacture and application of electrical systems, apparatus, devices and controls to the processes and equipment of industry and commerce.
            </p>
            <p className="text-sm text-brand-textMuted leading-relaxed">
              It promotes safe, reliable and economic installations; industry leadership in energy conservation and environmental, health, and safety issues; creation of voluntary engineering standards and recommended practices; and the professional development of its membership.
            </p>
          </div>

          {/* Vision & Mission */}
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="border border-brand-border p-6 border-l-4 border-l-brand-bright">
              <h3 className="font-heading font-bold text-sm text-brand-text mb-3 tracking-tight">Vision</h3>
              <p className="text-xs text-brand-textMuted leading-relaxed">
                To be a world leader in the advancement of science and technology linking theory and practice in the application of electrical and electronic systems for the benefit of humanity.
              </p>
            </div>
            <div className="border border-brand-border p-6 border-l-4 border-l-brand-gold">
              <h3 className="font-heading font-bold text-sm text-brand-text mb-3 tracking-tight">Mission</h3>
              <p className="text-xs text-brand-textMuted leading-relaxed">
                To enable the advancement of theory and practice in the design, development, manufacturing, and application of safe, sustainable, reliable, smart electrical systems, equipment, and services.
              </p>
            </div>
          </div>

          {/* Chapter Story */}
          <div className="border border-brand-border p-6 md:p-8">
            <h2 className="font-heading text-xl font-bold text-brand-text mb-4">Chapter History</h2>
            <p className="text-sm text-brand-textMuted leading-relaxed mb-4">
              IEEE IAS Student Branch Chapter at Mar Athanasius College of Engineering (MACE), Kothamangalam was founded in 2023. Since its inception, the chapter has been actively organizing workshops, seminars, competitions, and Distinguished Lecturer Programs to bridge the gap between academic learning and industrial applications.
            </p>
            <p className="text-sm text-brand-textMuted leading-relaxed">
              We collaborate with sister chapters including IEEE IAS SBC AJCE, RIT, Rajagiri, and College of Engineering Chengannur, and are part of the IEEE IA/IE/PELS Joint Chapter Kerala Section. Our events have attracted industry professionals, researchers, and students from across the state.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding section-odd">
        <div className="max-w-4xl mx-auto">
          <span className="font-mono text-xs text-brand-bright tracking-wider">[ HISTORY ]</span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-text mt-1 mb-8 tracking-tight leading-[1.1]">
            Chapter Timeline
          </h2>
          <Timeline items={timeline} />
        </div>
      </section>
    </motion.div>
  )
}

export default About
