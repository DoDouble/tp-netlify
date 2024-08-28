import styles from './tagList.module.css'

export interface tagProps {
    _key: string;
    _type: string;
    label: string;
    value: string;
}

type tagListProps = {
    tags: tagProps[];
}

export const TagList: React.FC<tagListProps> = ({ tags }) => {
    return <ul className={styles.tags}>
        <li className="inline-block font-bold">Tags:</li>
        {tags.map((tag) => (
            <li
                className="inline-block rounded-lg bg-gray-200 px-3 py-1 dark:bg-gray-800 capitalize"
                key={tag.label}
            >
                {tag?.label}
            </li>
        ))}
    </ul>
};