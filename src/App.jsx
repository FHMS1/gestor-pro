import { useState } from "react"
import { Routes, Route, useNavigate } from "react-router-dom"
import Navbar from "./components/Navbar.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Clientes from "./pages/Clientes.jsx"
import Fornecedores from "./pages/Fornecedores.jsx"
import Produtos from "./pages/Produtos.jsx"
import NaoEncontrada from "./pages/NaoEncontrada.jsx"
import ClienteNovo from "./pages/ClienteNovo.jsx"
import ClienteEditar from "./pages/ClienteEditar.jsx"
import FornecedorNovo from "./pages/FornecedorNovo.jsx"
import FornecedorEditar from "./pages/FornecedorEditar.jsx"
import ProdutoNovo from "./pages/ProdutoNovo.jsx"
import ProdutoEditar from "./pages/ProdutoEditar.jsx"
import Login from "./pages/Login.jsx"
import Registro from "./pages/Registro.jsx"
import styles from "./App.module.css"

const App = () => {
  const [usuario, setUsuario] = useState(() => JSON.parse(localStorage.getItem("usuario")))
  const navigate = useNavigate()

  const sair = () => {
    localStorage.removeItem("usuario")
    setUsuario(null)
    navigate("/login")
  }

  return usuario ? (
    <div className={styles.layout}>
      <Navbar usuario={usuario} aoSair={sair} />
      <main className={styles.conteudo}>
        <div className={styles.container}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/clientes/novo" element={<ClienteNovo />} />
            <Route path="/fornecedores" element={<Fornecedores />} />
            <Route path="/fornecedores/novo" element={<FornecedorNovo />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/produtos/novo" element={<ProdutoNovo />} />
            <Route path="/login" element={<Login aoEntrar={setUsuario} />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="*" element={<NaoEncontrada />} />
            <Route path="/clientes/:id/editar"element={<ClienteEditar/>}/>
            <Route path="/fornecedores/:id/editar" element={<FornecedorEditar />} />
            <Route path="/produtos/:id/editar" element={<ProdutoEditar />} />
          </Routes>
        </div>
      </main>
    </div>
  ) : (
    <div className={styles.semSessao}>
      <Routes>
        <Route path="/login" element={<Login aoEntrar={setUsuario} />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="*" element={<Login aoEntrar={setUsuario} />} />
      </Routes>
    </div>
  )
}

export default App