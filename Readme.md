# Diograph-store

## Usage

```
npm install diograph-store --save-dev
```

```typescript
// example.ts

import { DiographStore } from "./app/diograph-store"

DiographStore.setAuthToken("my-dev-token");

try {
  DiographStore.getDiory("1234").then((diory) => {
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
  background: undefined,
  date: undefined,
  geo: {
    latitude: undefined,
    longitude: undefined
  },
  connectedDiories = []
}
```

## Compile

```
npm run compile
```

Compiles Typescript into Javascript starting from `app/index.ts`.
Compiled Javascript is placed into `dist/`.

## Tests

Currently tests have to be run against a running diograph server. Give host url as DIOGRAPH_SERVER_HOST env when running tests.

```
DIOGRAPH_SERVER_HOST=http://localhost:3000 npm test
```
