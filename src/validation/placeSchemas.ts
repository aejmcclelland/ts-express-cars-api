import { z } from 'zod';
import { PLACE_TYPES, PROVIDERS } from '../types/place';

export const ProviderSchema = z.enum(PROVIDERS);

export const CreatePlaceBodySchema = z.object({
	id: z.string().min(1),
	name: z.string().min(1),
	external_id: z.string().min(1),
	provider: ProviderSchema.default('tfl'),
	placeType: z.enum(PLACE_TYPES),
});

export const PlaceIdParamsSchema = z.object({
	id: z.string().trim().min(1),
});

export const PlacesQuerySchema = z.object({
	placeType: z.enum(PLACE_TYPES).optional(),
	provider: ProviderSchema.optional(),
	name: z.string().toLowerCase().optional(),
});
