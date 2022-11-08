# `Button`

Renders a basic button component.

The button component can have different styles by using the `styleType` property.

## Usage

```jsx
import { Button } from 'components';

const MyButton = () => <Button />;
```

## Props

The `Button` component accepts the following props:

### href

The href attribute. If provided the button will be an <a> element.

Type: `String`
Required: No

### styleType

The type of the button

Type: `primary|secondary`
Required: No

### className

An optional class name for the button

Type: `String`
Required: No
