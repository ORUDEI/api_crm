import { useState, useEffect } from "react";
import Client from "../components/Client";

const Home = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const getClientsAPI = async () => {
      try {
        const url = "http://localhost:4000/clientes";
        const resp = await fetch(url);
        const result = await resp.json();

        setClients(result);
      } catch (error) {
        console.log(error);
      }
    };

    getClientsAPI();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm("¿Deseas eliminar este cliente?");
    if (confirmDelete) {
      try {
        const url = `http://localhost:4000/clientes/${id}`;
        const resp = await fetch(url, {
          method: "DELETE",
        });

        await resp.json();
        const arrayClients = clients.filter((client) => client.id !== id);
        setClients(arrayClients);
      } catch (error) {
        console.log(error)
      }
      ;
    }
  };

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>

      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <Client
              key={client.id}
              client={client}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
