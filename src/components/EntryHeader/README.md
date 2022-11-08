# `EntryHeader`

Renders the page title, date, author, and featured image if supplied.

## Usage

```jsx
import { EntryHeader } from 'components';

const MyHeader = () => (
  <EntryHeader title="Home Page" image={image} date={date} author={author} />
);
```

## Props

The `EntryHeader` component accepts the following props:

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

### className

An additional class name to be applied to the `<EntryHeader>` component.

Type: `String`
Required: No
