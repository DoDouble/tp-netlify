import { ResourceLink } from '@/app/components/_blocks/resourceLink/resourceLink'
import Image from "next/image";
import imageUrl from "@/helpers/imageUrl";
import replaceWithBr from "@/helpers/replaceWithBr";
import AccordionBlock from "@/app/components/accordionBlock";

import './resourceLinksWrapper.css'
import styles from '@/app/components/_blocks/resourceLink/resourceLink.module.css'

export type ResourceLinksWrapperProps = {
    _key: string;
    _type: 'resourceLinksWrapper';
    title: string;
    layout: string;
    resourceLinks: Array<typeof ResourceLink>;
    showMoreResourcesLink?: boolean;
};

export const ResourceLinksWrapper = (props: ResourceLinksWrapperProps) => {

    // console.log('props:', props);
    const { title, layout, resourceLinks, showMoreResourcesLink } = props;

    return (
        <div id={title.toLowerCase().replace(" ", "-")} className={`resource-links ${layout} mb-8`}>
            <div className='h3'>
                {title}
            </div>
            <ul className={`${layout == 'list' ? 'list-disc' : ''}`}>
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
            {showMoreResourcesLink && (
                <div className='link-more-resources'>
                    <a href="/resources">View more resources here &gt;</a>
                </div>
            )}
            {layout == 'accordion' && (
                <AccordionBlock type="resources" title={title} showTitle={true} items={resourceLinks} layout={layout} />
            )}
        </div>
    )
};