'use client'

import replaceWithBr from "@/helpers/replaceWithBr";
import {Accordion, AccordionItem} from "@nextui-org/react";
import { PortableText } from "next-sanity";

type accordionBlockProps = {
    type: string;
    title: string;
    showTitle: boolean;
    items: any[];
    layout: string;
}

export default function AccordionBlock(props: accordionBlockProps) {
    const {type, title, showTitle, items, layout} = props;

    // console.log('items:', items);

    return <>
        {showTitle && (
            <div>{title}</div>
        )}
        <Accordion>
            <AccordionItem
                key="1"
                aria-label={title}
                subtitle="Press to expand"
                title={title}
            >
                <ul className={`${layout == 'list' ? 'list-disc' : ''}`}>
                    {items && items.map((item: any) => (
                        <li key={item._key}>
                            <a href={item.url}>{item.linkTitle}</a>
                            <div dangerouslySetInnerHTML={{__html: replaceWithBr(item.description)}}></div>
                        </li>
                    ))}
                </ul>
            </AccordionItem>
        </Accordion>
    </>
}