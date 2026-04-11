import { MapPin, Maximize2, BedDouble, Car } from 'lucide-react'
import { motion } from 'framer-motion'
import { Property } from '../types'

interface Props {
  property: Property
  onClick: (property: Property) => void
  index: number
}

const tagColors: Record<string, string> = {
  'Lançamento':        'bg-brand-500 text-white',
  'Destaque':          'bg-dark-700 text-white',
  'Pronto para morar': 'bg-emerald-600 text-white',
}

export default function PropertyCard({ property, onClick, index }: Props) {
  const priceLabel =
    property.price === 0
      ? 'A combinar'
      : new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          maximumFractionDigits: 0,
        }).format(property.price)

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => onClick(property)}
      className="group cursor-pointer bg-white dark:bg-dark-800 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
    >
      {/* Cover */}
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={property.coverImage}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-106"
          loading="lazy"
        />
        {property.tag && (
          <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-md tracking-wide ${tagColors[property.tag]}`}>
            {property.tag}
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute bottom-3 right-3 bg-white/90 dark:bg-dark-900/90 backdrop-blur-sm text-dark-900 dark:text-white text-xs font-bold px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Ver detalhes →
        </span>
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="font-display font-bold text-base sm:text-lg text-dark-900 dark:text-white mb-1 group-hover:text-brand-600 dark:group-hover:text-brand-300 transition-colors leading-snug">
          {property.title}
        </h3>

        <p className="flex items-start gap-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-4">
          <MapPin size={13} className="text-brand-500 shrink-0 mt-0.5" />
          {property.location}
        </p>

        <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <Maximize2 size={13} className="text-brand-500" />
            {property.area} m²
          </span>
          <span className="flex items-center gap-1.5">
            <BedDouble size={13} className="text-brand-500" />
            {property.bedrooms} dorm.
          </span>
          <span className="flex items-center gap-1.5">
            <Car size={13} className="text-brand-500" />
            {property.parking} vaga{property.parking > 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 dark:border-white/10 pt-4">
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
            {property.price === 0 ? 'Valor' : 'A partir de'}
          </p>
          <p className="font-display font-black text-brand-600 dark:text-brand-300 text-base sm:text-lg">
            {priceLabel}
          </p>
        </div>
      </div>
    </motion.article>
  )
}
