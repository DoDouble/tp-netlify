import { SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/client";
import StoryCardList from "../components/storyCardList";
import FilterTabs from "../components/_blocks/filterTabs/filterTabs";
import { iwiProps } from "../types/types";

type searchParamsProps = {
  q?: string;
  iwi?: string;
  tag?: string;
}

const searchQueryCondition = (keyword: string | null) => {
  return keyword !== null
    ? `
      && (
        title match "*${keyword}*"
        || body[].children[].text match "*${keyword}*"
      )`
    : ``;
}

const iwiQueryCondition = (iwi: string | null) => {
  return iwi !== null
    ? `
      && (
        iwi[]->slug.current match "${iwi}"
      )`
    : ``;
}

// const tagQueryCondition = (tag: string | null) => {
//   return tag !== null
//     ? `
//       && (
//         myTags[].value match "${tag}"
//       )`
//     : ``;
// }

const storiesQuery = (keyword: string | null, iwi: string | null, tag: string | null) => {
  const query = `*[
      _type == "story"
      && defined(slug.current)`
    + searchQueryCondition(keyword)
    + iwiQueryCondition(iwi)
    // + tagQueryCondition(tag)
    + `]{
        _id,
        title,
        slug,
        hero_image,
        _createdAt,
        "tags": tags[]->{
            "label": name,
            "value": slug.current
          },
        "author": *[_type=='person' && _id == ^.author._ref][0]{
          "name": firstName + " " + lastName,
          slug
        }
      }
      |order(date desc)
    `;
  console.log('query:', query);
  return query;
};

const tagStoriesQuery = (tag: string) => {
  const query = `*[
      _type == "contentTag"
      && name == "${tag}"
    ]{
        _id,
        name,
        "slug": slug.current,
        "stories": *[_type=='story' && references(^._id)]{
          _id,
          _createdAt,
          title,
          slug,
          hero_image,
          "tags": tags[]->{
            "label": name,
            "value": slug.current
          },
          "author": *[_type=='person' && _id == ^.author._ref][0]{
            "name": firstName + " " + lastName,
            slug
          }
        }
      }
      |order(date desc)
    `;
  console.log('tagStoriesQuery:', query);
  return query;
};

const FEATURED_TAGS_QUERY = `*[
  _type == "contentTag"
  && featured == true
]{
  _id,
  name,
  "slug": slug.current,
}|order(name)`;

const IWI_QUERY = `*[
  _type == "iwi"
    && defined(slug.current)
  ]{
    name,
    slug
  }|order(name)`;


export default async function StoriesPage({ searchParams }: { searchParams: { [key: string]: string | undefined } }) {
  const searchQuery = searchParams?.q || null;
  const iwiFilter = searchParams?.iwi || null;
  const tagFilter = searchParams?.tag?.toLowerCase() || null;

  let stories;

  if (tagFilter !== null) {
    stories = await sanityFetch<SanityDocument[]>({ query: tagStoriesQuery(tagFilter) });
    stories = await stories[0].stories;
  } else {
    stories = await sanityFetch<SanityDocument[]>({ query: storiesQuery(searchQuery, iwiFilter, tagFilter) });
  }

  console.log('searchParams:', searchParams, typeof searchParams);

  const featuredTags = await sanityFetch<SanityDocument[]>({ query: FEATURED_TAGS_QUERY });

  const allIwi = await sanityFetch<SanityDocument[]>({ query: IWI_QUERY });

  let iwiArray: iwiProps[] = [];
  let iwiLabel = null;

  allIwi.forEach((iwi) => {
    iwiArray.push({
      _id: iwi._id,
      name: iwi.name,
      slug: iwi.slug,
    });

    if (iwi.slug.current == iwiFilter) {
      iwiLabel = iwi.name;
    }
  });

  let filterTags: any[] = [];

  featuredTags.forEach((tag) => {
    filterTags.push({
      name: tag.name,
      slug: tag.slug,
    });
  });

  return (
    <main className="container mx-auto px-6 md:px-0">
      <h1 className="mb-4">
        Stories
      </h1>

      <FilterTabs
        tags={filterTags}
        selectedTag={tagFilter}
        iwi={iwiArray}
        selectedIwi={iwiFilter}
      />

      <h2>Super simple keyword search on story Title and Body text</h2>

      <form className="mb-6">
        <input type="text" name="q" className="px-4 py-2 border border-slate-400 mr-4" defaultValue={searchParams?.q} />
        <button className="bg-slate-200 px-4 py-2 rounded-md">Search</button>
      </form>

      {searchQuery && (
        <div className="bg-red-200 mb-8 py-4 px-8">Filtering on searchQuery: <strong>{searchQuery}</strong></div>
      )}

      {iwiFilter && (
        <div className="bg-green-200 mb-8 py-4 px-8">Filter: (Iwi) <strong>{iwiLabel}</strong></div>
      )}

      {tagFilter && (
        <div className="flex justify-between bg-yellow-200 mb-8 py-4 px-8">
          <div>Filter - tag: <strong>{tagFilter}</strong></div>
          <a href="/stories">X</a>
        </div>
      )}

      <StoryCardList stories={stories} selectedTag={tagFilter} />
    </main>
  );
}