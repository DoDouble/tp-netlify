import { ResourceLink } from '@/app/components/_blocks/resourceLink/resourceLink'
import Image from "next/image";
import imageUrl from "@/helpers/imageUrl";
import replaceWithBr from "@/helpers/replaceWithBr";

import './resourceLinksWrapper.css'
import styles from '@/app/components/_blocks/resourceLink/resourceLink.module.css'

export type ResourceLinksWrapperProps = {
    _key: string;
    _type: 'resourceLinksWrapper';
    title: string;
    layout: string;
    resourceLinks: Array<typeof ResourceLink>;
};

export const ResourceLinksWrapper = (props: ResourceLinksWrapperProps) => {

    const { title, layout, resourceLinks } = props;

    return (
        <div className={`resource-links ${layout} mb-8`}>
            <div className='h3'>
                {title}
            </div>
            <ul className={`${layout == 'list' ? 'list-disc list-inside' : ''}`}>
                {resourceLinks && resourceLinks.map((link: any) => (
                    <li key={link?._key}>
                        {link.image && (
                            <Image
                                src={imageUrl(link.image, 500, 500) || "https://via.placeholder.com/550x310"}
                                alt={link.linkTitle || "Resource link"}
                                className="mb-4"
                                height="500"
                                width="500"
                            />
                        )}
                        <a href={link.url}>{link.linkTitle}</a>
                        <div className={styles.description} dangerouslySetInnerHTML={{__html: replaceWithBr(link.description)}}></div>
                    </li>
                ))}
            </ul>
            <div className='link-more-resources'>
                <a href="/resources">View more resources here &gt;</a>
            </div>
        </div>
    )
};