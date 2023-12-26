import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [fetchError, setFetchError] = useState({});

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    //enviar data al backend
    const sendData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/register",
          {
            nombre: data.nombre,
            apellidos: data.apellidos,
            username: data.username,
            email: data.email,
            password: data.password,
          }
        );
        console.log(response);
        if (response.status === 200) {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
        setFetchError({
          succes: error.response.data.exito,
          message: error.response.data.message,
        });
      }
    };
    sendData();
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Nombre */}
      <label htmlFor="nombre">Nombre</label>
      <input
        type="text"
        id="nombre"
        {...register("nombre", {
          required: { value: true, message: "Nombre es requerido" },
          minLength: 3,
          maxLength: { value: 30, message: "Máximo 30 caracteres" },
          pattern: {
            value: /^[A-Za-zñÑáéíóúÁÉÍÓÚ]+(?:\s[A-Za-zñÑáéíóúÁÉÍÓÚ]+)*$/,
            message: "Solo se aceptan letras",
          },
        })}
      />
      {errors.nombre && (
        <span className="error"> {errors.nombre.message} </span>
      )}

      {/* Apellidos */}
      <label htmlFor="apellidos">Apellidos</label>
      <input
        type="text"
        id="apellidos"
        {...register("apellidos", {
          required: { value: true, message: "Los Apellidos son requeridos" },
          minLength: 3,
          maxLength: { value: 50, message: "Máximo 50 caracteres" },
          pattern: {
            value: /^[A-Za-zñÑáéíóúÁÉÍÓÚ]+(?:\s[A-Za-zñÑáéíóúÁÉÍÓÚ]+)*$/,
            message: "Solo se aceptan letras",
          },
        })}
      />
      {errors.apellidos && (
        <span className="error"> {errors.apellidos.message} </span>
      )}

      {/* Username */}
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        {...register("username", {
          required: { value: true, message: "Username es requerido" },
          minLength: 3,
          maxLength: { value: 12, message: "Máximo 12 caracteres" },
          pattern: {
            value: /^[a-zA-Z0-9_-]{1,12}$/,
            message: "Username inválido",
          },
        })}
      />
      {errors.username && (
        <span className="error"> {errors.username.message} </span>
      )}

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

      {/* confirm password */}
      <label htmlFor="confirmPassword">Confirma tu contraseña</label>
      <input
        type="password"
        id="confirmPassword"
        {...register("confirmPassword", {
          required: { value: true, message: "Confirma tu contraseña" },
          validate: (value) =>
            value === watch("password") || "Las contraseñas no coinciden",
        })}
      />
      {errors.confirmPassword && (
        <span className="error"> {errors.confirmPassword.message} </span>
      )}

      {/* Terminos y condiciones */}
      <label htmlFor="terminos">Acepto los terminos y condiciones</label>
      <input
        type="checkbox"
        id="terminos"
        {...register("terminos", {
          required: {
            value: true,
            message: "Debes aceptar los terminos y condiciones",
          },
        })}
      />
      {errors.terminos && (
        <span className="error"> {errors.terminos.message} </span>
      )}

      {/* fetch error */}
      {!fetchError.succes && (
        <span className="error"> {fetchError.message} </span>
      )}
      {/* submit */}
      <input type="submit" value="Registrarse" />
    </form>
  );
};

export default RegisterForm;
