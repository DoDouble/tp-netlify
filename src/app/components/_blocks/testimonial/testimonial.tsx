import Link from "next/link";
import { personReferenceProps } from "@/app/types/types";
import replaceWithBr from "@/helpers/replaceWithBr";
import Person from "../person/person";
import Image from "next/image";
import imageUrl from "@/helpers/imageUrl";

import styles from './testimonial.module.css'

export type testimonialProps = {
    _key: string;
    _type: 'testimonial';
    quote: string;
    person?: personReferenceProps;
    name?: string;
    image?: string;
    position?: string;
    organisation?: string;
    link?: string;
    linkText?: string;
};

export const Testimonial = (props: testimonialProps) => {

    const { quote, person, name, image, position, organisation, link, linkText } = props;

    return (
        <div className={styles.testimonial}>
            <blockquote
                className="text-xl font-bold mb-4"
                dangerouslySetInnerHTML={{ __html: replaceWithBr(quote) }}
            ></blockquote>

            {(person || name) && (
                <div className="testimonial-person">
                    {person && (
                        <>
                            <Person _ref={person._ref} />
                        </>
                    )}
                    {name && (
                        <div className="flex align-center gap-4 mb-4">
                            {image && (
                                <Image
                                    src={imageUrl(image, 250, 250) || "https://via.placeholder.com/250x250"}
                                    alt={name || "Image of person"}
                                    className="rounded-full"
                                    height="80"
                                    width="80"
                                />
                            )}
                            <div className="person-details">
                                <div>{name}</div>
                                {position && (
                                    <div>{position}</div>
                                )}
                                {organisation && (
                                    <div>{organisation}</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {link && (
                <Link
                    className="testimonial-link"
                    title={linkText}
                    href={link}
                >
                    {linkText}
                </Link>
            )}
        </div>
    )
};