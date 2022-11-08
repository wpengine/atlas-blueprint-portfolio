# `PostInfo`

Renders a post publish date and author name in the following format:

> March 2, 2022 By Walter P. Engine

## Usage

```jsx
import { PostInfo } from 'components';
import styles from 'MyStyles.module.scss';

const MyPostInfo = () => (
  <PostInfo className={styles.my_class} date={date} author={author} />
);
```

## Props

The `PostInfo` component accepts the following props:

### className

The class that will be added to the wrapper div.

Type: `String`
Required: No

### date

The post/page publish date.

Type: `String` formatted as `YYY-MM-DDThh:mm:ss`
Required: No

### author

The post/page author's name.

Type: `String`
Required: No
