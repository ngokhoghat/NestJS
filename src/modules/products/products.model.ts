import { Document } from 'mongoose';

export interface Product extends Document {
  readonly name: string;
  readonly image: number;
  readonly price: string;
  readonly quantity: string;
  readonly status: string;
  readonly currency: currency;
}

export enum currency {
  USA = "$",
  vietnamese = "VND"
}