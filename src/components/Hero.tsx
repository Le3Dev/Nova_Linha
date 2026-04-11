import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { images } from '../data/images'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as const },
})

const stats = [
  { value: '5+', label: 'Anos de mercado' },
  { value: '5+', label: 'Imóveis entregues' },
  { value: '100%', label: 'Clientes satisfeitos' },
]

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${images.leonides[0]}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/85 via-dark-900/65 to-dark-900/92" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-5 sm:px-8 text-center pt-24 pb-16">
        <motion.p
          {...fadeUp(0)}
          className="inline-flex items-center gap-2 text-brand-300 text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-5"
        >
          <span className="w-6 sm:w-8 h-px bg-brand-300" />
          Construtora Premium — Santa Catarina
          <span className="w-6 sm:w-8 h-px bg-brand-300" />
        </motion.p>

        <motion.h1
          {...fadeUp(0.15)}
          className="font-display text-4xl sm:text-5xl md:text-7xl font-black text-white leading-tight mb-5 tracking-tight"
        >
          Onde sonhos se{' '}
          <span className="text-brand-300">tornam lares</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.3)}
          className="text-white/70 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-light"
        >
          Na Nova Linha, transformamos projetos em lares com qualidade,
          inovação e compromisso total com a satisfação dos nossos clientes.
        </motion.p>

        <motion.div
          {...fadeUp(0.45)}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="#properties"
            className="w-full sm:w-auto px-7 py-3.5 sm:py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-lg transition-colors text-sm sm:text-base shadow-lg shadow-brand-900/40"
          >
            Ver Imóveis
          </a>
          <a
            href="#about"
            className="w-full sm:w-auto px-7 py-3.5 sm:py-4 border-2 border-white/35 hover:border-white/65 text-white font-semibold rounded-lg transition-colors text-sm sm:text-base"
          >
            Conheça a Empresa
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.6)}
          className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-6 max-w-sm sm:max-w-lg mx-auto"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-2xl sm:text-3xl font-black text-brand-300">{s.value}</p>
              <p className="text-white/55 text-[10px] sm:text-xs mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.a
        href="#properties"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/80 transition-colors animate-bounce"
        aria-label="Rolar para baixo"
      >
        <ArrowDown size={22} />
      </motion.a>
    </section>
  )
}
