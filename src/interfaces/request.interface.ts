
export interface Request {
    _id?: string,
    name: string,
    url: string,
    type: string,
    headers?: [Pair],
    queryParams?: [Pair]
    json?: string,
    xml?: string,
    formData?: [Pair]
}

export interface Pair {
    key: string,
    value: string
}