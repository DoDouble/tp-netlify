import { PortableText, type SanityDocument } from "next-sanity";
import Script from "next/script";

import { sanityFetch } from "@/sanity/client";
import Link from "next/link";
import Image from "next/image";
import imageUrl from "@/helpers/imageUrl";
import Breadcrumbs from "@/app/components/_global/breadcrumbs";
import PortableTextImageComponent from "@/app/components/portableTextImageComponent";
import IwiList from "@/app/components/iwiList";
import { TagList } from "@/app/components/tagList";
import Timecodes from "@/app/components/timecodes";

import { ResourceLinksWrapper } from "@/app/components/_blocks/resourceLinksWrapper/resourceLinksWrapper";

const STORY_QUERY = `*[
    _type == "story" &&
    slug.current == $slug
  ][0]{
  _id,
  title,
  summary,
  hero_image,
  slug,
  myTags,
  body,
  details,
  video,
  timecodes,
  resources,
  "iwi_plural": iwi[]-> {_id, name, slug},
  author->,
  topic->,
  // headline->,
  // venue->
}`;


export default async function StoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const story = await sanityFetch<SanityDocument>({
    query: STORY_QUERY,
    params,
  });
  const {
    title,
    summary,
    hero_image,
    body,
    iwi_plural,
    myTags,
    timecodes,
    resources,
    author,
    topic,
  } = story;

  const breadcrumbs = [
    [
      '/stories',
      'Stories',
    ]
  ];

  // const eventDate = new Date(date).toDateString();
  // const eventTime = new Date(date).toLocaleTimeString();
  // const doorsOpenTime = new Date(
  //   new Date(date).getTime() + doorsOpen * 60000
  // ).toLocaleTimeString();

  return (
    <main className="container mx-auto">
      <div className="relative">
        <Image
          src={imageUrl(hero_image, 1440, 400) || "https://via.placeholder.com/550x310"}
          alt={title || "Story"}
          className="h-60 mx-auto aspect-video overflow-hidden rounded-xl object-cover object-top sm:w-full"
          height="310"
          width="500"
        />
        {title && (
          <h1 className="absolute bottom-0 left-0 text-white tracking-tighter p-8">
            {title}
          </h1>
        )}
      </div>

      <Breadcrumbs crumbs={breadcrumbs} pageName={title} />

      <div className="flex space-between mb-8">
        <div className="w-1/2">
          {summary && (
            <div className="text-lg mb-8">
              {summary}
            </div>
          )}

          {topic && (
            <div className="mb-4">
              <strong>Topic:</strong> <Link href={`/stories#${topic?.slug?.current}`}>{topic.name}</Link>
            </div>
          )}

          {myTags && (
            <TagList tags={myTags} />
          )}

          {iwi_plural && iwi_plural.length > 0 && (
              <IwiList iwi_plural={iwi_plural} />
          )}
        </div>
        <div className="w-1/2 flex gap-4">
          <div>
            <Image
              src={imageUrl(author?.profile_image, 250, 250) || "https://via.placeholder.com/550x310"}
              alt={author?.name || "Author"}
              className="rounded-full"
              height="150"
              width="150"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="mb-0">
              Author:
            </h3>

            <Link
                href={`/people/${author.slug.current}`}
            >
              {author?.firstName} {author?.lastName}
            </Link>

            {author?.profile && (
              <div className="prose max-w-none">
                <PortableText
                  value={author?.profile}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <video id="vid1" controls width="800" className="w-full mb-4">
        <source src="//vjs.zencdn.net/v/oceans.mp4" />
      </video>

      <Script
        src="/video-test.js"
        strategy="lazyOnload"
      />

      <div className="flex gap-8">
        <div className="w-1/2">
          <div className="bg-amber-200 rounded-md p-6">
            <div id="annotation-box"></div>
            <button className="playBtn bg-amber-400 hover:bg-amber-600">Resume video</button>
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex gap-2 mb-4">
            <button className="playBtn">Play</button>
            <button id="pauseBtn">Pause</button>
          </div>

          {/* <Script id="show-banner" strategy="lazyOnload">
            {`console.log('here i am stan')`}
          </Script> */}

          {timecodes && (
            <Timecodes timecodes={timecodes} />
          )}

          <div className="mt-4">
            <strong>Temp progress indicator:</strong>
            <input className="w-full" type="range" id="seek-bar" value="0" readOnly />
          </div>
        </div>
      </div>
      <div className="grid items-top gap-12 sm:grid-cols-2 mb-8">
        <div className="flex flex-col justify-center space-y-4">
          {body && body.length > 0 && (
            <div className="prose max-w-none">
              <PortableText
                value={body}
                components={{
                  // ...
                  types: {
                    image: PortableTextImageComponent,
                  },
                }}
              />
            </div>
          )}
          {/* {tickets && (
            <a
              className="flex items-center justify-center rounded-md bg-blue-500 p-4 text-white"
              href={tickets}
            >
              Buy Tickets
            </a>
          )} */}
        </div>
      </div>
      {resources && resources.length > 0 && resources.map((block: any) => (
        <div key={block._key}>
          <ResourceLinksWrapper
            _key={block._key}
            _type={block._type}
            title={block?.title}
            layout={(block?.layout || 'list').toLowerCase()}
            resourceLinks={block?.resourceLinks}
          />
        </div>
      ))}
      <br />
      <br />
      <div className="related-resources bg-gray-200 p-6 rounded-md">
        <h3>Related Resources</h3>
        <p className="mb-0"><a href="/resources">Click here to view our extensive list of resources.</a></p>
      </div>
    </main>
  );
}