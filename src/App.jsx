import Header from './components/layout/Header'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Work from './components/sections/Work'
import Services from './components/sections/Services'
import Contact from './components/sections/Contact'
import Footer from './components/layout/Footer'
import { LanguageProvider } from './contexts/LanguageContext'

function App() {
    return (
        <LanguageProvider>
            <Header />
            <main className="flex-grow pt-20">
                <Hero />
                <About />
                <Work />
                <Services />
                <Contact />
            </main>
            <Footer />
        </LanguageProvider>
    )
}

export default App

