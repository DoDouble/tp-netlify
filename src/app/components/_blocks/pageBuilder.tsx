import { HeroProps, Hero} from "./hero/hero";
import { ctaProps, CTA } from "./cta/cta";
import { TextParagraphProps, TextParagraph } from "./textParagraph";
import { ResourceLinkProps, ResourceLink } from "./resourceLink/resourceLink";
import { ResourceLinksWrapperProps, ResourceLinksWrapper } from "./resourceLinksWrapper/resourceLinksWrapper";
import PeopleList from "./peopleList/peopleList";
import { Testimonial } from "./testimonial/testimonial";
import { TestimonialsWrapper } from "./testimonialsWrapper/testimonialsWrapper";
import { accordionItemsProps, peopleListProps } from "@/app/types/types";
import { AccordionItems } from "./accordionItems/accordionItems";

// Union type for all possible blocks
type Block = accordionItemsProps | ctaProps | HeroProps | peopleListProps | ResourceLinkProps | ResourceLinksWrapperProps | TextParagraphProps;

type PageBuilderProps = {
    // blocks: Block[];
    blocks: any[];
};

const PageBuilder: React.FC<PageBuilderProps> = ({ blocks }) => {
    // console.log('blocks:', blocks);

    return (
        <div>
            {blocks.map((block) => {
                switch (block._type) {
                    case 'hero':
                        return (
                            <div key={block._key}>
                                <Hero
                                    _key={block._key}
                                    _type={block._type}
                                    heading={block.heading}
                                    tagline={block.tagline}
                                    image={block.image}
                                />
                            </div>
                        );
                    case 'resourceLink':
                        return (
                            <div key={block._key}>
                                <ResourceLink
                                    _key={block._key}
                                    _type={block._type}
                                    url={block.url}
                                    linkTitle={block.linkTitle}
                                    description={block.description}
                                    image={block.image}
                                />
                            </div>
                        );
                    case 'resourceLinksWrapper':
                        return (
                            <div key={block._key}>
                                <ResourceLinksWrapper
                                    _key={block._key}
                                    _type={block._type}
                                    title={block.title}
                                    layout={(block.layout || 'list').toLowerCase()}
                                    showMoreResourcesLink={block.showMoreResourcesLink}
                                    resourceLinks={block.resourceLinks || false}
                                />
                            </div>
                        );
                    case 'textParagraph':
                        return (
                            <div key={block._key}>
                                <TextParagraph
                                    _key={block._key}
                                    _type={block._type}
                                    text={block.text}
                                />
                            </div>
                        );
                    case 'cta':
                        return (
                            <div key={block._key}>
                                <CTA
                                    _key={block._key}
                                    _type={block._type}
                                    title={block.title}
                                    text={block.text}
                                    buttonText={block.buttonText}
                                    buttonLink={block.buttonLink}
                                />
                            </div>
                        );
                    case 'peopleList':
                        return (
                            <div key={block._key}>
                                <PeopleList
                                    _key={block._key}
                                    _type={block._type}
                                    name={block.name}
                                    people={block.people}
                                />
                            </div>
                        );
                    case 'testimonial':
                        return (
                            <div key={block._key}>
                                <Testimonial
                                    _key={block._key}
                                    _type={block._type}
                                    quote={block.quote}
                                    person={block.person}
                                    name={block.name}
                                    image={block.image}
                                    position={block.position}
                                    organisation={block.organisation}
                                    link={block.link}
                                    linkText={block.linkText}
                                />
                            </div>
                        );
                    case 'testimonialsWrapper':
                        return (
                            <div key={block._key}>
                                <TestimonialsWrapper
                                    _key={block._key}
                                    _type={block._type}
                                    title={block.title}
                                    testimonials={block.testimonials}
                                />
                            </div>
                        );
                    case 'accordion':
                        return (
                            <div key={block._key}>
                                <AccordionItems
                                    _key={block._key}
                                    _type={block._type}
                                    title={block.title}
                                    showTitle={block.showTitle}
                                    accordionItems={block.accordionItems}
                                />
                            </div>
                        );
                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default PageBuilder;