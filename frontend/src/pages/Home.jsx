import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";

import "../styles/Home.css";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <section id="features">
        <Features />
      </section>

      <section id="about">
        <HowItWorks />
      </section>

      <section id="contact">
        <Footer />
      </section>
    </>
  );
}

export default Home;