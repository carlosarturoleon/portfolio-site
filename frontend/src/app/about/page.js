import Header from '../_components/Header';
import Footer from '../_components/Footer';
import HeroSection from '../_components/HeroSection';
import IntroductionSection from '../_components/IntroductionSection';
import SocialProofSection from '../_components/SocialProofSection';
import JourneySection from '../_components/JourneySection';
import ServiceFrameworkSection from '../_components/ServiceFrameworkSection';
import CTASection from '../_components/CTASection';
import TrustElementsFooter from '../_components/TrustElementsFooter';

export const metadata = {
  title: 'About - Carlos Leon | Data Engineer & Full-Stack Developer',
  description: 'Learn about Carlos Leon, a data engineer and software developer who helps businesses automate data pipelines and build scalable analytics solutions with 70%+ efficiency gains.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-0 container-margin container-padding">
      <Header />
      <main>
        <HeroSection />
        <IntroductionSection />
        {/* <SocialProofSection /> */}
        <JourneySection />
        <ServiceFrameworkSection />
        <CTASection />
        <TrustElementsFooter />
      </main>
      <Footer />
    </div>
  );
}
