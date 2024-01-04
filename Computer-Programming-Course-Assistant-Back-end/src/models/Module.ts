import { Schema, model } from "mongoose";

export interface moduleDoc {
    title: string,
    content: string
}


const moduleSchema = new Schema<moduleDoc>({
    title: { type: String, required: true },
    content: { type: String, required: true }
});


export const Module = model<moduleDoc>('Module', moduleSchema);
