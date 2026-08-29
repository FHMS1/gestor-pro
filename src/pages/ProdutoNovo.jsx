import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import styles from "./ProdutoNovo.module.css"

const ProdutoNovo = () => {
  const [nome, setNome] = useState("")
  const [preco, setPreco] = useState("")
  const [estoque, setEstoque] = useState("")
  const [categoria, setCategoria] = useState("")
  const navigate = useNavigate()

  const salvar = () => {
    if (nome === "") {
      alert("O nome é obrigatório!")
      return   // o porteiro do Cap 8: para aqui, nem chama a API
    }
    axios.post("http://localhost:3000/produtos", {
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
      <button onClick={salvar}>Salvar</button>
    </div>
  )
}

export default ProdutoNovo
