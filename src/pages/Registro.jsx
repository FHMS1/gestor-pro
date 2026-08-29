import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../api.js"
import styles from "./Login.module.css"

const Registro = () => {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const navigate = useNavigate()

  const registrar = () => {
    api.post("/usuarios", {
      nome: nome,
      email: email,
      senha: senha
    })
      .then(() => navigate("/login"))
  }

  return (
    <div className={styles.pagina}>
      <h2>GestorPRO</h2>
      <label className={styles.campo}>
        Nome
        <input value={nome} onChange={(e) => setNome(e.target.value)} />
      </label>
      <label className={styles.campo}>
        E-mail
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className={styles.campo}>
        Senha
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
      </label>
      <button onClick={registrar}>Criar conta</button>
      <Link to="/login" className={styles.link}>Já tenho conta</Link>
    </div>
  )
}

export default Registro
