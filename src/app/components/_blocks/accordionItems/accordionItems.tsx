import Script from "next/script";
import { accordionItemsProps } from "@/app/types/types"
import { PortableText } from "next-sanity";

import './accordionItems.css';

export const AccordionItems = (props: accordionItemsProps) => {

    const { title, showTitle, accordionItems } = props;

    // console.log('tAccordionItems - props:', props);

    return (
        <>
            <Script
                src="/vanilla-js-accessible-accordion.js"
                strategy="lazyOnload"
            ></Script>

            {showTitle && (
                <h2>{title}</h2>
            )}
            <div className="accordion__card w-full border-t mb-16">
                {accordionItems.map((item: any, index: number) => (
                    <div
                        key={index}
                        className="accordion__title border-b p-4"
                        aria-label={item.title}
                        title={item.title}
                    >
                        <h3 className="mb-0">
                            <button
                                aria-expanded="false"
                                className="w-full flex justify-between items-center"
                            >
                                {item.title}<svg
                                    focusable="false"
                                    aria-hidden="true"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 10 10"
                                >
                                    <rect height="8" width="2" y="1" x="4" className="vert" />
                                    <rect height="2" width="8" y="4" x="1" />
                                </svg>
                            </button>
                        </h3>
                        <div className="accordion__content pt-4" hidden>
                            <PortableText
                                value={item.body}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
};