import { logo } from '../data/images'

export default function Footer() {
  return (
    <footer className="bg-dark-900 border-t border-white/5 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        {/* Logo em pílula clara para contrastar com o fundo escuro */}
        <span className="bg-white/90 rounded-lg px-2.5 py-1.5">
          <img src={logo} alt="Nova Linha" className="h-7 w-auto object-contain" />
        </span>

        <p className="text-white/30 text-xs text-center font-medium">
          © {new Date().getFullYear()} Nova Linha Construção Civil Ltda. Todos os direitos reservados.
        </p>

        <p className="text-white/30 text-xs font-medium">
          Mafra &amp; Itapoá — SC
        </p>
      </div>
    </footer>
  )
}
