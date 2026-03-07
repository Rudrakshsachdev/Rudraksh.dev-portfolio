import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Portfolio from "./components/Portfolio/Portfolio";
import Services from "./components/Services/Services";
import Leadership from "./components/Leadership/Leadership";
import Research from "./components/Research/Research";
import Achievements from "./components/Achievements/Achievements";
import Certifications from "./components/Certifications/Certifications";
import Journey from "./components/Journey/Journey";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Services />
      <Leadership />
      <Research />
      <Achievements />
      <Certifications />
      <Journey />
      <Contact />
      <Footer />
    </>
  );
}

export default App;