import Link from 'next/link';

/**
 * Determine if a given href attribute is a relative path.
 *
 * @param {string} href The href attribute to check.
 * @returns {boolean}
 */
export function isHrefRelative(href) {
  try {
    new URL(href);

    return false;
  } catch (err) {
    return true;
  }
}

/**
 * Conditionally wrap the button in a Next/Link component if the href prop is
 * relative.
 *
 * @param {Props} props The props object.
 * @param {string} props.href The href attribute.
 * @param {React.ReactElement} props.children The content to be wrapped
 * @return {React.ReactElement} The children, possibly wrapped in <Link>.
 */
export default function NextLinkWrapper({ href, children }) {
  if (isHrefRelative(href)) {
    return (
      <Link href={href} passHref>
        {children}
      </Link>
    );
  }

  return children;
}
