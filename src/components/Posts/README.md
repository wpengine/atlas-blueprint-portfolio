# `Posts`

Renders a list of post summaries in a grid format.

## Usage

```jsx
import { Posts } from 'components';

const MyPosts = () => <Posts posts={data?.nodes} id="posts-list" />;
```

## Props

The `Posts` component accepts the following props:

### posts

The post nodes to be rendered.

Type: `Posts[]` WP GraphQL Posts nodes list
Required: No

### id

The unique id to be used when rendering the component.

Type: `String`
Required: No

### intro

Introduction text to be displayed as an entry paragraph.

Type: `String`
Required: No
