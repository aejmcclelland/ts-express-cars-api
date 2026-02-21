import { Router } from 'express';
import type { RequestHandler, Router as ExpressRouter } from 'express';
import type { Place } from '../types/place';
import {
	CreatePlaceBodySchema,
	PlacesQuerySchema,
	PlaceIdParamsSchema,
	UpdatePlaceBodySchema,
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
	const { provider, placeType, name, page, limit } = parsed.data;

	const filtered = places.filter(
		(p) =>
			(provider ? p.provider === provider : true) &&
			(placeType ? p.placeType === placeType : true) &&
			(name ? p.name.toLowerCase().includes(name) : true),
	);

	// Pagination (applied after filtering)
	const count = filtered.length;
	const totalPages = Math.max(1, Math.ceil(count / limit));
	const startIndex = (page - 1) * limit;
	const data = filtered.slice(startIndex, startIndex + limit);

	return res.status(200).json({
		count,
		data,
		meta: { page, limit, totalPages },
	});
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

	// Prevent duplicates (in-memory data): id must be unique.
	const idExists = places.some((p) => p.id === newPlace.id);
	if (idExists) {
		return res.status(409).json({
			error: { message: `Place with id '${newPlace.id}' already exists` },
		});
	}

	places.push(newPlace);
	return res.status(201).json({ data: newPlace });
};

// DELETE /places/:id
const deletePlaceById: RequestHandler = (req, res) => {
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
	const placeIndex = places.findIndex((p) => p.id === id);

	if (placeIndex === -1) {
		return res.status(404).json({ error: { message: 'Place not found' } });
	}

	places.splice(placeIndex, 1);
	return res.status(204).send();
};

// PUT /places/:id
const updatePlaceById: RequestHandler = (req, res) => {
	const parsedParams = PlaceIdParamsSchema.safeParse(req.params);

	if (!parsedParams.success) {
		return res.status(400).json({
			error: {
				message: 'Invalid place ID',
				issues: parsedParams.error.issues,
			},
		});
	}

	const { id } = parsedParams.data;
	const placeIndex = places.findIndex((p) => p.id === id);

	if (placeIndex === -1) {
		return res.status(404).json({ error: { message: 'Place not found' } });
	}

	const parsedBody = UpdatePlaceBodySchema.safeParse(req.body);

	if (!parsedBody.success) {
		return res.status(400).json({
			error: {
				message: 'Invalid update payload',
				issues: parsedBody.error.issues,
			},
		});
	}

	const existing = places[placeIndex];
	const data = parsedBody.data;
	const updatedPlace: Place = {
		...existing,
		name: data.name,
		provider: data.provider,
		external_id: data.external_id,
		placeType: data.placeType,
	};
	places[placeIndex] = updatedPlace;

	return res.status(200).json({ data: updatedPlace });
};

// Routes
router.get('/places', getPlaces);
router.get('/places/:id', getPlaceById);
router.post('/places', createPlace);
router.put('/places/:id', updatePlaceById);
router.delete('/places/:id', deletePlaceById);

export default router;
