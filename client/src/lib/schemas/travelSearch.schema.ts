import { z } from 'zod';

export const travelSearchSchema = z.object({
  destination: z.string().min(3, 'Destination is required'),
  date: z.date({ required_error: 'Date is required' }),
  duration: z
    .string()
    .refine(val => !isNaN(Number(val)) && Number(val) > 0, {
      message: 'Duration must be a positive number',
    }),
  guests: z.string().min(1, 'Guests info is required'),
});

export type TravelSearchFormData = z.infer<typeof travelSearchSchema>;