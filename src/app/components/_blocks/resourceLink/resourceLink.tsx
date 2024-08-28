import Image from "next/image";
import imageUrl from "@/helpers/imageUrl";
import replaceWithBr from "@/helpers/replaceWithBr";

import styles from './resourceLink.module.css'

export type ResourceLinkProps = {
    _key: string;
    _type: 'resourceLink';
    url: string;
    linkTitle: string;
    description: string;
    image: string;
};

export const ResourceLink = (props: ResourceLinkProps) => {

    const { url, linkTitle, description, image } = props;

    return (
        <>
            {image && (
                <Image
                    src={imageUrl(image, 500, 500) || "https://via.placeholder.com/550x310"}
                    alt={linkTitle || "Resource link"}
                    className="mb-4"
                    height="500"
                    width="500"
                />
            )}
            <a href={url}>{linkTitle}</a>
            <div className={styles.description} dangerouslySetInnerHTML={{__html: replaceWithBr(description)}}></div>
        </>
    )
};