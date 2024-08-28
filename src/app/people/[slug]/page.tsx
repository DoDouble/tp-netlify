import { PortableText, type SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "../../components/_global/breadcrumbs";
import StoryCardList from "../../components/storyCardList";
import IwiList from "./../../components/iwiList";
import PortableTextImageComponent from "./../../components/portableTextImageComponent";
import imageUrl from "../../../helpers/imageUrl";


const PERSON_QUERY = `*[
  _type == "person" && slug.current == $slug
]{
  _id,
  "name": firstName + " " + lastName,
  profile_image,
  profile,
  "iwi_plural": iwi[]-> {_id, name, slug},
  "stories": *[_type=='story' && references(^._id)]{
    _id,
    _createdAt,
    title,
    slug,
    hero_image,
    myTags,
  }
}[0]`;


export default async function PersonPage({
    params,
}: {
    params: { slug: string };
}) {
    const person = await sanityFetch<SanityDocument>({
        query: PERSON_QUERY,
        params,
    });

    const {
        name,
        profile_image,
        profile,
        iwi_plural,
    } = person;

    const breadcrumbs = [
        [
            '/people',
            'People',
        ]
    ];

    return (
        <main className="container mx-auto">

            <Breadcrumbs crumbs={breadcrumbs} pageName={name} />

            <div className="flex justify-between gap-8 mb-8">
                <Image
                    src={imageUrl(profile_image, 300, 300) || "https://via.placeholder.com/550x310"}
                    alt={name || "Person"}
                    className="w-1/4"
                    height="310"
                    width="500"
                />
                <div className="w-3/4 flex flex-col gap-4">
                    {name ? (
                        <h1>
                            {name}
                        </h1>
                    ) : null}

                    {iwi_plural ? (
                        <IwiList iwiPlural={iwi_plural} />
                    ) : null}

                    {profile && profile.length > 0 && (
                        <div className="prose max-w-none">
                            <PortableText
                                value={profile}
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

            <div className="mb-16">
                <h3>Stories from {name}:</h3>
                {person.stories && (
                    <StoryCardList stories={person.stories} />
                )}
            </div>
        </main>
    );
}