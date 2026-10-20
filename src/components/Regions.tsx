import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { images } from '../data/images'
import { properties } from '../data/properties'
import { cityOf } from '../utils/format'

const regions = [
  {
    city: 'Mafra',
    title: 'A tranquilidade do planalto, com tudo por perto.',
    text: 'Bairros consolidados como Centro, Vila Nova e Passo — próximos a comércios, escolas e serviços, ideais para a rotina da família.',
    image: images.alipio[0],
  },
  {
    city: 'Itapoá',
    title: 'O mar como vizinho, a 100 metros de casa.',
    text: 'No litoral norte catarinense, uma cobertura para morar perto da praia ou investir no litoral catarinense.',
    image: images.leonides[0],
  },
]

export default function Regions() {
  return (
    <section id="regions" className="py-20 sm:py-28 bg-brand-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl mb-12 sm:mb-16"
        >
          <p className="eyebrow text-sand-300 mb-5">Onde construímos</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight leading-[1.05]">
            Dois cenários, <span className="accent text-sand-300">um mesmo padrão</span>.
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {regions.map((r, i) => {
            const count = properties.filter((p) => cityOf(p) === r.city).length
            return (
              <motion.a
                key={r.city}
                href="#properties"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className={`group relative block rounded-3xl overflow-hidden h-[460px] sm:h-[540px] ${i === 1 ? 'md:mt-16' : ''}`}
              >
                <img src={r.image} alt={r.city} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.6s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-5xl sm:text-6xl font-extralight tracking-tight">{r.city}</h3>
                    <span className="text-xs text-white/60">{count} imóve{count > 1 ? 'is' : 'l'}</span>
                  </div>
                  <p className="text-lg font-light mt-4 text-white/90">{r.title}</p>
                  <p className="text-sm text-white/55 mt-2 leading-relaxed max-w-md">{r.text}</p>
                  <span className="inline-flex items-center gap-2 mt-6 text-sand-300 text-sm font-medium">
                    Ver imóveis <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </motion.a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
