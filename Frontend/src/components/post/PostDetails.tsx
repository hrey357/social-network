import { Post } from '../../interfaces/post.interface'
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { getTimeBetweenDates } from '../../helpers';
import PostOptions from './PostOptions';
import PostLike from './PostLike';
import { useAuthStore } from '../../stores/auth.store';
import { useLikeStore } from '../../stores/useLikeStore';


type PostDetailsProps = {
    post: Post
}

export default function PostDetails({ post }: PostDetailsProps) {

    const user = useAuthStore(state => state.user);
    const usersID = useAuthStore(state => state.usersID);
    const likes = useLikeStore(state => state.likes) 
    const currentUser = useLikeStore(state => state.currentUser) 


    return (
        <div className="relative w-full">
            <div className="flex gap-3 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6 shadow-sm m-5">
                <span className="relative block w-full h-16 rounded-full z-1 max-w-16">
                    <UserCircleIcon
                        width={60}
                        height={60}
                        className="w-full overflow-hidden rounded-full"
                    />
                </span>
                <span className="block pt-5">
                    <span className="mb-1.5 block space-x-1 text-theme-sm text-gray-500 dark:text-gray-400">
                        <span className="font-medium text-gray-800 dark:text-white/90 ">
                            {` ${usersID[post.usuario + ''].firstname} ${usersID[post.usuario + ''].lastname}`}
                        </span>
                        <span className="w-2 h-2  text-gray-500 text-theme-xs dark:text-gray-400">.</span>
                        <span>{usersID[post.usuario + ''].email}</span>
                        <span className="block my-3">
                            {post.mensaje}
                        </span>
                        <span className="font-medium text-gray-800 dark:text-white/90">
                            {post.createdAt !== post.updatedAt ?
                                `Fecha Modificación : ${post.updatedAt} ${getTimeBetweenDates(post.updatedAt)}`
                                : '...'
                            }
                        </span>
                    </span>

                    <span className="flex items-center gap-2 text-gray-500 text-theme-xs dark:text-gray-400">
                        <span>{usersID[post.usuario + ''].role}</span>
                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                        <span>{getTimeBetweenDates(post.createdAt)}</span>
                    </span>
                </span>


            </div>

            {(post.usuario === user?.id || user?.role === 'Admin') &&
                (
                    <div className="absolute right-8 top-2">
                        <PostOptions key={post.id} idPost={post.id} />
                    </div>
                )
            }
            <div className="absolute left-12 bottom-6">
                <PostLike key={post.id} idPost={post.id} count={likes[post.id] | 0} liked={currentUser.includes(post.id)} />
            </div>
        </div>
    )
}
