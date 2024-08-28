import Link from "next/link";
import { iwiProps } from "@/app/types/types"

export type iwiCollectionProps = {
    iwiPlural: Array<iwiProps>;
    target: 'iwi' | 'stories';
}

const IwiList = ( props: iwiCollectionProps ) => {
    const {iwiPlural, target} = props;

    return <div className="mb-4">
        <strong>Iwi:</strong>
        <ul className="list-disc list-inside ml-2">
            {props.iwiPlural.map((iwi: iwiProps) => (
                <li
                    key={iwi._id}
                >
                    <Link
                        href={target == 'stories' ? `/stories?iwi=${iwi.slug.current}` : `/iwi/${iwi.slug.current}`}
                    >
                        {iwi?.name}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
};

export default IwiList;