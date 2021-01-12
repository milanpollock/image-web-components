import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'DarkRushPhotography-Image-Web-Components',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle'
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [{ src: "pages" }],
    },
  ],
};
