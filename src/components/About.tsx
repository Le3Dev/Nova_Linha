import { motion } from 'framer-motion'
import { images, logoSymbol } from '../data/images'

const pillars = [
  { title: 'Excelência',   description: 'Materiais de primeira linha e acabamentos impecáveis em cada projeto.' },
  { title: 'Confiança',    description: 'Transparência do contrato à entrega, com você acompanhando cada etapa.' },
  { title: 'Pontualidade', description: 'Compromisso real com os prazos estabelecidos em cada empreendimento.' },
  { title: 'Qualidade',    description: 'Construções que refletem inovação, durabilidade e atenção a cada detalhe.' },
]

const stats = [
  { value: '5+', label: 'Anos de mercado' },
  { value: '5+', label: 'Imóveis entregues' },
  { value: '100%', label: 'Clientes satisfeitos' },
]

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white dark:bg-dark-800 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Colagem */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative pb-16 pr-10 sm:pr-16"
          >
            <div className="rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[5/5]">
              <img src={images.guilherme[0]} alt="Sobrado construído pela Nova Linha" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 w-1/2 aspect-square rounded-3xl overflow-hidden border-[6px] border-white dark:border-dark-800 shadow-2xl">
              <img src={images.mafra[3]} alt="Interior de imóvel Nova Linha" loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-6 -left-2 sm:-left-6 bg-brand-950 rounded-2xl p-4 shadow-xl">
              <img src={logoSymbol} alt="" className="h-12 w-auto brightness-[1.6]" />
            </div>
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <p className="eyebrow text-brand-500 dark:text-sand-300 mb-5">A Nova Linha</p>
            <h2 className="text-4xl sm:text-5xl font-extralight leading-[1.08] text-brand-950 dark:text-white">
              Transformamos sonhos <span className="accent text-brand-600 dark:text-sand-300">em lares</span>.
            </h2>
            <p className="text-brand-800/75 dark:text-white/60 leading-relaxed mt-6">
              A Nova Linha é dedicada à construção de casas e sobrados que refletem qualidade,
              inovação e compromisso com a satisfação dos nossos clientes. Entendemos que uma casa
              não é apenas uma estrutura física, mas um refúgio onde memórias são criadas.
            </p>
            <p className="text-brand-800/75 dark:text-white/60 leading-relaxed mt-4">
              Por isso, construímos espaços que excedem expectativas em beleza, funcionalidade e
              durabilidade — e você negocia direto com quem constrói.
            </p>

            <div className="grid grid-cols-3 mt-10 border-y border-brand-950/10 dark:border-white/10">
              {stats.map((s, i) => (
                <div key={s.label} className={`py-5 ${i > 0 ? 'pl-4 sm:pl-6 border-l border-brand-950/10 dark:border-white/10' : ''}`}>
                  <p className="text-3xl sm:text-4xl font-extralight text-brand-950 dark:text-white">{s.value}</p>
                  <p className="text-[11px] text-brand-500 dark:text-white/50 mt-1">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6 mt-10">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                >
                  <p className="text-sand-500 text-[11px] font-semibold">0{i + 1}</p>
                  <h4 className="text-brand-950 dark:text-white font-medium mt-1">{p.title}</h4>
                  <p className="text-brand-600/80 dark:text-white/50 text-sm leading-relaxed mt-1">{p.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
