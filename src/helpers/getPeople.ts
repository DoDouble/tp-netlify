import { type SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/client";

function peopleListQuery(key: string) {
    return `*[
        "${key}" in pageBuilder[]._key
    ]{
        "people": pageBuilder[].people[]->
    }`
}

// const PEOPLE_LIST_QUERY = `*[
//     "04bce88c7806" in pageBuilder[]._key
//   ]{
//     "people": pageBuilder[].people[]->
//   }`;

export default async function getPeople(key: string) {
    const people = await sanityFetch<SanityDocument>({
        query: peopleListQuery(key),
    });

    // console.log('people:', people[0].people);

    return people[0].people;

}