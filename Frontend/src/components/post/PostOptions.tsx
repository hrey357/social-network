import { toast } from 'react-toastify'
import { usePostStore } from "../../stores/usePostStore"
import { Tooltip, IconButton } from "@material-tailwind/react";
import { TrashSolid, EditPencil, Settings } from "iconoir-react";

type PostOptionsProps = {
    idPost: number
}

export default function PostOptions({ idPost }: PostOptionsProps) {

    const deletePost = usePostStore((state) => state.deletePost)
    const getPostById = usePostStore((state) => state.getPostById)

    const handleClick = () => {
        deletePost(idPost)
        toast('Paciente Eliminado', {
            type: 'error'
        })
    }

    return (
        <Tooltip interactive offset={2} placement="left">
            <Tooltip.Trigger as={IconButton} isCircular>
                <Settings className="h-[25px] w-[25px] transition-transform group-data-[open=true]:rotate-45" />
            </Tooltip.Trigger>
            <Tooltip.Content className="flex gap-1 bg-transparent shadow-none dark:bg-transparent">
                <Tooltip>
                    <Tooltip.Trigger as={IconButton} isCircular color="secondary">
                        <EditPencil className="h-[25px] w-[25px]" onClick={() => getPostById(idPost)} />
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        Editar
                        <Tooltip.Arrow />
                    </Tooltip.Content>
                </Tooltip>
                <Tooltip>
                    <Tooltip.Trigger as={IconButton} isCircular color="secondary" >
                        <TrashSolid className="h-[25px] w-[25px]" onClick={handleClick} />
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                        Eliminar
                        <Tooltip.Arrow />
                    </Tooltip.Content>
                </Tooltip>

            </Tooltip.Content>
        </Tooltip>
    )
}
