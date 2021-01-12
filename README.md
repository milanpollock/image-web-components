# Image Web Components

## Starter Project for Creating Web Components in Stencil

## Installation

### 1. Init a stencil project

> npm init stencil
> ? Pick a starter › - Use arrow-keys. Return to submit.
> ionic-pwa Everything you need to build fast, production ready PWAs
> app Minimal starter for building a Stencil app or website
> ❯ **component** Collection of web components that can be used anywhere
> ✔ Pick a starter › component
> ? Project name › **image-web-components**

### 2. Updated npm scripts for standard script names

> "scripts": {
> "test": "stencil test --spec --e2e",
> "dev": "stencil build --dev --watch --serve",
> "build": "stencil build --docs",
> "generate": "stencil generate"
> }

### 3. To generate a new web component (Which must have a dash in its name)

> npx stencil generate
> [54:06.9] @stencil/core
> [54:07.0] v1.17.3 ⛱
> ✔ Component tag name (dash-case): … drp-progressive-image
> ? Which additional files do you want to generate? ›  
> ◉ Stylesheet (.css)
> ◯ Spec Test (.spec.tsx)
> ◯ E2E Test (.e2e.ts)

### 4. In .prettierr.json was removed as the lines are just too long to read without this removal

> "printWidth": 180,

### 5. Updated the namespace in stencil.config.ts

> namespace: "DarkRushPhotography-Image-Web-Components",

### 6. Create separate HTML page per component in pages folder

    <script
      type="module"
      src="/build/darkrushphotography-image-web-components.esm.js"
    ></script>
    <script nomodule src="/build/darkrushphotography-image-web-components.js"></script>

### 7. Added to stencil.config.ts within type www

> copy:[
>
> > {src:pages}
> > ]

### 8. Created tests for component in tests folder

### 9. Removed from src the pre-created index.html file so that the directory displays

### 10. Removed from src the pre-created index.html file so that the directory displays

---

## Deployment

### 1. npm publish package, could copy dist folder and use by reference

### 2. For Angular

#### a. In app.module.ts

> import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
> @NgModule({
> ...
> bootstrap: [AppComponent],
> schemas: [CUSTOM_ELEMENTS_SCHEMA]
> })

#### b. In main.ts

> import { defineCustomElements } from '@dark-rush-photography/> image-web-components/loader';
> defineCustomElements(window); as last line in file

### 3. For React

#### a. In index.js

> import {
> defineCustomElements,
> } from '@dark-rush-photography/image-web-components/loader';

#### b. After service worker line

> defineCustomElements(window);

### 4. For React Next.js

#### a. in \_app.tsx

> import {
> applyPolyfills,
> defineCustomElements,
> } from '@dark-rush-photography/image-web-components/loader';

> useEffect(() => {
> applyPolyfills().then(() => {
> defineCustomElements(window);
> });
> }, []);

#### b. drp-image-web-components.d.ts

> declare namespace JSX {
> interface IntrinsicElements {
> 'drp-progressive-image': any;
> }
> }

### For Vue

#### in main.ts

> import { defineCustomElements } from '@dark-rush-photography/image-web-components/loader';

> defineCustomElements(window);
> Vue.config.ignoredElements = ['drp-progressive-image']

---

## Testing

### 1. Add jest.config

### 2. npm install -D @types/jest", "jest", and "jest-cli"

### 3. include \_\_tests\_\_ in tsconfig.json

> "include": [
> "src", "\_\_tests\_\_"
> ],

---

## These are Dark Rush Photography's favorite image components re-written in Stencil

As photographers it's kind of important :) that images look good, are not distorted or cropped when displayed, and we've found the following controls to provide these qualities. We've been using the React versions for several years, but needed to use them outside of React, so they've been rewritten as Web Components in Stencil JS.

Thank you to the two React projects for which they are based, for making out images look so great! ;)

> React Photo Gallery
> http://neptunian.github.io/react-photo-gallery/
> React Image Gallery
> https://www.linxtion.com/demo/react-image-gallery/

---

![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)
