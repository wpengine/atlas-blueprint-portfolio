import { gql } from '@apollo/client';
import Link from 'next/link';

export default function NavigationMenu({ menuItems, className, children }) {
  if (!menuItems) {
    return null;
  }

  if (!menuItems) {
    return null;
  }

  return (
    <nav
      className={className}
      role="navigation"
      aria-label={`${menuItems[0]?.menu.node.name} menu`}
    >
      <ul className="menu">
        {menuItems.map((item) => {
          const { id, path, label } = item;
          return (
            <li key={id ?? ''}>
              <Link href={path ?? ''}>{label ?? ''}</Link>
            </li>
          );
        })}
        {children}
      </ul>
    </nav>
  );
}

NavigationMenu.fragments = {
  entry: gql`
    fragment NavigationMenuItemFragment on MenuItem {
      id
      path
      label
      parentId
      cssClasses
      menu {
        node {
          name
        }
      }
    }
  `,
};
