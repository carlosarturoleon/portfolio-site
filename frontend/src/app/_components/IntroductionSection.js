export default function IntroductionSection({ spacing }) {
  return (
    <section className={`${spacing} border-t border-neutral-200`}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2 text-neutral-900 mb-400 md:mb-500 text-center">
          Solving Your Data Challenges
        </h2>

        <div className="space-y-400 text-4 text-neutral-400 text-justify">
          <p>
            Data silos, quality issues, and manual processing are among the most
            common challenges businesses face; Marketing teams export leads
            every week, executives wait days for consolidated reports because
            financial and operational data live in separate systems, and
            critical decisions are delayed because no one has a complete
            picture.
          </p>

          <p>
            Quality issues undermine trust and waste resources. Contacts with
            invalid emails cause teams to chase dead leads, product catalogs
            containing inconsistent information that confuses customers, and
            leaders arguing over conflicting numbers.
          </p>

          <p>
            Bottlenecks drain productivity; Managers spend hours creating
            reports, users wait days for simple queries, and critical
            spreadsheets break constantly. These challenges cost thousands in
            labor hours, missed opportunities, and poor decision making.
          </p>

          <p>
            Automated pipelines sync marketing and sales platforms, unified
            dashboards pull from multiple sources automatically showing a more
            complete picture, and eliminate manual consolidation. Data cleaning
            validates contacts, standardizes information, reconciles
            discrepancies, and transforms unreliable data into trustworthy
            business assets.
          </p>

          <p>
            Workflow automation, self service dashboards, and clear
            documentation free your team from hours of manual work, delivering
            faster and reliable insights. Most importantly, you gain resilience and scalability, your business
            no longer depends on one person who understands the complex Excel
            file. Teams can access insights on demand, and you have a reliable
            data infrastructure that grows with your business.
          </p>
        </div>
      </div>
    </section>
  );
}
