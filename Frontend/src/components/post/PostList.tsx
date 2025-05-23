import { usePostStore } from "../../stores/usePostStore"
import PostDetails from "./PostDetails"

export default function PostList() {

    const posts = usePostStore((state) => state.posts)
    
    return (
        <div className="overflow-y-scroll">
            {posts && posts.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">Listado de Publicaciones</h2>

                    {posts.map( post => (
                        <PostDetails
                            key={post.id}
                            post={post}
                        />
                    ))}
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">No hay publicaciones</h2>
                    <p className="text-xl mt-5 mb-10 text-center">
                        Comienza agregando alguna publicación {''}
                        <span className="text-indigo-600 font-bold">y aparecerán en este lugar</span>
                    </p>
                </>
            )}
        </div>
    )
}
