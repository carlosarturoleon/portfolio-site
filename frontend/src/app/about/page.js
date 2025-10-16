import Header from '../_components/Header';
import Footer from '../_components/Footer';
import About from '../_components/About';

export const metadata = {
  title: 'About',
  description: 'Learn more about Carlos Leon, data analyst and software developer',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-0 container-margin container-padding">
      <Header />
      <main>
        <About />
      </main>
      <Footer />
    </div>
  );
}
