import { URLSearchParams } from 'url';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const queryParams = (query: any) => {
  return new URLSearchParams(query).toString();
};

export { queryParams };
