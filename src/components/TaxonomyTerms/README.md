# `TaxonomyTerms`

Renders a list of taxonomy terms and term links for a given post.

## Usage

```jsx
import { TaxonomyTerms } from 'components';

const MyTaxonomyTerms = () => (
  <TaxonomyTerms post={post} taxonomy={'categories'} />
);
```

## Props

The `TaxonomyTerms` component accepts the following props:

### post

The Post WP GraphQL Node to be used to query the term links.

Type: `Post`
Required: Yes

### taxonomy

The taxonomy term to use.

Type: `string`
Required: Yes
