import { URLSearchParams } from 'url';
import { beforeAll, describe, expect, test } from 'vitest';
import { z } from 'zod';

import { API_KEY, BEFORE_ALL_TIMEOUT, HOST } from '../utils/env';
import { queryParams } from '../utils/query-params';

// All properties are required by default
const schema = z.object({
  sol_keys: z.array(z.unknown()),
  validity_checks: z.object({}),
});

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
      expect(response.headers.get('Content-Type')?.toLowerCase()).toBe(
        'application/json;charset=utf-8',
      );
    });

    test('Should have valid body schema', () => {
      // https://vitest.dev/api/expect.html#tothrowerror
      expect(() => schema.parse(body)).not.toThrowError();
    });
  },
);
