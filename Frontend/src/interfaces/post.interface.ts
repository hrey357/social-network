export type Post = {
    id: number
    mensaje: string
    usuario: number
    createdAt: string
    updatedAt: string
}

export type DraftPost = Omit<Post, 'id'|'createdAt'|'updatedAt'>