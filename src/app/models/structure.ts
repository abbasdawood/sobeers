export interface PersonStructure{
    name: string;
    designation: string;
    department: string;
    icon?: string;
    gradient?: string;
    profilePicture: string;
    employee?: boolean;
    guest?: boolean;
    company: string;
    position: number;
    group?: string;
}

export interface BackgroundOptions{
    color: string;
    url?: string;
}

export interface GalleryImage{
    url: string;
    thumb?: string;
    src?: string;
}

export interface CaseInfo{
    id: string;
    title: string;
    tags: string[];
    year: number;
    client: string;
    cover: any | any[];
    slug: string;
    color: string;
}

export interface CaseContent{
    rowTitle: string;
    rowPreTitle: string;
    rowContent: string;
    gallery?: string[];
    direction: string;
    background?: BackgroundOptions;
    theme: string;
    team?: string[];
}

export interface CaseStudy{
    info: CaseInfo;
    content: CaseContent[];
}