import Image from "next/image";
import Link from "next/link";
import imageUrl from "@/helpers/imageUrl";
import { TagList } from "./tagList";

import { storyProps, storiesListProps } from "@/app/types/types";

export default function storyCardList( props: storiesListProps ) {
    const { stories, selectedTag } = props;

    return (
        <ul className="grid grid-cols-1 gap-6 md:gap-10 lg:gap-12 lg:grid-cols-3 mb-8 md:mb-16">
            {stories.map((story: storyProps) => (
                <li
                    key={story._id}
                >
                    <Link
                        href={`/stories/${story.slug.current}`}
                    >
                        <Image
                            src={imageUrl(story?.hero_image, 372, 209) || "https://via.placeholder.com/550x310"}
                            alt={story?.title || "Story"}
                            className="h-60 mx-auto aspect-video overflow-hidden rounded-xl object-cover object-top sm:w-full mb-4"
                            height="310"
                            width="500"
                        />
                        <h2 className="mb-4">{story?.title}</h2>
                    </Link>

                    {story.author ? (
                        <div>
                            By: {story?.author?.name}
                        </div>
                    ) : null}

                    <p className="text-sm text-gray-500 mb-6">
                        Created on: {new Date(story?._createdAt).toLocaleDateString()}
                    </p>
                    {story?.myTags ? (
                        <TagList tags={story?.myTags} selectedTag={selectedTag} />
                    ) : null}
                    {story?.tags ? (
                        <TagList tags={story?.tags} selectedTag={selectedTag} />
                    ) : null}
                </li>
            ))}
        </ul>
    )
};