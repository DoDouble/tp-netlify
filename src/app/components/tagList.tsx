import { tagProps } from '@/app/types/types';

import styles from './tagList.module.css'

type tagListProps = {
    tags: tagProps[];
    selectedTag?: string | undefined | null;
}

export const TagList: React.FC<tagListProps> = ({ tags, selectedTag }) => {
    return <ul className={styles.tags}>
        <li className="inline-block font-bold">Tags:</li>
        {tags.map((tag, index) => (
            <li
                key={index}
                className={`inline-block rounded-lg ${selectedTag == tag.value ? 'bg-green-200' : 'bg-gray-200'} px-3 py-1 dark:bg-gray-800 capitalize`}
            >
                {selectedTag == tag.value
                    ? <>{tag.value}</>
                    : <a className='no-underline' href={`/stories?tag=${tag.value}`}>{tag?.label}</a>
                }
            </li>
        ))}
    </ul>
};