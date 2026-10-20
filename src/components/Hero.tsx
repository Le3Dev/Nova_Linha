import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowUpRight, MapPin } from 'lucide-react'
import { Property } from '../types'
import { properties } from '../data/properties'
import { cityOf, formatPrice, whatsappLink } from '../utils/format'

// Imóveis exibidos no slideshow do topo (fachadas com melhor impacto)
const slides = [4, 2, 1, 5]
  .map((id) => properties.find((p) => p.id === id))
  .filter((p): p is Property => Boolean(p))

const SLIDE_MS = 6500

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export default function Hero({ onOpen }: { onOpen: (p: Property) => void }) {
  const [index, setIndex] = useState(0)
  const current = slides[index]

  useEffect(() => {
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), SLIDE_MS)
    return () => clearTimeout(t)
  }, [index])

  return (
    <section id="hero" className="relative h-[100svh] min-h-[680px] overflow-hidden bg-brand-950">
      {/* Slideshow com efeito Ken Burns */}
      <AnimatePresence initial={false}>
        <motion.img
          key={current.id}
          src={current.coverImage}
          alt={current.title}
          initial={{ opacity: 0, scale: 1.12 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.2 }, scale: { duration: SLIDE_MS / 1000 + 1.5, ease: 'linear' } }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/70 to-brand-950/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-brand-950/60" />

      {/* Linhas verticais finas — o conceito "Nova Linha" */}
      <div aria-hidden className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 pointer-events-none hidden md:block">
        <div className="relative h-full">
          {[25, 50, 75].map((x, i) => (
            <motion.span
              key={x}
              className="absolute top-0 bottom-0 w-px bg-white/[0.07] origin-top"
              style={{ left: `${x}%` }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1.6, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
          <motion.span
            className="absolute top-0 w-px h-40 bg-gradient-to-b from-transparent via-sand-400 to-transparent"
            style={{ left: '50%' }}
            animate={{ y: ['-10vh', '110vh'] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-end pb-28 sm:pb-32 pt-28">
        <div className="grid lg:grid-cols-[1fr_340px] gap-10 items-end">
          <div className="max-w-3xl">
            <motion.p {...fadeUp(0.1)} className="eyebrow text-sand-300 mb-6">
              Direto da construtora · Mafra & Itapoá — SC
            </motion.p>

            <motion.h1
              {...fadeUp(0.25)}
              className="text-white text-[2.6rem] leading-[1.05] sm:text-6xl md:text-7xl font-extralight tracking-tight"
            >
              O endereço da sua <span className="accent text-sand-300">nova fase</span>
              <br className="hidden sm:block" /> já está pronto.
            </motion.h1>

            <motion.p
              {...fadeUp(0.4)}
              className="mt-6 text-white/70 text-base sm:text-lg max-w-xl leading-relaxed font-light"
            >
              Sobrados e apartamentos construídos com acabamento de qualidade, em bairros
              valorizados de Mafra e a poucos passos do mar em Itapoá.
            </motion.p>

            <motion.div {...fadeUp(0.55)} className="mt-9 flex flex-col sm:flex-row gap-3">
              <a href="#properties" className="btn-sand group">
                Explorar imóveis
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href={whatsappLink('Olá! Vim pelo site da Nova Linha e gostaria de conhecer os imóveis disponíveis.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Falar com um consultor
              </a>
            </motion.div>
          </div>

          {/* Cartão do imóvel em destaque no slide atual */}
          <motion.div {...fadeUp(0.7)} className="hidden lg:block">
            <AnimatePresence mode="wait">
              <motion.button
                key={current.id}
                onClick={() => onOpen(current)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
                className="group w-full text-left bg-white/[0.07] hover:bg-white/[0.12] backdrop-blur-xl border border-white/15 rounded-2xl p-6 transition-colors"
              >
                <p className="text-sand-300 text-[10px] font-semibold tracking-[0.25em] uppercase mb-3">
                  Na imagem
                </p>
                <h3 className="text-white text-lg font-medium leading-snug">{current.title}</h3>
                <p className="flex items-center gap-1.5 text-white/55 text-xs mt-2">
                  <MapPin size={12} /> {cityOf(current)}/SC
                </p>
                <div className="flex items-end justify-between mt-6 pt-5 border-t border-white/10">
                  <div>
                    <p className="text-white/45 text-[10px] uppercase tracking-widest">Valor</p>
                    <p className="text-white text-2xl font-light mt-0.5">{formatPrice(current.price)}</p>
                  </div>
                  <span className="w-10 h-10 rounded-full bg-sand-400 text-brand-950 flex items-center justify-center transition-transform group-hover:rotate-45">
                    <ArrowUpRight size={18} />
                  </span>
                </div>
              </motion.button>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Mobile: legenda do slide */}
        <button
          onClick={() => onOpen(current)}
          className="lg:hidden mt-8 flex items-center gap-2 text-white/70 text-xs text-left"
        >
          <span className="text-sand-300 font-semibold uppercase tracking-widest text-[10px]">Na imagem</span>
          <span className="truncate">{current.title}</span>
          <ArrowUpRight size={14} className="shrink-0" />
        </button>
      </div>

      {/* Indicadores com barra de progresso */}
      <div className="absolute bottom-0 inset-x-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-4 gap-3 sm:gap-6 pb-6 sm:pb-8">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              className="text-left group"
              aria-label={`Ver ${s.title}`}
            >
              <span className="block h-px bg-white/20 overflow-hidden">
                {i === index && (
                  <motion.span
                    key={index}
                    className="block h-full bg-sand-400"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: SLIDE_MS / 1000, ease: 'linear' }}
                  />
                )}
              </span>
              <span
                className={`hidden sm:flex items-baseline gap-2 mt-3 text-xs transition-colors ${
                  i === index ? 'text-white' : 'text-white/40 group-hover:text-white/70'
                }`}
              >
                <span className="text-[10px] font-semibold">0{i + 1}</span>
                <span className="truncate">{s.title.split(' — ')[0]}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
