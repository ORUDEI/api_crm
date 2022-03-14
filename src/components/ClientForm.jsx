import React from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Alert from "./Alert";
import Spinner from "./Spinner";

const ClientForm = ({ client, loading }) => {
  const navigate = useNavigate();
  const newClientSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "El nombre es muy corto")
      .max(20, "El nombre es muy largo")
      .required("El nombre del cliente es obligatorio"),
    company: Yup.string().required("El nombre de la empresa es obligatorio"),
    email: Yup.string()
      .email("Email no válido")
      .required("El Email es obligatorio"),
    phone: Yup.number()
      .positive("Número no válido")
      .integer("Número no válido")
      .typeError("El número no es válido"),
  });

  const handleSubmit = async (values) => {
    try {
      let resp;
      if (client.id) {
        const url = `http://localhost:4000/clientes/${client.id}`;
        resp = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        const url = "http://localhost:4000/clientes";
        resp = await fetch(url, {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      await resp.json();
      navigate("/clientes");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {client?.name ? "Editar Cliente" : "Agregar Cliente"}
      </h1>

      <Formik
        initialValues={{
          name: client?.name ?? "",
          company: client?.company ?? "",
          email: client?.email ?? "",
          phone: client?.phone ?? "",
          observation: client?.observation ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={newClientSchema}
      >
        {({ errors, touched }) => {
          return loading ? (
            <Spinner />
          ) : (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="name">
                  Nombre:
                </label>
                <Field
                  id="name"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 rounded-md"
                  placeholder="Nombre del Cliente"
                  name="name"
                />
                {errors.name && touched.name ? (
                  <Alert>{errors.name}</Alert>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="company">
                  Empresa:
                </label>
                <Field
                  id="company"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 rounded-md"
                  placeholder="Empresa del Cliente"
                  name="company"
                />
                {errors.company && touched.company ? (
                  <Alert>{errors.company}</Alert>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="email">
                  Email:
                </label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50 rounded-md"
                  placeholder="Email del Cliente"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alert>{errors.email}</Alert>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="phone">
                  Teléfono:
                </label>
                <Field
                  id="phone"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50 rounded-md"
                  placeholder="Teléfono del Cliente"
                  name="phone"
                />
                {errors.phone && touched.phone ? (
                  <Alert>{errors.phone}</Alert>
                ) : null}
              </div>
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="observation">
                  Notas:
                </label>
                <Field
                  as="textarea"
                  id="observation"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50 rounded-md h-40"
                  placeholder="Nombre del Cliente"
                  name="observation"
                />
              </div>
              <input
                type="submit"
                value={client?.name ? "Editar Cliente" : "Agregar Cliente"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

ClientForm.defaultProps = {
  client: {},
  loading: false,
};

export default ClientForm;
