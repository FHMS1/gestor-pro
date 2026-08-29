import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../api.js"
import styles from "./ProdutoNovo.module.css"   // mesmo visual do cadastro — reuso!

const ProdutoEditar = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [nome, setNome] = useState("")
  const [preco, setPreco] = useState("")
  const [estoque, setEstoque] = useState("")
  const [categoria, setCategoria] = useState("")

  useEffect(() => {
    // busca a ficha atual e PRÉ-ENCHE o formulário:
    api.get("/produtos/" + id)
      .then((res) => {
        setNome(res.data.nome)
        setPreco(res.data.preco)
        setEstoque(res.data.estoque)
        setCategoria(res.data.categoria)
      })
  }, [id])

  const salvar = () => {
    api.put("/produtos/" + id, {
      nome: nome,
      preco: Number(preco),      // "320" (texto do input) vira 320 (número)
      estoque: Number(estoque),
      categoria: categoria
    })
      .then(() => navigate("/produtos"))
  }

  return (
    <div className={styles.pagina}>
      <h2>Editar produto</h2>
      {/* os MESMOS 4 inputs controlados do cadastro */}
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
      <button onClick={salvar}>Salvar alterações</button>
    </div>
  )
}

export default ProdutoEditar
