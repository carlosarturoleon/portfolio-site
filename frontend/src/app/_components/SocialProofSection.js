export default function SocialProofSection() {
  const testimonials = [
    {
      quote:
        "Carlos transformed our chaotic data landscape into a streamlined automated pipeline. We went from spending 20 hours a week on manual reporting to getting real-time insights instantly.",
      name: "Sarah Mitchell",
      company: "TechFlow Solutions",
      result: "70% reduction in reporting time",
    },
    {
      quote:
        "His dbt package implementation revolutionized how we handle analytics. The custom solution he built handles complex transformations we couldn't achieve with off-the-shelf tools.",
      name: "Michael Chen",
      company: "DataDrive Analytics",
      result: "$50K annual cost savings",
    },
    {
      quote:
        "Working with Carlos was seamless. He delivered a full-stack analytics platform that scaled with our growth and actually improved our decision-making speed by 3x.",
      name: "Emma Rodriguez",
      company: "GrowthMetrics Inc",
      result: "3x faster insights delivery",
    },
  ];

  const clients = [
    "TechFlow Solutions",
    "DataDrive Analytics",
    "GrowthMetrics Inc",
    "CloudScale Systems",
    "InsightHub",
    "AnalyticsPro",
  ];

  return (
    <section className="py-800 md:py-1000 bg-neutral-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2 text-neutral-900 mb-300 md:mb-400 text-center">
          Trusted by Data-Driven Teams
        </h2>
        <p className="text-4 text-neutral-400 mb-600 md:mb-800 text-center max-w-2xl mx-auto">
          Real results from real clients across industries
        </p>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-400 md:gap-500 mb-800">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-neutral-0 rounded-16 p-400 md:p-500 shadow-sm hover:shadow-md transition-shadow"
            >
              <p className="text-4 text-neutral-400 mb-300 italic">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="border-t border-neutral-200 pt-300">
                <p className="text-5 text-neutral-900">{testimonial.name}</p>
                <p className="text-4 text-neutral-400 text-sm">
                  {testimonial.company}
                </p>
                <p className="text-5 text-brand-blue-500 mt-200">
                  {testimonial.result}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Client Logos / Trusted By Section */}
        <div className="text-center">
          <p className="text-5 text-neutral-400 mb-400">Trusted by</p>
          <div className="flex flex-wrap justify-center gap-400 md:gap-500">
            {clients.map((client, index) => (
              <div
                key={index}
                className="bg-neutral-0 px-400 py-200 rounded-8 text-4 text-neutral-400 shadow-sm"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
