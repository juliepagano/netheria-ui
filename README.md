# Netheria UI

The frontend for Netheria, a mock service for accelerating deep learning models.
This is part of a technical take home exercise.

You may view a live version of this application hosted on Vercel at
[https://netheria-ui.vercel.app/](https://netheria-ui.vercel.app/).

## Getting started

- Install dependencies: `npm install`
- Run development server: `npm run dev`
- View in browser by opening [http://localhost:3000](http://localhost:3000)
- Run unit tests: `npm run test`

To run end-to-end tests with Cypress:

- Make sure you have Chrome installed.
- Run `npm run e2e:ci` to run on the command line.
- Run `npm run e2e` to run interactively with Cypress's UI.
  - Click "E2E testing."
  - Select "Chrome."
  - Click "Start E2E testing in Chrome." This will pop up a Chrome window for
    testing.
  - Click on the test you want to run.

## Tools & libraries

This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)
Using TypeScript. In addition to Next.js and React, it uses the following tools
to assist with development:

- [Jest](https://jestjs.io/) with
  [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) -
  Used for a mix of unit and integration tests.
- [Cypress](https://www.cypress.io/) - Used for some very lightweight
  integration tests.
- [Sass](https://sass-lang.com/) - Used to extend CSS.
- [Prettier](https://prettier.io/) - Used for easy, consistent formatting of the
  code. Run `npm format` or configure your text editor to format on save to run
  it.

## Notes for reviewers of this exercise

Below are some notes about my decisions and areas where I intentionally decided
not to address a problem to limit the amount of time spent on this exercise.
Hopefully this will be helpful to reviewers.

### Limitations of my solution

Below are descriptions of areas where I chose not to address something or my
result was not up to the level of quality I would perform on the job for the
sake of time.

#### Benchmark & Accelerate panels

- I chose to just implement the checkboxes (and not the additional select pane
  options) for "benchmark" and "accelerate" for time.

#### Error handling

- I did very little error handling within the UI to account for time. In a real
  project, I absolutely would handle error cases in a user-friendly way.

#### General code quality and organization

- This CSS and components are not as neatly refactored and organized into
  modular pieces as I would do in a real PR on a real job, but I cut myself on
  spending more time on it for the sake of time.
- I would write more tests in a real job scenario, but cutting myself off for
  time.
- I did minimial styling of the built-in browser form elements to save time
  while easily getting accessibility (built-in browser components are good at
  a11y).
- I spent very little time on cross-browser testing. I developed on Chrome, so
  that is the browser most likely to behave well.
- I'm very behind on the latest and greatest for cypress (my previous job mostly
  used browserstack, selenium, and webdriver.io), so I'm pretty sure I'm not
  following current best practices. However, this is the quickest way for me to
  add a few integration tests. In a real project, I'd invest more time on
  getting up-to-speed to follow best practices.

#### Design

- I spent very little time on responsive design. This mostly works on a medium
  laptop screen and bigger, which is the likely intended use case for a product
  like this.

### Miscellaneous technical notes

- I mocked out api calls by creating very simple api endpoints in the Next.js
  app using [api routes](https://nextjs.org/docs/api-routes/introduction).
- I needed to set up separate tsconfigs for project and cypress because
  otherwise you end up in some type conflict issues with cypress/jest and their
  assertion libraries.
