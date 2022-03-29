# `SearchResults`

Renders an array of search results nodes. If the results are loading it render a skeleton component `LoadingSearchResult` as a placeholder.

## Usage

```jsx
import { SearchResults } from 'components';

const MySearchResults = () => (
  <SearchResults searchResults={searchResults} isLoading={isLoading} />
);
```

## Props

The `PostInfo` component accepts the following props:

### searchResults

The array of search results as WPGraphQL nodes.

Type: `Object[]`
Required: No

### isLoading

Whether the search results are loading.

Type: `Boolean`
Required: No
