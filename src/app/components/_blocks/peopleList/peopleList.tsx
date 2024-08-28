import { iwiProps, peopleListProps, personProps } from '@/app/types/types';
import { PortableText, type SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/client";
import PortableTextImageComponent from "@/app/components/portableTextImageComponent";
import Image from "next/image";
import imageUrl from "@/helpers/imageUrl";
import Link from "next/link";
import Script from "next/script";

import styles from './peopleList.module.css'

function peopleListQuery(key: string) {
    return `*[
        "${key}" in pageBuilder[]._key
    ]{
        "people": pageBuilder[].people[]->,
        "iwi": pageBuilder[].people[]->iwi[]->
    }`
}

export default async function PeopleList(props: peopleListProps) {
    // export const PeopleList = (props: peopleListProps) => {

    const { _key, name } = props;

    // The results coming from this query are pretty messy - a list with a `people` object
    // containing a list of personType... and a null item at the end for some reason
    const peopleRaw = await sanityFetch<SanityDocument>({
        query: peopleListQuery(_key),
    });

    let people: personProps[] = [];
    let iwi: any = {};

    if (peopleRaw && peopleRaw[0] && peopleRaw[0].people) {
        if (peopleRaw[0].people) {
            peopleRaw[0].people.forEach((person: personProps) => {
                if (person !== null) {
                    people.push(person);
                }
            });
        }

        if (peopleRaw[0].iwi) {
            peopleRaw[0].iwi.forEach((iwiInstance: iwiProps) => {
                // console.log('iwiInstance:', iwiInstance);
                if (iwiInstance !== null) {
                    iwi[iwiInstance._id] = {
                        'name': iwiInstance.name,
                        'slug': iwiInstance.slug.current
                    };
                }
            });
        }
    }

    // console.log('people:', people);
    // console.log('iwi:', iwi);

    return (
        <div className={styles.people}>
            {/*  */}
            <Script
                src="/common-modal.js"
                strategy="lazyOnload"
            />
            {/* <div className="text-xl font-bold mb-4">{name}</div> */}
            {people && people.length > 0 && (
                <ul className='lg:grid lg:grid-cols-3 gap-6'>
                    {people.map((person: personProps, index: number) => (
                        <li key={person._id} className='person border-b cursor-pointer mb-4 pb-4'>
                            {person.profile_image && (
                                <Image
                                    src={imageUrl(person.profile_image, 510, 300) || "https://via.placeholder.com/550x310"}
                                    alt={person.firstName || "Person"}
                                    className="w-full mb-2"
                                    height="310"
                                    width="500"
                                />
                            )}
                            {person.title && (
                                <div className='title mb-2'>{person.title}</div>
                            )}
                            <h2 className='person-name mb-2'>{person?.firstName} {person?.lastName}</h2>
                            {person.iwi && (
                                <ul className='iwi'>
                                    {person.iwi && person.iwi.map((iwiInstance: iwiProps, index: number) => (
                                        <li key={index}>{iwi[iwiInstance._ref].name}</li>
                                    ))}
                                </ul>
                            )}
                            {person.profile && person.profile.length > 0 && (
                                <div className="profile hidden prose max-w-none mt-4">
                                    <PortableText
                                        value={person.profile}
                                        components={{
                                            // ...
                                            types: {
                                                image: PortableTextImageComponent,
                                            },
                                        }}
                                    />
                                    {(person.linkedIn || person.twitter) && (
                                        <div className='socials flex justify-center gap-4'>
                                            {person.linkedIn && (
                                                <Link
                                                    href={person.linkedIn}
                                                    target="_blank"
                                                >
                                                    <Image
                                                        src="/icon-linkedin.svg"
                                                        alt="Link to LinkedIn profile"
                                                        width="25"
                                                        height="25"
                                                    />
                                                </Link>
                                            )}
                                            {person.twitter && (
                                                <Link
                                                    href={person.twitter}
                                                    target="_blank"
                                                >
                                                    <Image
                                                        src="/icon-x.svg"
                                                        alt="Link to X (Twitter) profile"
                                                        width="25"
                                                        height="25"
                                                    />
                                                </Link>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
            <div id="modal-wrapper" className='hidden'>
                <div className="modal relative">
                    <div className="modal-close absolute top-6 right-6 cursor-pointer">X</div>
                    <div className="modal-header text-center mb-6"></div>
                    <div className="modal-body"></div>
                    <div className="modal-footer"></div>
                </div>
            </div>
        </div>
    )
};