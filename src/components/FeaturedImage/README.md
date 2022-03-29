# `FeaturedImage`

Renders a featured image component.

## Usage

```jsx
import { FeaturedImage } from 'components';

const MyFeaturedImage = () => (
  <FeaturedImage image={image} width={340} height={340} />
);
```

## Props

The `FeaturedImage` component accepts the following props:

### image

The post/page image. This will generally be a post's featured image, but any `MediaItem` is acceptable.

Type: A WP GraphQL `MediaItem`
Required: Yes

### width

The image width.

Type: `String|Number`
Required: No

### height

The image height.

Type: `String|Number`
Required: No

### className

An additional class name to be applied to the `<FeaturedImage>` component.

Type: `String`
Required: No
