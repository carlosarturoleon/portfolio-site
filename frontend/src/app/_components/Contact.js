import Button from "./Button";

export default function Contact() {
  return (
    <section className="pt-800 pb-400" id="contact">
      <div className="bg-neutral-900 rounded-10 md:rounded-16 px-300 py-500 md:px-800 md:py-600">
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-300 md:gap-400">
          <div className="text-center md:text-left lg:col-span-2">
            <h2 className="text-2 text-neutral-0 mb-300">
              Ready to Transform Your Data into Results?
            </h2>
            <p className="text-4 text-neutral-0 mb-300 lg:mb-0">
              Let's discuss how my expertise in data analytics, software development,
              and data engineering can help you achieve your business goals. Get a response within 24 hours.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Button href="/contact">Get Started</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
