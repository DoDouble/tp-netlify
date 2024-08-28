import replaceWithBr from "@/helpers/replaceWithBr";

export type TextParagraphProps = {
    _key: string;
    _type: 'textParagraph';
    text: string;
};

export const TextParagraph = (props: TextParagraphProps) => {

    const { text } = props;

    return (
        <p className="" dangerouslySetInnerHTML={{__html: replaceWithBr(text)}}></p>
    )
};