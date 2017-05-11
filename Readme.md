# Template: Webpack & Typescript & Jasmine

## Install dependencies

```
npm install
```

## Bundle

```
npm start
```

Compiles Typescript into Javascript starting from `app/index.ts`.
Compiled Javascript is placed into `dist/bundle.js`.
Then it runs `node dist/index.js`.

## Tests

```
npm test
```

Jasmine tests are placed in `spec/` folder.
With `npm test` Typescript is compiled to Javascript and tests run with `jasmine`:



