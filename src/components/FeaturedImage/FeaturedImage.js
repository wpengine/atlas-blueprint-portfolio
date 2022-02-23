import Image from 'next/image';
import styles from './FeaturedImage.module.scss';


export default function FeaturedImage({image, width = '340', height = '340', layout="responsive", alt = '', ...props}) {
  return image ? (
    <figure className={styles['featured-image']}>
      <Image src={image} width={width} height={height} {...props} layout={layout} alt={alt}/>
    </figure>) : null;
}
