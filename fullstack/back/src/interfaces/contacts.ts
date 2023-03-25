export interface IContactRequest {
    name: string
    email: string
    createdAt:Date
    phone: string
}

export interface IContacts {
    id: string
    name: string
    email: string
    phone:string
}

export interface IContactsUpdate {
    name?: string
    email?: string
    phone?: string
}
