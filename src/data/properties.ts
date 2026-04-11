import { Property } from '../types'
import { images } from './images'

export const WHATSAPP_NUMBER = '5547996872498'

export const properties: Property[] = [
  {
    id: 1,
    title: 'Residencial Alípio Siqueira',
    location: 'Rua Alípio Siqueira, 782 — Bairro do Passo, Mafra/SC',
    price: 0, // ← a combinar
    area: 134,
    areaBuilt: 127.37,
    bedrooms: 3,
    suites: 1,
    bathrooms: 2,
    parking: 1,
    tag: 'Pronto para morar',
    extras: ['Sala', 'Cozinha', 'Área de serviço'],
    description:
      'Imóvel localizado à Rua Alípio Siqueira, 782, no tranquilo Bairro do Passo em Mafra/SC. A propriedade conta com 1 suíte, 2 quartos, sala, cozinha, banheiro social, área de serviço e vaga de garagem. Área total de 134 m² e área construída de 127,37 m². Um lar espaçoso e bem distribuído, ideal para famílias que buscam conforto e qualidade de vida.',
    coverImage: images.alipio[0],
    gallery: images.alipio,
  },
  {
    id: 2,
    title: 'Cobertura Open Sea II — Itapoá',
    location: 'Rua Leonides Pommer, 1368 — Cambijú, Itapoá/SC',
    price: 0, // ← a combinar
    area: 70,
    areaBuilt: 70,
    areaTerrain: 360,
    bedrooms: 3,
    suites: 1,
    bathrooms: 2,
    parking: 1,
    tag: 'Destaque',
    extras: ['Vista para o mar', 'Apenas 100m da praia', 'Cobertura'],
    description:
      'Linda cobertura com vista para o mar no Residencial Open Sea II — apenas 100 metros da praia! Localizada na Rua Leonides Pommer, 1368, em Cambijú, Itapoá/SC. 3 dormitórios sendo 1 suíte, 2 banheiros e 1 vaga de garagem. 70 m² úteis com 360 m² de terreno. Uma oportunidade única para quem deseja morar ou investir à beira-mar com muito conforto e sofisticação.',
    coverImage: images.leonides[0],
    gallery: images.leonides,
  },
  {
    id: 3,
    title: 'Sobrado Vila Nova — Guilherme Witt',
    location: 'Rua Guilherme Witt, Sobrado 04 — Vila Nova, Mafra/SC',
    price: 0, // ← a combinar
    area: 41.8,
    areaBuilt: 112.79,
    bedrooms: 2,
    suites: 0,
    bathrooms: 2,
    parking: 2,
    tag: 'Pronto para morar',
    extras: ['Churrasqueira', 'Lavabo', 'Garagem coberta', 'Área de serviço'],
    description:
      'Sobrado 04 localizado na Rua Guilherme Witt, Vila Nova, em Mafra/SC. Imóvel com 2 quartos, sala, cozinha, lavabo, banheiro social, área de serviço, churrasqueira e duas vagas de garagem (sendo uma coberta). Área útil de 41,80 m² e área construída de 112,79 m². Perfeito para quem busca praticidade, conforto e excelente localização.',
    coverImage: images.guilherme[0],
    gallery: images.guilherme,
  },
]
