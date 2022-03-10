import { client } from 'client';
import Link from 'next/link';

export default function NavigationMenu({ className, menuLocation, children }) {
  const { useQuery } = client;
  const { nodes: menuItems } = useQuery().menuItems({
    where: {
      location: menuLocation,
    },
  });

  if (!menuLocation) {
    if (process.env.NODE_ENV === 'development') {
      throw new Error(
        'The menuLocation prop is required on the <NavigationMenu /> component.'
      );
    }

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
