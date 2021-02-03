import { Document } from 'mongoose';

export interface Image extends Document {
  readonly name: string;
  readonly imageLink: string;
}

export enum ImageMessage {
  messageRequire = "Message is require."
}
