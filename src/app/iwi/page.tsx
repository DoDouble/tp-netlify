import Image from "next/image";
import Link from "next/link";
import { SanityDocument } from "next-sanity";

import imageUrl from "../../helpers/imageUrl";

import { sanityFetch } from "@/sanity/client";

const IWI_QUERY = `*[
  _type == "iwi"
]{name, slug, hero_image}|order(name)`;

export default async function IwiPage() {
  const iwi = await sanityFetch<SanityDocument[]>({query: IWI_QUERY});

  return (
    <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
      <h1 className="text-4xl font-bold tracking-tighter">
        Iwi
      </h1>
      <ul className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {iwi.map((iwi_singular) => (
          <li
            className="bg-white p-4 rounded-lg"
            key={iwi_singular._id}
          >
            <Link
              className="hover:underline"
              href={`/iwi/${iwi_singular.slug.current}`}
            >
              <Image
                src={imageUrl(iwi_singular?.hero_image, 1440, 400) || "https://via.placeholder.com/550x310"}
                alt={iwi_singular?.name || "Iwi"}
                className="h-60 mx-auto aspect-video overflow-hidden rounded-xl object-cover object-top sm:w-full mb-4"
                height="310"
                width="500"
              />
              <h2 className="text-xl font-semibold">{iwi_singular?.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}