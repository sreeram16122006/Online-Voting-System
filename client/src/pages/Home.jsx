import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import About from "../components/About";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="min-h-screen bg-white">

      <Navbar />

      <main>

        <Hero />

        <Features />

        <HowItWorks />

        <About />

      </main>

      <Footer />

    </div>
  );
}

export default Home;