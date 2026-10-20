import { motion } from 'framer-motion'
import { ArrowRight, Check, MapPin } from 'lucide-react'
import { Property } from '../types'
import { properties } from '../data/properties'
import { formatPrice, whatsappLink } from '../utils/format'

// Imóvel âncora da coleção: maior metragem e padrão
const featured = properties.find((p) => p.id === 4)!

export default function Featured({ onOpen }: { onOpen: (p: Property) => void }) {
  const [main, a, b] = [featured.gallery[0], featured.gallery[1], featured.gallery[2]]

  const facts = [
    { value: String(featured.areaBuilt), unit: 'm²', label: 'privativos' },
    { value: String(featured.bedrooms), unit: '', label: `dormitórios · ${featured.suites} suíte` },
    { value: String(featured.parking), unit: '', label: 'vagas de garagem' },
  ]

  return (
    <section className="py-20 sm:py-28 bg-paper dark:bg-dark-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Mosaico de fotos */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 grid grid-cols-6 grid-rows-6 gap-3 h-[420px] sm:h-[560px]"
          >
            <button
              onClick={() => onOpen(featured)}
              className="col-span-4 row-span-6 relative rounded-2xl overflow-hidden group"
            >
              <img src={main} alt={featured.title} className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-105" />
              <span className="absolute top-4 left-4 bg-sand-400 text-brand-950 text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1.5 rounded-full">
                Destaque da coleção
              </span>
            </button>
            <button onClick={() => onOpen(featured)} className="col-span-2 row-span-3 rounded-2xl overflow-hidden group">
              <img src={a} alt="" className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
            </button>
            <button onClick={() => onOpen(featured)} className="col-span-2 row-span-3 relative rounded-2xl overflow-hidden group">
              <img src={b} alt="" className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
              <span className="absolute inset-0 bg-brand-950/60 flex flex-col items-center justify-center text-white">
                <span className="text-3xl font-extralight">+{featured.gallery.length - 3}</span>
                <span className="text-[10px] tracking-[0.2em] uppercase mt-1">fotos</span>
              </span>
            </button>
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <p className="eyebrow text-brand-500 dark:text-sand-300 mb-5">Centro de Mafra</p>
            <h2 className="text-4xl sm:text-5xl font-extralight leading-[1.08] text-brand-950 dark:text-white">
              Amplitude para viver <span className="accent text-brand-600 dark:text-sand-300">no coração</span> da cidade.
            </h2>
            <p className="flex items-start gap-2 text-sm text-brand-500 dark:text-white/50 mt-5">
              <MapPin size={15} className="mt-0.5 shrink-0" />
              {featured.location}
            </p>

            <div className="grid grid-cols-3 mt-9 border-y border-brand-950/10 dark:border-white/10">
              {facts.map((f, i) => (
                <div key={f.label} className={`py-5 ${i > 0 ? 'pl-4 sm:pl-6 border-l border-brand-950/10 dark:border-white/10' : ''}`}>
                  <p className="text-3xl sm:text-4xl font-extralight text-brand-950 dark:text-white">
                    {f.value}
                    <span className="text-base ml-0.5">{f.unit}</span>
                  </p>
                  <p className="text-[11px] text-brand-500 dark:text-white/50 mt-1 leading-snug">{f.label}</p>
                </div>
              ))}
            </div>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 mt-7">
              {featured.extras.slice(0, 6).map((e) => (
                <li key={e} className="flex items-center gap-2 text-sm text-brand-800 dark:text-white/75">
                  <Check size={14} className="text-sand-500 shrink-0" /> {e}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-500 dark:text-white/45">Investimento</p>
                <p className="text-3xl font-light text-brand-950 dark:text-white mt-1">{formatPrice(featured.price)}</p>
              </div>
              <div className="flex flex-wrap gap-3 whitespace-nowrap">
                <button onClick={() => onOpen(featured)} className="btn-petrol group">
                  Ver imóvel <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href={whatsappLink(`Olá! Gostaria de agendar uma visita ao ${featured.title}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn border border-brand-950/15 dark:border-white/20 text-brand-900 dark:text-white hover:border-brand-950/40 dark:hover:border-white/50"
                >
                  Agendar
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
