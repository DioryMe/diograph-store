# Diograph-store

## Usage

```
npm install diograph-store --save
```

```
import { DiographStore } from "diograph-store"
```

```
DiographStore.setAuthToken("my-dev-token");

try {
  DiographStore.get("1234").then((diory) => {
    console.log(diory)
  })
} catch(e) {
  console.log(e)
}
```

Output:
```
Diory {
  id: '1234',
  name: 'Test diory',
  url: 'http://google.com/',
  type: 'webpage',
  background: null,
  date: null }
```

## Compile

```
npm run compile
```

Compiles Typescript into Javascript starting from `app/index.ts`.
Compiled Javascript is placed into `lib/`.

## Tests

```
npm test
```

Jasmine tests are placed in `spec/` folder.
With `npm test` Typescript is compiled to Javascript and tests run with `jasmine`:



