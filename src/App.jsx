import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./views/Home";
import NewClient from "./views/NewClient"
import EditClient from "./views/EditClient"
import WatchClient from "./views/WatchClient";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clientes" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="nuevo" element={<NewClient/>}/>
          <Route path="editar/:id" element={<EditClient/>}/>
          <Route path=":id" element={<WatchClient/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
