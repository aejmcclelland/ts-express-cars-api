---
name: express-api-phase1
description: Add or extend an Express endpoint in a TypeScript project while preserving existing repository and type contracts, validating request input with Zod, and keeping the first implementation narrow. Use when Codex is asked to add a backend route, extend an Express handler or controller, or wire request validation for API work. Do not use for frontend-only tasks or large architecture rewrites.
---

# Express API Phase 1

## Overview

Implement narrow Express endpoint changes that fit the current codebase. Keep the first slice simple, prefer minimal diffs, and defer adjacent features into later routes or services.

## Workflow

1. Inspect the existing route, handler, service, repository, and type patterns before editing.
2. Preserve repository and type contracts unless the user explicitly asks to change them.
3. Add Zod validation at the request boundary for the params, query, and body the handler actually consumes.
4. Reuse existing schema helpers, error wrappers, and response envelopes before introducing new primitives.
5. Keep the initial handler simple. Only extract a new service when the repository already follows that shape or the logic clearly stops being a small handler.
6. Separate future work. If the request implies pagination, filtering, authorization variants, background jobs, or cross-resource orchestration, implement the requested core path and note the rest as follow-up.
7. Prefer minimal diffs. Touch the fewest files possible, avoid broad refactors, and keep public behavior stable outside the requested change.

## Decision Rules

- Parse once at the edge, then pass typed data inward.
- Match existing status codes, error handling, and response shapes.
- Reuse established DTOs and shared types before creating new ones.
- Add tests only where the repository already expects them or when the change would otherwise be risky.
- Avoid speculative abstractions for later phases.

## Output

Always present the result in these sections:

### Proposed files

List the files to add or modify and why each file is needed.

### Code changes

Summarize the route wiring, Zod schema, handler behavior, repository usage, and tests.

### Edge cases

Call out validation failures, missing resources, duplicate records, unsupported inputs, auth or permission boundaries, idempotency concerns, and any contract-sensitive behavior.

## Example Triggers

- "Add a `POST /widgets` endpoint to this Express TypeScript app."
- "Extend the existing `GET /users/:id` handler to accept an optional include flag."
- "Add Zod validation to this route and keep the rest of the stack unchanged."

## Boundaries

- Do not use this skill for frontend-only tasks.
- Do not use this skill for large architecture rewrites.
- If the request requires major restructuring, implement the smallest safe endpoint change and describe the larger follow-up separately.
