import axios from 'axios';

const API_URL = 'http://localhost:5000/api/content';

interface ILink {
    displayText: string;
    url: string;
}

interface IContent {
    heading: string;
    caraousel: string[];
    paragraph: string;
    links: ILink[];
}

export const getContent = () => axios.get(API_URL);

export const createContent = (data: IContent) => axios.post(API_URL, data);
