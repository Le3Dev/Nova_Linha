// Local property images — imported so Vite processes and hashes them for production
// Fotos convertidas para WebP (máx. 2000px) — os JPGs originais ficam em src/image como backup

// Alípio Siqueira
import lipio1 from '../image/lipio.webp'
import lipio2 from '../image/lipio_2.webp'
import lipio3 from '../image/lipio3.webp'
import lipio4 from '../image/lipio4.webp'

// Leonides Pommer — Itapoá
import itapoa from '../image/Itapoa8andares.webp'
import praia4 from '../image/praia4.webp'
import praia6 from '../image/praia6.webp'

// Guilherme Witt
import guilherme1 from '../image/guilherme1.webp'
import guilherme2 from '../image/guilherme2.webp'
import guilherme3 from '../image/guilherme3.webp'
import guilher6 from '../image/guilher6.webp'

// Apartamento Centro — Mafra (Av. Prefeitura Frederico Heyse, 241)
import mafra01 from '../image/mafra/mafra01.webp'
import mafra02 from '../image/mafra/mafra02.webp'
import mafra03 from '../image/mafra/mafra03.webp'
import mafra04 from '../image/mafra/mafra04.webp'
import mafra05 from '../image/mafra/mafra05.webp'
import mafra06 from '../image/mafra/mafra06.webp'
import mafra07 from '../image/mafra/mafra07.webp'
import mafra08 from '../image/mafra/mafra08.webp'
import mafra09 from '../image/mafra/mafra09.webp'
import mafra10 from '../image/mafra/mafra10.webp'
import mafra11 from '../image/mafra/mafra11.webp'
import mafra12 from '../image/mafra/mafra12.webp'
import mafra13 from '../image/mafra/mafra13.webp'
import mafra14 from '../image/mafra/mafra14.webp'
import mafra15 from '../image/mafra/mafra15.webp'
import mafra16 from '../image/mafra/mafra16.webp'
import mafra17 from '../image/mafra/mafra17.webp'
import mafra18 from '../image/mafra/mafra18.webp'
import mafra19 from '../image/mafra/mafra19.webp'

// Sobrado Vila Nova — Guilherme Witt, Sobrado 04
import g04_01 from '../image/guilherme04/g04_01.webp'
import g04_02 from '../image/guilherme04/g04_02.webp'
import g04_03 from '../image/guilherme04/g04_03.webp'
import g04_04 from '../image/guilherme04/g04_04.webp'
import g04_05 from '../image/guilherme04/g04_05.webp'
import g04_06 from '../image/guilherme04/g04_06.webp'
import g04_07 from '../image/guilherme04/g04_07.webp'
import g04_08 from '../image/guilherme04/g04_08.webp'
import g04_09 from '../image/guilherme04/g04_09.webp'
import g04_10 from '../image/guilherme04/g04_10.webp'
import g04_11 from '../image/guilherme04/g04_11.webp'
import g04_12 from '../image/guilherme04/g04_12.webp'
import g04_13 from '../image/guilherme04/g04_13.webp'

// Sobrado Vila Nova — Guilherme Witt, Sobrado 05
import g05_01 from '../image/guilherme05/g05_01.webp'
import g05_02 from '../image/guilherme05/g05_02.webp'
import g05_03 from '../image/guilherme05/g05_03.webp'
import g05_04 from '../image/guilherme05/g05_04.webp'
import g05_05 from '../image/guilherme05/g05_05.webp'
import g05_06 from '../image/guilherme05/g05_06.webp'
import g05_07 from '../image/guilherme05/g05_07.webp'
import g05_08 from '../image/guilherme05/g05_08.webp'
import g05_09 from '../image/guilherme05/g05_09.webp'

// Logo original
import logo from '../image/logoNovaLinha.png'
export { logo }

// Símbolo da logo, recortado e com fundo transparente
import logoSymbol from '../image/logoSymbol.png'
export { logoSymbol }

export const images = {
  // Capa sempre a foto de fachada/frente do imóvel — melhor primeira impressão
  alipio: [lipio2, lipio1, lipio3, lipio4],
  leonides: [itapoa, praia4, praia6],
  guilherme: [guilherme1, guilherme2, guilherme3, guilher6],
  mafra: [
    mafra01, mafra05, mafra06, mafra02, mafra03, mafra04,
    mafra07, mafra08, mafra09, mafra10, mafra11, mafra12,
    mafra13, mafra14, mafra15, mafra16, mafra17, mafra18, mafra19,
  ],
  guilherme04: [
    g04_01, g04_03, g04_02, g04_04, g04_05, g04_06,
    g04_07, g04_08, g04_09, g04_10, g04_11, g04_12, g04_13,
  ],
  guilherme05: [
    g05_01, g05_02, g05_03, g05_04, g05_05, g05_06, g05_07, g05_08, g05_09,
  ],
}
