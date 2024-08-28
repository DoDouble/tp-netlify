// import KeenSliderClientComponentTest from "../keenSliderClientComponentTest/keenSliderClientComponentTest";
import EmblaCarousel from "../emblaCarousel/emblaCarousel";
import { Testimonial } from "../testimonial/testimonial";
import { testimonialProps } from "../testimonial/testimonial";

export type testimonialsWrapperProps = {
    _key: string;
    _type: 'testimonialsWrapper';
    title: string;
    testimonials: testimonialProps[];
};

export const TestimonialsWrapper = (props: testimonialsWrapperProps) => {
    return (
        <EmblaCarousel>
            {/* <div className='h3'>
                {props.title}
            </div> */}
            {props.testimonials && props.testimonials.map((testimonial: testimonialProps, index: number) => (
                <div className="embla__slide select-none cursor-pointer" key={index}>
                    <Testimonial
                        _key={testimonial._key}
                        _type={testimonial._type}
                        quote={testimonial.quote}
                        person={testimonial.person}
                        name={testimonial.name}
                        image={testimonial.image}
                        position={testimonial.position}
                        organisation={testimonial.organisation}
                        link={testimonial.link}
                        linkText={testimonial.linkText}
                    />
                </div>
            ))}
        </EmblaCarousel>
    )
};