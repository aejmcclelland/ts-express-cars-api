import { Router } from 'express';
import type { RequestHandler, Router as ExpressRouter } from 'express';
import type { Place } from '../types/place';
import { CreatePlaceBodySchema } from '../validation/placeSchemas';

const router: ExpressRouter = Router();

const places: Place[] = [];

// GET /places
const getPlaces: RequestHandler = (_req, res) => {
	return res.status(200).json({ count: places.length, data: places });
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
		placeType: data.placeType as any, // remove once PlaceType matches schema values exactly
		createdAt: new Date(),
	};

	places.push(newPlace);
	return res.status(201).json({ data: newPlace });
};
// Routes
router.get('/places', getPlaces);
router.post('/places', createPlace);

export default router;
