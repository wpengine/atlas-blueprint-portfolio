# `Testimonials`

Renders a list of Testimonials in a slideshow format.

It uses `react-responsive-carousel` to render the Testimonials in a slider.

## Usage

```jsx
import { Testimonials } from 'components';

const MyTestimonials = () => (
  <Testimonials testimonials={testimonials?.nodes} />
);
```

## Props

The `Testimonials` component accepts the following props:

### testimonials

The array of testimonial nodes to be rendered as a slideshow.

Type: `Testimonial[]`
Required: Yes
