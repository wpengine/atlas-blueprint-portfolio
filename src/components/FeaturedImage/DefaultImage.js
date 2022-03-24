import Image from 'next/image';

import styles from './FeaturedImage.module.scss';

function DefaultImage({ className, ...props }) {
  const src = '/static/banner.jpeg';
  const alt = 'Downtown Austin Skyline';

  return (
    <figure className={[styles['featured-image'], className].join(' ')}>
      <Image
        src={src}
        alt={alt}
        layout="responsive"
        objectFit="cover"
        {...props}
      />
    </figure>
  );
}

export default DefaultImage;
