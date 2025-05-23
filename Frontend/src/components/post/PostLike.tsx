import { Badge, IconButton } from '@material-tailwind/react';
import { HeartIcon } from "@heroicons/react/24/outline";
import { useMemo, useState } from 'react';
import { useLikeStore } from '../../stores/useLikeStore';

type PostLikeProps = {
    liked?: boolean
    count?: number
    idPost: number
}

export default function PostLike({idPost, liked = false, count = 0}: PostLikeProps) {
    
    const toggleLike = useLikeStore(state => state.toggleLike) 

    const [toggle, setToggle] = useState(liked)
    const [cuantos, setCuantos] = useState(count)

    const estilo = useMemo(()=>{ 
        return toggle ? ' bg-error-500 dark:border-gray-900 border-white p-1 text-amber-50' : 
                        ' bg-white dark:border-gray-900 border-white p-1 text-error-500'
     }, [toggle])


    const handleClick = ( ) => {
        toggleLike(idPost)
        setToggle(!toggle)
        setCuantos(!toggle ? cuantos + 1 : cuantos -1)
    };
     
    return (
        <>
            <Badge color={cuantos > 0 ? 'success' : 'error' } overlap='circular' placement='bottom-end'>
                <Badge.Content >
                    <IconButton isCircular onClick={handleClick}>
                        <HeartIcon className={`h-10 w-10 rounded-full stroke-2 ${estilo}`} />
                    </IconButton>
                </Badge.Content>
                <Badge.Indicator>{cuantos}</Badge.Indicator>
            </Badge>
        </>
    )
}
