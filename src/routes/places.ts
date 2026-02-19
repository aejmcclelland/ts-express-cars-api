import { Router } from 'express';
import type { RequestHandler, Router as ExpressRouter } from 'express';
import type { Place } from '../types/place';
import { PlaceType } from '../types/place';

const router: ExpressRouter = Router();

const places: Place[] = [];

// GET /places
const getPlaces: RequestHandler = (_req, res) => {
	return res.status(200).json({ count: places.length, data: places });
};

// POST /places
const createPlace: RequestHandler = (req, res) => {
	const { name, id, external_id, placeType, provider } = req.body as Partial<Place>;

	if (!id || !name || external_id === undefined || !placeType) {
		return res.status(400).json({ error: 'Invalid payload' });
	}

	// Treat external IDs as opaque strings (TfL and other providers often use alphanumeric IDs).
	const externalIdStr = typeof external_id === 'string' ? external_id.trim() : String(external_id).trim();
	if (!externalIdStr) {
		return res.status(400).json({ error: 'external_id must be provided' });
	}

	const providerStr = (typeof provider === 'string' ? provider : '').trim().toLowerCase();

	const placeTypeStr = (typeof placeType === 'string' ? placeType : '')
		.trim()
		.toLowerCase();

	if (!placeTypeStr)
		return res.status(400).json({ error: 'Invalid placeType' });

	const allowedPlaceTypes = Object.values(PlaceType);
	if (!allowedPlaceTypes.includes(placeTypeStr as PlaceType)) {
		return res.status(400).json({ error: 'Invalid placeType' });
	}

	const newPlace: Place = {
		id,
		name,
		// Use the normalised external ID (treat as an opaque string).
		external_id: externalIdStr as any,
		placeType: placeTypeStr as PlaceType,
		provider: (providerStr || 'tfl') as any,
		// Generate server-side; request bodies don't preserve Date instances reliably.
		createdAt: new Date(),
	};
	places.push(newPlace);
	return res.status(201).json({ data: newPlace });
};

// Routes
router.get('/places', getPlaces);
router.post('/places', createPlace);

export default router;
