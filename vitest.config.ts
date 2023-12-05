import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    poolOptions: {
      forks: {
        // https://vitest.dev/config/#pooloptions-forks-singlefork
        singleFork: true,
      },
    },
  },
});
