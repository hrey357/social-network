import { useModal } from "../../hooks/useModal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useAuthStore } from "../../stores/auth.store";
import { useState } from "react";
import { User } from "../../interfaces";

export default function UserAddressCard() {
  const { isOpen, closeModal } = useModal();



  const user = useAuthStore(state => state.user);

  const [perfil, setPerfil] = useState<User>( user! )

    	const handledChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const perfilUpdate = {...perfil, [e.target.name]: e.target.value}
        setPerfil(perfilUpdate)
      } 

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };
  return (
    <>
      <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Editar Perfil
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Actualize los detalles de su perfil.
          </p>
        </div>
        <form className="flex flex-col">
          <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">

            <div className="mt-7">
              <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                Información Personal
              </h5>

              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div className="col-span-2 lg:col-span-1">
                  <Label>Nombres</Label>
                  <Input type="text" value={perfil.firstname} id="firstname" name="firstname" onChange={handledChange} />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>Apellidos</Label>
                  <Input type="text" value={perfil.lastname} id="lastname" name="lastname" onChange={handledChange} />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>Correo</Label>
                  <Input type="text" value={perfil.email} id="email" name="email" onChange={handledChange} />
                </div>

                <div className="col-span-2 lg:col-span-1">
                  <Label>Fecha Nacimiento</Label>
                  <Input 
                    id="dateofbirth" 
                    name="dateofbirth" 
                    type="date" 
                    value={perfil.dateofbirth ? perfil.dateofbirth : ''} 
                    onChange={handledChange} 
                  />
                </div>

                <div className="col-span-2">
                  <Label>¿Cómo te gusta que te llamen?</Label>
                  <Input type="text" value={perfil.alias} id="alias" name="alias" onChange={handledChange} />
                </div>



              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            {!isOpen && <Button size="sm" variant="outline" onClick={closeModal}>
              Cerrar
            </Button>}
            <Button size="sm" onClick={handleSave}>
              Actualizar
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
