import { type SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/client";

type subMenuItemProps = {
  _key: string;
  _type: string;
  title: string;
  url: string;
}

type navigationItemProps = {
  _key: string;
  _type: string;
  title: string;
  url: string;
  navigationItems: subMenuItemProps[];
}

export default async function FooterNavigation({}) {
    const footerNavigation = await sanityFetch<SanityDocument>({
      query:  `*[
        _type == "footerNavigation"
      ][0]`,
    });

    // console.log('footerNavigation?.navigationItems:', footerNavigation?.navigationItems);

    return (
      <nav>
        <ul className="flex gap-4">
          {footerNavigation && footerNavigation?.navigationItems && footerNavigation?.navigationItems.map((item: navigationItemProps) => (
            <li key={item._key}>
              {item._type === 'navigationItem' && (
                <a href="{item.url}">{item.title}</a>
              )}
              {item._type === 'navigationWrapper' && (
                <>
                  <span>{item.title}</span>
                  <ul>
                  {item.navigationItems.map((subMenuItem: subMenuItemProps) => (
                    <li key={subMenuItem._key}>
                      <a href={subMenuItem.url}>{subMenuItem.title}</a>
                    </li>
                  ))}
                  </ul>
                </>
              )}
            </li>
          ))}
        </ul>
    </nav>
    )
};