import { Router } from 'express';
import type { RequestHandler, Router as ExpressRouter } from 'express';
import type { Place } from '../types/place';
import {
	CreatePlaceBodySchema,
	PlacesQuerySchema,
	PlaceIdParamsSchema,
} from '../validation/placeSchemas';
const router: ExpressRouter = Router();

const places: Place[] = [];
// GET /places
const getPlaces: RequestHandler = (req, res) => {
	const parsed = PlacesQuerySchema.safeParse(req.query);

	if (!parsed.success) {
		return res.status(400).json({
			error: {
				message: 'Invalid query parameters',
				issues: parsed.error.issues,
			},
		});
	}
	const { provider, placeType, name } = parsed.data;

	const filtered = places.filter(
		(p) =>
			(provider ? p.provider === provider : true) &&
			(placeType ? p.placeType === placeType : true) &&
			(name ? p.name.toLowerCase().includes(name) : true),
	);

	return res.status(200).json({ count: filtered.length, data: filtered });
};

// GET /places/:id
const getPlaceById: RequestHandler = (req, res) => {
	const parsed = PlaceIdParamsSchema.safeParse(req.params);

	if (!parsed.success) {
		return res.status(400).json({
			error: {
				message: 'Invalid place ID',
				issues: parsed.error.issues,
			},
		});
	}

	const { id } = parsed.data;
	const place = places.find((p) => p.id === id);

	if (!place) {
		return res.status(404).json({ error: { message: 'Place not found' } });
	}

	return res.status(200).json({ data: place });
};

// POST /places
const createPlace: RequestHandler = (req, res) => {
	const parsed = CreatePlaceBodySchema.safeParse(req.body);

	if (!parsed.success) {
		return res.status(400).json({
			error: {
				message: 'Invalid payload',
				issues: parsed.error.issues,
			},
		});
	}

	const data = parsed.data;

	const newPlace: Place = {
		id: data.id,
		name: data.name,
		provider: data.provider,
		external_id: data.external_id,
		placeType: data.placeType,
		createdAt: new Date(),
	};

	places.push(newPlace);
	return res.status(201).json({ data: newPlace });
};
// Routes
router.get('/places', getPlaces);
router.post('/places', createPlace);
router.get('/places/:id', getPlaceById);

export default router;
