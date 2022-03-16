import styles from './FeaturedImage.module.scss';
import Image from 'next/image';

function DefaultImage({ className }) {
  const src = '/static/placeholder.png';
  return (
    <figure className={[styles['featured-image'], className].join(' ')}>
      <Image
        src={src}
        width={3400}
        height={3400}
        alt="Placeholder"
        layout="responsive"
        objectFit="contain"
      />
    </figure>
  );
}

export default DefaultImage;
