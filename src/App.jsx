import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Work from './components/Work'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
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
