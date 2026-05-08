import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import EventRow from '../components/EventCard'
import TeamCard from '../components/TeamCard'
import AchievementCard from '../components/AchievementCard'
import Timeline from '../components/Timeline'
import InstrumentPanel from '../components/InstrumentPanel'
import SectionDivider from '../components/SectionDivider'
import { events } from '../data/events'
import { execom } from '../data/execom'
import { achievements } from '../data/achievements'
import { timeline } from '../data/timeline'
import { faqs } from '../data/faqs'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
}

/* ─── Section Label ────────────────────────────────────────────── */
const SectionLabel = ({ number, title }) => (
  <div className="mb-6">
    <span className="font-mono text-xs text-brand-bright tracking-wider">[ {number} ]</span>
    <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-brand-text mt-1 tracking-tight leading-[1.1]">
      {title}
    </h2>
  </div>
)

/* ─── FAQ Accordion Item ───────────────────────────────────────── */
const FAQItem = ({ faq, isOpen, toggle }) => (
  <div className="border-b border-brand-border">
    <button
      onClick={toggle}
      className="w-full flex items-center justify-between py-4 text-left hover:text-brand-bright transition-colors"
    >
      <span className="font-heading font-semibold text-sm text-brand-text pr-4">{faq.question}</span>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        className="text-brand-textMuted shrink-0"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </motion.span>
    </button>
    <motion.div
      initial={false}
      animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
      className="overflow-hidden"
    >
      <p className="pb-4 text-sm text-brand-textMuted leading-relaxed pl-0">{faq.answer}</p>
    </motion.div>
  </div>
)

/* ─── Home Page ────────────────────────────────────────────────── */
const Home = () => {
  const [activeFilter, setActiveFilter] = useState('All')
  const [openFAQ, setOpenFAQ] = useState(null)

  const eventTypes = ['All', 'Workshop', 'Competition', 'Seminar', 'Webinar', 'DLP']
  const pastEvents = events.filter(e => !e.registrationOpen && new Date(e.date) <= new Date())
  const filteredEvents = useMemo(() => {
    if (activeFilter === 'All') return pastEvents.slice(0, 8)
    return pastEvents.filter(e => e.type === activeFilter).slice(0, 8)
  }, [activeFilter])

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">

      {/* ══════════════════════════════════════════════════════════
          HERO — Split-screen terminal/dashboard
          ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[auto] lg:min-h-screen bg-brand-bg brushed-metal transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-16 md:pb-24 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left panel — 55% */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              {/* Small label */}
              <span className="font-mono text-[10px] text-brand-textMuted tracking-[0.2em] uppercase">
                IEEE Industry Applications Society
              </span>

              {/* Display heading — left-aligned, tight leading */}
              <div className="space-y-0">
                <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05]">
                  <span className="text-brand-text font-light block">POWERING</span>
                  <span className="text-brand-text font-bold block">INDUSTRY</span>
                  <span className="text-brand-text font-bold block">
                    INNOVAT
                    <span className="border-b-2 border-brand-gold">ION</span>
                  </span>
                </h1>
              </div>

              {/* Thin rule */}
              <div className="w-full h-px bg-brand-border" />

              {/* Description */}
              <p className="text-sm text-brand-textMuted leading-relaxed max-w-md">
                The IAS Student Branch Chapter at MACE bridges theory with industry practice — workshops, distinguished lectures, and hands-on technical experiences.
              </p>

              {/* CTA — sharp, border-left accent */}
              <div>
                <Link
                  to="/events"
                  className="inline-flex items-center px-5 py-2.5 bg-transparent border border-brand-border border-l-[3px] border-l-brand-bright text-brand-text font-heading text-sm font-semibold tracking-wide hover:bg-brand-bright hover:text-brand-bg hover:border-brand-bright transition-colors"
                >
                  Explore Events
                  <span className="ml-2">→</span>
                </Link>
              </div>

              {/* Inline stats — monospace */}
              <p className="font-mono text-[11px] text-brand-textMuted tracking-wider">
                20 Events  ·  50+ Members  ·  Est. 2022
              </p>
            </div>

            {/* Right panel — 45% */}
            <div className="lg:col-span-5">
              <InstrumentPanel />
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════
          SECTION 01 — Mission & Vision
          ══════════════════════════════════════════════════════════ */}
      <SectionDivider label="Core" />
      <section className="section-padding section-even">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="hidden lg:flex lg:col-span-1 items-start justify-center pt-2">
              <span className="vertical-label">Core</span>
            </div>

            <div className="lg:col-span-11">
              <SectionLabel number="01" title="Mission & Vision" />

              <div className="grid md:grid-cols-2 gap-6">
                <div className="border border-brand-border p-6 md:p-8 border-l-4 border-l-brand-bright bg-brand-surface group hover:border-brand-bright transition-colors duration-300">
                  <h3 className="font-heading font-bold text-lg text-brand-text mb-4 tracking-tight group-hover:text-brand-bright transition-colors">Vision</h3>
                  <p className="text-sm text-brand-textMuted leading-relaxed">
                    To be a world leader in the advancement of science and technology linking theory and practice in the application of electrical and electronic systems for the benefit of humanity.
                  </p>
                </div>
                <div className="border border-brand-border p-6 md:p-8 border-l-4 border-l-brand-gold bg-brand-surface group hover:border-brand-gold transition-colors duration-300">
                  <h3 className="font-heading font-bold text-lg text-brand-text mb-4 tracking-tight group-hover:text-brand-gold transition-colors">Mission</h3>
                  <p className="text-sm text-brand-textMuted leading-relaxed">
                    To enable the advancement of theory and practice in the design, development, manufacturing, and application of safe, sustainable, reliable, smart electrical systems, equipment, and services.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SECTION 02 — Events
          ══════════════════════════════════════════════════════════ */}
      <SectionDivider label="Events" />
      <section className="section-padding section-odd">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Vertical label */}
            <div className="hidden lg:flex lg:col-span-1 items-start justify-center pt-2">
              <span className="vertical-label">Events — 2025</span>
            </div>

            <div className="lg:col-span-11">
              <SectionLabel number="02" title="Events" />

              {/* Filters — scrollable on mobile */}
              <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap gap-2 mb-6 no-scrollbar">
                {eventTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setActiveFilter(type)}
                    className={`font-mono text-[10px] px-3 py-1.5 tracking-wider uppercase transition-colors border ${
                      activeFilter === type
                        ? 'border-brand-bright text-brand-bright bg-brand-bright/10'
                        : 'border-brand-border text-brand-textMuted hover:text-brand-text hover:border-brand-text'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {/* Event rows */}
              <div className="border-t border-brand-border">
                {filteredEvents.map((e, i) => <EventRow key={e.id} event={e} index={i} />)}
              </div>

              <div className="mt-6">
                <Link to="/events" className="link-draw font-heading text-sm font-semibold text-brand-textMuted hover:text-brand-text">
                  View All Events →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════
          SECTION 03 — Achievements (Trophy Case)
          ══════════════════════════════════════════════════════════ */}
      <SectionDivider label="Achievements" />
      <section className="section-padding section-even brushed-metal relative">
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="hidden lg:flex lg:col-span-1 items-start justify-center pt-2">
              <span className="vertical-label">Awards</span>
            </div>
            <div className="lg:col-span-11">
              <SectionLabel number="03" title="Achievements" />

              {/* Mosaic layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((a, i) => (
                  <AchievementCard
                    key={a.id}
                    achievement={a}
                    index={i}
                    large={i === 0}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════
          SECTION 04 — Timeline
          ══════════════════════════════════════════════════════════ */}
      <SectionDivider label="Timeline" />
      <section className="section-padding section-odd">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="hidden lg:flex lg:col-span-1 items-start justify-center pt-2">
              <span className="vertical-label">History</span>
            </div>
            <div className="lg:col-span-11">
              <SectionLabel number="04" title="Chapter Timeline" />
              <Timeline items={timeline} />
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════
          SECTION 05 — Team Preview
          ══════════════════════════════════════════════════════════ */}
      <SectionDivider label="Team" />
      <section className="section-padding section-even">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="hidden lg:flex lg:col-span-1 items-start justify-center pt-2">
              <span className="vertical-label">Execom — 2025</span>
            </div>
            <div className="lg:col-span-11">
              <SectionLabel number="05" title="Executive Committee" />

              {/* Roster header */}
              <div className="divider-bar mb-8">
                <span>EXECOM / 2025–26 / {execom.length} MEMBERS</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {execom.map((m, i) => <TeamCard key={m.name} member={m} index={i} />)}
              </div>

              <div className="mt-6">
                <Link to="/team" className="link-draw font-heading text-sm font-semibold text-brand-textMuted hover:text-brand-text">
                  Full Roster →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════════
          SECTION 06 — FAQ
          ══════════════════════════════════════════════════════════ */}
      <SectionDivider label="FAQ" />
      <section className="section-padding section-even">
        <div className="max-w-3xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="hidden lg:flex lg:col-span-1 items-start justify-center pt-2">
              <span className="vertical-label">Support</span>
            </div>
            <div className="lg:col-span-11">
              <SectionLabel number="06" title="Frequently Asked Questions" />
              <div>
                {faqs.map((faq, i) => (
                  <FAQItem key={i} faq={faq} isOpen={openFAQ === i} toggle={() => setOpenFAQ(openFAQ === i ? null : i)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </motion.div>
  )
}

export default Home
