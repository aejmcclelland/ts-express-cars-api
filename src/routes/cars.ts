import { Router } from 'express';
import type { RequestHandler, Router as ExpressRouter } from 'express';
import type { Car } from '../types/car';
import { FuelType } from '../types/car';

const router: ExpressRouter = Router();

const cars: Car[] = [];

// GET /cars
const getCars: RequestHandler = (_req, res) => {
	return res.status(200).json({ count: cars.length, data: cars });
};

// POST /cars request handler here
const createCar: RequestHandler = (req, res) => {
	const { make, model, year, fuelType } = req.body as Partial<Car>;

	if (!make || !model || typeof year !== 'number' || !fuelType) {
		return res.status(400).json({ error: 'Invalid payload' });
	}
	// `req.body` is untrusted; `fuelType` might not be a string.
	// Normalize to a lowercase string so we can compare against the enum values.
	const fuel = (typeof fuelType === 'string' ? fuelType : '')
		.trim()
		.toLowerCase();

	// Empty string after normalization is invalid.
	if (!fuel) {
		return res.status(400).json({ error: 'Invalid fuelType' });
	}

	// Runtime check: does this value exist in the FuelType enum?
	// Note: `Object.values(FuelType)` returns the allowed string values.
	const allowedFuelTypes = Object.values(FuelType);
	if (!allowedFuelTypes.includes(fuel as FuelType)) {
		return res.status(400).json({ error: 'Invalid fuelType' });
	}

	const car: Car = {
		make,
		model,
		year,
		fuelType: fuel as FuelType,
	};
	cars.push(car);
	return res.status(201).json({ data: car });
};

// Routes
router.get('/cars', getCars);
router.post('/cars', createCar);

export default router;
