import { Heading, NavigationMenu } from 'components';
import Image from 'next/image';
import Link from 'next/link';
import { FaSearch } from "react-icons/fa";
import styles from './Header.module.scss';

const PRIMARY_MENU_LOCATION = "PRIMARY";

export default function Header({title, image, date, author}) {
    // This is duplicated in the Posts component. Can we fix that?
    const formatOptions = { year: 'numeric', month: 'long', day: 'numeric'};
    const postedAt = !! date ? new Date(date)?.toLocaleDateString("en-US", formatOptions) : undefined;

    const src = image?.sourceUrl();
    const { altText } = image || '';
    const { width, height } = image?.mediaDetails || {};

    const hasText  = !! title || !! date || !! author;
    const hasImage = !! src && !! width && !! height;

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
                        { ( !! date || !! author ) &&
                            <div className={ styles['header__byline'] }>
                                { date && <time dateTime={date}>{postedAt}</time> }
                                {/* Is there a better way to space these than using margin? */}
                                { author && <span>By {author}</span> }
                            </div>
                        }
                    </div>
                ) }
            </div>

            { hasImage && (
                <div className={ styles['header__image'] } >
                    <div className="container" >
                        {/* Could this be the FeaturedImage component? */}
                        <figure>
                            <Image src={ src } alt={ altText } width={ width } height={ height } />
                        </figure>
                    </div>
                </div>
            ) }
        </header>
    );
}