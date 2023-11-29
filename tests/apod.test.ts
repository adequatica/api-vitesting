import { beforeAll, describe, expect, test } from 'vitest';
import { formatISO, subDays } from 'date-fns';

import { API_KEY, BEFORE_ALL_TIMEOUT, HOST } from '../utils/env';
import { queryParams } from '../utils/query-params';
import { validateSchema } from '../utils/schema-validator';

const SCHEMA = {
  type: 'object',
  properties: {
    copyright: { type: 'string' },
    date: { type: 'string' },
    explanation: { type: 'string' },
    hdurl: { type: 'string' },
    media_type: { type: 'string' },
    service_version: { type: 'string' },
    title: { type: 'string' },
    url: { type: 'string' },
  },
  required: [
    'date',
    'explanation',
    'media_type',
    'service_version',
    'title',
    'url',
  ],
  additionalProperties: false,
} as const;

const now = new Date();

const urlQuery = {
  date: formatISO(subDays(now, 1), { representation: 'date' }),
  api_key: API_KEY,
};

const ENDPOINT = '/planetary/apod';

// Describe consists from a variables to show the request in the output:
// «Request https://api.nasa.gov/planetary/apod?date=2022-06-05&api_key=DEMO_KEY»
describe(`Request ${HOST}${ENDPOINT}?${queryParams(urlQuery)}`, () => {
  let response: Response;
  let body: { [key: string]: unknown };

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

  test('Should have valid body schema', () => {
    expect(validateSchema(SCHEMA, body)).toBe(true);
  });
});
