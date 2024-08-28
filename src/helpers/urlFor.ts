import { client} from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

const urlFor = (source: SanityImageSource) => {
    const { projectId, dataset } = client.config();
    return projectId && dataset
        ? imageUrlBuilder({ projectId, dataset }).image(source)
        : null;
};

export default urlFor;