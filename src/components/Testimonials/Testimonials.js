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
      <style jsx global>{`
        .carousel.carousel-slider {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      `}</style>

      <div className={styles.container}>
        <FaQuoteRight className={styles.quoteIcon} />

        <Carousel
          showIndicators={false}
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
          className={styles.testimonialSlider}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialItem author={testimonial?.author} key={index}>
              {testimonial?.content}
            </TestimonialItem>
          ))}
        </Carousel>
      </div>
    </>
  );
}
