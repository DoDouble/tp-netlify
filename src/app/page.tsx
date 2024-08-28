import Link from "next/link";
import { SanityDocument } from "next-sanity";

import { sanityFetch } from "@/sanity/client";
import StoryCardList from "@/app/components/storyCardList";

const STORIES_QUERY = `*[
  _type == "story"
  && defined(slug.current)
]{_id, title, slug, hero_image, _createdAt, author->}|order(date desc)`;

export default async function IndexPage() {
  const stories = await sanityFetch<SanityDocument[]>({ query: STORIES_QUERY });

  return (
    <main className="container min-h-screen mx-auto">
      <h1>
        Home
      </h1>
      <h2>Stories</h2>
      { stories && (
        <StoryCardList stories={stories} />
      )}
    </main>
  );
}