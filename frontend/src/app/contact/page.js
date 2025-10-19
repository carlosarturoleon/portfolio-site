import Header from '../_components/Header';
import Footer from '../_components/Footer';
import ContactForm from '../_components/ContactForm';

export const metadata = {
  title: 'Contact Carlos Leon | Data Analytics & Software Development',
  description: 'Get in touch to discuss your data analytics, software development, or data engineering project. Let\'s turn your data challenges into business opportunities.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-neutral-0 container-margin container-padding">
      <Header />
      <main>
        {/* Contact Form Section */}
        <section className="pb-800">
          <div className="text-center mb-600">
            <h2 className="text-2 text-neutral-900 mb-300">
              Ready to Get Started?
            </h2>
            <p className="text-4 text-neutral-400 max-w-[600px] mx-auto">
              Fill out the form below with details about your project.
            </p>
          </div>

          <ContactForm />
        </section>
      </main>
      <Footer />
    </div>
  );
}
