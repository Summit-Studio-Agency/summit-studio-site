import type { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { Process } from '@/components/sections/Process';
import { Advantages } from '@/components/sections/Advantages';
import { PortfolioPreview } from '@/components/sections/PortfolioPreview';
import { PricingPreview } from '@/components/sections/PricingPreview';
import { PageCTA } from '@/components/seo/PageCTA';
import { SITE } from '@/data/site';

export const metadata: Metadata = {
  title: `${SITE.name} | Websites for Local Service Businesses`,
  description: SITE.description,
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Process />
      <Advantages />
      <PortfolioPreview />
      <PricingPreview />
      <PageCTA
        heading="Want to see your business built out first?"
        subhead="We'll put together a real demo of your site — no cost, no commitment, just a link to look at."
      />
    </>
  );
}
