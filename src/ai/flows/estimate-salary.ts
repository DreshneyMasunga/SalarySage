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
  salaryRange: z.string().describe('The estimated salary range for the job in the local currency.'),
  currency: z.string().describe('The currency for the estimated salary range.'),
  confidence: z
    .number()
    .describe(
      'A confidence score (0-1) indicating the reliability of the estimate.'
    ),
  reasons: z
    .string()
    .describe(
      'Reasons for the estimated salary, considering CV and location.'
    ),
  skillRecommendation: z
    .string()
    .describe('A skill the person can learn to boost their salary.'),
});
export type EstimateSalaryOutput = z.infer<typeof EstimateSalaryOutputSchema>;

export async function estimateSalary(input: EstimateSalaryInput): Promise<EstimateSalaryOutput> {
  return estimateSalaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateSalaryPrompt',
  input: {schema: EstimateSalaryInputSchema},
  output: {schema: EstimateSalaryOutputSchema},
  prompt: `You are an expert salary estimator. Given a CV and a location, you will estimate the salary range for the job.

CV: {{media url=cvDataUri}}
Location: {{{location}}}

Consider the skills, experience, and education in the CV, and the cost of living and average salaries in the location.

Provide a salary range in the local currency, a confidence score (0-1) for your estimate, reasons for your estimate, and a single, actionable skill recommendation that would help boost the candidate's salary.

Output:
Salary Range:
Currency:
Confidence:
Reasons:
Skill Recommendation:`,
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
