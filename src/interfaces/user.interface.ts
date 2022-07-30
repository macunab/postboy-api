
export interface User {
    _id?: string,
    name: string,
    email: string,
    password?: string
}

export interface UserDocument {
    _id: string,
    name: string,
    email: string,
    password?: string
}