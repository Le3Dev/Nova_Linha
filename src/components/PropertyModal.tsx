import { useEffect, useState, useCallback } from 'react'
import {
  X, ChevronLeft, ChevronRight,
  MapPin, Maximize2, BedDouble, ShowerHead, Car, Star, MessageCircle,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Property } from '../types'
import { WHATSAPP_NUMBER } from '../data/properties'

interface Props {
  property: Property
  onClose: () => void
}

export default function PropertyModal({ property, onClose }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)

  const prev = useCallback(() =>
    setActiveIndex((i) => (i === 0 ? property.gallery.length - 1 : i - 1)),
    [property.gallery.length]
  )

  const next = useCallback(() =>
    setActiveIndex((i) => (i === property.gallery.length - 1 ? 0 : i + 1)),
    [property.gallery.length]
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, prev, next])

  const priceLabel =
    property.price === 0
      ? 'A combinar'
      : new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          maximumFractionDigits: 0,
        }).format(property.price)

  const whatsappMsg = encodeURIComponent(
    `Olá, tenho interesse no imóvel ${property.title} da Nova Linha. Ainda está disponível?`
  )
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMsg}`

  const specs = [
    { icon: <Maximize2 size={15} />, label: 'Área útil',    value: `${property.area} m²` },
    { icon: <Maximize2 size={15} />, label: 'Construída',   value: `${property.areaBuilt} m²` },
    { icon: <BedDouble  size={15} />, label: 'Dormitórios', value: String(property.bedrooms) },
    ...(property.suites > 0
      ? [{ icon: <Star size={15} />, label: 'Suítes', value: String(property.suites) }]
      : []),
    { icon: <ShowerHead size={15} />, label: 'Banheiros',   value: String(property.bathrooms) },
    { icon: <Car        size={15} />, label: 'Vagas',       value: String(property.parking) },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 md:p-8"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Panel — bottom-sheet on mobile, centered modal on sm+ */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }}
        className="relative z-10 bg-white dark:bg-dark-800 w-full sm:max-w-5xl sm:rounded-2xl rounded-t-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl max-h-[94vh] sm:max-h-[90vh]"
      >
        {/* ─── Gallery ─── */}
        <div className="md:w-[52%] relative bg-dark-900 shrink-0">
          {/* Main image */}
          <div className="relative h-52 sm:h-72 md:h-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={property.gallery[activeIndex]}
                alt={`${property.title} — foto ${activeIndex + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Arrows */}
            {property.gallery.length > 1 && (
              <>
                <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/55 hover:bg-black/75 flex items-center justify-center text-white transition-colors">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/55 hover:bg-black/75 flex items-center justify-center text-white transition-colors">
                  <ChevronRight size={18} />
                </button>
              </>
            )}

            {/* Dot indicators */}
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5">
              {property.gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`rounded-full transition-all ${
                    i === activeIndex ? 'w-5 h-1.5 bg-brand-400' : 'w-1.5 h-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>

            <span className="absolute top-2.5 right-2.5 bg-black/60 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
              {activeIndex + 1}/{property.gallery.length}
            </span>
          </div>

          {/* Thumbnails (desktop only) */}
          <div className="hidden md:flex gap-1.5 p-2.5 bg-dark-900/90 overflow-x-auto scrollbar-hide">
            {property.gallery.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${
                  i === activeIndex ? 'border-brand-400' : 'border-transparent opacity-55 hover:opacity-90'
                }`}
              >
                <img src={src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* ─── Details ─── */}
        <div className="flex-1 flex flex-col overflow-y-auto scrollbar-hide">
          {/* Header */}
          <div className="flex items-start justify-between px-4 sm:px-5 pt-4 pb-3 border-b border-gray-100 dark:border-white/10">
            <div className="pr-3">
              <h2 className="font-display text-lg sm:text-xl font-black text-dark-900 dark:text-white leading-tight">
                {property.title}
              </h2>
              <p className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                <MapPin size={12} className="text-brand-500 shrink-0" />
                {property.location}
              </p>
            </div>
            <button
              onClick={onClose}
              className="shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 flex items-center justify-center transition-colors text-gray-600 dark:text-gray-300"
            >
              <X size={15} />
            </button>
          </div>

          {/* Price */}
          <div className="px-4 sm:px-5 py-3 bg-brand-50 dark:bg-brand-950/20 border-b border-brand-100 dark:border-brand-900/30">
            <p className="text-[10px] font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-0.5">Valor</p>
            <p className="font-display text-2xl font-black text-brand-700 dark:text-brand-300">{priceLabel}</p>
          </div>

          {/* Specs */}
          <div className="px-4 sm:px-5 py-3 grid grid-cols-3 gap-2 border-b border-gray-100 dark:border-white/10">
            {specs.map((s) => (
              <div key={s.label} className="bg-gray-50 dark:bg-dark-700 rounded-xl p-2.5 text-center">
                <span className="text-brand-500 flex justify-center mb-1">{s.icon}</span>
                <p className="font-black text-dark-900 dark:text-white text-sm">{s.value}</p>
                <p className="text-gray-400 dark:text-gray-500 text-[10px] leading-tight">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Extras */}
          {property.extras.length > 0 && (
            <div className="px-4 sm:px-5 py-3 border-b border-gray-100 dark:border-white/10">
              <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Diferenciais</p>
              <div className="flex flex-wrap gap-1.5">
                {property.extras.map((e) => (
                  <span key={e} className="text-xs px-2.5 py-1 rounded-full bg-brand-50 dark:bg-brand-950/25 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800/50 font-medium">
                    {e}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="px-4 sm:px-5 py-3 flex-1">
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">Sobre o imóvel</p>
            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">{property.description}</p>
          </div>

          {/* CTA */}
          <div className="px-4 sm:px-5 pb-5 pt-3 border-t border-gray-100 dark:border-white/10">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black rounded-xl transition-colors text-sm shadow-lg"
            >
              <MessageCircle size={19} />
              Verificar Disponibilidade
            </a>
            <p className="text-center text-[10px] text-gray-400 dark:text-gray-500 mt-1.5">
              Você será redirecionado ao WhatsApp
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
