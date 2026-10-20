import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react'
import { properties } from '../data/properties'
import { cityOf, whatsappLink } from '../utils/format'

interface FormState {
  nome: string
  telefone: string
  imovel: string
  mensagem: string
}

export default function Contact() {
  const [form, setForm] = useState<FormState>({ nome: '', telefone: '', imovel: '', mensagem: '' })

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Monta a mensagem com os dados reais que o usuário digitou
    const linhas: string[] = []
    linhas.push(form.nome.trim() ? `Olá! Me chamo *${form.nome.trim()}*.` : 'Olá!')
    if (form.imovel) linhas.push(`Tenho interesse no imóvel: *${form.imovel}*`)
    if (form.telefone.trim()) linhas.push(`Meu telefone: ${form.telefone.trim()}`)
    if (form.mensagem.trim()) linhas.push(`\n${form.mensagem.trim()}`)
    linhas.push('\n_Mensagem enviada pelo site Nova Linha._')

    window.open(whatsappLink(linhas.join('\n')), '_blank', 'noopener,noreferrer')
  }

  const contacts = [
    { icon: <Phone size={16} />,  label: 'Telefone / WhatsApp', value: '(47) 99687-2498', href: 'tel:+5547996872498' },
    { icon: <Mail size={16} />,   label: 'E-mail',              value: 'contato@novalinha.com.br', href: 'mailto:contato@novalinha.com.br' },
    { icon: <MapPin size={16} />, label: 'Região de atuação',   value: 'Mafra e Itapoá — Santa Catarina' },
  ]

  return (
    <section id="contact" className="relative py-20 sm:py-28 bg-brand-950 overflow-hidden">
      <img
        src={properties[3].gallery[1]}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12]"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-950 via-brand-950/95 to-brand-900/90" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow text-sand-300 mb-5">Agende sua visita</p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-white leading-[1.05]">
            Venha conhecer <span className="accent text-sand-300">pessoalmente</span>.
          </h2>
          <p className="text-white/60 leading-relaxed mt-6 max-w-md">
            Fotos mostram muito, mas nada substitui entrar no imóvel. Fale com a nossa equipe e
            marque uma visita no melhor horário para você.
          </p>

          <div className="mt-10 space-y-5">
            {contacts.map((item) => {
              const content = (
                <>
                  <span className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center text-sand-300 shrink-0">
                    {item.icon}
                  </span>
                  <span>
                    <span className="block text-white/40 text-[10px] font-semibold uppercase tracking-[0.2em]">{item.label}</span>
                    <span className="block text-white mt-0.5">{item.value}</span>
                  </span>
                </>
              )
              return item.href ? (
                <a key={item.label} href={item.href} className="flex items-center gap-4 hover:opacity-80 transition-opacity">{content}</a>
              ) : (
                <div key={item.label} className="flex items-center gap-4">{content}</div>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="bg-white/[0.04] backdrop-blur-xl rounded-3xl p-6 sm:p-9 border border-white/10"
        >
          <h3 className="text-xl font-light text-white">Envie uma mensagem</h3>
          <p className="text-white/40 text-xs mt-1 mb-7">Sua mensagem abre no WhatsApp exatamente como você escreveu.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Seu nome">
                <input type="text" value={form.nome} onChange={set('nome')} placeholder="João Silva" className="field" />
              </Field>
              <Field label="Telefone">
                <input type="tel" value={form.telefone} onChange={set('telefone')} placeholder="(47) 99999-9999" className="field" />
              </Field>
            </div>

            <Field label="Imóvel de interesse">
              <select value={form.imovel} onChange={set('imovel')} className="field [&>option]:text-brand-950">
                <option value="">Selecione ou deixe em branco</option>
                {properties.map((p) => (
                  <option key={p.id} value={`${p.title} — ${cityOf(p)}/SC`}>{p.title}</option>
                ))}
              </select>
            </Field>

            <Field label="Sua mensagem">
              <textarea
                rows={4}
                value={form.mensagem}
                onChange={set('mensagem')}
                placeholder="Melhor dia para visita, dúvidas sobre financiamento, proposta..."
                className="field resize-none"
              />
            </Field>

            <button type="submit" className="btn w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white !py-4">
              <MessageCircle size={17} />
              Enviar pelo WhatsApp
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-white/50 text-[10px] font-semibold mb-2 uppercase tracking-[0.2em]">{label}</span>
      {children}
    </label>
  )
}
