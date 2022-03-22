import Image from 'next/image';
import styles from './FeaturedImage.module.scss';
import appConfig from '../../app.config';
import DefaultImage from './DefaultImage';

export default function FeaturedImage({ className, image, ...props }) {
  let src;
  if (image?.sourceUrl instanceof Function) {
    src = image?.sourceUrl();
  } else {
    src = image?.sourceUrl;
  }
  const { altText } = image || '';
  const { width, height } = image?.mediaDetails || {};

  return src && width && height ? (
    <figure className={[styles['featured-image'], className].join(' ')}>
      <Image
        src={src}
        width={width}
        height={height}
        alt={altText}
        objectFit="contain"
        layout="responsive"
        {...props}
      />
    </figure>
  ) : appConfig.archiveDisplayFeaturedImage ? (
    <DefaultImage className={className} />
  ) : null;
}
