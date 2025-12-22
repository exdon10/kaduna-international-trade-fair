'use server';

/**
 * @fileOverview An AI-powered tool to recommend sponsorship tiers based on business goals.
 *
 * - `recommendSponsorship`: A function that takes business goals as input and returns a recommendation for the most suitable sponsorship tier(s).
 * - `SponsorshipRecommendationInput`: The input type for the `recommendSponsorship` function.
 * - `SponsorshipRecommendationOutput`: The return type for the `recommendSponsorship` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SponsorshipRecommendationInputSchema = z.object({
  businessGoals: z
    .string()
    .describe(
      'Description of the business goals the sponsor wants to achieve by sponsoring the Kaduna Trade Fair.'
    ),
});
export type SponsorshipRecommendationInput = z.infer<
  typeof SponsorshipRecommendationInputSchema
>;

const SponsorshipRecommendationOutputSchema = z.object({
  recommendedTiers: z
    .string()
    .describe(
      'The recommended sponsorship tiers based on the provided business goals.'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the recommendation, explaining why the suggested tiers are the most suitable.'
    ),
});
export type SponsorshipRecommendationOutput = z.infer<
  typeof SponsorshipRecommendationOutputSchema
>;

export async function recommendSponsorship(
  input: SponsorshipRecommendationInput
): Promise<SponsorshipRecommendationOutput> {
  return recommendSponsorshipFlow(input);
}

const prompt = ai.definePrompt({
  name: 'sponsorshipRecommendationPrompt',
  input: {schema: SponsorshipRecommendationInputSchema},
  output: {schema: SponsorshipRecommendationOutputSchema},
  prompt: `You are an expert marketing consultant specializing in trade fair sponsorships.

You will receive a description of a potential sponsor's business goals for the Kaduna International Trade Fair. Based on these goals, you will recommend the most suitable sponsorship tier(s) from the following options:

* Naming Rights Sponsor (₦100,000,000)
* Gold Tier Sponsor (₦70,000,000)
* Silver Tier Sponsor (₦50,000,000)
* Bronze Tier Sponsor (₦25,000,000)
* Asset Sponsorships (₦30,000,000 per Asset)
* SME Sponsorship Package - Bronze (₦500,000)
* SME Sponsorship Package - Silver (₦1,000,000)
* SME Sponsorship Package - Gold (₦2,500,000)
* SME Sponsorship Package - Platinum (₦5,000,000)

Explain your reasoning for the recommendation.

Business Goals: {{{businessGoals}}}`,
});

const recommendSponsorshipFlow = ai.defineFlow(
  {
    name: 'recommendSponsorshipFlow',
    inputSchema: SponsorshipRecommendationInputSchema,
    outputSchema: SponsorshipRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
