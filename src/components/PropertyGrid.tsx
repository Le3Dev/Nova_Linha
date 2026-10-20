import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Property } from '../types'
import { properties } from '../data/properties'
import { cityOf } from '../utils/format'
import PropertyCard from './PropertyCard'

const filters = ['Todos', 'Mafra', 'Itapoá'] as const
type Filter = (typeof filters)[number]

export default function PropertyGrid({ onOpen }: { onOpen: (p: Property) => void }) {
  const [activeFilter, setActiveFilter] = useState<Filter>('Todos')

  const filtered =
    activeFilter === 'Todos' ? properties : properties.filter((p) => cityOf(p) === activeFilter)

  const countFor = (f: Filter) =>
    f === 'Todos' ? properties.length : properties.filter((p) => cityOf(p) === f).length

  return (
    <section id="properties" className="py-20 sm:py-28 bg-white dark:bg-dark-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow text-brand-500 dark:text-sand-300 mb-5">A coleção</p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-brand-950 dark:text-white leading-[1.05]">
              Imóveis à <span className="accent text-brand-600 dark:text-sand-300">sua espera</span>
            </h2>
            <p className="text-brand-600/80 dark:text-white/55 max-w-md mt-5 text-sm sm:text-base leading-relaxed">
              Cada projeto pensado para entregar conforto, bom gosto e valorização.
              Passe o mouse para ver mais fotos.
            </p>
          </motion.div>

          <div className="flex gap-1 p-1 rounded-full bg-paper dark:bg-dark-700 self-start md:self-auto">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`relative px-4 sm:px-5 py-2.5 text-xs sm:text-[13px] font-semibold rounded-full transition-colors ${
                  activeFilter === f ? 'text-white' : 'text-brand-700 dark:text-white/60 hover:text-brand-950 dark:hover:text-white'
                }`}
              >
                {activeFilter === f && (
                  <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-brand-700 dark:bg-brand-600" />
                )}
                <span className="relative">
                  {f} <span className="opacity-60 font-normal">{countFor(f)}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          <AnimatePresence mode="popLayout">
            {filtered.map((property, i) => (
              <PropertyCard key={property.id} property={property} index={i} onClick={onOpen} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
