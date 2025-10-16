import Image from "next/image";
import Button from "./Button";

export default function About() {
  return (
    <section className="py-800">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-1000 md:gap-400 lg:gap-800 items-center">
        {/* Profile Image */}
        <div className="relative flex justify-center md:justify-center lg:justify-start">
          <div className="relative w-4/5 md:w-1/2 lg:w-4/5 aspect-square">
            <Image
              src="/images/profile.png"
              alt="Amy - Designer"
              fill
              className="rounded-full object-cover"
              sizes="(max-width: 768px) 100vw, 445px"
            />
          </div>
        </div>

        {/* About Text */}
        <div className="text-center md:text-center lg:text-left max-w-[540px] mx-auto md:max-w-full lg:mx-0 lg:max-w-none">
          <h2 className="text-2 text-neutral-900 mb-300 md:mb-400">
            I'm Carlos Leon, a data analyst and software developer who helps
            businesses turn data chaos into strategic advantage
          </h2>
          <p className="text-4 text-neutral-400 mb-300 md:mb-400">
            Based in Bogotá, I've delivered data solutions for clients across 
            countries. Including the United States, Canada, Australia, Spain,
            Switzerland, and the Dominican Republic. I specialize in building
            automated data pipelines, custom analytics solutions, and scalable
            web applications that reduce manual work by 70%+ and deliver
            measurable ROI.
          </p>
          <Button />
        </div>
      </div>
    </section>
  );
}
