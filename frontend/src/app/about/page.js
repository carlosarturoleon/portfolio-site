import Header from '../_components/Header';
import Footer from '../_components/Footer';
import HeroSection from '../_components/HeroSection';
import IntroductionSection from '../_components/IntroductionSection';
import JourneySection from '../_components/JourneySection';
import ServiceFrameworkSection from '../_components/ServiceFrameworkSection';
import CTASection from '../_components/CTASection';
import TrustElementsFooter from '../_components/TrustElementsFooter';

export const metadata = {
  title: 'About - Carlos Leon | Data Engineer & Full-Stack Developer',
  description: 'Learn about Carlos Leon, a data engineer and software developer who helps businesses automate data pipelines and build scalable analytics solutions with 70%+ efficiency gains.',
};

// Centralized spacing configuration for all sections
const SECTION_SPACING = 'py-400 md:py-600';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-0 container-margin container-padding">
      <Header />
      <main>
        <HeroSection spacing={SECTION_SPACING} />
        <IntroductionSection spacing={SECTION_SPACING} />
        {/* <SocialProofSection spacing={SECTION_SPACING} /> */}
        <JourneySection spacing={SECTION_SPACING} />
        <ServiceFrameworkSection spacing={SECTION_SPACING} />
        <CTASection spacing={SECTION_SPACING} />
        <TrustElementsFooter spacing={SECTION_SPACING} />
      </main>
      <Footer />
    </div>
  );
}
