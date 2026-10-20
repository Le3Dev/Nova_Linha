import { Property } from '../types'
import { WHATSAPP_NUMBER } from '../data/properties'

const brl = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
  maximumFractionDigits: 0,
})

export const formatBRL = (value: number) => brl.format(value)

export const formatPrice = (price: number) => (price === 0 ? 'Sob consulta' : brl.format(price))

export const formatArea = (m2: number) =>
  `${m2.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} m²`

export const cityOf = (p: Property) => (p.location.includes('Itapoá') ? 'Itapoá' : 'Mafra')

export const whatsappLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
