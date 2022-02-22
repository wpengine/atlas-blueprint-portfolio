import Image, {ImageProps} from 'next/image';
import styles from './FeaturedImage.module.scss';

export interface FeaturedImageProps {
  image: string | undefined;
  width?: string;
  height?: string;
  layout?: ImageProps['layout'];
  [key: string]: any;
}

export default function FeaturedImage({image, width = '340', height = '340', layout="responsive", ...props}: FeaturedImageProps) {
  return image ? (
    <figure className={styles['featured-image']}>
      <Image src={image} width={width} height={height} {...props} layout={layout} />
    </figure>) : null;
}
