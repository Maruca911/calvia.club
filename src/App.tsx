import Navigation from './components/Navigation';
import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import StripeDivider from './components/StripeDivider';
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
import FloatingCTA from './components/FloatingCTA';

function App() {
  return (
    <div className="min-h-screen bg-charcoal-950">
      <Navigation />
      <Hero />
      <TrustBar />
      <Vision />
      <StripeDivider variant="subtle" />
      <Benefits />
      <Experiences />
      <StripeDivider variant="bold" />
      <Impact />
      <Reinvestment />
      <StripeDivider variant="default" flip />
      <Ecosystem />
      <AppShowcase />
      <StripeDivider variant="bold" flip />
      <Partners />
      <WhoIsItFor />
      <StripeDivider variant="subtle" />
      <FAQ />
      <ApplicationForm />
      <Footer />
      <FloatingCTA />
    </div>
  );
}

export default App;
