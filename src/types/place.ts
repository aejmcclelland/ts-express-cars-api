export enum PlaceType {
	entertainmnet = 'entertainment',
	culture = 'culture',
	food_and_drink = 'food-and-drink',
	business = 'business',
	health = 'health',
	shopping = 'shopping',
	sports = 'sports',
}

export type Provider = 'tfl' | 'translink';

export interface Place {
	id: string;
	name: string;
	provider: Provider;
	external_id: string;
	placeType: PlaceType;
	createdAt: Date;
}
