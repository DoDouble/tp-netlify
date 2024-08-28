import Link from "next/link";
import replaceWithBr from "@/helpers/replaceWithBr";

import styles from './cta.module.css'

export type ctaProps = {
    _key: string;
    _type: 'cta';
    title: string;
    text?: string;
    buttonText?: string;
    buttonLink?: string;
};

export const CTA = (props: ctaProps) => {

    const { title, text, buttonText, buttonLink } = props;

    // console.log('cta block:', props);

    return (
        <div className={styles.cta}>
            <div className="text-xl font-bold mb-4">{title}</div>
            {text && (
                <p className="" dangerouslySetInnerHTML={{__html: replaceWithBr(text)}}></p>
            )}
            {buttonLink && (
                <Link
                    className="btn"
                    title={buttonText}
                    href={buttonLink}
                >
                    {buttonText}
                </Link>
            )}
        </div>
    )
};