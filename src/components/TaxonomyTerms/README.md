# `TaxonomyTerms`

/\*\*

- Renders a list of taxonomy terms and term links for a given post
- @param {Props} props The props object.
- @param {Post} props.post The Post GraphQL Node.
- @param {string} props.taxonomy The taxonomy type.
- @returns {React.ReactElement} The TaxonomyTerms component
  \*/

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
