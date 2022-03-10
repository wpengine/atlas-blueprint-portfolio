# `NavigationMenu`

Renders a navigation menu from WordPress.

## Usage

```jsx
import { NavigationMenu } from 'components';
import styles from 'MyNavigationMenu.module.scss';

const MyNavigationMenu = () => (
  <NavigationMenu className={styles.my_class} menuLocation="PRIMARY">
    <li>
      <a href="https://faustjs.org">Faust.js</a>
    </li>
  </NavigationMenu>
);
```

## Props

The `NavigationMenu` component accepts the following props:

### className

The class that will be added to the wrapper `nav` element.

Type: `String`
Required: No

### menuLocation

The WordPress menu location to use in populating the menu.

Type: `String` matching one of the `MenuLocationEnum` from WP GraphQL
Required: Yes

### children

`li` elements to append to the end of the WordPress menu's `ul`.

Type: `Element`
Required: No
