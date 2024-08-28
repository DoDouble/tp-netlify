import Script from "next/script";
import { tagProps, iwiProps } from '@/app/types/types';
import './filterTabs.css';

type filterTabsProps = {
    tags?: tagProps[];
    selectedTag?: string | null;
    iwi?: iwiProps[];
    selectedIwi: string | null;
}

export default function FilterTabs(props: filterTabsProps) {
    const { tags, selectedTag, iwi, selectedIwi } = props;

    console.log('selectedTag:', selectedTag);
    console.log('selectedIwi:', selectedIwi);

    const hideIwiTab = ! selectedIwi || selectedIwi === null || typeof selectedIwi == 'undefined';

    return <div className='mb-8'>
        <Script
            src="/vanilla-js-accessible-tabs.js"
            strategy="lazyOnload"
        ></Script>

        <div data-tab-component>
            <div role="tablist" aria-label="Tabbed content">
                <button role="tab" aria-selected={hideIwiTab} aria-controls="tab-content-tags" id="tab-tags">
                    Browse by tag
                </button>
                <button role="tab" aria-selected={! hideIwiTab} aria-controls="tab-content-iwi" id="tab-iwi">
                    Browse by Iwi
                </button>
            </div>
            {tags && (
                <section id="tab-content-tags" role="tabpanel" aria-labelledby="tab-tags" aria-hidden={! hideIwiTab} tabIndex={0}>
                    <div className="tabpanel-inner">
                        {tags.map((tag: tagProps, index: number) => (
                            <div key={index} className={`text-sm px-3 py-1 rounded-full ${tag?.slug == selectedTag ? 'bg-yellow-200' : 'bg-gray-200'}`}>
                                {tag.slug == selectedTag
                                    ? tag.name
                                    : <a className="no-underline" href={`?tag=${tag?.slug}`}>{tag.name}</a>
                                }
                            </div>
                        ))}
                    </div>
                </section>
            )}
            {iwi && (
                <section id="tab-content-iwi" role="tabpanel" aria-labelledby="tab-iwi" aria-hidden={hideIwiTab} tabIndex={1}>
                    <div className="tabpanel-inner">
                        {iwi.map((iwi: iwiProps, index: number) => (
                            <div key={index} className={`text-sm px-3 py-1 rounded-full ${iwi?.slug?.current == selectedIwi ? 'bg-yellow-200' : 'bg-gray-200'}`}>
                                {iwi.slug.current == selectedIwi
                                    ? iwi.name
                                    : <a className="no-underline" href={`?iwi=${iwi?.slug?.current}`}>{iwi.name}</a>
                                }
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    </div>
};