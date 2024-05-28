import { Schema, model, Document } from 'mongoose';
import { elementSchema, IElement } from './Element';

export interface IWebpage extends Document {
  elements: IElement[];
}

const webpageSchema = new Schema<IWebpage>({
  elements: { type: [elementSchema], required: true }
});

const Webpage = model<IWebpage>('Webpage', webpageSchema);

export { Webpage };
