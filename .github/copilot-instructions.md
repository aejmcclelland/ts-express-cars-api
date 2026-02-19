# AI Coding Guidelines for ts-express-places-api

## Architecture Overview

- Express.js API with TypeScript, focused on routing and validation patterns
- Routes mounted under `/api` prefix (see `src/server.ts`)
- In-memory data storage using arrays (no database) to keep focus on API
  structure
- Modular structure: route handlers in `src/routes/`, type definitions in
  `src/types/`

## Key Patterns

- **Request Handlers**: Use Express `RequestHandler` type for controller-style
  functions
- **Runtime Validation**: Manual validation in route handlers
  - Check required fields and types explicitly
  - For enums, validate against `Object.values(EnumType)` (example in
    `src/routes/places.ts`)
  - Return 400 with `{ error: "message" }` for invalid requests
- **Response Shapes**:
  - List endpoints: `{ count: number, data: T[] }` (see GET `/api/places`)
  - Create endpoints: `{ data: T }` (see POST `/api/places`)
- **PlaceType Enum**: String values like 'entertainment', 'culture',
  'food-and-drink' (uses dashes, not spaces)

## Development Workflow

- **Local Development**: `pnpm dev` (runs with ts-node-dev for hot reloading)
- **Build**: `pnpm build` (compiles TypeScript to `dist/` directory)
- **Production Start**: `pnpm start` (runs compiled JavaScript from
  `dist/server.js`)
- **Testing**: `pnpm test` (uses Node.js built-in test runner)

## Project Conventions

- Route files export default Express Router instances
- Type definitions use interfaces and enums for data shapes
- Manual error responses with appropriate HTTP status codes
- No external data persistence; all data stored in memory during runtime

## Code Examples

- Handler validation patterns: `src/routes/places.ts`
- Type definitions: `src/types/place.ts`
- Server setup: `src/server.ts`
