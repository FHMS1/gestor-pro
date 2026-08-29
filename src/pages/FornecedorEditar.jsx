import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import api from "../api.js"
import styles from "./FornecedorNovo.module.css"   // mesmo visual do cadastro — reuso!

const FornecedorEditar = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [nome, setNome] = useState("")
  const [cnpj, setCnpj] = useState("")
  const [categoria, setCategoria] = useState("")
  const [telefone, setTelefone] = useState("")

  useEffect(() => {
    // busca a ficha atual e PRÉ-ENCHE o formulário:
    api.get("/fornecedores/" + id)
      .then((res) => {
        setNome(res.data.nome)
        setCnpj(res.data.cnpj)
        setCategoria(res.data.categoria)
        setTelefone(res.data.telefone)
      })
  }, [id])

  const salvar = () => {
    api.put("/fornecedores/" + id, {
      nome: nome,
      cnpj: cnpj,
      categoria: categoria,
      telefone: telefone
    })
      .then(() => navigate("/fornecedores"))
  }

  return (
    <div className={styles.pagina}>
      <h2>Editar fornecedor</h2>
      {/* os MESMOS 4 inputs controlados do cadastro */}
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
      <button onClick={salvar}>Salvar alterações</button>
      <Link to="/fornecedores" className={styles.link}>Cancelar</Link>
    </div>
  )
}

export default FornecedorEditar
