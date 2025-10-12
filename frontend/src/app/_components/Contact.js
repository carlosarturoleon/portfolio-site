import Button from "./Button";

export default function Contact() {
  return (
    <section className="pt-800 pb-400" id="contact">
      <div className="bg-neutral-900 rounded-10 md:rounded-16 px-300 py-500 md:px-800 md:py-600">
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-300 md:gap-400">
          <div className="text-center md:text-left lg:col-span-2">
            <h2 className="text-2 text-neutral-0 mb-300">
              Let's Discuss Your Project
            </h2>
            <p className="text-4 text-neutral-0 mb-300 lg:mb-0">
              Let's explore how we can work together. Provide an overview of your
              current situation and objectives, and I'll get back to you with insights on how to move forward.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Button />
          </div>
        </div>
      </div>
    </section>
  );
}
