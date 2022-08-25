import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    // Base url for tests. If you end up running the app on a different port,
    // you will need to change this. Work could likely be done to automatically
    // detect the correct port, but that's way out of the scope of this
    // exercise.
    baseUrl: "http://localhost:3000",

    // Do not automatically take screenshots,
    screenshotOnRunFailure: false,
    // Do not take video
    video: false,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
