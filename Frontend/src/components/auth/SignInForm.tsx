import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router";
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import { useAuthStore } from "../../stores/auth.store";

export default function SignInForm() {

  const [showPassword, setShowPassword] = useState(false);
  
  const loginUser = useAuthStore( state => state.loginUser );
  
  
  const navigate = useNavigate();

  const onSubmit = async(event: FormEvent<HTMLFormElement> ) => {
    event.preventDefault();
    // const { username, password, remember } = event.target as HTMLFormElement;
    const { username, password } = event.target as typeof event.target & {
      username: { value: string };
      password: { value: string }
    };

    console.log(username.value, password.value);

    try {
      await loginUser(username.value, password.value)
      navigate('/');

    } catch (error) {
      console.log('no se pudo autenticar', error);
    }
    
    // username.value = '';
    // password.value = '';
    // remember.checked = false;
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto"></div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
            Iniciar sesión
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
            ¡Introduce tu email y contraseña para iniciar sesión!
            </p>
          </div>
          <div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
              </div>
            </div>
            <form onSubmit={ onSubmit }>
              <div className="space-y-6">
                <div>
                  <Label>
                    Correo <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input id="username" placeholder="info@gmail.com" />
                </div>
                <div>
                  <Label>
                    Contraseña <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      
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
                <div>
                  <Button className="w-full" size="sm">
                    Enviar
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                No tienes una cuenta aún? {""}
                <Link
                  to="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Registrarse
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
