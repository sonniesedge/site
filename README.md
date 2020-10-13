# whalecoiner

Based on Express, and using Markdown for data storage.  Powers [whalecoiner.com](https://whalecoiner.com).

![Node.js CI](https://github.com/sonniesedge/site/workflows/Node.js%20CI/badge.svg)

## Installation

```
npm i
```

## Run tests

Tests are done via [Jest](https://www.npmjs.com/package/jest).

```
npm test
```

## Running app

```
npm run start:dev
```

This is an alias in `package.json` for:

```
npx nodemon app.js
```

## Debugging app

The app can be debugged using [debug](https://www.npmjs.com/package/debug).

```
DEBUG=sonniesedge:controller:*,sonniesedge:error npx nodemon app.js
```
