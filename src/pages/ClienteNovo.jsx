import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import styles from "./ClienteNovo.module.css"

const ClienteNovo = () => {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [telefone, setTelefone] = useState("")
  const [cidade, setCidade] = useState("")
  const navigate = useNavigate()

  const salvar = () => {
    if (nome === "") {
      alert("O nome é obrigatório!")
      return   // o porteiro do Cap 8: para aqui, nem chama a API
    }
    axios.post("http://localhost:3000/clientes", {
      nome: nome,
      email: email,
      telefone: telefone,
      cidade: cidade
    })
      .then(() => navigate("/clientes"))   // salvou? volta pra lista
  }

  return (
    <div className={styles.pagina}>
      <h2>Novo cliente</h2>
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
      <button onClick={salvar}>Salvar</button>
    </div>
  )
}

export default ClienteNovo
