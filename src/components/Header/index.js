import { useState } from 'react';
import { FaBars, FaSearch } from 'react-icons/fa';
import { FeaturedImage, Heading, NavigationMenu, PostInfo } from 'components';
import Image from 'next/image';
import Link from 'next/link';

import styles from './Header.module.scss';

const PRIMARY_MENU_LOCATION = 'PRIMARY';

export default function Header({ title, image, date, author, className }) {
  const hasText = title || date || author;

  const [isNavShown, setIsNavShown] = useState(false);

  const headerClasses = [styles.header, className].join(' ');
  const navClasses = [
    styles['primary-navigation'],
    isNavShown ? styles['show'] : undefined,
  ];

  return (
    <header className={headerClasses}>
      <div className="container">
        <div className={styles['bar']}>
          <div className={styles['logo']}>
            <Link href="/">
              <a title="Home">
                <Image
                  src="/logo.png"
                  width={400}
                  height={80}
                  alt="Blueprint media logo"
                  layout="responsive"
                />
              </a>
            </Link>
          </div>
          <button
            type="button"
            className={styles['nav-toggle']}
            onClick={() => setIsNavShown(!isNavShown)}
            aria-label="Toggle navigation"
            aria-controls={styles['primary-navigation']}
            aria-expanded={isNavShown}
          >
            <FaBars />
          </button>
          <NavigationMenu
            id={styles['primary-navigation']}
            className={navClasses.join(' ')}
            menuLocation={PRIMARY_MENU_LOCATION}
          >
            <li>
              <Link href="/search">
                <a>
                  <FaSearch title="Search" role="img" />
                </a>
              </Link>
            </li>
          </NavigationMenu>
        </div>

        {hasText && (
          <div className={styles['text']}>
            {!!title && <Heading className={styles['title']}>{title}</Heading>}
            <PostInfo
              className={styles['byline']}
              author={author}
              date={date}
            />
          </div>
        )}
      </div>

      {image && (
        <div className={styles['image']}>
          <div className="container">
            <FeaturedImage
              className={styles['featured-image']}
              image={image}
              priority
            />
          </div>
        </div>
      )}
    </header>
  );
}
