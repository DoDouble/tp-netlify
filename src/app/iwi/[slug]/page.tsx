import { PortableText, type SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/app/components/_global/breadcrumbs";
import StoryCardList from "@/app/components/storyCardList";
import PortableTextImageComponent from "@/app/components/portableTextImageComponent";
import imageUrl from "@/helpers/imageUrl";


const IWI_QUERY = `*[
  _type == "iwi" && slug.current == $slug
]{
  ...,
  "stories": *[_type=='story' && references(^._id)]{
    _id,
    _createdAt,
    title,
    slug,
    hero_image,
    myTags,
    "author": *[_type=='person' && _id == ^.author._ref][0]{
      "name": firstName + " " + lastName,
      slug
    }
  }
}[0]`;


export default async function StoryPage({
    params,
}: {
    params: { slug: string };
}) {
    const iwi = await sanityFetch<SanityDocument>({
        query: IWI_QUERY,
        params,
    });

    const {
        name,
        hero_image,
        details,
    } = iwi;

    const breadcrumbs = [
        [
            '/iwi',
            'Iwi',
        ]
    ];

    return (
        <main className="container mx-auto">
            <div className="relative">
                <Image
                    src={imageUrl(hero_image, 1440, 400) || "https://via.placeholder.com/550x310"}
                    alt={name || "Story"}
                    className="h-60 mx-auto aspect-video overflow-hidden rounded-xl object-cover object-top sm:w-full"
                    height="310"
                    width="500"
                />
                <div className="absolute top-0 left-0 w-full h-full flex flex-column items-end text-white">
                    {iwi?.name ? (
                        <h1 className="mb-8 mx-8">
                            {iwi?.name}
                        </h1>
                    ) : null}
                </div>
            </div>

            <Breadcrumbs crumbs={breadcrumbs} pageName={name} />

            <div className="grid items-top gap-12 sm:grid-cols-2">
                <div className="flex flex-col justify-center space-y-4">
                    {details && details.length > 0 && (
                        <div className="prose max-w-none">
                            <PortableText
                                value={details}
                                components={{
                                    // ...
                                    types: {
                                        image: PortableTextImageComponent,
                                    },
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
            <div>
                <h3>Stories from {iwi.name}:</h3>
                <StoryCardList stories={iwi.stories} />
            </div>
        </main>
    );
}