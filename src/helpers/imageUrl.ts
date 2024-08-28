import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import urlFor from "./urlFor";

const imageUrl = (image: SanityImageSource, width: number, height: number) => {
    return image
        ? urlFor(image)?.width(width).height(height).url()
        : null;

};

export default imageUrl;