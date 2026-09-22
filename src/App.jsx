import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Doctors from './components/Doctors.jsx'
import About from './components/About.jsx'
import WhyChooseUs from './components/WhyChooseUs.jsx'
import HealthPackages from './components/HealthPackages.jsx'
import Testimonials from './components/Testimonials.jsx'
import Facilities from './components/Facilities.jsx'
import AppointmentCTA from './components/AppointmentCTA.jsx'
import Contact from './components/Contact.jsx'
import FAQ from './components/FAQ.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div className="site">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Services />
        <Doctors />
        <About />
        <WhyChooseUs />
        <HealthPackages />
        <Testimonials />
        <Facilities />
        <Contact />
        <FAQ />
        <AppointmentCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App