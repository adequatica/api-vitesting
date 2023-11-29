import { beforeAll, describe, expect, expectTypeOf, test } from 'vitest';

import { API_KEY, BEFORE_ALL_TIMEOUT, HOST } from '../utils/env';
import { queryParams } from '../utils/query-params';

const urlQuery = {
  api_key: API_KEY,
};

const ENDPOINT = '/EPIC/api/natural';

// Describe consists from a variables to show the request in the output:
// «Request https://api.nasa.gov/EPIC/api/natural?api_key=DEMO_KEY»
describe(`Request ${HOST}${ENDPOINT}?${queryParams(urlQuery)}`, () => {
  let response: Response;
  let body: Array<{ [key: string]: unknown }>;

  beforeAll(async () => {
    const url = `${HOST}${ENDPOINT}?${queryParams(urlQuery)}`;
    response = await fetch(url);
    body = await response.json();
  }, BEFORE_ALL_TIMEOUT);

  test('Should have response status 200', () => {
    expect(response.status).toBe(200);
  });

  test('Should have content-type = application/json', () => {
    expect(response.headers.get('Content-Type')).toBe('application/json');
  });

  test('Should have array in the body', () => {
    // Assertion for types https://vitest.dev/api/expect-typeof.html
    expectTypeOf(body).toBeArray();
  });

  test('Should have identifiers in each element of the body', () => {
    // Just an example of a loop through array,
    // not a pattern to follow in all tests, cause this check can be done through schema validation
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body.forEach((element: any) => {
      // Chai asserion https://www.chaijs.com/api/bdd/#method_within
      expect(element.centroid_coordinates.lat).to.be.within(-90, 90);
      expect(element.centroid_coordinates.lon).to.be.within(-180, 180);
    });
  });
});
