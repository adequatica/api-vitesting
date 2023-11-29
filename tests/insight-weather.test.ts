import { beforeAll, describe, expect, test } from 'vitest';

import { API_KEY, BEFORE_ALL_TIMEOUT, HOST } from '../utils/env';
import { queryParams } from '../utils/query-params';
import { validateSchema } from '../utils/schema-validator.js';

import { URLSearchParams } from 'url';

const SCHEMA = {
  type: 'object',
  properties: {
    sol_keys: { type: 'array' },
    validity_checks: {
      type: 'object',
      properties: {
        sol_hours_required: { type: 'number' },
        sols_checked: { type: 'array' },
      },
      // https://ajv.js.org/json-schema.html#patternproperties
      patternProperties: {
        '\\d{4}': { type: 'object' },
      },
      additionalProperties: false,
    },
  },
  required: ['sol_keys', 'validity_checks'],
  additionalProperties: false,
} as const;

const urlQuery = {
  api_key: API_KEY,
  feedtype: 'json',
  ver: '1.0',
};

const ENDPOINT = '/insight_weather/';

// Skip all tests in describe depending on the conditions https://vitest.dev/api/#describe-skipif
// Here: skip all tests if the host is not https://api.nasa.gov
const isNotHost = HOST != 'https://api.nasa.gov';

// Describe consists from a variables to show the request in the output:
// «Request https://api.nasa.gov/insight_weather/?feedtype=json&ver=1.0&api_key=DEMO_KEY»
describe.skipIf(isNotHost)(
  `Request ${HOST}${ENDPOINT}?${queryParams(urlQuery)}`,
  () => {
    let response: Response;
    let body: { [key: string]: unknown };

    const queryParams = new URLSearchParams(urlQuery).toString();

    beforeAll(async () => {
      const url = `${HOST}${ENDPOINT}?${queryParams}`;
      response = await fetch(url);
      body = await response.json();
    }, BEFORE_ALL_TIMEOUT);

    test('Should have response status 200', () => {
      expect(response.status).toBe(200);
    });

    test('Should have content-type = application/json;charset=utf-8', () => {
      // Handler's content type can vary from time to time
      const contentTypes = [
        'application/json;charset=utf-8',
        'application/json;charset=UTF-8',
      ];
      // https://jestjs.io/docs/expect#expectarraycontainingarray
      expect(contentTypes).toEqual(
        expect.arrayContaining([response.headers.get('Content-Type')]),
      );
    });

    test('Should have valid body schema', () => {
      expect(validateSchema(SCHEMA, body)).toBe(true);
    });
  },
);
