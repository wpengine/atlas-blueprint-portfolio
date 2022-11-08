# `Header`

Renders the page header including the site's logo and primary navigation.

The navigation menu is sourced from the "Primary" menu location in WordPress. If no menu is assigned to that location, none will be shown. Menu depth is currently limited to one level.

The site logo is pulled from `/public/logo.png`.

## Usage

```jsx
import { Header } from 'components';

const MyHeader = () => <Header />;
```

## Props

The `Header` component accepts the following props:

### className

An additional class name to be applied to the `<Header>` component.

Type: `String`
Required: No
