import { PortableText, type SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/client";

import Breadcrumbs from "../components/_global/breadcrumbs";
import PageBuilder from "../components/_blocks/pageBuilder";

const PAGE_QUERY = `*[
  _type == "page" &&
  title == "About"
][0]`;

export default async function AboutPage() {
  const page = await sanityFetch<SanityDocument>({
    query: PAGE_QUERY,
  });

  const {
    title,
    summary,
    introduction,
    pageBuilder,
  } = page;

  const createdDate = new Date(page._createdAt).toDateString();
  const lastUpdatedDate = new Date(page._updatedAt).toDateString();

  return (
    <main className="container mx-auto">
      <Breadcrumbs crumbs={[]} pageName="About" />

      <h1>
        {title}
      </h1>

      <div className="border-y-2 border-slate-200 px-8 py-8 mb-8">
        {summary}
      </div>

      <div>
        {page?.showCreatedOn && (
          <div>Created on: {createdDate}</div>
        )}
        {page?.showLastUpdatedOn && (
          <div>Last updated on: {lastUpdatedDate}</div>
        )}
      </div>
      <div className="border-y-2 border-slate-200 px-8 py-8">
        {summary}
      </div>

      <div className="prose max-w-none">
        <PortableText
          value={introduction}
        />
      </div>

      {pageBuilder && (
        <PageBuilder blocks={pageBuilder} />
      )}
    </main>
  );
}