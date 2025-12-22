import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import WhyPartner from '@/components/landing/WhyPartner';
import SponsorshipTiers from '@/components/landing/SponsorshipTiers';
import RecommendationTool from '@/components/landing/RecommendationTool';
import Contact from '@/components/landing/Contact';
import Footer from '@/components/landing/Footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <WhyPartner />
        <SponsorshipTiers />
        <RecommendationTool />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
