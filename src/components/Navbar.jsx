import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Events', path: '/events' },
  { name: 'Team', path: '/team' },
  { name: 'Achievements', path: '/achievements' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/about' },
]

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setMobileOpen(false), [location])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 bg-brand-bg border-b border-brand-border ${
          scrolled ? 'border-t-2 border-t-brand-bright' : 'border-t-2 border-t-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img src="/images/logo.png" alt="IEEE IAS" className="h-8 md:h-9" />
              <span className="font-heading font-bold text-sm tracking-tight text-brand-text hidden sm:block">
                IAS SBC MACE
              </span>
            </Link>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`link-draw relative py-1 text-sm font-heading font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-brand-text'
                      : 'text-brand-textMuted hover:text-brand-text'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right section */}
            <div className="flex items-center gap-3">
              {/* Dark mode toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 text-brand-textMuted hover:text-brand-text transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              {/* Join CTA — sharp, green border, instant fill */}
              <a
                href="https://ias.ieee.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex px-4 py-1.5 border border-brand-bright text-brand-bright text-xs font-heading font-semibold tracking-wider uppercase bg-transparent hover:bg-brand-bright hover:text-brand-bg transition-colors"
              >
                Join IAS
              </a>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-brand-textMuted hover:text-brand-text"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-5 flex flex-col justify-center gap-1">
                  <motion.span
                    animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                    className="block h-[1.5px] w-5 bg-current origin-center"
                  />
                  <motion.span
                    animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                    className="block h-[1.5px] w-5 bg-current"
                  />
                  <motion.span
                    animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                    className="block h-[1.5px] w-5 bg-current origin-center"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer — solid dark, no glass */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.2 }}
              className="fixed top-0 right-0 bottom-0 w-64 z-50 bg-brand-surface border-l border-brand-border lg:hidden"
            >
              <div className="p-6 pt-20 flex flex-col gap-1">
                {navLinks.map((link, i) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`block px-4 py-3 font-heading text-sm transition-colors border-l-2 ${
                      location.pathname === link.path
                        ? 'border-l-brand-gold text-brand-text bg-brand-muted/20'
                        : 'border-l-transparent text-brand-textMuted hover:text-brand-text hover:border-l-brand-bright'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <a
                  href="https://ias.ieee.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-4 py-2.5 border border-brand-bright text-brand-bright text-xs font-heading font-semibold tracking-wider uppercase text-center hover:bg-brand-bright hover:text-brand-bg transition-colors"
                >
                  Join IAS
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
