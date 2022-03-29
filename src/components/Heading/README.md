# `Heading`

Renders a generic Heading component using HTML an `h` tag

The appropriate level of the heading is controlled by the `level` property

## Usage

```jsx
import { Heading } from 'components';

const MyHeading = () => <Heading level="h2">Head</Heading>;
```

## Props

The `Heading` component accepts the following props:

### level

The heading level tag to be rendered. It could be any valid `h` tag

Type: `h1|h2|h3|h4|h5|h6`
Required: No

### className

An additional class name to be applied to the `<Heading>` component.

Type: `String`
Required: No

### children

elements to be used as children of the `Heading`.

Type: `Element`
Required: No
