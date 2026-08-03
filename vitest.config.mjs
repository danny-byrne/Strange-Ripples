import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["src/**/*.component.test.tsx"],
    setupFiles: ["./vitest.setup.ts"],
  },
});
