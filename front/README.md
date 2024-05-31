# Yoga

First, Install dependencies:

> npm install

If you want to try the application, launch the backend and then launch Front-end with:

> npm run start


## Test

### E2E

End-to-End tests are created with <strong>Cypress</strong>

Launching all e2e test:

> npm run e2e:ci

Generate coverage report (you should launch e2e:ci test before):

> npm run e2e:coverage

Report is available here:

> `front/coverage/lcov-report/index.html`

### Unitary test

Unit tests are created with <strong>Jest</strong>

Launching test:

> npm run test

for following change:

> npm run test:watch

for test coverage:

> npm run test:coverage

Report is available here:

> `front/coverage/jest/lcov-report/index.html`
