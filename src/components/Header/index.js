import { FaSearch } from "react-icons/fa";
import { FeaturedImage, Heading, NavigationMenu, PostInfo } from 'components';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.scss';

const PRIMARY_MENU_LOCATION = "PRIMARY";

export default function Header({title, image, date, author}) {
    const hasText = title || date || author;

    return (
        <header className={ styles['header'] }>
            <div className="container" >
                <div className={ styles['header__bar'] }>
                    <div className={ styles['logo'] }>
                        <Link href="/">
                            <a>
                                <Image src="/logo.png" width={400} height={80} alt="Blueprint media logo" />
                            </a>
                        </Link>
                    </div>
                    <NavigationMenu
                        className={ styles['primary-navigation'] }
                        menuLocation={ PRIMARY_MENU_LOCATION }
                    >
                        <li>
                            <Link href="/search">
                                <a>
                                    <FaSearch title="Search" role="img"/>
                                </a>
                            </Link>
                        </li>
                    </NavigationMenu>
                </div>

                { hasText && (
                    <div className={ styles['header__text'] } >
                        { !! title && <Heading className={ styles['header__title']}>{title}</Heading> }
                        <PostInfo
                            className={styles['header__byline']}
                            author={author}
                            date={date}
                        />
                    </div>
                ) }
            </div>

            { image && (
                <div className={ styles['header__image'] } >
                    <div className="container" >
                        <FeaturedImage
                            className={styles['featured-image']}
                            image={image}
                        />
                    </div>
                </div>
            ) }
        </header>
    );
}