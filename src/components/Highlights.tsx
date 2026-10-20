import { motion } from 'framer-motion'
import { properties } from '../data/properties'

// Números calculados a partir do catálogo real — sempre atualizados
const priced = properties.filter((p) => p.price > 0).map((p) => p.price)
const maxArea = Math.max(...properties.map((p) => p.areaBuilt))

const stats = [
  { value: String(properties.length).padStart(2, '0'), label: 'Imóveis disponíveis' },
  { value: '02', label: 'Cidades em Santa Catarina' },
  { value: `${Math.round(maxArea)} m²`, label: 'Até de área construída' },
  { value: `R$ ${Math.round(Math.min(...priced) / 1000)} mil`, label: 'Valores a partir de' },
]

const ribbon = [
  'Pronto para morar',
  'Mafra · SC',
  'Itapoá · SC',
  'A 100 m da praia',
  'Acabamento em porcelanato',
  'Atendimento direto com a construtora',
  'Churrasqueira e espaço gourmet',
]

export default function Highlights() {
  return (
    <section className="bg-brand-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 border-t border-white/10">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className={`py-8 sm:py-10 px-2 sm:px-6 ${i % 2 === 1 ? 'border-l border-white/10' : ''} ${
              i > 1 ? 'border-t md:border-t-0 border-white/10' : ''
            } ${i === 2 ? 'md:border-l' : ''}`}
          >
            <p className="text-3xl sm:text-4xl font-extralight tracking-tight">{s.value}</p>
            <p className="text-white/50 text-[11px] sm:text-xs mt-2 tracking-wide">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Faixa rolante */}
      <div className="border-y border-white/10 bg-brand-900/60 overflow-hidden py-4">
        <div className="flex w-max animate-marquee">
          {[...ribbon, ...ribbon].map((item, i) => (
            <span key={i} className="flex items-center gap-6 px-6 text-sm font-light text-white/70 whitespace-nowrap">
              {item}
              <span className="w-1.5 h-1.5 rotate-45 bg-sand-400" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
