import Image from 'next/image';

import styles from './FeaturedImage.module.scss';

export default function FeaturedImage({
  className,
  image,
  width,
  height,
  ...props
}) {
  let src;
  if (image?.sourceUrl instanceof Function) {
    src = image?.sourceUrl();
  } else {
    src = image?.sourceUrl;
  }
  const { altText } = image || '';

  width = width ? width : image?.mediaDetails?.width;
  height = height ? height : image?.mediaDetails?.height;

  return src && width && height ? (
    <figure className={[styles['featured-image'], className].join(' ')}>
      <Image
        src={src}
        width={width}
        height={height}
        alt={altText}
        objectFit="cover"
        layout="responsive"
        {...props}
      />
    </figure>
  ) : null;
}
