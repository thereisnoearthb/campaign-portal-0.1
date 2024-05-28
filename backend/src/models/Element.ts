import { Schema, Document } from 'mongoose';

export interface IElement extends Document {
  type: string;
  content?: string;
  twitterLink?: string;
  emailLink?: string;
  links?: string[];
}

const elementSchema = new Schema<IElement>({
  type: { type: String, required: true },
  content: { type: String },
  twitterLink: { type: String },
  emailLink: { type: String },
  links: { type: [String] },
}, { _id: false });

export { elementSchema };
