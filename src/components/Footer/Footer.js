import appConfig from 'app.config';
import styles from './Footer.module.scss';
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import NavigationMenu from 'components/NavigationMenu';

/**
 * @type {import('client/schema.generated').MenuLocationEnum}
 */
const FOOTER_MENU_LOCATION = 'FOOTER';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        {appConfig?.socialLinks && (
          <div className={styles['social-links']}>
            <ul>
              {appConfig.socialLinks?.twitterUrl && (
                <li>
                  <a
                    className={styles['social-icon']}
                    href={appConfig.socialLinks.twitterUrl}
                  >
                    <FaTwitter />
                  </a>
                </li>
              )}

              {appConfig.socialLinks?.facebookUrl && (
                <li>
                  <a
                    className={styles['social-icon']}
                    href={appConfig.socialLinks.facebookUrl}
                  >
                    <FaFacebookF />
                  </a>
                </li>
              )}

              {appConfig.socialLinks?.instagramUrl && (
                <li>
                  <a
                    className={styles['social-icon']}
                    href={appConfig.socialLinks.instagramUrl}
                  >
                    <FaInstagram />
                  </a>
                </li>
              )}

              {appConfig.socialLinks?.youtubeUrl && (
                <li>
                  <a
                    className={styles['social-icon']}
                    href={appConfig.socialLinks.youtubeUrl}
                  >
                    <FaYoutube />
                  </a>
                </li>
              )}

              {appConfig.socialLinks?.githubUrl && (
                <li>
                  <a
                    className={styles['social-icon']}
                    href={appConfig.socialLinks.githubUrl}
                  >
                    <FaGithub />
                  </a>
                </li>
              )}

              {appConfig.socialLinks?.linkedinUrl && (
                <li>
                  <a
                    className={styles['social-icon']}
                    href={appConfig.socialLinks.linkedinUrl}
                  >
                    <FaLinkedinIn />
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}

        <NavigationMenu
          className={styles.nav}
          menuLocation={FOOTER_MENU_LOCATION}
        />

        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} Blueprint Media &#183; Powered By{' '}
          <a href="https://wpengine.com/atlas">Atlas</a>
        </div>
      </div>
    </footer>
  );
}
