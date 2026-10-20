import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import { Property } from './types'
import Header from './components/Header'
import Hero from './components/Hero'
import Highlights from './components/Highlights'
import Featured from './components/Featured'
import PropertyGrid from './components/PropertyGrid'
import Regions from './components/Regions'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import PropertyModal from './components/PropertyModal'
import WhatsAppFloat from './components/WhatsAppFloat'

export default function App() {
  const [selected, setSelected] = useState<Property | null>(null)

  return (
    <ThemeProvider>
      <Header />
      <main>
        <Hero onOpen={setSelected} />
        <Highlights />
        <Featured onOpen={setSelected} />
        <PropertyGrid onOpen={setSelected} />
        <Regions />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />

      <AnimatePresence>
        {selected && (
          <PropertyModal key={selected.id} property={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </ThemeProvider>
  )
}
