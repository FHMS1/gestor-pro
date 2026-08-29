import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../api.js"
import styles from "./Login.module.css"

const Login = ({ aoEntrar }) => {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [erro, setErro] = useState(false)
  const navigate = useNavigate()

  const entrar = () => {
    api.get("/usuarios?email=" + email + "&senha=" + senha)
      .then((res) => {
        if (res.data.length === 1) {
          const usuario = res.data[0]
          localStorage.setItem("usuario", JSON.stringify(usuario))
          aoEntrar(usuario)
          navigate("/")
        } else {
          setErro(true)
        }
      })
  }

  return (
    <div className={styles.pagina}>
      <h2>GestorPRO</h2>
      <label className={styles.campo}>
        E-mail
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className={styles.campo}>
        Senha
        <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
      </label>
      {erro && <p className={styles.erro}>E-mail ou senha inválidos</p>}
      <button onClick={entrar}>Entrar</button>
      <Link to="/registro" className={styles.link}>Criar minha conta</Link>
    </div>
  )
}

export default Login
