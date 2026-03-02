import { Place, PlaceType, Provider } from '../types/place';

export type PlacesListQuery = {
	provider?: Provider;
	placeType?: PlaceType;
	name?: string;
	page: number;
	limit: number;
};

export interface PlacesRepository {
	listPlaces(query: PlacesListQuery): {
		count: number;
		data: Place[];
		meta: { page: number; limit: number; totalPages: number };
	};
	getPlaceById(id: string): Place | null;
	createPlace(
		placeData: Omit<Place, 'createdAt'>,
	): { ok: true; data: Place } | { ok: false; reason: 'DUPLICATE_ID' };
	updatePlace(
		id: string,
		updateData: Omit<Place, 'id' | 'createdAt'>,
	): Place | null;
	deletePlace(id: string): boolean;
}
