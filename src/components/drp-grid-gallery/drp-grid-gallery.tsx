import { Component, Host, h, Prop, State } from '@stencil/core';

import ResizeObserver from 'resize-observer-polyfill';

import { findIdealNodeSearch } from '../../services/findIdealNodeSearch';
import { computeRowLayout } from '../../services/justified';

@Component({
  tag: 'drp-grid-gallery',
  styleUrl: 'drp-grid-gallery.css',
  shadow: true,
})
export class DrpGridGallery {
  margin: number = 2;
  animationFrameId = null;
  observer: any;

  galleryEl?: Element;

  @State() containerWidth = 0;

  @Prop({ reflect: true }) images: DrpGridGalleryImage[]; // required
  @Prop({ reflect: true }) imageType: DrpGridGalleryImageType = 'Zoom';
  @Prop({ reflect: true }) targetRowHeight: number = 300;

  componentDidLoad() {
    this.observer = new ResizeObserver(entries => {
      const newContainerWidth = entries[0].contentRect.width;
      if (this.containerWidth !== newContainerWidth) {
        this.animationFrameId = window.requestAnimationFrame(() => {
          this.containerWidth = Math.floor(newContainerWidth);
        });
      }
    });
    this.observer.observe(this.galleryEl);
  }

  disconnectedCallback() {
    this.observer.disconnect();
    window.cancelAnimationFrame(this.animationFrameId);
  }

  render() {
    if (!this.containerWidth) {
      return (
        <Host>
          <div ref={el => (this.galleryEl = el)}>&nbsp;</div>
        </Host>
      );
    }

    // subtract 1 pixel because the browser may round up a pixel
    const width = this.containerWidth - 1;

    let thumbs: any[];
    let limitNodeSearch = 2;
    if (this.containerWidth >= 450) {
      limitNodeSearch = findIdealNodeSearch({
        containerWidth: this.containerWidth,
        targetRowHeight: this.targetRowHeight,
      });
    }

    thumbs = computeRowLayout({
      containerWidth: width,
      limitNodeSearch,
      targetRowHeight: this.targetRowHeight,
      margin: this.margin,
      photos: this.images,
    });

    return (
      <Host>
        <div
          ref={el => (this.galleryEl = el)}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}
        >
          {thumbs.map((thumb: any, index: number) => {
            return (
              <drp-grid-gallery-zoom-image
                key={index}
                thumbnailSrc={thumb.thumbnailSrc}
                imageSrc={thumb.imageSrc}
                width={`${thumb.width}px`}
                height={`${thumb.height}px`}
              ></drp-grid-gallery-zoom-image>
            );
          })}
        </div>
      </Host>
    );
  }
}
