import Image from "next/image";
import {getImageDimensions} from '@sanity/asset-utils';
import imageUrl from "@/helpers/imageUrl";
// import type { NodeRenderer } from '@sanity/types';

type assetProps = {
    _ref: string;
    _type: string;
}

type valueProps = {
    _key: string;
    _type: string;
    asset: assetProps;
    alt?: string;
}

type portableTextImageComponentProps = {
    value: valueProps;
    isInline: boolean;
    index: number;
    renderNode: any;
}

// Barebones lazy-loaded image component
const PortableTextImageComponent = (props: portableTextImageComponentProps) => {
    const { value } = props;

    if (! value || value === null || typeof value == 'undefined') {
        return;
    }
    else {
        const { width, height } = getImageDimensions(value ?? null)

        return (
            // <div className="fix">To be fixed</div>
            <Image
                className='my-8'
                // src={urlBuilder().image(value).width(800).fit('max').auto('format').url()}
                src={imageUrl(value, 640, 480) || "https://via.placeholder.com/550x310"}
                alt={value.alt || ' '}
                loading="lazy"
                height="310"
                width="550"
                style={{
                    // Avoid jumping around with aspect-ratio CSS property
                    aspectRatio: width / height,
                }}
            />
        )
    }
};

export default PortableTextImageComponent;