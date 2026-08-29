import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import styles from "./Navbar.module.css"

const Navbar = ({ usuario, aoSair }) => {
  const [paginaAtual, setPaginaAtual] = useState(window.location.pathname)

  useEffect(() => {
    // cobre a navegação pelos botões voltar/avançar do navegador
    const aoNavegar = () => setPaginaAtual(window.location.pathname)
    window.addEventListener("popstate", aoNavegar)
    return () => window.removeEventListener("popstate", aoNavegar)
  }, [])

  const linkClasse = (caminho) =>
    paginaAtual.startsWith(caminho) ? `${styles.link} ${styles.linkAtivo}` : styles.link

  return (
    <nav className={styles.sidebar}>
      <Link to="/" className={styles.logo} onClick={() => setPaginaAtual("/")}>GestorPRO</Link>
      <div className={styles.links}>
        <Link to="/clientes" className={linkClasse("/clientes")} onClick={() => setPaginaAtual("/clientes")}>Clientes</Link>
        <Link to="/fornecedores" className={linkClasse("/fornecedores")} onClick={() => setPaginaAtual("/fornecedores")}>Fornecedores</Link>
        <Link to="/produtos" className={linkClasse("/produtos")} onClick={() => setPaginaAtual("/produtos")}>Produtos</Link>
      </div>
      <div className={styles.usuario}>
        <span className={styles.saudacao}>Olá, {usuario.nome}</span>
        <button onClick={aoSair} className={styles.botaoSair}>Sair</button>
      </div>
    </nav>
  )
}

export default Navbar
