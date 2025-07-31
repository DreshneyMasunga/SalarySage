'use server';

import { estimateSalary, EstimateSalaryOutput } from '@/ai/flows/estimate-salary';
import { z } from 'zod';

type FormState = {
  data?: EstimateSalaryOutput;
  error?: string;
  fieldErrors?: {
    cv?: string[];
    location?: string[];
  };
};

const FormSchema = z.object({
  cv: z
    .instanceof(File)
    .refine((file) => file.size > 0, 'CV is required.')
    .refine(
      (file) => file.size < 5 * 1024 * 1024,
      'CV must be less than 5MB.'
    )
    .refine(
      (file) => ['application/pdf', 'text/plain'].includes(file.type),
      'CV must be a PDF or TXT file.'
    ),
  location: z
    .string()
    .min(2, { message: 'Location must be at least 2 characters.' }),
});

async function fileToDataUri(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const base64 = Buffer.from(buffer).toString('base64');
  return `data:${file.type};base64,${base64}`;
}

export async function estimateSalaryAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = FormSchema.safeParse({
    cv: formData.get('cv'),
    location: formData.get('location'),
  });

  if (!validatedFields.success) {
    return {
      error: 'Invalid form data. Please check the fields and try again.',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { cv, location } = validatedFields.data;

  try {
    const cvDataUri = await fileToDataUri(cv);
    const result = await estimateSalary({ cvDataUri, location });
    return { data: result };
  } catch (error) {
    console.error('Error estimating salary:', error);
    return { error: 'An AI error occurred. Please try again.' };
  }
}
