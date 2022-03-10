import NextLinkWrapper from 'components/NextLinkWrapper/NextLinkWrapper';
import styles from './Button.module.scss';

/**
 * Render the Button component.
 *
 * @param {Props} props The props object.
 * @param {string} props.href Required: The href attribute.
 * @param {primary|secondary} props.type The type of the button
 * @param {string} props.className An optional className to be added to the button
 * @return {React.ReactElement} The Button component.
 */
export default function Button({ href, type, className, children }) {
  if (!href) {
    if (process.env.NODE_ENV === 'development') {
      throw new Error('The href prop is required on the <Button /> component.');
    }

    return null;
  }

  let buttonType;
  switch (type) {
    case 'primary': {
      buttonType = 'primary';
      break;
    }
    case 'secondary': {
      buttonType = 'secondary';
      break;
    }
    default: {
      buttonType = 'primary';
    }
  }

  let buttonClassName = [
    styles.button,
    styles[`button-${buttonType}`],
    className ?? undefined,
  ].join(' ');

  return (
    <NextLinkWrapper href={href}>
      <a role="button" href={href} className={buttonClassName}>
        {children}
      </a>
    </NextLinkWrapper>
  );
}
