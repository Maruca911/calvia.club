import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Vision from './components/Vision';
import Benefits from './components/Benefits';
import Experiences from './components/Experiences';
import Impact from './components/Impact';
import Reinvestment from './components/Reinvestment';
import Ecosystem from './components/Ecosystem';
import AppShowcase from './components/AppShowcase';
import Partners from './components/Partners';
import WhoIsItFor from './components/WhoIsItFor';
import FAQ from './components/FAQ';
import ApplicationForm from './components/ApplicationForm';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-charcoal-950">
      <Navigation />
      <Hero />
      <Vision />
      <Benefits />
      <Experiences />
      <Impact />
      <Reinvestment />
      <Ecosystem />
      <AppShowcase />
      <Partners />
      <WhoIsItFor />
      <FAQ />
      <ApplicationForm />
      <Footer />
    </div>
  );
}

export default App;
