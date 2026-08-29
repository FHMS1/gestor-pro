import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import api from "../api.js"
import styles from "./ClienteNovo.module.css"   // mesmo visual do cadastro — reuso!

const ClienteEditar = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  const [cidade, setCidade] = useState("")

  useEffect(() => {
    // busca a ficha atual e PRÉ-ENCHE o formulário:
    api.get("/clientes/" + id)
      .then((res) => {
        setNome(res.data.nome)
        setEmail(res.data.email)
        setTelefone(res.data.telefone)
        setCidade(res.data.cidade)
      })
  }, [id])

  const salvar = () => {
    api.put("/clientes/" + id, {
      nome: nome,
      email: email,
      telefone: telefone,
      cidade: cidade
    })
      .then(() => navigate("/clientes"))
  }

  return (
    <div className={styles.pagina}>
      <h2>Editar cliente</h2>
      {/* os MESMOS 4 inputs controlados do cadastro */}
      <label className={styles.campo}>
        Nome
        <input value={nome} onChange={(e) => setNome(e.target.value)} />
      </label>
      <label className={styles.campo}>
        E-mail
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className={styles.campo}>
        Telefone
        <input value={telefone} onChange={(e) => setTelefone(e.target.value)} />
      </label>
      <label className={styles.campo}>
        Cidade
        <input value={cidade} onChange={(e) => setCidade(e.target.value)} />
      </label>
      <button onClick={salvar}>Salvar alterações</button>
      <Link to="/clientes" className={styles.link}>Cancelar</Link>
    </div>
  )
}

export default ClienteEditar
