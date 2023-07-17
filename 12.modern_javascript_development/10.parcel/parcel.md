# Module Bundler

I. Webpack: Most popular but complex

II. Parcel: Simple to use

#### Install Module Bundler (Parcel): `nmp i parcel --save-dev`

`--save-dev` means dev dependency i.e. a tool required to build the app

## Two ways of using Parcel

### I. NPX

#### Bundling: `npx parcel index.html`

We have to pass the entry point of the app to Parcel i.e. `index.html`. Above command will bundle all the scripts, store entire app in `dist` (distribution) directory and start a Live Server.
The `dist` directory is now the main app which contains bundled code.

#### Building: `npx parcel build index.html`

Building will compress, remove duplicate and unused code

### II. NPM Script

Add Parcel commands directly in `package.json` `scripts` property and run them using npm:

`package.json`:

```json
"scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html"
  },
```

To bundle: `npm run start`

To build: `npm run build`

Note: The final build is what we ship to users.

## Hot Module Replacement:

On save, auto build app and reflect changes live without reload.

```js
// Add below code to main script
if (module.hot) {
  module.hot.accept();
}
```

## Imporing Resources

With Parcel we don't have to provide the entire part of the exporting file. We just have to mention the library and Parcel will import the necessary file:

```js
import cloneDeep from './node_modules/lodash/cloneDeep.js'; // normal way
import { cloneDeep } from 'lodash'; // parcel way
```
