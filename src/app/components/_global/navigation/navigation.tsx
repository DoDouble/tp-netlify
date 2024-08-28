import { type SanityDocument } from "next-sanity";
import { sanityFetch } from "@/sanity/client";

import styles from './navigation.module.css'

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

export default async function Navigation({}) {
    const mainNavigation = await sanityFetch<SanityDocument>({
      query:  `*[
        _type == "mainNavigation"
      ][0]`,
    });

    if (! mainNavigation || ! mainNavigation?.navigationItems) {
      return (
        <nav className={styles.nav}>
          <ul className="flex gap-4">
            <li><a href="/">Home</a></li>
            <li><a href="/stories">Stories</a></li>
            <li><a href="/iwi">Iwi</a></li>
            <li><a href="/people">People</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      )
    } else {

      // mainNavigation?.navigationItems.map((item) => {
      //   console.log('item:', item);
      // });

      return (
        <nav className={styles.nav}>
          <ul className="flex gap-4">
            {mainNavigation && mainNavigation?.navigationItems && mainNavigation?.navigationItems.map((item: navigationItemProps) => (
              <li key={item._key}>
                {item._type === 'navigationItem' && (
                  <a href={item.url}>{item.title}</a>
                )}
                {item._type === 'navigationWrapper' && (
                  <>
                    {item.url
                      ? <a href={item.url}>{item.title}</a>
                      : <span>{item.title}</span>
                    }
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
    }
};