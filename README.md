# API Testing with Vitest

## Stack

This stack illustrates the article [API Testing with Vitest](https://medium.com/@adequatica/api-testing-with-vitest-391697942527).

A basic set of packages to test API with TypeScript:

- [Vitest](https://vitest.dev) — testing framework;
- Node.js [`fetch()`](https://nodejs.org/dist/latest-v21.x/docs/api/globals.html#fetch) as HTTP client;
- [Zod](https://zod.dev) — schema validation;
- [date-fns](https://date-fns.org) — modern date utility library;
- [Prettier](https://prettier.io) — code formatter;
- [ESLint](https://eslint.org/) – code linter.

Example API for testing: [APOD NASA API](https://api.nasa.gov).

## How to Use

You have to have Node.js >= 21 in order to use `fetch()`.

1. Clone repository;
2. Install dependencies: `npm install`
3. Run tests: `npm run test`

### CLI Options

- Different tested host could be passed to tests through `.env` variable (it can be useful for testing different environments):

`HOST=https://api.nasa.gov npm test`

- Individual API key could be passed to tests through `.env` variable (otherwise, it will be used `DEMO_KEY` value):

`API_KEY={api_key} npm test`

- Run a single test or tests [that match a specific filename](https://vitest.dev/guide/filtering.html#test-filtering) (for example `epic.test.ts`):

`npm test epic`

- Run tests in [UI watch mode](https://vitest.dev/guide/ui.html):

`npm run test:ui`

## Examples of Test Cases

Tests replicate [API tests on Jest from this repository](https://github.com/adequatica/api-testing):

- `apod.test.ts` — test with JSON schema validation;
- `epic.test.ts` — test has [a loop through array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) for checking elements with [Chai](https://www.chaijs.com/api/bdd/) assertion;
- `insight-weather.test.ts` — test will be conditionally [skipped](https://vitest.dev/api/#test-skip) in an inappropriate environment.

---

Concerns of the stack: Zod is highly inconvenient as JSON schema validator in case of dynamic keys inside an object with other typed keys.
