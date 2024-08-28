import { iwiProps } from '@/app/types/types';

export const iwiNameFromSlug = (allIwi: any[], slug: string | null) => {
    console.log('allIwi:', allIwi);
    console.log('slug:', slug);
    allIwi.forEach((iwi: iwiProps) => {
        if (iwi.slug.current == slug) {
            console.log(iwi.slug.current, '=', slug);
            console.log('FOUND iwi.name:', iwi.name);
            return iwi.name;
        } else {
            console.log(iwi.slug.current, '!=', slug);
        }
    });

    return null;
}