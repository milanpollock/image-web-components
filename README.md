# image-web-components

![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

## Dark Rush Photography's favorite image components re-written in Stencil

As photographers it's very important that our images are not distorted when they're displayed. We've found that [React Photo Gallery](http://neptunian.github.io/react-photo-gallery/) and [React Image Gallery](https://www.linxtion.com/demo/react-image-gallery/) properly display images and we have been using these components for several years.  As we wanted to use them outside of React, we rewrote them as Web Components in Stencil JS and simplified their functionality for our use in Dark Rush Photography's applications.

## License

The MIT License (MIT)

Copyright (c) 2021 Jonathan Milan Pollock

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

----

## Installation

- Init a stencil project

> npm init stencil
> ? Pick a starter › - Use arrow-keys. Return to submit.
> **ionic-pwa** Everything you need to build fast, production ready PWAs
> **app Minimal** starter for building a Stencil app or website
> ❯ **component** Collection of web components that can be used anywhere
> ✔ Pick a starter › component
> ? Project name › **image-web-components**

- Updated npm scripts for standard script names

> "scripts": {
> "test": "jest",
> "dev": "stencil build --dev --watch --serve",
> "build": "stencil build --docs",
> "generate": "stencil generate"
> }

- To generate a new web component **(Which must have a dash in its name)**

> npx stencil generate
> [54:06.9] @stencil/core
> [54:07.0] v1.17.3 ⛱
> ✔ Component tag name (dash-case): … drp-progressive-image
> ? Which additional files do you want to generate? ›  
> ◉ Stylesheet (.css)
> ◯ Spec Test (.spec.tsx)
> ◯ E2E Test (.e2e.ts)

- In **.prettierrc.json** printWidth was removed as the lines are just too long to read without this removal

> "printWidth": 180,

- Updated the namespace in **stencil.config.ts**

> namespace: "DarkRushPhotography-Image-Web-Components",

- Created a separate HTML page for each component in the pages folder

> `<script type="module" src="/build/darkrushphotography-image-web-components.esm.js" </script>`
> `<script nomodule src="/build/darkrushphotography-image-web-components.js"></script>`

- Added a copy of pages to stencil.config.ts within output target www, so that the pages can be displayed for testing

> copy:[
>
> {src:pages}
> ]

- Removed from src the pre-created index.html file so that the directory displays

## Deployment

- npm publish package (copy also copy the dist folder and use by reference)

### **React**

- In index.js

> import {
> defineCustomElements,
> } from '@dark-rush-photography/image-web-components/loader';

After service worker line

> defineCustomElements(window);

### **React Next.js**

- In _app.tsx

> import {
> applyPolyfills,
> defineCustomElements,
> } from '@dark-rush-photography/image-web-components/loader';
> ...
> useEffect(() => {
> applyPolyfills().then(() => {
> defineCustomElements(window);
> });
> }, []);

- Created drp-image-web-components.d.ts

> declare namespace JSX {
> interface IntrinsicElements {
> 'drp-progressive-image': any;
> }
> }

### **Vue**

- In main.ts

> import { defineCustomElements } from '@dark-rush-photography/image-web-components/loader';
> ...
> defineCustomElements(window);
> Vue.config.ignoredElements = ['drp-progressive-image']

### **Angular**

- In app.module.ts

> import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
> @NgModule({
> ...
> bootstrap: [AppComponent],
> schemas: [CUSTOM_ELEMENTS_SCHEMA]
> })

- In main.ts

> import { defineCustomElements } from '@dark-rush-photography/image-web-components/loader';
> defineCustomElements(window); as last line in file

## Testing

- Add jest.config

- npm install -D @types/jest", "jest", and "jest-cli"

- include \_\_tests\_\_ in tsconfig.json

> "include": [
> "src", "\_\_tests\_\_"
> ],
