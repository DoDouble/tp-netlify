export type accordionItem = {
    _key: string;
    _type: string;
    title: string;
    body: any[];
}

export type accordionItemsProps = {
    _key: string;
    _type: string;
    title: string;
    showTitle: boolean;
    accordionItems: accordionItem[];
}

export type slugProps = {
    _type: string;
    current: string;
}

export type iwiProps = {
    _id: string;
    _ref?: string;
    name: string;
    slug: slugProps;
}

export type peopleListProps = {
    _key: string;
    _type: 'peopleList';
    name: string;
    people: personProps[];
};

export type personReferenceProps = {
    _ref: string;
    _type?: 'reference';
};

export type personProps = {
    _id?: string;
    _key?: string;
    firstName: string;
    lastName: string;
    slug: slugProps;
    isTeamMember: boolean;
    title: string;
    profile_image: string;
    linkedIn?: string;
    twitter?: string;
    iwi: iwiProps[];
    profile: any[];
}

// export type storySlugProps = {
//     _type: 'slug';
//     current: string;
// }

export type storyAuthorProps = {
    name: string;
    slug: object;
}

export type storyProps = {
    _id: string;
    _createdAt: string;
    author: storyAuthorProps;
    hero_image: object;
    myTags: tagProps[];
    tags: tagProps[];
    slug: slugProps;
    title: string;
}

export type storiesListProps = {
    stories: storyProps[] | any[];
    selectedTag?: string | null;
}

export interface tagProps {
    _key: string;
    _type: string;
    label?: string;
    value?: string;
    name?: string;
    slug?: string;
}

export type topicProps = {
    name: string;
    slug: slugProps;
}