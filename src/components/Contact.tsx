import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { WHATSAPP_NUMBER } from '../data/properties'

interface FormState {
  nome: string
  telefone: string
  imovel: string
  mensagem: string
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    nome: '',
    telefone: '',
    imovel: '',
    mensagem: '',
  })

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Monta a mensagem com os dados reais que o usuário digitou
    const linhas: string[] = []

    if (form.nome.trim())
      linhas.push(`Olá! Me chamo *${form.nome.trim()}*.`)
    else
      linhas.push('Olá!')

    if (form.imovel)
      linhas.push(`Tenho interesse no imóvel: *${form.imovel}*`)

    if (form.telefone.trim())
      linhas.push(`Meu telefone: ${form.telefone.trim()}`)

    if (form.mensagem.trim())
      linhas.push(`\n${form.mensagem.trim()}`)

    linhas.push('\n_Mensagem enviada pelo site Nova Linha._')

    const texto = linhas.join('\n')
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // Botão flutuante do WhatsApp (acesso rápido sem formulário)
  const whatsappDireto = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    'Olá! Vim pelo site da Nova Linha e gostaria de mais informações sobre os imóveis.'
  )}`

  return (
    <section id="contact" className="py-16 sm:py-24 bg-dark-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-10 sm:gap-16 items-start">

          {/* ── Coluna esquerda ── */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-brand-400 text-xs font-black tracking-[0.22em] uppercase mb-3">
              Fale conosco
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-white mb-4 sm:mb-5 leading-tight tracking-tight">
              Pronto para encontrar <br className="hidden sm:block" />seu lar ideal?
            </h2>
            <p className="text-white/60 leading-relaxed mb-8 sm:mb-10 text-sm sm:text-base">
              Nossa equipe está disponível para apresentar os melhores imóveis
              de acordo com o seu perfil. Preencha o formulário ou chame direto
              no WhatsApp.
            </p>

            <div className="space-y-4 sm:space-y-5">
              {[
                { icon: <Phone size={17} />,  label: 'Telefone',          value: '(47) 99687-2498' },
                { icon: <Mail size={17} />,   label: 'E-mail',            value: 'contato@novalinha.com.br' },
                { icon: <MapPin size={17} />, label: 'Região de atuação', value: 'Mafra e Itapoá — Santa Catarina' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-3.5">
                  <span className="w-9 h-9 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400 shrink-0">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-white/40 text-[10px] font-semibold uppercase tracking-wide mb-0.5">{item.label}</p>
                    <p className="text-white font-semibold text-sm">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <a
              href={whatsappDireto}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 sm:mt-10 inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black rounded-xl transition-colors shadow-lg text-sm sm:text-base"
            >
              <MessageCircle size={19} />
              Chamar no WhatsApp
            </a>
          </motion.div>

          {/* ── Formulário ── */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-dark-800 rounded-2xl p-5 sm:p-8 border border-white/5"
          >
            <h3 className="font-display text-lg sm:text-xl font-black text-white mb-1">
              Envie uma mensagem
            </h3>
            <p className="text-white/40 text-xs mb-5 sm:mb-6">
              Preencha os campos — sua mensagem será enviada exatamente como você escreveu.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              <div>
                <label className="block text-white/55 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                  Seu nome
                </label>
                <input
                  type="text"
                  value={form.nome}
                  onChange={set('nome')}
                  placeholder="João Silva"
                  className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-white/55 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                  Telefone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={form.telefone}
                  onChange={set('telefone')}
                  placeholder="(47) 99999-9999"
                  className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-brand-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-white/55 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                  Imóvel de interesse
                </label>
                <select
                  value={form.imovel}
                  onChange={set('imovel')}
                  className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-brand-500 transition-colors"
                >
                  <option value="">Selecione ou deixe em branco</option>
                  <option>Residencial Alípio Siqueira — Mafra/SC</option>
                  <option>Cobertura Open Sea II — Itapoá/SC</option>
                  <option>Sobrado Vila Nova — Mafra/SC</option>
                </select>
              </div>

              <div>
                <label className="block text-white/55 text-xs font-semibold mb-1.5 uppercase tracking-wide">
                  Sua mensagem
                </label>
                <textarea
                  rows={4}
                  value={form.mensagem}
                  onChange={set('mensagem')}
                  placeholder="Escreva sua dúvida, proposta ou qualquer informação que queira compartilhar..."
                  className="w-full bg-dark-700 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-brand-500 transition-colors resize-none"
                />
              </div>

              {/* Preview da mensagem */}
              {(form.nome || form.mensagem || form.imovel) && (
                <div className="bg-dark-700/60 border border-white/5 rounded-lg p-3">
                  <p className="text-white/35 text-[10px] font-semibold uppercase tracking-wide mb-1.5">
                    Pré-visualização da mensagem
                  </p>
                  <p className="text-white/70 text-xs leading-relaxed whitespace-pre-line">
                    {[
                      form.nome ? `Olá! Me chamo ${form.nome}.` : 'Olá!',
                      form.imovel ? `Tenho interesse no imóvel: ${form.imovel}` : '',
                      form.telefone ? `Meu telefone: ${form.telefone}` : '',
                      form.mensagem ? `\n${form.mensagem}` : '',
                    ]
                      .filter(Boolean)
                      .join('\n')}
                  </p>
                </div>
              )}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black rounded-lg transition-colors text-sm shadow-md"
              >
                <MessageCircle size={17} />
                Enviar pelo WhatsApp
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
