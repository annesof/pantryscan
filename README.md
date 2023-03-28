# Pantryscan 🚀🎉⚡️

**Pantry storage management**

## Features

- ✅ [Error Handling](#error-handling)
- ✅ [Dev tools](#dev-tools)
  - ✅ husky
  - ✅ lint-staged
  - ✅ https localhost

#### Error Handling

Nobody likes white screens and crashes without any notes. In [src/error-handling](./src/error-handling) you can find the error handling implementation. Here you can find `withErrorHandler` high order component. You can wrap any component by this HOC and it will catch all errors and show a default or your custom fallback. Currently, the main APP component is wrapped by `withErrorHandler` HOC.

# Dev tools

- [husky](https://typicode.github.io/husky/#/)

  You can use it to lint your commit messages, run tests, lint code, etc.

  Currently, only `pre-commit` hook is set up. Every time you try to do a commit it will run `prettier` and `eslint` to be sure that everything is according to the rules.

- [lint-staged](https://github.com/okonet/lint-staged)

  `lint-staged` helps to run `eslint` and `prettier` only on staged files - it makes the linting process super fast and sensible.

- [https localhost](https://github.com/daquinoaldo/https-localhost)

  It's a simple way to run your application on localhost with https.

  Just run:

  ```bash
  npm run https-preview # or yarn https-preview
  ```

  after:

  ```bash
  npm run build # or yarn build
  ```

  and check `https://localhost` in your browser.

  NOTE: first time it will ask you about installing localhost certificate. For more info check [this](https://github.com/daquinoaldo/https-localhost#root-required)
