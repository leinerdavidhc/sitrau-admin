"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { login } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { ErrorResponse, LoginFormInputs } from "@/lib/types";
import { Loading } from "../Loading";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setServerError(null); // Limpia el mensaje de error

      const response = await login(data.email, data.password);

      if (response.status === 200) {
        toast.success("Inicio de sesión exitoso");
        router.push("/dashboard");
      } else {
   
        const errorData: ErrorResponse = response.data as ErrorResponse;
        
        if (response.status === 400 && errorData.errors) {
          errorData.errors.forEach(error => {
            const field = error.path || 'unknown';
            setError(field as keyof LoginFormInputs, { type: "manual", message: error.message });
            toast.error(`Error al iniciar sesión: ${error.message}`);
          });
        } else {
          // Manejo de errores generales
          toast.error(`Error al iniciar sesión: ${errorData.message || "An unexpected error occurred"}`);
          throw new Error(errorData.message || "Login failed. Please try again.");
        }
      }
    } catch (error) {
      // Manejo de errores inesperados
      setServerError((error as Error).message || "An unexpected error occurred.");
      toast.error(`Error al iniciar sesión: ${(error as Error).message}`);
    }
  };

  return (
    <div className="w-full min-h-[90vh] flex flex-col justify-center items-center gap-5">
      <img
        src="/SitrauLogo-dark.svg"
        alt="Sitrau Logo"
        className="w-54 h-20 dark:hidden block"
      />
      <img
        src="/SitrauLogo.svg"
        alt="Sitrau Logo"
        className="w-54 h-20 dark:block hidden"
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="dark:bg-tertiary-dark bg-tertiary-light shadow-md rounded px-8 pt-6 pb-8 max-w-md w-full flex flex-col gap-5"
      >
        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-tertiary-dark dark:text-tertiary-light"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "Email is required" })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.email
                ? "border-red-500"
                : "dark:border-tertiary-light border-tertiary-dark"
            } rounded-md shadow-sm focus:outline-none focus:ring-destructive focus:border-destructive sm:text-sm`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-tertiary-dark dark:text-tertiary-light"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            {...register("password", { required: "Password is required" })}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors.password
                ? "border-red-500"
                : "dark:border-tertiary-light border-tertiary-dark"
            } rounded-md shadow-sm focus:outline-none focus:ring-destructive focus:border-destructive sm:text-sm`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Server error message */}
        {serverError && (
          <p className="text-red-500 text-sm mt-2">{serverError}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full p-2 rounded-md bg-destructive"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex justify-center items-center w-full h-full">
              <Loading />
            </div>
          ) : (
            <h2 className="text-lg font-medium">Login</h2>
          )}
        </button>
      </form>
    </div>
  );
}
