import { HeroProps, Hero} from "./hero/hero";
import { TextParagraphProps, TextParagraph } from "./textParagraph";
import { ResourceLinkProps, ResourceLink } from "./resourceLink/resourceLink";
import { ResourceLinksWrapperProps, ResourceLinksWrapper } from "./resourceLinksWrapper/resourceLinksWrapper";

// Union type for all possible blocks
type Block = HeroProps | ResourceLinkProps | ResourceLinksWrapperProps | TextParagraphProps;

type PageBuilderProps = {
    blocks: Block[];
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
                                    resourceLinks={block.resourceLinks}
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
                    default:
                        return null;
                }
            })}
        </div>
    );
};

export default PageBuilder;