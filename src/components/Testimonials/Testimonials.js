import TestimonialItem from 'components/TestimonialItem/TestimonialItem';
import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaQuoteRight,
} from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './Testimonials.module.scss';

/**
 * Render the testimonials component
 *
 * @param {Props} props The props object.
 * @param {Testimonial[]} props.testimonials The array of testimonials.
 * @returns {React.ReactElement} The testimonials component.
 */
export default function Testimonials({ testimonials }) {
  return (
    <>
      <div className={styles.container}>
        <FaQuoteRight className={styles['quote-icon']} />

        <Carousel
          showIndicators={false}
          showThumbs={false}
          renderArrowPrev={(clickHandler) => (
            <FaChevronCircleLeft
              className={styles.arrow}
              onClick={clickHandler}
            />
          )}
          renderArrowNext={(clickHandler) => (
            <FaChevronCircleRight
              className={styles.arrow}
              onClick={clickHandler}
            />
          )}
          infiniteLoop={true}
          showStatus={false}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialItem
              author={testimonial?.testimonialAuthor}
              key={index}
            >
              <div
                className={styles['slide-content']}
                dangerouslySetInnerHTML={{
                  __html: testimonial?.testimonialContent,
                }}
              />
            </TestimonialItem>
          ))}
        </Carousel>
      </div>
    </>
  );
}
