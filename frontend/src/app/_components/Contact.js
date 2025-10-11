import Link from 'next/link';

export default function Contact() {
  return (
    <section className="container-margin container-padding py-800" id="contact">
      <div className="bg-neutral-900 rounded-10 md:rounded-16 px-300 py-500 md:px-800 md:py-600 text-center md:text-left">
        <div className="mx-auto md:mx-0" style={{ maxWidth: '540px' }}>
          <h2 className="text-2 text-neutral-0 mb-300">
            Book a call with me
          </h2>
          <p className="text-4 text-neutral-0 mb-300 md:mb-400">
            I'd love to have a chat to see how I can help you. The best first step is for us to discuss your project during a free consultation. Then we can move forward from there.
          </p>
          <Link
            href="#contact"
            className="inline-block bg-brand-red-500 text-neutral-0 text-5 px-500 py-150 rounded-full hover:bg-brand-yellow-500 transition-colors"
          >
            Free Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}