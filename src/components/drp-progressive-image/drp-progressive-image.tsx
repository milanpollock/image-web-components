import { Component, Host, h, Prop, State, Watch, Listen } from '@stencil/core';
import {
  getViewportWidth,
  getViewportHeight,
  isInViewport,
} from '../../services/viewport';
import { canUseWebP, getDevicePixelRatio } from "../../services/image-source";

@Component({
  tag: 'drp-progressive-image',
  styleUrl: 'drp-progressive-image.css',
  shadow: true,
})
export class DrpProgressiveImage {
  imageEl?: Element;

  @State() isImageInViewport = false;
  @State() isImageLoaded = false;

  /**
   * Source of the thumbnail image.
   */
  @Prop({ reflect: true }) thumbnailSrc: string;

  /**
   * Source of the image.
   */
  @Prop({ reflect: true }) imageSrc: string;

  /**
   * Width of the container surrounding the image.
   */
  @Prop({ reflect: true }) width: string;

  /**
   * Height of the container surrounding the image.
   */
  @Prop({ reflect: true }) height: string;

  /**
   * Transition time between when the image is loaded and is displayed.
   */
  @Prop({ reflect: true }) transitionMilliseconds = 500;

  @Watch('thumbnailSrc')
  validateThumbnailSrc(newValue: string) {
    const isEmpty = typeof newValue !== 'string' || newValue === '';
    if (isEmpty) {
      throw new Error('thumbnailSrc: required');
    }
  }

  @Watch('imageSrc')
  validateImageSrc(newValue: string) {
    const isEmpty = typeof newValue !== 'string' || newValue === '';
    if (isEmpty) {
      throw new Error('imageSrc: required');
    }
  }

  @Watch('width')
  validateWidth(newValue: string) {
    const isEmpty = typeof newValue !== 'string' || newValue === '';
    if (isEmpty) {
      throw new Error('width: required');
    }
  }

  @Watch('height')
  validateHeight(newValue: string) {
    const isEmpty = typeof newValue !== 'string' || newValue === '';
    if (isEmpty) {
      throw new Error('height: required');
    }
  }

  updateIsImageInViewport(){
    const viewportWidth = getViewportWidth(window, document);
    const viewportHeight = getViewportHeight(window, document);
    this.isImageInViewport = isInViewport(
      this.imageEl,
      viewportWidth,
      viewportHeight,
    );
  }

  componentDidLoad(){
    this.updateIsImageInViewport();
  }

  @Listen('scroll', { target: 'window' })
  onWindowScroll() {
    this.updateIsImageInViewport();
  }

  render() {
    const thumbnailStyle = this.isImageLoaded
      ? {
          opacity: '0',
          width: this.width,
          height: this.height,
          backgroundImage: `url("${this.thumbnailSrc}")`,
        }
      : {
          width: this.width,
          height: this.height,
          backgroundImage: `url("${this.thumbnailSrc}")`,
        };

    // @ts-ignore
    console.log(canUseWebP(window));

    getDevicePixelRatio(window);

    return (
      <Host>
        {this.isImageInViewport ? (
          <img
            class="hidden-image"
            onLoad={() => {
              setTimeout(() => {
                this.isImageLoaded = true;
              }, this.transitionMilliseconds);
            }}
            src={this.imageSrc}
            alt=""
          />
        ) : null}
        {this.isImageLoaded ? (
          <div
            ref={el => (this.imageEl = el)}
            class="image"
            style={{
              width: this.width,
              height: this.height,
              backgroundImage: `url("${this.imageSrc}")`,
            }}
          />
        ) : (
          <div
            ref={el => (this.imageEl = el)}
            class="thumbnail"
            style={thumbnailStyle}
          />
        )}
      </Host>
    );
  }
}
