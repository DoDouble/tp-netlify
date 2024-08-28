import { personReferenceProps } from '@/app/types/types';
import { type SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/client";
import Image from "next/image";
import imageUrl from "@/helpers/imageUrl";

import styles from './person.module.css';

function personQuery(_ref: string) {
    return `*[
        _type == "person"
        && _id == "${_ref}"
    ][0]`
}

export default async function Person(props: personReferenceProps) {
    const { _ref } = props;
    const person = await sanityFetch<SanityDocument>({
        query: personQuery(_ref),
    });

    return <div className={styles.person}>
        {person.profile_image && (
            <div className={styles.personImage}>
                <Image
                    src={imageUrl(person.profile_image, 250, 250) || "https://via.placeholder.com/250x250"}
                    alt={(person.firstName + ' ' + person.lastName) || "Image of person"}
                    className="rounded-full"
                    height="80"
                    width="80"
                />
            </div>
        )}
        <div className={styles.personDetails}>
            <div className={styles.personName}>
                {person.firstName} {person.lastName}
            </div>
            {person.title && (
                <div className={styles.personTitle}>
                    {person.title}
                </div>
            )}
        </div>
    </div>;
};