import { ThemeProvider } from './context/ThemeContext'
import Header from './components/Header'
import Hero from './components/Hero'
import PropertyGrid from './components/PropertyGrid'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <ThemeProvider>
      <div className="transition-colors duration-300">
        <Header />
        <main>
          <Hero />
          <PropertyGrid />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
