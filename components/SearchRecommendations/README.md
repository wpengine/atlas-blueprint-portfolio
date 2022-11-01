# `SearchRecommendations`

Renders some search recommendations when there are no results to display. Make

Internally it uses the GQty client to display the latests posts and categories.

## Usage

```jsx
import { SearchRecommendations } from 'components';

const MySearchRecommendations = () => (
  <SearchRecommendations recentPosts={recentPosts} categories={categories} />
);
```

## Props

### recentPosts

An array of recent posts from WordPress

Type: `Array`
Required: Yes

### categories

An array of categories from WordPress

Type: `Array`
Required: Yes
