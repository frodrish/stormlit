# Plugins

## Installation

```
npm install stormlit
```

## Table Plugin

Modify astro config to include the table plugin:
```js
import { defineConfig } from 'astro/config';


export default defineConfig({
  integrations: [
    starlight({
...
      plugins: [
        starlightFullViewMode({
        })
      ],

  ...
  vite: {
    plugins: [yaml()],
  },
});

```

## Astro debug

``` Install
npm install react
npm install react-dom
```
