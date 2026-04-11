export interface Property {
  id: number
  title: string
  location: string
  price: number          // 0 = "A combinar"
  area: number           // área útil / total
  areaBuilt: number      // área construída
  areaTerrain?: number   // terreno (opcional)
  bedrooms: number
  suites: number
  bathrooms: number
  parking: number
  extras: string[]
  description: string
  coverImage: string
  gallery: string[]
  tag?: 'Lançamento' | 'Destaque' | 'Pronto para morar'
}
