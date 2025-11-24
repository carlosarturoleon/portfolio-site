export default function JourneySection({ spacing }) {
  return (
    <section className={`${spacing} border-t border-neutral-200`}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2 text-neutral-900 mb-400 md:mb-500 text-center">
          My Journey
        </h2>

        <div className="space-y-400 text-4 text-neutral-400 text-justify">
          <p>
            Hi, I&apos;m Carlos Leon, a full stack developer and data analyst based
            in Bogotá, Colombia. I transitioned from environmental engineering
            to tech, driven by a passion for solving problems through automation
            and data driven insights.
          </p>

          <p>
            I pursued studies in programming, business intelligence, and
            automation, building expertise in Excel, Python, Java, React,
            Django, and PostgreSQL. This allows me to approach technical
            challenges with an analytical mindset shaped by engineering
            principles.
          </p>

          <p>
            I specialize in creating efficient data pipelines and automating
            workflows that save time and reduce costs. Building dashboards and
            reports using Excel, Google Sheets, and Looker Studio to make
            informed decisions. Developing Python scripts and using ETL tools
            like Fivetran to automate data workflows, dbt to ensure data
            quality, and BigQuery for scalable data processing.
          </p>
        </div>
      </div>
    </section>
  );
}
