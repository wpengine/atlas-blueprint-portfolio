# `ContentWrapper`

Renders styled post content. Includes styles for core WordPress classes such as handling image alignment.

The ContentWrapper component uses an `article` element as a base.

## Usage

```jsx
import { ContentWrapper } from 'components';

const MyWrapper = () => (
  <ContentWrapper content="<div>Hello</div>">
    <div>World</div>
  </ContentWrapper>
);
```

## Props

The `ContentWrapper` component accepts the following props:

### content

The content attribute. It can be a valid HTML string.

Type: `String`
Required: Yes

### className

An optional class name for the `ContentWrapper`

Type: `String`
Required: No

### children

elements to be used as children of the `ContentWrapper`.

Type: `Element`
Required: No
