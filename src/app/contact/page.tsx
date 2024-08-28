import { PortableText, type SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/client";

import Breadcrumbs from "@/app/components/_global/breadcrumbs";
import PageBuilder from "@/app/components/_blocks/pageBuilder";

const PAGE_QUERY = `*[
  _type == "page" &&
  title == "Contact"
][0]`;

export default async function ContactPage() {
  const page = await sanityFetch<SanityDocument>({
    query: PAGE_QUERY,
  });

  const {
    title,
    summary,
    introduction,
    pageBuilder,
  } = page;

  return (
    <main className="container mx-auto">
      <Breadcrumbs crumbs={[]} pageName="Contact" />

      <h1>
        {title}
      </h1>

      <div className="border-y-2 border-slate-200 px-8 py-8 mb-8">
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