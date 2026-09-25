import { AiEnhancement } from '@/components/landing/AiEnhancement';
import { BuiltForApify } from '@/components/landing/BuiltForApify';
import { FinalCta } from '@/components/landing/FinalCta';
import { Hero } from '@/components/landing/Hero';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { OpportunitySources } from '@/components/landing/OpportunitySources';
import { StructuredOutput } from '@/components/landing/StructuredOutput';

export default function HomePage() {
  return (
    <main id="main-content">
      <Hero />
      <OpportunitySources />
      <HowItWorks />
      <StructuredOutput />
      <AiEnhancement />
      <BuiltForApify />
      <FinalCta />
    </main>
  );
}
