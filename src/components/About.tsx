import { motion } from 'framer-motion'
import { Award, Shield, Clock, Leaf } from 'lucide-react'
import { images } from '../data/images'

const pillars = [
  { icon: <Award size={22} />,  title: 'Excelência',    description: 'Materiais de primeira linha e acabamentos impecáveis em cada projeto.' },
  { icon: <Shield size={22} />, title: 'Confiança',     description: 'Transparência do contrato à entrega, com clientes satisfeitos em todo o processo.' },
  { icon: <Clock size={22} />,  title: 'Pontualidade',  description: 'Compromisso real com os prazos estabelecidos em cada empreendimento.' },
  { icon: <Leaf size={22} />,   title: 'Qualidade',     description: 'Construções que refletem inovação, durabilidade e atenção a cada detalhe.' },
]

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white dark:bg-dark-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-10 sm:gap-16 items-center">

          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
              <img
                src={images.alipio[0]}
                alt="Imóvel Nova Linha"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Overlay thumbnail — hidden on xs */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-5 sm:-right-5 w-28 sm:w-36 h-22 sm:h-28 rounded-xl overflow-hidden border-4 border-white dark:border-dark-900 shadow-xl hidden sm:block">
              <img
                src={images.guilherme[1]}
                alt="Detalhe de imóvel"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-16 sm:w-20 h-16 sm:h-20 bg-brand-500/15 rounded-xl -z-10" />
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-brand-500 dark:text-brand-400 text-xs font-black tracking-[0.22em] uppercase mb-3">
              Sobre nós
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-dark-900 dark:text-white mb-5 leading-tight tracking-tight">
              Transformamos sonhos <br className="hidden sm:block" />em lares
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
              Nova Linha é uma empresa dedicada à construção de casas e sobrados que refletem
              qualidade, inovação e compromisso com a satisfação dos nossos clientes. Com uma
              equipe experiente e apaixonada, estamos prontos para tornar sua visão de moradia
              uma realidade.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8 sm:mb-10 text-sm sm:text-base">
              Entendemos que uma casa não é apenas uma estrutura física, mas um refúgio onde
              memórias são criadas e vidas são vividas. Por isso, nos comprometemos a construir
              espaços que não apenas atendam às suas necessidades, mas também excedam suas
              expectativas em termos de beleza, funcionalidade e durabilidade.
            </p>

            {/* Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex gap-3"
                >
                  <span className="text-brand-500 mt-0.5 shrink-0">{p.icon}</span>
                  <div>
                    <h4 className="font-black text-dark-900 dark:text-white text-sm mb-0.5">{p.title}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{p.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
