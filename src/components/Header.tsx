import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { logo } from '../data/images'

const navLinks = [
  { label: 'Início', href: '#hero' },
  { label: 'Imóveis', href: '#properties' },
  { label: 'Sobre', href: '#about' },
  { label: 'Contato', href: '#contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass =
    scrolled && theme === 'light'
      ? 'text-gray-700 hover:text-brand-600'
      : 'text-white/85 hover:text-white'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/96 dark:bg-dark-900/96 backdrop-blur-md shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

        {/* ── Logo ──
            Sobre fundo escuro (hero ou dark mode) a logo PNG tem fundo branco,
            então envolvemos em uma pílula branca/translúcida para mantê-la visível.
            Quando scrollado no modo claro ela já tem contraste natural. */}
        <a href="#hero" aria-label="Nova Linha">
          <span
            className={`flex items-center transition-all duration-300 ${
              !scrolled || theme === 'dark'
                ? 'bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm'
                : ''
            }`}
          >
            <img
              src={logo}
              alt="Nova Linha"
              className="h-8 sm:h-10 w-auto object-contain"
            />
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold tracking-wide transition-colors ${linkClass}`}
            >
              {link.label}
            </a>
          ))}

          <button
            onClick={toggle}
            aria-label="Alternar tema"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              scrolled && theme === 'light'
                ? 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                : 'bg-white/15 hover:bg-white/25 text-white'
            }`}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>

          <a
            href="#contact"
            className="px-5 py-2.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold tracking-wide transition-colors shadow-md"
          >
            Fale Conosco
          </a>
        </nav>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Alternar tema"
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              scrolled && theme === 'light'
                ? 'bg-gray-100 text-gray-600'
                : 'bg-white/15 text-white'
            }`}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            className={scrolled && theme === 'light' ? 'text-gray-800' : 'text-white'}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="md:hidden bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-white/10 overflow-hidden"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-gray-700 dark:text-white/80 hover:text-brand-600 dark:hover:text-brand-400 text-sm font-semibold py-3 border-b border-gray-100 dark:border-white/5 last:border-0 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-3 py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold text-center transition-colors"
              >
                Fale Conosco
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
