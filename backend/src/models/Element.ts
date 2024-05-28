import { Schema, Document } from 'mongoose';

export interface Link {
  link: string;
  displayText: string;
}

export interface Partner {
  partnerName: string;
  partnerSiteLink: string;
  partnerLogoLink: string;
  displayText: string;
}

export interface IElement extends Document {
  type: string;
  content?: string;
  twitterLink?: string;
  emailLink?: string;
  links?: Link[] | Partner[];
  partnerLogos?: Partner[]; 
}

const elementSchema = new Schema<IElement>({
  type: { type: String, required: true },
  content: { type: String },
  twitterLink: { type: String },
  emailLink: { type: String },
  links: [{
    link: { type: String },
    displayText: { type: String }
  }],
  partnerLogos: [{ 
    partnerName: { type: String },
    partnerSiteLink: { type: String },
    partnerLogoLink: { type: String },
    displayText: { type: String }
  }]
}, { _id: false });

export { elementSchema };
