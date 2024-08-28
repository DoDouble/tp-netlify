import { PortableText, type SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/client";

import Breadcrumbs from "@/app/components/_global/breadcrumbs";
import PageBuilder from "@/app/components/_blocks/pageBuilder";

const PAGE_QUERY = `*[
  _type == "page" &&
  slug.current == "graduate-programme"
][0]`;

export default async function GraduateProgrammePage() {
  const page = await sanityFetch<SanityDocument>({
    query: PAGE_QUERY,
  });

  const {
    title,
    titleLabel,
    summary,
    introduction,
    pageBuilder,
  } = page;

  return (
    <main className="container mx-auto">
      <Breadcrumbs crumbs={[]} pageName="Graduate Programme" />

      <h1>
        {titleLabel && (
          <small className="block text-sm font-normal tracking-normal mb-4">{titleLabel}</small>
        )}
        {title}
      </h1>

      <div className="border-y-2 border-slate-200 px-8 py-8 mb-8">
        {summary}
      </div>

      <div className="prose max-w-none mb-16">
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