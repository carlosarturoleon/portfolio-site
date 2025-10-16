import Header from '../_components/Header';
import Footer from '../_components/Footer';

export const metadata = {
  title: 'Projects',
  description: 'Showcase of projects and work by Carlos Leon',
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-neutral-0 container-margin container-padding">
      <Header />
      <main className="py-800">
        <div className="max-w-[1110px] mx-auto">
          <h1 className="text-1 text-neutral-900 mb-400">My Work</h1>
          <p className="text-4 text-neutral-400">
            Projects and case studies will be showcased here
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
