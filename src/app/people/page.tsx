import Link from "next/link";
import { SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/client";
import Breadcrumbs from "../components/_global/breadcrumbs";


const PEOPLE_QUERY = `*[
        _type == "person"
    ]
    | order(lastName asc)
    {
        _id,
        "name": lastName + ", " + firstName,
        slug,
        profile_image
    }
`;


export default async function PeoplePage() {
  const people = await sanityFetch<SanityDocument[]>({ query: PEOPLE_QUERY });

  return (
    <main className="flex bg-gray-100 min-h-screen flex-col p-24 gap-12">
      <Breadcrumbs crumbs={[]} pageName="People" />
      <h1>
        People
      </h1>
      <ul>
        {people.map((person) => (
          <li
            key={person._id}
          >
            <Link
              href={`/people/${person.slug.current}`}
            >
              <h2>{person?.name}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}