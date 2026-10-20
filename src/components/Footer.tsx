import { Wordmark } from './Header'

const links = [
  { label: 'Imóveis', href: '#properties' },
  { label: 'Regiões', href: '#regions' },
  { label: 'A Nova Linha', href: '#about' },
  { label: 'Contato', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="bg-[#030d13] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <Wordmark light />
        <nav className="flex flex-wrap gap-x-7 gap-y-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm text-white/55 hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-white/35">
          <p>© {new Date().getFullYear()} Nova Linha Construção Civil Ltda. Todos os direitos reservados.</p>
          <p>Mafra &amp; Itapoá — SC</p>
        </div>
      </div>
    </footer>
  )
}
