# `LoadMore`

## Usage

```jsx
import { LoadMore } from 'components';
const MyLoadMore = () => (
  <LoadMore
    hasNextPage={hasNextPage}
    endCursor={endCursor}
    isLoading={isLoading}
    fetchMore={fetchMore}
  />
);
```

## Props

- @param {boolean} props.hasNextPage Flag to use if there are more results to load.
- @param {string} props.endCursor The next pagination cursor string.
- @param {boolean} props.isLoading Flag that indicates whether the pagination is loading.
- @param {string} props.fetchMore Callback function to trigger the next pagination request.
- @param {string} props.className An optional className to be added to the container.

The `LoadMore` component accepts the following props:

### hasNextPage

Whether there are more results to load.

Type: `Boolean`
Required: No

### endCursor

The next pagination cursor string.

Type: `String`
Required: No

### isLoading

Whether the pagination results are loading.

Type: `Boolean`
Required: No

### fetchMore

A callback function to trigger the next pagination request.

Type: `(object) => void`
Required: No

### className

An additional class name to be applied to the `<LoadMore>` component.

Type: `String`
Required: No
