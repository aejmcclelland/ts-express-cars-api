export const PLACE_TYPES = [
	'entertainment',
	'culture',
	'food-and-drink',
	'business',
	'health',
	'shopping',
	'sports',
] as const;

export type PlaceType = (typeof PLACE_TYPES)[number];

export const PROVIDERS = ['tfl', 'translink'] as const;

export type Provider = (typeof PROVIDERS)[number];

export interface Place {
	id: string;
	name: string;
	provider: Provider;
	external_id: string;
	placeType: PlaceType;
	createdAt: Date;
}
