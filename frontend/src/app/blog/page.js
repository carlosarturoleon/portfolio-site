import Header from '../_components/Header';
import Footer from '../_components/Footer';
import BlogPostList from '../_components/BlogPostList';

export const metadata = {
  title: 'Blog - Carlos Leon',
  description: 'Read articles and insights from Carlos Leon on data analytics, software engineering, and data engineering.',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-neutral-0 container-margin container-padding">
      <Header />
      <main className="py-800">
        <div className="max-w-[1110px] mx-auto">
          <div className="mb-600">
            <h1 className="text-1 text-neutral-900 mb-200">Blog</h1>
            <p className="text-4 text-neutral-600">
              Insights on data anlytics, software engineering, and data engineering.
            </p>
          </div>

          <BlogPostList pageSize={12} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
