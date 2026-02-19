# ts-express-places-api

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

### GET `/api/places`

Returns all places.

Response shape:

```json
{ "count": 0, "data": [] }
```

---

### POST `/api/places`

Creates a place.

Example:

```bash
curl -s -X POST http://localhost:3000/api/places \
  -H "Content-Type: application/json" \
  -d '{"name":"London Bridge","placeType":"culture","id":"00001"}'
```

## Place Shape

```json
{
	"id": "string",
	"name": "string",
	"placeType": "culture | entertainment | food and drink | business | health | shopping | sports",
	"external_id": "string"
}
```

## Notes

- Uses an in-memory array (no database) to keep focus on routing and validation
  patterns.
