import { Request } from "./request.interface";

export interface Collection {
    name: string,
    requests?: [Request]
}