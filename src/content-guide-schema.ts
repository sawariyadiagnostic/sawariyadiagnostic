import { z } from 'zod';

export const approvalSchema = z.object({
  status: z.enum(['pending', 'approved', 'rejected']),
  reviewer: z.string().trim().min(1).optional(),
  reviewedAt: z.string().datetime().optional(),
  notes: z.string().trim().max(2_000).optional(),
});

export const citationSchema = z.object({
  id: z.string().regex(/^CIT-[A-Z0-9-]+$/),
  title: z.string().trim().min(1),
  url: z.string().url(),
  accessedAt: z.string().datetime(),
});

export const priceMetadataSchema = z.object({
  customerPriceInr: z.number().int().positive(),
  listedValueInr: z.number().int().positive(),
}).refine((value) => value.listedValueInr >= value.customerPriceInr, {
  message: 'Listed value must be greater than or equal to the customer price',
  path: ['listedValueInr'],
});

export const bilingualGuideSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  titleEn: z.string().trim().min(1),
  titleHi: z.string().trim().min(1),
  summaryEn: z.string().trim().min(1).max(500),
  summaryHi: z.string().trim().min(1).max(500),
  englishPath: z.string().regex(/^content\/test-guides\/[^/]+\/en\.md$/),
  hindiPath: z.string().regex(/^content\/test-guides\/[^/]+\/hi\.md$/),
  preparationApproved: z.boolean(),
  specimenApproved: z.boolean(),
  clinicalReview: approvalSchema,
  ownerReview: approvalSchema,
  legalReview: approvalSchema,
  citations: z.array(citationSchema).min(1),
  price: priceMetadataSchema.optional(),
  publication: z.enum(['draft', 'review', 'published', 'withdrawn']),
  lastReviewedAt: z.string().datetime(),
});

export type BilingualGuide = z.infer<typeof bilingualGuideSchema>;

export function isPublishableGuide(guide: BilingualGuide) {
  return guide.publication === 'published'
    && guide.preparationApproved
    && guide.specimenApproved
    && guide.clinicalReview.status === 'approved'
    && guide.ownerReview.status === 'approved'
    && guide.legalReview.status === 'approved';
}

export function validateGuideForPublication(guide: unknown) {
  const parsed = bilingualGuideSchema.safeParse(guide);
  if (!parsed.success) return parsed;
  if (!isPublishableGuide(parsed.data)) {
    return {
      success: false as const,
      error: new Error('Guide is not approved for public publication'),
    };
  }
  return parsed;
}
