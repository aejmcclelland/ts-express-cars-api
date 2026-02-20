import { Router } from 'express';
import type { RequestHandler, Router as ExpressRouter } from 'express';
import type { Place } from '../types/place';
import {
	CreatePlaceBodySchema,
	PlaceQuerySchema,
} from '../validation/placeSchemas';

const router: ExpressRouter = Router();

const places: Place[] = [];

// GET /places
const getPlaces: RequestHandler = (req, res) => {
	const parsed = PlaceQuerySchema.safeParse(req.query);

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

export default router;
