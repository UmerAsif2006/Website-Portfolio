import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import TechStack from "./components/TechStack";
import Projects from "./components/Projects";
import Works from "./components/Works";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import SEO from "./components/SEO";

export default function App() {
  return (
    <>
      <SEO />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <TechStack />
        <Projects />
        <Works />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
