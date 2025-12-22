"use server";

import { recommendSponsorship, type SponsorshipRecommendationInput } from "@/ai/flows/sponsorship-recommendation-tool";
import { z } from "zod";

const inputSchema = z.object({
  businessGoals: z.string().min(10, "Please describe your business goals in more detail."),
});

type State = {
  message?: string | null;
  recommendation?: {
    recommendedTiers: string;
    reasoning: string;
  } | null;
  errors?: {
    businessGoals?: string[];
  }
}

export async function getSponsorshipRecommendation(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedFields = inputSchema.safeParse({
    businessGoals: formData.get('businessGoals'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check your input.',
    };
  }

  try {
    const recommendation = await recommendSponsorship({
      businessGoals: validatedFields.data.businessGoals,
    });
    return {
      message: "Success",
      recommendation,
    }
  } catch (e) {
    return {
      message: 'An error occurred while getting your recommendation. Please try again.',
    }
  }
}
