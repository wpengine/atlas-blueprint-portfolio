# `ProjectHeader`

Renders the page title, summary and featured image for a project page.

## Usage

```jsx
import { ProjectHeader } from 'components';

const MyProjectHeader = () => (
  <ProjectHeader title="Home Page" image={image} summary={summary} />
);
```

## Props

The `ProjectHeader` component accepts the following props:

### title

The project title to be rendered as an `h2`.

Type: `String`
Required: No

### image

The project header image. This will generally be a post's featured image, but any `MediaItem` is acceptable.

Type: A WP GraphQL `MediaItem`
Required: No

### summary

The project summary.

Type: `String`
Required: No
