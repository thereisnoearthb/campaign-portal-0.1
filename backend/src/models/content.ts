import { Schema, model } from 'mongoose';

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

const linkSchema = new Schema<ILink>({
    displayText: { type: String, required: true },
    url: { type: String, required: true },
});

const contentSchema = new Schema<IContent>({
    heading: { type: String, required: true },
    caraousel: {type:[String], required: true},
    paragraph: { type: String, required: true },
    links: { type: [linkSchema], required: true },
});

const Content = model<IContent>('Content', contentSchema);

export default Content;
