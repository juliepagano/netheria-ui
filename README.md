This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

You can start editing the page by modifying `pages/index.tsx`. The page
auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on
[http://localhost:3000/api/hello](http://localhost:3000/api/hello). This
endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are
treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead
of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out
[the Next.js GitHub repository](https://github.com/vercel/next.js/) - your
feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our
[Next.js deployment documentation](https://nextjs.org/docs/deployment) for more
details.

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

## Notes to self

- Remove weirdness with ids.
