import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { whatsappLink } from '../utils/format'

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={whatsappLink('Olá! Vim pelo site da Nova Linha e gostaria de mais informações sobre os imóveis.')}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar no WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          className="fixed bottom-5 right-5 z-30 group flex items-center gap-3"
        >
          <span className="hidden sm:block bg-white dark:bg-dark-700 text-brand-950 dark:text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
            Fale com a gente
          </span>
          <span className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl shadow-black/20">
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
            <MessageCircle size={24} className="relative" />
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  )
}
