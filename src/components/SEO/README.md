# `SEO`

Renders related meta tags to a page.

Works as an abstraction on top of the `next/head` component.

## Usage

```jsx
import { SEO } from 'components';

const MySEO = () => <SEO title={pageTitle(generalSettings, 'Search')} />;
```

## Props

The `SEO` component accepts the following props:

### title

The Website title to be used

Type: `String`
Required: No

### description

The Website description to be used

Type: `String`
Required: No

### imageUrl

The Website image to be used for the Open Graph Protocol

Type: `String`
Required: No

### url

The Website url to be used for the Open Graph Protocol

Type: `String`
Required: No
