import * as MENUS from 'constants/menus';

import appConfig from 'app.config';
import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import { NavigationMenu } from 'components';

import styles from './Footer.module.scss';

/**
 * The Blueprint's Footer component
 * @return {React.ReactElement} The Footer component.
 */
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        {appConfig?.socialLinks && (
          <div className={styles['social-links']}>
            <ul aria-label="Social media">
              {appConfig.socialLinks?.twitterUrl && (
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles['social-icon-link']}
                    href={appConfig.socialLinks.twitterUrl}
                  >
                    <FaTwitter
                      title="Twitter"
                      className={styles['social-icon']}
                    />
                  </a>
                </li>
              )}

              {appConfig.socialLinks?.facebookUrl && (
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles['social-icon-link']}
                    href={appConfig.socialLinks.facebookUrl}
                  >
                    <FaFacebookF
                      title="Facebook"
                      className={styles['social-icon']}
                    />
                  </a>
                </li>
              )}

              {appConfig.socialLinks?.instagramUrl && (
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles['social-icon-link']}
                    href={appConfig.socialLinks.instagramUrl}
                  >
                    <FaInstagram
                      title="Instagram"
                      className={styles['social-icon']}
                    />
                  </a>
                </li>
              )}

              {appConfig.socialLinks?.youtubeUrl && (
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles['social-icon-link']}
                    href={appConfig.socialLinks.youtubeUrl}
                  >
                    <FaYoutube
                      title="YouTube"
                      className={styles['social-icon']}
                    />
                  </a>
                </li>
              )}

              {appConfig.socialLinks?.githubUrl && (
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles['social-icon-link']}
                    href={appConfig.socialLinks.githubUrl}
                  >
                    <FaGithub
                      title="GitHub"
                      className={styles['social-icon']}
                    />
                  </a>
                </li>
              )}

              {appConfig.socialLinks?.linkedinUrl && (
                <li>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles['social-icon-link']}
                    href={appConfig.socialLinks.linkedinUrl}
                  >
                    <FaLinkedinIn
                      title="LinkedIn"
                      className={styles['social-icon']}
                    />
                  </a>
                </li>
              )}
            </ul>
          </div>
        )}

        <NavigationMenu
          className={styles.nav}
          menuLocation={MENUS.FOOTER_LOCATION}
        />

        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} Blueprint Media &#183; Powered By{' '}
          <a href="https://wpengine.com/atlas">Atlas</a>
        </div>
      </div>
    </footer>
  );
}
