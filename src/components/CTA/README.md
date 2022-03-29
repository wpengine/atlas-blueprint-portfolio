# `CTA`

Renders a basic Call To Action (CTA) component.

## Usage

```jsx
import { CTA } from 'components';

const MyCTA = () => <CTA Button={() => <button>Click</button>} />;
```

## Props

The `CTA` component accepts the following props:

### Button

The button component to be rendered

Type: `() => React.ReactElement`
Required: No

### children

elements to be used as children of the `Button`.

Type: `Element`
Required: No
