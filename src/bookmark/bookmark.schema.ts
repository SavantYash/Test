import { z } from 'zod';

export const createBookmarkSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  url: z.string().url('Invalid URL'),
  userId: z.string().min(1),
});

export type CreateBookmarkDto = z.infer<typeof createBookmarkSchema>;