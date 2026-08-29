import { Link } from "react-router-dom"
import styles from "./NaoEncontrada.module.css"

const NaoEncontrada = () => {
  return (
    <div className={styles.pagina}>
      <h2>Essa página não existe</h2>
      <p>Mas o painel está logo ali.</p>
      <Link to="/" className={styles.link}>← voltar pro início</Link>
    </div>
  )
}

export default NaoEncontrada
