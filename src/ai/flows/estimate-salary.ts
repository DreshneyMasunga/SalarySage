'use server';

/**
 * @fileOverview Estimates a salary range based on a CV and location.
 *
 * - estimateSalary - A function that estimates the salary range.
 * - EstimateSalaryInput - The input type for the estimateSalary function.
 * - EstimateSalaryOutput - The return type for the estimateSalary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateSalaryInputSchema = z.object({
  cvDataUri: z
    .string()
    .describe(
      "The text content of the CV, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  location: z.string().describe('The location where the job is based.'),
});
export type EstimateSalaryInput = z.infer<typeof EstimateSalaryInputSchema>;

const EstimateSalaryOutputSchema = z.object({
  salary: z.object({
    range: z.string().describe('The estimated salary range for the job in the local currency (e.g., "$100,000 - $120,000").'),
    currency: z.string().describe('The currency for the estimated salary range (e.g., "USD").'),
    confidence: z.number().describe('A confidence score (0-1) indicating the reliability of the estimate.'),
    breakdown: z.object({
      '25th_percentile': z.number().describe('The 25th percentile of the salary range.'),
      '50th_percentile_median': z.number().describe('The 50th percentile (median) of the salary range.'),
      '75th_percentile': z.number().describe('The 75th percentile of the salary range.'),
    }).describe('A breakdown of the salary range into percentiles.'),
  }),
  analysis: z.object({
     marketSummary: z.string().describe('A brief summary of the job market for this role in the specified location.'),
     candidateStrengths: z.array(z.string()).describe('A list of key strengths identified from the CV.'),
  }),
  recommendations: z.object({
    skillImprovement: z.array(z.object({
        skill: z.string().describe('A specific skill to learn or improve.'),
        reason: z.string().describe('The reason why this skill will boost salary potential.'),
    })).describe('A list of skills to improve to increase salary.'),
    negotiationTips: z.array(z.string()).describe('A list of actionable tips for salary negotiation.'),
  }),
});
export type EstimateSalaryOutput = z.infer<typeof EstimateSalaryOutputSchema>;

export async function estimateSalary(input: EstimateSalaryInput): Promise<EstimateSalaryOutput> {
  return estimateSalaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateSalaryPrompt',
  input: {schema: EstimateSalaryInputSchema},
  output: {schema: EstimateSalaryOutputSchema},
  prompt: `You are an expert career analyst and salary estimator. Your task is to provide a comprehensive and well-structured salary analysis based on a candidate's CV and job location.

CV content is provided via a data URI.
Location: {{{location}}}
CV: {{media url=cvDataUri}}

Generate a detailed and insightful report. Be thorough and professional.

1.  **Salary Estimation**:
    *   Provide a realistic salary range in the local currency.
    *   State the currency code (e.g., USD, EUR).
    *   Provide a confidence score (0-1) for your estimate.
    *   Calculate the 25th, 50th (median), and 75th percentile for the salary range.

2.  **Analysis**:
    *   Write a brief summary of the current job market for the candidate's likely role in the given location.
    *   Identify and list the key strengths from the candidate's CV that support the salary estimation.

3.  **Recommendations**:
    *   Suggest 2-3 specific skills the candidate could learn or improve to significantly boost their salary potential. For each skill, provide a clear reason.
    *   Provide a few actionable tips for salary negotiation, tailored to the candidate's profile.

Your entire output must be a single JSON object that conforms to the provided output schema. Ensure all fields are populated with high-quality, relevant information.`,
});

const estimateSalaryFlow = ai.defineFlow(
  {
    name: 'estimateSalaryFlow',
    inputSchema: EstimateSalaryInputSchema,
    outputSchema: EstimateSalaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
