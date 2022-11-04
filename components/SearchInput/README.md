# `SearchInput`

Renders an array of search results nodes. If the results are loading it render a skeleton component `SearchInput` as a placeholder.

## Usage

```jsx
import { SearchInput } from 'components';

const MySearchInput = () => (
  <SearchInput value={value} onChange={handleOnChange} />
);
```

## Props

The `SearchInput` component accepts the following props:

### value

The search input value.

Type: `String`
Required: No

### onChange

The optional `onChange` handler function.

Type: `(e) => void`
Required: No
