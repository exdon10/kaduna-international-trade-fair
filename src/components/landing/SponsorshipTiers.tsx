'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { SponsorshipModal, type SponsorshipTierInfo } from './SponsorshipModal';

const mainTiers: SponsorshipTierInfo[] = [
  {
    name: 'Naming Rights Sponsor',
    price: '₦100,000,000',
    amount: 100000000,
    description: 'Be the Face of the Fair. Own the entire event.',
    benefits: [
      'Exclusive industry category lockout',
      'Presidential & gubernatorial protocol mentions',
      'Full venue branding (gates, arenas, major screens)',
      'First rights on keynote sessions & national media',
      '360° brand activation rights for 10 days',
      'VIP lounge access & premium exhibition mega booth',
      'Priority co-branding on all digital & broadcast media',
    ],
    highlight: true,
  },
  {
    name: 'Gold Tier Sponsor',
    price: '₦70,000,000',
    amount: 70000000,
    description: 'High-impact visibility + premium activation zones.',
    benefits: [
      'Branding on 2–3 prime assets (Main Stage, Entertainment Arena, Hospitality Hub)',
      'Lead sponsor for ceremonies (opening/closing)',
      'Speaking opportunity in core thematic sessions',
      'Large exhibition booth in premium zone',
      'Media co-branding across radio, TV & outdoor',
      'On-site product sampling & sales rights',
    ],
  },
  {
    name: 'Silver Tier Sponsor',
    price: '₦50,000,000',
    amount: 50000000,
    description: 'Strong brand visibility + focused engagement.',
    benefits: [
      'Prominent logo lockup on signage & media banners',
      'Category positioning (e.g., Official Fintech Partner)',
      'Medium-sized exhibition booth in high-traffic zone',
      'Access to SME engagement clinics / masterclasses',
      'Mention in digital newsletters & official programme',
    ],
  },
  {
    name: 'Bronze Tier Sponsor',
    price: '₦25,000,000',
    amount: 25000000,
    description: 'Entry-level sponsorship with significant reach.',
    benefits: [
      'Logo presence on select materials & digital walls',
      'Recognition as Supporting Sponsor',
      'Standard exhibition booth',
      'Inclusion in selected PR & social media pushes',
      'Product placement in targeted areas',
    ],
  },
];

const assetSponsorship: SponsorshipTierInfo = {
  name: 'Asset Sponsorships',
  price: '₦30,000,000',
  amount: 30000000,
  per: 'per Asset',
  description: 'Own a Premium Trade Fair Asset.',
  assets: [
    'VIP Lounge',
    'Media Hub',
    'LED Screens',
    'Cultural Arena',
    'Food Court',
    'Innovation Pavilion',
    'Registration Gate',
    'Lanyards',
    'Info Desks',
  ],
  benefits: [
    'Asset naming rights + exclusive branding rights',
    'Category ownership (e.g., Official Airline Partner)',
    'Product integration inside the asset zone',
    'Custom media coverage & spotlight mentions',
    'Branded staff, signs, and promotional screens',
  ],
};

const smePackages: Omit<SponsorshipTierInfo, 'description'>[] = [
  {
    name: 'SME Platinum',
    price: '₦5,000,000',
    amount: 5000000,
    benefits:
      'Maximum visibility; main stage session; category exclusivity; magazine feature; VIP engagement',
  },
  {
    name: 'SME Gold',
    price: '₦2,500,000',
    amount: 2500000,
    benefits:
      'High visibility; stage presentation; radio exposure; magazine feature; networking',
  },
  {
    name: 'SME Silver',
    price: '₦1,000,000',
    amount: 1000000,
    benefits:
      'Strong visibility; product sampling; 2 social media posts; flyer in visitor pack; training access',
  },
  {
    name: 'SME Bronze',
    price: '₦500,000',
    amount: 500000,
    benefits:
      'Affordable visibility; access to networking; basic brand exposure; certificate',
  },
];

export default function SponsorshipTiers() {
  const [selectedTier, setSelectedTier] = React.useState<SponsorshipTierInfo | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleSponsorClick = (tier: SponsorshipTierInfo) => {
    setSelectedTier(tier);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="sponsorship" className="py-16 sm:py-24 bg-white dark:bg-card">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-foreground sm:text-4xl font-headline">
              Sponsorship Opportunities
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Affordable, impactful, and tailored packages to help your
              business maximise exposure.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {mainTiers.map(tier => (
              <Card
                key={tier.name}
                className={`flex flex-col ${
                  tier.highlight ? 'ring-2 ring-primary shadow-2xl' : 'shadow-lg'
                }`}
              >
                <CardHeader className="pb-4">
                  {tier.highlight && (
                    <Badge className="w-fit mb-2">Most Popular</Badge>
                  )}
                  <CardTitle className="text-2xl font-headline">
                    {tier.name}
                  </CardTitle>
                  <p className="text-3xl font-bold text-primary">
                    {tier.price}
                  </p>
                  <CardDescription className="pt-2 text-base">
                    {tier.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <ul className="space-y-3 flex-1">
                    {(Array.isArray(tier.benefits) ? tier.benefits : [tier.benefits]).map((benefit: string) => (
                      <li key={benefit} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                 // <Button
                 //   className="mt-6 w-full"
                 //   onClick={() => handleSponsorClick(tier)}
                 // >
                //    Become a Sponsor
                //  </Button>
                  <a href="https://trade-fair-ng.web.app/">
            <Button className="mt-6 w-full">
              Become a Sponsor
            </Button>
          </a>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <Card className="flex flex-col shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-headline">
                  {assetSponsorship.name}
                </CardTitle>
                <p className="text-3xl font-bold text-primary">
                  {assetSponsorship.price}{' '}
                  <span className="text-lg font-medium text-muted-foreground">
                    {assetSponsorship.per}
                  </span>
                </p>
                <CardDescription className="pt-2 text-base">
                  {assetSponsorship.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div>
                    <p className="font-semibold mb-2">Choose from:</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                    {assetSponsorship.assets?.map(asset => (
                        <Badge key={asset} variant="secondary">
                        {asset}
                        </Badge>
                    ))}
                    </div>
                    <ul className="space-y-3 flex-1">
                    {(Array.isArray(assetSponsorship.benefits) ? assetSponsorship.benefits : [assetSponsorship.benefits]).map((benefit: string) => (
                        <li key={benefit} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 shrink-0" />
                        <span>{benefit}</span>
                        </li>
                    ))}
                    </ul>
                </div>
               // <Button
                //  className="mt-6 w-full"
               //   onClick={() => handleSponsorClick(assetSponsorship)}
               // >
                //  Become a Sponsor
               // </Button>
                 <a href="https://trade-fair-ng.web.app/">
            <Button className="mt-6 w-full">
              Become a Sponsor
            </Button>
          </a>
              </CardContent>
            </Card>

            <Card className="flex flex-col shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-headline">
                  SME Sponsorship Packages
                </CardTitle>
                <CardDescription className="pt-2 text-base">
                  Specially designed packages to boost small and medium
                  enterprises.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {smePackages.map(pkg => (
                    <AccordionItem value={pkg.name} key={pkg.name}>
                      <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                        <div className="flex justify-between w-full pr-4 items-center">
                          <span>{pkg.name.replace('SME ', '')} Tier</span>
                          <span className="text-primary">{pkg.price}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-base text-muted-foreground px-2 space-y-4">
                        <div>
                            <span className="font-semibold text-foreground">
                            Key Benefits:{' '}
                            </span>
                            {pkg.benefits}
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleSponsorClick(pkg)}
                          className="w-full sm:w-auto"
                        >
                          Sponsor {pkg.name.replace('SME ', '')} Tier
                        </Button>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {selectedTier && (
        <SponsorshipModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          tier={selectedTier}
        />
      )}
    </>
  );
}
