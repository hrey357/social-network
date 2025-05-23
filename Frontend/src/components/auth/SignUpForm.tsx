import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { useAuthStore } from "../../stores/auth.store";
import { UserRegister } from "../../interfaces";

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const signUpUser = useAuthStore( state => state.signUpUser );
  const navigate = useNavigate();

  const onSubmit = async(event: FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    // const { username, password, remember } = event.target as HTMLFormElement;
    const { firstname, lastname, dateofbirth, alias, email, password } = event.target as typeof event.target & {
      firstname: { value: string };
      lastname: { value: string };
      dateofbirth: { value: string };
      alias: { value: string };
      email: { value: string };
      password: { value: string };
    };

const userRegister: UserRegister = {
  password: password.value,
  email: email.value,
  firstname: firstname.value,
  lastname: lastname.value,
  alias: alias.value,
  dateofbirth: new Date(dateofbirth.value)
}

    console.log(userRegister);

    try {
      await signUpUser(userRegister)
      navigate('/');

    } catch (error) {
      console.log(error, 'no se pudo autenticar');
    }
    
    // username.value = '';
    // password.value = '';
    // remember.checked = false;
  }

  
  return (
    <div className="flex flex-col flex-1 w-full overflow-y-auto lg:w-1/2 no-scrollbar">
      <div className="w-full max-w-md mx-auto mb-5 sm:pt-10"></div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Crear cuenta
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Ingrese sus datos para el registro!
            </p>
          </div>
          <div>
            
            <form onSubmit={ onSubmit }>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* <!-- First Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Nombre<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="firstname"
                      name="firstname"
                      placeholder="Enter your first name"
                    />
                  </div>
                  {/* <!-- Last Name --> */}
                  <div className="sm:col-span-1">
                    <Label>
                      Apellido<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="lastname"
                      name="lastname"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>
                <div className="col-span-2 lg:col-span-1">
                  <Label>Fecha Nacimiento</Label>
                  <Input 
                    id="dateofbirth" 
                    name="dateofbirth" 
                    type="date" 

                  />
                </div>

                <div className="col-span-2">
                  <Label>¿Cómo te gusta que te llamen?</Label>
                  <Input 
                    type="text" 
                    id="alias" 
                    name="alias"  
                    placeholder="Enter your alias"
                  />
                </div>
                {/* <!-- Email --> */}
                <div>
                  <Label>
                    Correo<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                  />
                </div>
                {/* <!-- Password --> */}
                <div>
                  <Label>
                    Contraseña<span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      placeholder="Enter your password"
                      type={showPassword ? "text" : "password"}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>
                {/* <!-- Checkbox --> */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    className="w-5 h-5"
                    checked={isChecked}
                    onChange={setIsChecked}
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                  Al crear una cuenta significa que acepta los{" "}
                    <span className="text-gray-800 dark:text-white/90">
                    Términos y Condiciones
                    </span>{" "}
                    y nuestra{" "}
                    <span className="text-gray-800 dark:text-white">
                    Política de Privacidad.
                    </span>
                  </p>
                </div>
                {/* <!-- Button --> */}
                <div>
                  <button className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600">
                    Enviar
                  </button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Ya tienes una cuenta? {""}
                <Link
                  to="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Ingresar
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
