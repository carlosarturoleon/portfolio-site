export default function HeroSection({ spacing }) {
  return (
    <section className={`${spacing} relative overflow-hidden`}>
      {/* Subtle Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-500/5 via-transparent to-brand-cyan-500/5 -z-10" />

      <div className="text-center max-w-4xl mx-auto">
        {/* Large Compelling Headline */}
        <h1 className="text-1-mobile md:text-1 text-neutral-900 mb-300 md:mb-400">
          Turning Data Complexity Into Clarity
        </h1>

        {/* Subheadline focusing on outcomes */}
        <p className="text-2 md:text-2 text-neutral-400 mb-500">
          I help businesses automate their data pipelines and build scalable
          analytics solutions that deliver 70%+ reduction in manual work and
          measurable ROI
        </p>

        {/* Optional supporting text */}
        <p className="text-4 text-neutral-400 max-w-2xl mx-auto">
          Based in Bogotá, working globally across the US, Canada, Australia,
          and Europe, transforming data challenges into competitive advantages
        </p>
      </div>
    </section>
  );
}
