interface DrpGridGalleryImage {
  thumbnailSrc: string;
  imageSrc: string;
  width: number;
  height: number;
}

interface DrpSlideGalleryImage {
  thumbnailSrc: string;
  imageSrc: string;
}

type DrpGridGalleryImageType = 'Zoom' | 'Select' | 'Favorite';
