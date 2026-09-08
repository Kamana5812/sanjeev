import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Services from './components/Services.jsx'
import Doctors from './components/Doctors.jsx'
import HealthPackages from './components/HealthPackages.jsx'
import WhyChooseUs from './components/WhyChooseUs.jsx'
import Testimonials from './components/Testimonials.jsx'
import Facilities from './components/Facilities.jsx'
import AppointmentCTA from './components/AppointmentCTA.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

function App() {
  return (
    <div className="site">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Doctors />
        <HealthPackages />
        <WhyChooseUs />
        <Testimonials />
        <Facilities />
        <AppointmentCTA />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App