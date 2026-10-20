import { useEffect, useState, useCallback } from 'react'
import {
  X, ChevronLeft, ChevronRight, Check,
  MapPin, Maximize2, BedDouble, ShowerHead, Car, Star, MessageCircle, CalendarDays, Home,
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Property } from '../types'
import { cityOf, formatArea, formatPrice, whatsappLink } from '../utils/format'

interface Props {
  property: Property
  onClose: () => void
}

export default function PropertyModal({ property, onClose }: Props) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const total = property.gallery.length

  const go = useCallback((delta: number) => {
    setDirection(delta)
    setActiveIndex((i) => (i + delta + total) % total)
  }, [total])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') go(-1)
      if (e.key === 'ArrowRight') go(1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, go])

  const specs = [
    { icon: <Maximize2 size={16} />, label: 'Área construída', value: formatArea(property.areaBuilt) },
    { icon: <Home size={16} />,      label: 'Área útil',       value: formatArea(property.area) },
    { icon: <BedDouble size={16} />, label: 'Dormitórios',     value: String(property.bedrooms) },
    ...(property.suites > 0 ? [{ icon: <Star size={16} />, label: 'Suítes', value: String(property.suites) }] : []),
    { icon: <ShowerHead size={16} />, label: 'Banheiros',      value: String(property.bathrooms) },
    { icon: <Car size={16} />,        label: 'Vagas',          value: String(property.parking) },
    ...(property.areaTerrain ? [{ icon: <Maximize2 size={16} />, label: 'Terreno', value: formatArea(property.areaTerrain) }] : []),
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-stretch sm:items-center justify-center sm:p-6" role="dialog" aria-modal="true" aria-label={property.title}>
      <motion.div
        className="absolute inset-0 bg-brand-950/85 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 bg-white dark:bg-dark-800 w-full max-w-6xl sm:rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-2xl sm:max-h-[92vh]"
      >
        {/* Galeria */}
        <div className="lg:w-[60%] relative bg-brand-950 shrink-0 flex flex-col">
          <div className="relative h-[42vh] sm:h-[48vh] lg:h-auto lg:flex-1 overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.img
                key={activeIndex}
                src={property.gallery[activeIndex]}
                alt={`${property.title} — foto ${activeIndex + 1}`}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -60 }}
                transition={{ duration: 0.35 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) go(1)
                  else if (info.offset.x > 60) go(-1)
                }}
                className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing"
              />
            </AnimatePresence>

            {total > 1 && (
              <>
                <button onClick={() => go(-1)} aria-label="Foto anterior" className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur flex items-center justify-center text-white transition-colors">
                  <ChevronLeft size={20} />
                </button>
                <button onClick={() => go(1)} aria-label="Próxima foto" className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur flex items-center justify-center text-white transition-colors">
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            <span className="absolute bottom-3 left-3 bg-brand-950/60 backdrop-blur text-white text-xs font-medium px-3 py-1 rounded-full">
              {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>

            <button
              onClick={onClose}
              aria-label="Fechar"
              className="lg:hidden absolute top-3 right-3 w-10 h-10 rounded-full bg-brand-950/60 backdrop-blur flex items-center justify-center text-white"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex gap-2 p-3 overflow-x-auto scrollbar-hide bg-brand-950">
            {property.gallery.map((src, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > activeIndex ? 1 : -1); setActiveIndex(i) }}
                className={`shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden ring-2 transition-all ${
                  i === activeIndex ? 'ring-sand-400' : 'ring-transparent opacity-50 hover:opacity-100'
                }`}
              >
                <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Detalhes */}
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">
          <div className="p-6 sm:p-8 flex-1">
            <div className="flex items-start justify-between gap-4">
              <p className="eyebrow text-brand-500 dark:text-sand-300">{cityOf(property)} · SC</p>
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="hidden lg:flex shrink-0 w-10 h-10 -mt-2 -mr-2 rounded-full hover:bg-brand-950/5 dark:hover:bg-white/10 items-center justify-center text-brand-800 dark:text-white/70 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light text-brand-950 dark:text-white leading-tight mt-3">
              {property.title}
            </h2>
            <p className="flex items-start gap-2 text-sm text-brand-500 dark:text-white/50 mt-3">
              <MapPin size={14} className="mt-0.5 shrink-0" /> {property.location}
            </p>

            <div className="mt-6 p-5 rounded-2xl bg-paper dark:bg-dark-700 flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-brand-500 dark:text-white/45">Valor</p>
                <p className="text-3xl font-light text-brand-950 dark:text-white mt-1">{formatPrice(property.price)}</p>
              </div>
              {property.tag && (
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full bg-brand-700 text-white">
                  {property.tag}
                </span>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px mt-6 bg-brand-950/10 dark:bg-white/10 rounded-2xl overflow-hidden">
              {specs.map((s) => (
                <div key={s.label} className="bg-white dark:bg-dark-800 p-4">
                  <span className="text-sand-500">{s.icon}</span>
                  <p className="text-lg font-light text-brand-950 dark:text-white mt-2">{s.value}</p>
                  <p className="text-[11px] text-brand-500 dark:text-white/45">{s.label}</p>
                </div>
              ))}
            </div>

            {property.extras.length > 0 && (
              <div className="mt-7">
                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-500 dark:text-white/45 mb-3">Diferenciais</p>
                <ul className="grid sm:grid-cols-2 gap-2">
                  {property.extras.map((e) => (
                    <li key={e} className="flex items-center gap-2 text-sm text-brand-800 dark:text-white/75">
                      <Check size={14} className="text-sand-500 shrink-0" /> {e}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-500 dark:text-white/45 mb-3">Sobre o imóvel</p>
              <p className="text-brand-800/80 dark:text-white/65 text-sm leading-relaxed">{property.description}</p>
            </div>
          </div>

          {/* CTA fixo */}
          <div className="sticky bottom-0 p-4 sm:p-6 bg-white/95 dark:bg-dark-800/95 backdrop-blur border-t border-brand-950/10 dark:border-white/10 grid grid-cols-2 gap-3">
            <a
              href={whatsappLink(`Olá! Gostaria de agendar uma visita ao imóvel ${property.title} (${property.location}).`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-petrol !px-3"
            >
              <CalendarDays size={16} /> Agendar visita
            </a>
            <a
              href={whatsappLink(`Olá, tenho interesse no imóvel ${property.title} da Nova Linha. Ainda está disponível?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn !px-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white"
            >
              <MessageCircle size={16} /> WhatsApp
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
