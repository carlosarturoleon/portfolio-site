export default function JourneySection() {
  return (
    <section className="py-800 md:py-1000 border-t border-neutral-200">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2 text-neutral-900 mb-400 md:mb-500 text-center">
          My Journey & Philosophy
        </h2>

        <div className="space-y-400 text-4 text-neutral-400">
          <p>
            My path into data engineering wasn't traditional, but that's
            precisely what gives me a unique edge. Starting as a curious problem
            solver fascinated by how data could tell stories and drive
            decisions, I quickly realized that most businesses weren't drowning
            in too little data, they were drowning in too much, with no clear
            way to extract actionable insights.
          </p>

          <p>
            This realization shaped my entire approach: technology should serve
            the business, not the other way around. I don't build complex
            systems for the sake of complexity. Every pipeline, every
            transformation, every dashboard I create is laser-focused on solving
            a specific business problem and delivering measurable value.
          </p>

          <p>
            What drives me is the transformation moment — when a client realizes
            they finally have clarity on their operations, when manual processes
            that took days now happen automatically, when decisions that used to
            be gut-based are now backed by real-time data. That's why I do this
            work.
          </p>

          <p>
            Based in Bogotá, Colombia, I've built a practice that serves clients
            globally from startups in San Francisco to enterprises in Sydney.
            Remote collaboration isn't just a necessity; it's an advantage that
            brings diverse perspectives and flexible working relationships. My
            timezone overlap works seamlessly with teams across the Americas,
            Europe, and Asia-Pacific.
          </p>

          <p className="text-5 text-neutral-900 italic">
            "Great data solutions aren't about having the fanciest tools, they're
            about deeply understanding your business challenges and architecting
            systems that scale with your growth."
          </p>
        </div>
      </div>
    </section>
  );
}
