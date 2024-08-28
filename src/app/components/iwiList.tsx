import Link from "next/link";

type slugProps = {
    _type: string;
    current: string;
}

type iwiProps = {
    _id: string;
    name: string;
    slug: slugProps;
}

type iwiCollectionProps = {
    iwi_plural: Array<iwiProps>;
}

const IwiList = ( iwiCollection: iwiCollectionProps ) => {

    return <div className="mb-4">
        <strong>Iwi:</strong>
        <ul className="list-disc list-inside ml-2">
            {iwiCollection.iwi_plural.map((iwi: iwiProps) => (
                <li
                    key={iwi._id}
                >
                    <Link
                        href={`/iwi/${iwi.slug.current}`}
                    >
                        {iwi?.name}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
};

export default IwiList;