export default function ServiceFrameworkSection() {
  const services = [
    {
      title: "Data Analytics & Engineering",
      description:
        "End to end data pipeline development, automated ETL/ELT processes, and scalable data infrastructure that grows with your business.",
      highlights: [
        "Custom data pipelines",
        "Real time analytics",
        "Data warehouse optimization",
      ],
    },
    {
      title: "dbt Package Development",
      description:
        "Custom dbt packages and transformations tailored to your unique business logic, with focus on maintainability and testing.",
      highlights: [
        "Custom transformations",
        "Testing & documentation",
        "Best practices implementation",
      ],
    },
    {
      title: "Full Stack Development",
      description:
        "Modern web applications with React, Django, and cloud infrastructure — from MVP to production-ready solutions.",
      highlights: [
        "React frontends",
        "Django REST APIs",
        "AWS deployment",
      ],
    },
    {
      title: "Consulting & Strategy",
      description:
        "Data architecture planning, technology stack selection, and roadmap development to align your data strategy with business goals.",
      highlights: [
        "Architecture reviews",
        "Technology selection",
        "Implementation roadmaps",
      ],
    },
  ];

  return (
    <section className="py-800 md:py-1000 border-t border-neutral-200">
      <div className="max-w-6xl mx-auto">
        {/* Services Section */}
        <div className="mb-1000">
          <h2 className="text-2 text-neutral-900 mb-300 md:mb-400 text-center">
            How I Can Help
          </h2>
          <p className="text-4 text-neutral-400 mb-600 md:mb-800 text-center max-w-2xl mx-auto">
            Comprehensive services designed to solve your data challenges
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-400 md:gap-500">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-neutral-0 border border-neutral-200 rounded-16 p-400 md:p-500 hover:border-brand-blue-500 transition-colors"
              >
                <h3 className="text-3 text-neutral-900 mb-300">
                  {service.title}
                </h3>
                <p className="text-4 text-neutral-400 mb-300">
                  {service.description}
                </p>
                <ul className="space-y-150">
                  {service.highlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="text-4 text-neutral-400 flex items-center gap-200"
                    >
                      <span className="text-brand-blue-500">✓</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
