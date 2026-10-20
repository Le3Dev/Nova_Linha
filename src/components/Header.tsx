import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { logoSymbol } from '../data/images'

const navLinks = [
  { label: 'Imóveis', href: '#properties' },
  { label: 'Regiões', href: '#regions' },
  { label: 'A Nova Linha', href: '#about' },
]

export function Wordmark({ light }: { light: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <img src={logoSymbol} alt="" className="h-9 sm:h-10 w-auto object-contain" />
      <span className={`leading-none ${light ? 'text-white' : 'text-brand-950 dark:text-white'}`}>
        <span className="block text-[15px] sm:text-base font-light tracking-[0.32em]">NOVA LINHA</span>
        <span className={`block text-[8.5px] tracking-[0.28em] mt-1 ${light ? 'text-white/60' : 'text-brand-500 dark:text-white/50'}`}>
          CONSTRUÇÃO CIVIL
        </span>
      </span>
    </span>
  )
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Sobre o hero (escuro) o texto é sempre claro
  const light = !scrolled || theme === 'dark'

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-paper/85 dark:bg-dark-900/85 backdrop-blur-xl border-b border-brand-950/5 dark:border-white/5 py-2.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a href="#hero" aria-label="Nova Linha — início">
          <Wordmark light={light} />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-[13px] font-medium tracking-wide transition-colors after:absolute after:left-0 after:-bottom-1.5 after:h-px after:w-0 after:bg-sand-400 after:transition-all hover:after:w-full ${
                light ? 'text-white/80 hover:text-white' : 'text-brand-800 hover:text-brand-950'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={toggle}
            aria-label="Alternar tema"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              light ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-brand-950/5 hover:bg-brand-950/10 text-brand-800'
            }`}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <a href="#contact" className="hidden sm:inline-flex btn-sand !py-2.5 !px-5 !text-[13px]">
            Agendar visita
          </a>

          <button
            className={`lg:hidden w-9 h-9 flex items-center justify-center ${light ? 'text-white' : 'text-brand-900'}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden mt-2 bg-brand-950/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col">
              {navLinks.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-baseline gap-4 py-3.5 border-b border-white/5 text-white text-lg font-light"
                >
                  <span className="text-sand-400 text-[11px] font-semibold">0{i + 1}</span>
                  {link.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMenuOpen(false)} className="btn-sand mt-6">
                Agendar visita
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
