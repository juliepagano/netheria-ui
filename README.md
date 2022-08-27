# Netheria UI

The frontend for Netheria, a mock service for accelerating deep learning models.
This is part of a technical take home exercise.

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

## Exercise notes

- Had to setup separate tsconfig for project and cypress because otherwise you
  end up in some type conflict sadness with cypress/jest.
- This CSS and components are not as neatly refactored and organized into
  modular pieces as I would do in a real PR on a real job, but I cut myself on
  spending more time on it for the sake of time.
- I would write more tests in a real job scenario, but also cutting myself off
  for time.
- I did minimial styling of the built-in browser form elements to save time
  while easily getting accessibility (built-in browser components are good at
  a11y).
- I spent very little time on cross-browser testing.
- I spent very little time on responsive design. This mostly works on a medium
  laptop screen and bigger, which is probably the target demographic for your
  product.
- I chose to just implement the checkboxes (and not the additional select pane
  options) for "benchmark" and "accelerate" for time.
- I'm very behind on the latest and greatest for cypress (my previous job mostly
  used browserstack, selenium, and webdriver.io), so I'm pretty sure I'm not
  following best practices. However, this is the quickest way for me to add a
  few integration tests.
- Error handling.
- Mocking out more api calls.

## Notes to self

- Remove weirdness with ids.
- Call something when clicking octomize
