import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const initialErrorValues = {
  succes: true,
  message: "Sin Error",
};

const AddServiceForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [serviceCategories, setServiceCategories] = useState([]);
  const [fetchError, setFetchError] = useState(initialErrorValues);
  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/api/services/categories"
        );
        if (res.status !== 200) {
          throw res;
        }
        const { categories } = res.data;
        setServiceCategories(categories);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/services", {
        ...data,
        available: data.available === "true" ? true : false,
      });
      if (res.status !== 200) {
        throw res;
      }
      // console.log(res);
      setFetchError(initialErrorValues);
      navigate("/admin");
    } catch (error) {
      console.log(error);
      setFetchError({
        succes: false,
        message: "Error al agregar el servicio",
      });
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        {/* Nombre del servicio */}
        <label htmlFor="">Nombre del Servicio:</label>
        <input
          type="text"
          {...register("name", {
            required: { value: true, message: "Nombre es requerido" },
            maxLength: { value: 100, message: "Máximo 100 caracteres" },
          })}
        />
        {errors.name && <span className="error"> {errors.name.message} </span>}

        {/* Descripcion */}
        <label htmlFor="">Descripción:</label>
        <textarea
          id=""
          cols="30"
          rows="5"
          {...register("description", {
            required: { value: true, message: "Descripción es requerida" },
            maxLength: { value: 300, message: "Máximo 300 caracteres" },
          })}></textarea>
        {errors.description && (
          <span className="error"> {errors.description.message} </span>
        )}

        {/* Link de la imagen */}
        <label htmlFor="">Link de la imagen:</label>
        <input
          type="text"
          {...register("imgLink", {
            required: {
              value: true,
              message: "Link de la imagen es requerido",
            },
            maxLength: { value: 300, message: "Máximo 300 caracteres" },
            pattern: {
              value: /(http[s]?:\/\/[^\s]+)/,
              message: "Link inválido",
            },
          })}
        />
        {errors.imgLink && (
          <span className="error"> {errors.imgLink.message} </span>
        )}

        {/* Precio */}
        <label htmlFor="">Precio:</label>
        <input
          type="text"
          {...register("price", {
            required: {
              value: true,
              message: "Precio es requerido",
            },
            maxLength: { value: 10, message: "Máximo 10 caracteres" },
            pattern: {
              value: /^\d+(\.\d+)?$/,
              message: "Solo números",
            },
          })}
        />
        {errors.price && (
          <span className="error"> {errors.price.message} </span>
        )}

        {/* Categoria */}
        <label htmlFor="">Categoria:</label>
        <select
          {...register("category", {
            required: {
              value: true,
              message: "Categoria es requerida",
            },
          })}>
          {serviceCategories.length > 0 &&
            serviceCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nombre}
              </option>
            ))}
        </select>
        {errors.category && (
          <span className="error"> {errors.category.message} </span>
        )}

        {/* Disponible */}
        <label htmlFor="">Disponible:</label>
        <select {...register("available")}>
          <option value="true">Si</option>
          <option value="false">No</option>
        </select>

        {/* submit */}
        <input type="submit" value="Agregar Servicio" />
        {/* fetch error */}
        {!fetchError.succes && (
          <span className="error"> {fetchError.message} </span>
        )}
      </form>
    </div>
  );
};

export default AddServiceForm;
