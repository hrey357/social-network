import { ToastContainer } from 'react-toastify'
import PostForm from "../components/post/PostForm"
import PostList from '../components/post/PostList'
import { Modal } from '../components/ui/modal';
import { PlusIcon } from "@heroicons/react/24/outline";
import { usePostStore } from "../stores/usePostStore";

import { useEffect } from 'react';
import { useModalStore } from '../stores/modal.store';

import "react-toastify/dist/ReactToastify.css"
import { useAuthStore } from '../stores/auth.store';
import { useLikeStore } from '../stores/useLikeStore';

export function PostPage() {

  const { isOpen, open, close } = useModalStore();
  const getPosts = usePostStore( state => state.getPosts );
  const posts = usePostStore( state => state.posts );

  // const users = useAuthStore(state => state.users)
  const getUsers = useAuthStore(state => state.getUsers)
  const getLikes = useLikeStore(state => state.getLikes) 
  const getCurrentUser = useLikeStore(state => state.getCurrentUser) 

  // const flag = useMemo(()=> {}, [post])

  useEffect(()=>{

    const handlerPost = async ()=> {
      await getPosts()
      await getUsers()
      await getLikes()
      await getCurrentUser()

    }

    if (!isOpen) {
      handlerPost()
      
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="relative w-full">

      <div className=" mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
        <div className="mt-12 w-full">
          { posts && <PostList />}
        </div>
      </div>

      {isOpen ? (
        <Modal isOpen={isOpen} onClose={close} className="max-w-[700px] m-4">
          <PostForm />
        </Modal>
      ) : (
        <div className="fixed right-5 bottom-5 flex items-center justify-center">
          <button
            type='button'
            onClick={open}
            className='rounded-full btn text-amber-50 bg-amber-50'
          >
            <PlusIcon className='w-16 h-16 rounded-full  hover:bg-sky-400 bg-sky-600 shadow-xl text-cyan-50' />
          </button>
        </div>
      )}

      <ToastContainer  className="absolute right-8 top-2 z-999999"/>
    </div>
  )
}

