import { useState, useEffect } from "react"
import api from "../api.js"
import styles from "./Fornecedores.module.css"
import { Link } from "react-router-dom"

const Fornecedores = () => {
  const [fornecedores, setFornecedores] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(false)

  const excluir = (id) => {
    if (window.confirm("Tem certeza que quer excluir este fornecedor?")) {
      api.delete("/fornecedores/" + id)
        .then(() => {
          setFornecedores(fornecedores.filter((f) => f.id !== id))
        })
    }
  }

  useEffect(() => {
    api.get("/fornecedores")
      .then((res) => {
        setFornecedores(res.data)
        setCarregando(false)
      })
      .catch(() => {
        setErro(true)
        setCarregando(false)
      })
  }, [])

  if (carregando) { return <p>Carregando fornecedores...</p> }
  if (erro) { return <p>Não consegui falar com o servidor. Ele está de pé?</p> }

  return (
    <div className={styles.pagina}>
      <div className={styles.cabecalho}>
        <h2 className={styles.titulo}>Fornecedores</h2>
        <Link to="/fornecedores/novo" className={styles.botaoNovo}>+ Novo fornecedor</Link>
      </div>
      <div className={styles.cartao}>
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Nome</th><th>CNPJ</th><th>Categoria</th><th>Telefone</th><th className={styles.direita}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {fornecedores.map((f) => (
              <tr key={f.id}>
                <td>{f.nome}</td>
                <td>{f.cnpj}</td>
                <td>{f.categoria}</td>
                <td>{f.telefone}</td>
                <td className={styles.direita}>
                  <Link to={"/fornecedores/" + f.id + "/editar"} className={styles.btnEditar}>Editar</Link>{" "}
                  <button onClick={() => excluir(f.id)} className={styles.btnExcluir}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Fornecedores
