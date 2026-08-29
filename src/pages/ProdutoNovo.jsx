import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import api from "../api.js"
import styles from "./ProdutoNovo.module.css"

const ProdutoNovo = () => {
  const [nome, setNome] = useState("")
  const [preco, setPreco] = useState("")
  const [estoque, setEstoque] = useState("")
  const [categoria, setCategoria] = useState("")
  const [erro, setErro] = useState(false)
  const navigate = useNavigate()

  const salvar = () => {
    if (nome === "") {
      setErro(true)
      return   // o porteiro do Cap 8: para aqui, nem chama a API
    }
    api.post("/produtos", {
      nome: nome,
      preco: Number(preco),      // "320" (texto do input) vira 320 (número)
      estoque: Number(estoque),
      categoria: categoria
    })
      .then(() => navigate("/produtos"))   // salvou? volta pra lista
  }

  return (
    <div className={styles.pagina}>
      <h2>Novo produto</h2>
      <label className={styles.campo}>
        Nome
        <input value={nome} onChange={(e) => setNome(e.target.value)} />
      </label>
      <label className={styles.campo}>
        Preço
        <input value={preco} onChange={(e) => setPreco(e.target.value)} />
      </label>
      <label className={styles.campo}>
        Estoque
        <input value={estoque} onChange={(e) => setEstoque(e.target.value)} />
      </label>
      <label className={styles.campo}>
        Categoria
        <input value={categoria} onChange={(e) => setCategoria(e.target.value)} />
      </label>
      {erro && <p className={styles.erro}>O nome é obrigatório.</p>}
      <button onClick={salvar}>Salvar</button>
      <Link to="/produtos" className={styles.link}>Cancelar</Link>
    </div>
  )
}

export default ProdutoNovo
