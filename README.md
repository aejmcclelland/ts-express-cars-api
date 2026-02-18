# ts-express-cars-api

A small Express + TypeScript API used to practise:

- Router structure (`/api` mount)
- Controller-style handlers
- Runtime request validation (including enum validation)
- Predictable response shapes for easier testing

## Tech

- Node.js + Express
- TypeScript
- pnpm

## Run locally

```bash
pnpm install
pnpm dev
```

Server runs at:

http://localhost:3000

## Endpoints

### GET `/api/cars`

Returns all cars.

Response shape:

```json
{ "count": 0, "data": [] }
```

---

### POST `/api/cars`

Creates a car.

Example:

```bash
curl -s -X POST http://localhost:3000/api/cars \
  -H "Content-Type: application/json" \
  -d '{"make":"Audi","model":"A4","year":2018,"fuelType":"petrol"}'
```

## Car Shape

```json
{
  "make": "string",
  "model": "string",
  "year": 2018,
  "fuelType": "petrol | diesel | electric | hybrid"
}
```

## Notes

- Uses an in-memory array (no database) to keep focus on routing and validation patterns.
