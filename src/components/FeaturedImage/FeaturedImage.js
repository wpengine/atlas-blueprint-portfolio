import Image from 'next/image';
import styles from './FeaturedImage.module.scss';

export default function FeaturedImage({className, image, ...props}) {
  const src = image?.sourceUrl();
  const { altText } = image || '';
  const { width, height } = image?.mediaDetails || {};

  return ( src && width && height ) ? (
    <figure className={[styles['featured-image'], className].join(' ')}>
      <Image
        src={src}
        width={width}
        height={height}
        alt={altText}
        layout="responsive"
        {...props}
      />
    </figure>) : null;
}
