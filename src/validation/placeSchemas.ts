import { z } from 'zod';

export const ProviderSchema = z.enum(['tfl', 'translink']);

export const PlaceTypeSchema = z.enum([
	'entertainment',
	'culture',
	'food-and-drink',
	'business',
	'health',
	'shopping',
	'sports',
]);

export const CreatePlaceBodySchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	external_id: z.string().min(1),
	provider: ProviderSchema.default('tfl'),
	placeType: PlaceTypeSchema,
});

// (Optional for later)
export const PlaceIdParamsSchema = z.object({
	id: z.string().min(1),
});
