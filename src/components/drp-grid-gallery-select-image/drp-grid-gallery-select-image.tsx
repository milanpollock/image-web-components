import {
  Component,
  Host,
  h,
  Prop,
  Event,
  State,
  Watch,
  Listen,
  EventEmitter,
} from '@stencil/core';
import {
  getViewportWidth,
  getViewportHeight,
  isInViewport,
} from '../../services/viewport';

@Component({
  tag: 'drp-grid-gallery-select-image',
  styleUrl: 'drp-grid-gallery-select-image.css',
  shadow: true,
})
export class DrpGridGallerySelectImage {
  imageEl?: Element;

  @State() isImageInViewport = false;
  @State() isImageLoaded = false;
  @State() isImageSelected = false;

  /**
   * Source of the thumbnail image
   */
  @Prop({ reflect: true }) thumbnailSrc: string;

  /**
   * Source of the image
   */
  @Prop({ reflect: true }) imageSrc: string;

  /**
   * Width of the container surrounding the image
   */
  @Prop({ reflect: true }) width: string;

  /**
   * Height of the container surrounding the image
   */
  @Prop({ reflect: true }) height: string;

  /**
   * Transition time between image load and display
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

  updateIsImageInViewport() {
    const viewportWidth = getViewportWidth(window, document);
    const viewportHeight = getViewportHeight(window, document);
    this.isImageInViewport = isInViewport(
      this.imageEl,
      viewportWidth,
      viewportHeight,
    );
  }

  componentDidLoad() {
    this.updateIsImageInViewport();
  }

  @Listen('scroll', { target: 'window' })
  onWindowScroll() {
    this.updateIsImageInViewport();
  }

  /**
   * When the image is selected
   */
  @Event({
    eventName: 'drp-grid-gallery-image-selected',
    composed: true,
    cancelable: true,
    bubbles: true,
  })
  imageSelected: EventEmitter<{
    imageSrc: string;
  }>;

  render() {
    return (
      <Host>
        <div
          class="image-outer-container"
          style={{
            width: this.width,
            height: this.height,
          }}
          onClick={() => {
            this.isImageSelected = !this.isImageSelected;
            this.imageSelected.emit({ imageSrc: this.imageSrc });
          }}
        >
          <div
            class={{
              'image-container': true,
              'image-container-selected': this.isImageSelected,
            }}
            style={{
              width: this.width,
              height: this.height,
            }}
          >
            <div
              class="image"
              style={{
                width: this.width,
                height: this.height,
                backgroundImage: `url("${this.imageSrc}")`,
              }}
            />
          </div>
        </div>
      </Host>
    );
  }
}
