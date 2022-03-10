# `Header`

Renders the page header including the site's logo and primary navigation.

The navigation menu is sourced from the "Primary" menu location in WordPress. If no menu is assigned to that location, none will be shown. Menu depth is currently limited to one level.

The site logo is pulled from `/public/logo.png`.

This component also renders the page title, date, author, and featured image if supplied.

## Usage

```jsx
import { Header } from 'components';

const MyHeader = () => (
  <Header title="Home Page" image={image} date={date} author={author} />
);
```

## Props

The `Header` component accepts the following props:

### title

The post/page title to be rendered as an `h1`.

Type: `String`
Required: No

### image

The post/page header image. This will generally be a post's featured image, but any `MediaItem` is acceptable.

Type: A WP GraphQL `MediaItem`
Required: No

### date

The post/page publish date.

Type: `String` formatted as `YYY-MM-DDThh:mm:ss`
Required: No

### author

The post/page author's name.

Type: `String`
Required: No
