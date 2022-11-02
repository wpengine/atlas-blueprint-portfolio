# `Projects`

Renders a list of project summaries.

## Usage

```jsx
import { Projects } from 'components';

const MyProjects = () => <Projects projects={data?.nodes} id="projects-list" />;
```

## Props

The `Projects` component accepts the following props:

### projects

The project nodes to be rendered.

Type: `Project[]` WP GraphQL Project nodes list
Required: No

### id

The unique id to be used when rendering the component.

Type: `String`
Required: No

### emptyText

Message to be displayed when the project nodes list is empty.

Type: `String`
Required: No
