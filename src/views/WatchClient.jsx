import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const WatchClient = () => {
  const [client, setClient] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getClientAPI = async () => {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
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

  return loading ? (
    <Spinner />
  ) : Object.keys(client).length === 0 ? (
    <p>No hay resultados</p>
  ) : (
    <div>
      {loading ? (
        "cargando..."
      ) : (
        <>
          <h1 className="font-black text-4xl text-blue-900">
            Ver cliente: {client.name}
          </h1>
          <p className="mt-3">Información del cliente</p>
          {client.name && (
            <p className="text-4xl text-gray-600 mt-10">
              <span className=" text-gray-800 uppercase font-bold">
                Cliente:{" "}
              </span>{" "}
              {client.name}
            </p>
          )}

          {client.email && (
            <p className="text-4xl text-gray-600 mt-4">
              <span className=" text-gray-800 uppercase font-bold">
                Email:{" "}
              </span>{" "}
              {client.email}
            </p>
          )}

          {client.phone && (
            <p className="text-4xl text-gray-600 mt-4">
              <span className=" text-gray-800 uppercase font-bold">
                Teléfono:{" "}
              </span>{" "}
              {client.phone}
            </p>
          )}

          {client.company && (
            <p className="text-4xl text-gray-600 mt-4">
              <span className=" text-gray-800 uppercase font-bold">
                Empresa:{" "}
              </span>{" "}
              {client.company}
            </p>
          )}

          {client.observation && (
            <p className="text-4xl text-gray-600 mt-4">
              <span className=" text-gray-800 uppercase font-bold">
                Notas:{" "}
              </span>{" "}
              {client.observation}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default WatchClient;
