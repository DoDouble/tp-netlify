import { SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/client";
import StoryCardList from "../components/storyCardList";

type searchParamsProps = {
  q?: string;
}

const getStoriesQuery = (searchParams: searchParamsProps) => {
  const searchQuery = searchParams?.q || null
  return `*[
      _type == "story"
      && defined(slug.current)` + (
        searchQuery !== null
        ? `&& (
          title match "*${searchQuery}*"
          || body[].children[].text match "*${searchQuery}*"
        )`
        : ``
      ) +
    `]{
        _id,
        title,
        slug,
        hero_image,
        _createdAt,
        myTags,
        "author": *[_type=='person' && _id == ^.author._ref][0]{
          "name": firstName + " " + lastName,
          slug
        }
      }
      |order(date desc)
    `;
};

const TOPIC_QUERY = `*[
  _type == "topic"
]{
  _id,
  name,
  slug,
  tagline,
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
}`;


export default async function StoriesPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

  const stories = await sanityFetch<SanityDocument[]>({query: getStoriesQuery(searchParams) });

  console.log('searchParams:', searchParams, typeof searchParams);

  const topics = await sanityFetch<SanityDocument[]>({query: TOPIC_QUERY });

  return (
    <main className="container mx-auto">
      <h1 className="mb-4">
        Stories
      </h1>

      <div className="border border-grey-200 p-8">
        <h2>Topics</h2>
        <ul className="ml-6 list-disc mb-16">
          {topics.map((topic) => (
            <li key={topic?.slug?.current}><a href={`#${topic?.slug?.current}`}>{topic.name}</a></li>
          ))}
        </ul>
      </div>

      {topics.map((topic) => (
        <div id={topic?.slug?.current} key={topic._id}>
          <h2 className="bg-slate-600 text-white px-4 py-2">{topic.name}</h2>
          <div className="px-4 pb-4">
            <p>{topic.tagline}</p>
            <h3>Stories:</h3>
            {
              topic?.stories && topic?.stories.length > 0
              ? (
                <StoryCardList stories={topic?.stories} />
              )
              : 'There are no stories in this topic.'
            }

          </div>
        </div>
      ))}

      <hr className="mb-8" />

      <h2>Super simple keyword search on story Title and Body text</h2>

      <form className="mb-6">
        <input type="text" name="q" className="px-4 py-2 border border-slate-400 mr-4" defaultValue={searchParams?.q} />
        <button className="bg-slate-200 px-4 py-2 rounded-md">Search</button>
      </form>

      <StoryCardList stories={stories} />

    </main>
  );
}