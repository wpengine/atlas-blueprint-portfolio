import { gql } from '@apollo/client';
import {
  FaChevronCircleLeft,
  FaChevronCircleRight,
  FaQuoteRight,
} from 'react-icons/fa';
import className from 'classnames/bind';
import { Carousel } from 'react-responsive-carousel';

import TestimonialItem from '../TestimonialItem';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './Testimonials.module.scss';
const cx = className.bind(styles);

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
      <div className={cx('container')}>
        <FaQuoteRight className={cx('quote-icon')} />

        <Carousel
          showIndicators={false}
          showThumbs={false}
          renderArrowPrev={(clickHandler) => (
            <FaChevronCircleLeft
              className={cx('arrow')}
              onClick={clickHandler}
            />
          )}
          renderArrowNext={(clickHandler) => (
            <FaChevronCircleRight
              className={cx('arrow')}
              onClick={clickHandler}
            />
          )}
          infiniteLoop={true}
          showStatus={false}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialItem
              author={testimonial?.testimonialFields?.testimonialAuthor}
              key={index}
            >
              <div
                className={cx('slide-content')}
                dangerouslySetInnerHTML={{
                  __html: testimonial?.testimonialFields?.testimonialContent,
                }}
              />
            </TestimonialItem>
          ))}
        </Carousel>
      </div>
    </>
  );
}

Testimonials.fragments = {
  entry: gql`
    fragment TestimonialsFragment on Testimonial {
      testimonialFields {
        testimonialContent
        testimonialAuthor
      }
    }
  `,
};
