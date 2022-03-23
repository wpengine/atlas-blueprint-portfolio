import NextLinkWrapper from 'components/NextLinkWrapper/NextLinkWrapper';

import styles from './Button.module.scss';

/**
 * Render the Button component.
 *
 * @param {Props} props The props object.
 * @param {string} props.href The href attribute. If provided the button will be an <a> element.
 * @param {primary|secondary} props.type The type of the button
 * @param {string} props.className An optional className to be added to the button
 * @return {React.ReactElement} The Button component.
 */
export default function Button({ href, type, className, children, ...props }) {
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

  if (href) {
    return (
      <NextLinkWrapper href={href}>
        <a role="button" href={href} className={buttonClassName} {...props}>
          {children}
        </a>
      </NextLinkWrapper>
    );
  }

  return (
    <button type="button" className={buttonClassName} {...props}>
      {children}
    </button>
  );
}
