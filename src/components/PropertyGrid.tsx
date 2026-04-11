import { useState } from 'react'
import { motion } from 'framer-motion'
import { Property } from '../types'
import { properties } from '../data/properties'
import PropertyCard from './PropertyCard'
import PropertyModal from './PropertyModal'

const filters = ['Todos', 'Lançamento', 'Destaque', 'Pronto para morar'] as const
type Filter = (typeof filters)[number]

export default function PropertyGrid() {
  const [selected, setSelected] = useState<Property | null>(null)
  const [activeFilter, setActiveFilter] = useState<Filter>('Todos')

  const filtered =
    activeFilter === 'Todos'
      ? properties
      : properties.filter((p) => p.tag === activeFilter)

  return (
    <section id="properties" className="py-16 sm:py-24 bg-gray-50 dark:bg-dark-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <p className="text-brand-500 dark:text-brand-400 text-xs font-black tracking-[0.22em] uppercase mb-3">
            Portfólio
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-dark-900 dark:text-white mb-4 tracking-tight">
            Nossos Imóveis
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Imóveis selecionados com localização privilegiada, qualidade
            construtiva e o padrão que só a Nova Linha oferece.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all duration-200 ${
                activeFilter === f
                  ? 'bg-brand-500 text-white shadow-md'
                  : 'bg-white dark:bg-dark-700 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:border-brand-400 hover:text-brand-600 dark:hover:text-brand-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7">
          {filtered.map((property, i) => (
            <PropertyCard
              key={property.id}
              property={property}
              index={i}
              onClick={setSelected}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-400 py-16 text-sm">
            Nenhum imóvel encontrado nesta categoria.
          </p>
        )}
      </div>

      {selected && (
        <PropertyModal property={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  )
}
