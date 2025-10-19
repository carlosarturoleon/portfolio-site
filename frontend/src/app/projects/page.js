import Header from '../_components/Header';
import Footer from '../_components/Footer';
import ProjectsList from '../_components/ProjectsList';

export const metadata = {
  title: 'My Work - Carlos Leon',
  description: 'Explore case studies and projects showcasing full stack development, data engineering, and analytics solutions by Carlos Leon.',
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-neutral-0 container-margin container-padding">
      <Header />
      <main className="py-800">
        <div className="max-w-[1110px] mx-auto">
          <div className="mb-600">
            <h1 className="text-1 text-neutral-900 mb-200">My Work</h1>
            <p className="text-4 text-neutral-600">
              Case studies and projects showcasing full stack development, data engineering, and analytics solutions.
            </p>
          </div>

          <ProjectsList pageSize={12} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
