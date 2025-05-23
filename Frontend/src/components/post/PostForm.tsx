import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { usePostStore } from '../../stores/usePostStore'
import { DraftPost } from '../../interfaces/post.interface'
import Error from './Error'
import { useModalStore } from '../../stores/modal.store'

export default function PostForm() {

    const addPost = usePostStore(state => state.addPost)
    const activeId = usePostStore(state => state.activeId)
    const posts = usePostStore(state => state.posts)
    const updatePost = usePostStore(state => state.updatePost)
    const { close } = useModalStore();
    
    

    const { register, handleSubmit, setValue , formState: { errors }, reset } = useForm<DraftPost>()

    useEffect(() => {
        if(activeId !== 0) {
            const activePost = posts.filter( post => post.id === activeId)[0]
            setValue('mensaje', activePost.mensaje)
            setValue('usuario', activePost.usuario)

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeId])

    const registerPost = (data: DraftPost) => {
        
        if(activeId !== 0) {
            updatePost({
                ...data,
                id: activeId,
                createdAt: '',
                updatedAt: ''
            })
            toast('Paciente Actualizado Correctamente', {
                type: 'success'
            })
        } else {
            addPost(data)
            toast.success('Paciente Registrado Correctamente')
        }
        close()
        reset()
    }


  
    return (
      <div className="m-5">
          <h2 className="font-black text-3xl text-center">Formulario Publicaciones</h2>
  
          <p className="text-lg mt-5 text-center mb-10">
              Añade una publicación y {''}
              <span className="text-indigo-600 font-bold">Administrala</span>
          </p>

          <form 
              className="bg-white py-10 px-5 mb-10"
              noValidate
              onSubmit={ handleSubmit(registerPost) }
          >
                
              
              <div className="mb-5">
                  <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                    Mensaje 
                  </label>
                  <textarea  
                      id="mensaje"
                      className="w-full p-3  border border-gray-100"  
                      placeholder="Mensaje de la publicación" 
                      {...register('mensaje', {
                        required: 'El mensaje es obligatorio'
                        })}
                    />

                    {errors.mensaje && (
                        <Error>{errors.mensaje?.message}</Error>
                    )}
              </div>
  
              <input
                  type="submit"
                  className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                  value='Guardar'
                //   onClick={}
              />
          </form> 
      </div>
    )
  }