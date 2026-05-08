import { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import StartupAnimation from './components/StartupAnimation'
import CustomCursor from './components/CustomCursor'

const Home = lazy(() => import('./pages/Home'))
const Events = lazy(() => import('./pages/Events'))
const Upcoming = lazy(() => import('./pages/Upcoming'))
const Team = lazy(() => import('./pages/Team'))
const Achievements = lazy(() => import('./pages/Achievements'))
const Gallery = lazy(() => import('./pages/Gallery'))
const Blog = lazy(() => import('./pages/Blog'))
const About = lazy(() => import('./pages/About'))

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode')
      return saved ? JSON.parse(saved) : true
    }
    return true
  })
  const [showStartup, setShowStartup] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('startupShown')
    }
    return true
  })

  const location = useLocation()

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      document.body.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  const handleStartupComplete = () => {
    sessionStorage.setItem('startupShown', 'true')
    setShowStartup(false)
  }

  const toggleDarkMode = () => setDarkMode(!darkMode)

  const LoadingFallback = () => (
    <div className="min-h-screen flex items-center justify-center bg-brand-bg">
      <div className="font-mono text-xs text-brand-textMuted tracking-widest animate-pulse">
        LOADING...
      </div>
    </div>
  )

  return (
    <>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {showStartup && (
          <StartupAnimation onComplete={handleStartupComplete} />
        )}
      </AnimatePresence>

      {!showStartup && (
        <>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Suspense fallback={<LoadingFallback />}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/events" element={<Events />} />
                <Route path="/upcoming" element={<Upcoming />} />
                <Route path="/team" element={<Team />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/about" element={<About />} />
              </Routes>
            </AnimatePresence>
          </Suspense>
          <Footer />
        </>
      )}
    </>
  )
}

export default App
