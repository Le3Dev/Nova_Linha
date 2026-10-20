import { forwardRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, BedDouble, Camera, Car, Maximize2 } from 'lucide-react'
import { Property } from '../types'
import { cityOf, formatArea, formatPrice } from '../utils/format'

interface Props {
  property: Property
  onClick: (property: Property) => void
  index: number
}

const tagStyles: Record<string, string> = {
  'Lançamento':        'bg-brand-700 text-white',
  'Destaque':          'bg-sand-400 text-brand-950',
  'Pronto para morar': 'bg-white/90 text-brand-900',
}

const PropertyCard = forwardRef<HTMLElement, Props>(function PropertyCard({ property, onClick, index }, ref) {
  const [hovering, setHovering] = useState(false)
  const [frame, setFrame] = useState(0)
  const preview = property.gallery.slice(0, 4)

  // Ao passar o mouse, percorre as primeiras fotos do imóvel
  useEffect(() => {
    if (!hovering || preview.length < 2) {
      setFrame(0)
      return
    }
    const t = setInterval(() => setFrame((f) => (f + 1) % preview.length), 1100)
    return () => clearInterval(t)
  }, [hovering, preview.length])

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="group"
    >
      <button onClick={() => onClick(property)} className="block w-full text-left" aria-label={`Ver ${property.title}`}>
        <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-brand-900">
          <AnimatePresence initial={false}>
            <motion.img
              key={frame}
              src={preview[frame]}
              alt={property.title}
              loading="lazy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/90 via-brand-950/10 to-transparent" />

          <div className="absolute top-4 inset-x-4 flex items-start justify-between">
            {property.tag ? (
              <span className={`text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full backdrop-blur ${tagStyles[property.tag]}`}>
                {property.tag}
              </span>
            ) : <span />}
            <span className="flex items-center gap-1.5 text-[11px] text-white bg-brand-950/50 backdrop-blur px-2.5 py-1 rounded-full">
              <Camera size={12} /> {property.gallery.length}
            </span>
          </div>

          {/* Progresso das fotos no hover */}
          {preview.length > 1 && (
            <div className="absolute top-14 inset-x-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              {preview.map((_, i) => (
                <span key={i} className={`h-0.5 flex-1 rounded-full ${i === frame ? 'bg-white' : 'bg-white/30'}`} />
              ))}
            </div>
          )}

          <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6">
            <p className="text-sand-300 text-[10px] font-semibold tracking-[0.25em] uppercase">
              {String(index + 1).padStart(2, '0')} · {cityOf(property)}/SC
            </p>
            <h3 className="text-white text-xl font-light leading-snug mt-2">{property.title}</h3>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-brand-700 dark:text-white/60 mt-5 px-1">
          <span className="flex items-center gap-1.5"><Maximize2 size={13} className="text-sand-500" />{formatArea(property.areaBuilt)}</span>
          <span className="w-px h-3 bg-brand-950/15 dark:bg-white/15" />
          <span className="flex items-center gap-1.5"><BedDouble size={13} className="text-sand-500" />{property.bedrooms} dorm.</span>
          <span className="w-px h-3 bg-brand-950/15 dark:bg-white/15" />
          <span className="flex items-center gap-1.5"><Car size={13} className="text-sand-500" />{property.parking} vaga{property.parking > 1 ? 's' : ''}</span>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 mx-1 border-t border-brand-950/10 dark:border-white/10">
          <p className="text-xl font-light text-brand-950 dark:text-white">{formatPrice(property.price)}</p>
          <span className="w-10 h-10 rounded-full border border-brand-950/15 dark:border-white/20 flex items-center justify-center text-brand-900 dark:text-white transition-all duration-300 group-hover:bg-brand-700 group-hover:border-brand-700 group-hover:text-white group-hover:rotate-45">
            <ArrowUpRight size={17} />
          </span>
        </div>
      </button>
    </motion.article>
  )
})

export default PropertyCard
