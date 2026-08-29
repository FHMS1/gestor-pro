import { useState, useEffect } from "react"
import api from "../api.js"
import styles from "./Clientes.module.css"
import { Link } from "react-router-dom"

const Clientes = () => {
  const [clientes, setClientes] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(false)

  const excluir = (id) => {
    if (window.confirm("Tem certeza que quer excluir este cliente?")) {
      api.delete("/clientes/" + id)
        .then(() => {
          // o servidor já rasgou a ficha — agora avisamos a TELA:
          setClientes(clientes.filter((c) => c.id !== id))
        })
    }
  }

  useEffect(() => {
    api.get("/clientes")
      .then((res) => {
        setClientes(res.data)
        setCarregando(false)
      })
      .catch(() => {
        setErro(true)
        setCarregando(false)
      })
  }, [])

  if (carregando) { return <p>Carregando clientes...</p> }
  if (erro) { return <p>Não consegui falar com o servidor. Ele está de pé?</p> }

  return (
    <div className={styles.pagina}>
      <div className={styles.cabecalho}>
        <h2 className={styles.titulo}>Clientes</h2>
        <Link to="/clientes/novo" className={styles.botaoNovo}>+ Novo cliente</Link>
      </div>
      <div className={styles.cartao}>
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Nome</th><th>E-mail</th><th>Telefone</th><th>Cidade</th><th className={styles.direita}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.length === 0 && (
              <tr>
                <td colSpan={5} className={styles.vazio}>Nenhum cliente cadastrado ainda.</td>
              </tr>
            )}
            {clientes.map((c) => (
              <tr key={c.id}>
                <td>{c.nome}</td>
                <td>{c.email}</td>
                <td>{c.telefone}</td>
                <td>{c.cidade}</td>
                <td className={styles.direita}>
                  <Link to={"/clientes/" + c.id + "/editar"} className={styles.btnEditar}>Editar</Link>{" "}
                  <button onClick={() => excluir(c.id)} className={styles.btnExcluir}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Clientes
