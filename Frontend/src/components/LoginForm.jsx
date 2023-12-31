import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [fetchError, setFetchError] = useState({});

  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const resLogin = await loginUser(data);
      console.log(resLogin);
      if (resLogin.status !== 200) {
        throw resLogin;
      }
      navigate("/");
    } catch (error) {
      console.log(error);
      setFetchError({
        succes: false,
        message: "Correo o contraseña incorrectos",
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {/* correo */}
      <label htmlFor="email">Correo</label>
      <input
        type="email"
        id="email"
        {...register("email", {
          required: { value: true, message: "Correo es requerido" },
          minLength: 3,
          maxLength: { value: 60, message: "Máximo 60 caracteres" },
          pattern: {
            value:
              /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,60})/i,
            message: "Correo inválido",
          },
        })}
      />
      {errors.email && <span className="error"> {errors.email.message} </span>}

      {/* password */}
      <label htmlFor="password">Contraseña</label>
      <input
        type="password"
        id="password"
        {...register("password", {
          required: { value: true, message: "Contraseña es requerida" },
          minLength: 3,
          maxLength: { value: 50, message: "Máximo 50 caracteres" },
        })}
      />
      {errors.password && (
        <span className="error"> {errors.password.message} </span>
      )}
      {/* fetch error */}
      {!fetchError.succes && (
        <span className="error"> {fetchError.message} </span>
      )}
      {/* submit */}
      <input type="submit" value="Iniciar Sesión" />
    </form>
  );
};

export default LoginForm;
