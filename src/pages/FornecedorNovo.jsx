import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../api.js"
import styles from "./FornecedorNovo.module.css"

const FornecedorNovo = () => {
  const [nome, setNome] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [categoria, setCategoria] = useState("")
  const [telefone, setTelefone] = useState("")
  const [erro, setErro] = useState(false)
  const navigate = useNavigate()

  const salvar = () => {
    if (nome === "") {
      setErro(true)
      return   // o porteiro do Cap 8: para aqui, nem chama a API
    }
    api.post("/fornecedores", {
      nome: nome,
      cnpj: cnpj,
      categoria: categoria,
      telefone: telefone
    })
      .then(() => navigate("/fornecedores"))   // salvou? volta pra lista
  }

  return (
    <div className={styles.pagina}>
      <h2>Novo fornecedor</h2>
      <label className={styles.campo}>
        Nome
        <input value={nome} onChange={(e) => setNome(e.target.value)} />
      </label>
      <label className={styles.campo}>
        CNPJ
        <input value={cnpj} onChange={(e) => setCnpj(e.target.value)} />
      </label>
      <label className={styles.campo}>
        Categoria
        <input value={categoria} onChange={(e) => setCategoria(e.target.value)} />
      </label>
      <label className={styles.campo}>
        Telefone
        <input value={telefone} onChange={(e) => setTelefone(e.target.value)} />
      </label>
      {erro && <p className={styles.erro}>O nome é obrigatório.</p>}
      <button onClick={salvar}>Salvar</button>
      <Link to="/fornecedores" className={styles.link}>Cancelar</Link>
    </div>
  )
}

export default FornecedorNovo
