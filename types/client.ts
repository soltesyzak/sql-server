export interface BasicClient {
    id: number,
}

export interface Client extends BasicClient {
    name: string,
    nick: string,
    email: string,
    published: boolean,
    born: string,
    createdAt: string,
    updatedAt: string
}