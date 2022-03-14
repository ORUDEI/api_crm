import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClientForm from "../components/ClientForm";

const EditClient = () => {
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getClientAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const resp = await fetch(url);
        const result = await resp.json();
        setClient(result);
      } catch (error) {
        console.log(error);
      }
      setLoading(!loading);
    };
    getClientAPI();
  }, []);
  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
      <p className="mt-3">
        Utiliza este formulario para editar datos de un cliente
      </p>
      {client?.name ? (
        <ClientForm client={client} loading={loading} />
      ) : (
        <p>Cliente ID no válido</p>
      )}
    </>
  );
};

export default EditClient;
