export default function IntroductionSection({ spacing }) {
  return (
    <section className={`${spacing} border-t border-neutral-200`}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2 text-neutral-900 mb-400 md:mb-500 text-center">
          Solving Your Toughest Data Challenges
        </h2>

        <div className="space-y-400 text-4 text-neutral-400 text-justify">
          <p>
            Most businesses struggle with fragmented data systems, manual
            reporting processes, and insights that arrive too late to be
            actionable. I specialize in transforming these pain points into
            streamlined, automated solutions that give you real time visibility
            into your operations.
          </p>

          <p>
            With  expertise in data engineering, analytics, and full stack
            development, I don't just build pipelines, I architect
            data ecosystems tailored to your specific business needs. Whether
            you're dealing with siloed data sources, scaling challenges, or the
            need for custom analytics platforms.
          </p>

          <p>
            My approach combines technical precision with business pragmatism.
            I focus on delivering measurable outcomes: faster decision making,
            reduced operational overhead, and data infrastructure that scales
            with your growth.
          </p>
        </div>
      </div>
    </section>
  );
}
