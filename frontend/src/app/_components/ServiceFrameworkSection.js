export default function ServiceFrameworkSection({ spacing }) {
  const services = [
    {
      title: "Data Analytics",
      description:
        "Transform raw data into actionable insights with custom analytics solutions. From interactive dashboards to predictive models, I help you make data-driven decisions that drive measurable business outcomes.",
      highlights: [
        "Interactive dashboards & reporting",
        "Business intelligence solutions",
        "Data visualization & storytelling",
      ],
    },
    {
      title: "Data Engineering",
      description:
        "Build robust data infrastructure that scales with your business. I design and implement automated ETL/ELT pipelines, data warehouses, and streaming architectures that handle data at any scale.",
      highlights: [
        "ETL/ELT pipeline development",
        "Data warehouse design & optimization",
        "Real-time data processing",
      ],
    },
    {
      title: "Software Development",
      description:
        "Modern web applications built with React, Django, and cloud infrastructure. From MVP to production-ready solutions, I deliver full-stack applications that are scalable, maintainable, and user-friendly.",
      highlights: [
        "React & Next.js frontends",
        "Django REST API backends",
        "AWS cloud deployment",
      ],
    },
    {
      title: "Technical Consulting",
      description:
        "Strategic guidance for your data and technology initiatives. I help you navigate technical decisions, optimize existing systems, and build roadmaps that align with your business goals.",
      highlights: [
        "Architecture reviews & recommendations",
        "Technology stack selection",
        "Implementation roadmaps",
      ],
    },
  ];

  return (
    <section className={`${spacing} border-t border-neutral-200`}>
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
                <p className="text-4 text-neutral-400 mb-300 text-justify">
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
