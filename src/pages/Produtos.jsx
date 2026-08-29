import { useState, useEffect } from "react"
import api from "../api.js"
import styles from "./Produtos.module.css"
import { Link } from "react-router-dom"

const Produtos = () => {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(false)

  const excluir = (id) => {
    if (window.confirm("Tem certeza que quer excluir este produto?")) {
      api.delete("/produtos/" + id)
        .then(() => {
          setProdutos(produtos.filter((p) => p.id !== id))
        })
    }
  }

  useEffect(() => {
    api.get("/produtos")
      .then((res) => {
        setProdutos(res.data)
        setCarregando(false)
      })
      .catch(() => {
        setErro(true)
        setCarregando(false)
      })
  }, [])

  if (carregando) { return <p>Carregando produtos...</p> }
  if (erro) { return <p>Não consegui falar com o servidor. Ele está de pé?</p> }

  return (
    <div className={styles.pagina}>
      <div className={styles.cabecalho}>
        <h2 className={styles.titulo}>Produtos</h2>
        <Link to="/produtos/novo" className={styles.botaoNovo}>+ Novo produto</Link>
      </div>
      <div className={styles.cartao}>
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Nome</th>
              <th className={styles.direita}>Preço</th>
              <th className={styles.direita}>Estoque</th>
              <th>Categoria</th>
              <th className={styles.direita}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.length === 0 && (
              <tr>
                <td colSpan={5} className={styles.vazio}>Nenhum produto cadastrado ainda.</td>
              </tr>
            )}
            {produtos.map((p) => (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td className={styles.direita}>{"R$ " + p.preco}</td>
                <td className={styles.direita}>
                  {p.estoque}
                  {p.estoque < 5 && <span className={styles.selo}>⚠ estoque baixo</span>}
                </td>
                <td>{p.categoria}</td>
                <td className={styles.direita}>
                  <Link to={"/produtos/" + p.id + "/editar"} className={styles.btnEditar}>Editar</Link>{" "}
                  <button onClick={() => excluir(p.id)} className={styles.btnExcluir}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Produtos
