import { z } from 'zod';

export const createBookmarkSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  url: z.string().url('Invalid URL'),
});

export const updateBookmarkSchema = z.object({
  title: z.string().min(1).optional(),
  url: z.url().optional()
});

export type CreateBookmarkDto = z.infer<typeof createBookmarkSchema>;
export type UpdateBookmarkSchema = z.infer<typeof updateBookmarkSchema>;