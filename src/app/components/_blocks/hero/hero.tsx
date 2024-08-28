import Image from "next/image";
import imageUrl from "@/helpers/imageUrl";

import styles from './hero.module.css'

export type HeroProps = {
    _key: string;
    _type: 'hero';
    heading: string;
    tagline: string;
    image: string;
};

export const Hero = (props: HeroProps) => {
    const { heading, tagline, image } = props;

    return (
        <div className={styles.hero}>
            <div className={styles.hero_content}>
                <div className={styles.hero_heading}>{ heading }</div>
                <div className={styles.hero_tagline}>{ tagline }</div>
            </div>
            {image && (
                <Image
                    src={imageUrl(image, 1440, 200) || "https://via.placeholder.com/550x310"}
                    alt={heading}
                    width="1440"
                    height="200"
                />
            )}
        </div>
    )
};
