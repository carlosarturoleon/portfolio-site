import Header from './_components/Header';
import Hero from './_components/Hero';
import About from './_components/About';
import Portfolio from './_components/Portfolio';
import Contact from './_components/Contact';
import Footer from './_components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-0 container-margin container-padding">
      <Header />
      <main>
        <Hero />
        <About />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}