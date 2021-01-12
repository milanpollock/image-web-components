import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { DrpGridGalleryZoomImage } from '../../src/components/drp-grid-gallery-zoom-image/drp-grid-gallery-zoom-image';

describe('drp-grid-gallery-zoom-image', () => {
  let specPage: SpecPage;
  const IMAGE_SRC =
    'https://dark-rush-photography-images.azureedge.net/dark-rush-photography-photo-of-the-week/through-the-looking-glass/best-of-image/small/through-the-looking-glass-1.jpg';
  const WIDTH = '611px';
  const HEIGHT = '236px';

  beforeEach(async () => {
    specPage = await newSpecPage({
      components: [DrpGridGalleryZoomImage],
      html: `<drp-grid-gallery-zoom-image image-src=${IMAGE_SRC} width="${WIDTH}" height="${HEIGHT}"></drp-grid-gallery-zoom-image>`,
    });
  });

  it ('renders', ()=> {
      expect(specPage).toBeTruthy();
  })

  it ('should have image source set', ()=> {
    expect(specPage.root.imageSrc).toBe(IMAGE_SRC);
  })

  it ('should have width set', ()=> {
    expect(specPage.root.width).toBe(WIDTH);
  })

  it ('should have height set', ()=> {
    expect(specPage.root.height).toBe(HEIGHT);
  })
});
