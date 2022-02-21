import Image from 'next/image';

export interface FeaturedImageProps {
  image: string | undefined;
  width?: string;
  height?: string;
  [key: string]: any;
}

export default function FeaturedImage({image, width = '340', height = '340', ...props}: FeaturedImageProps) {
  return image ? (
    <figure>
      <Image src={image} width={width} height={height} {...props} layout="responsive" />
    </figure>) : null;
}
