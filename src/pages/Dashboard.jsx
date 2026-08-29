import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import styles from "./Dashboard.module.css"

const Dashboard = () => {
  const [clientes, setClientes] = useState([])
  const [fornecedores, setFornecedores] = useState([])
  const [produtos, setProdutos] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/clientes").then((res) => setClientes(res.data))
    axios.get("http://localhost:3000/fornecedores").then((res) => setFornecedores(res.data))
    axios.get("http://localhost:3000/produtos").then((res) => setProdutos(res.data))
  }, [])

  const estoqueBaixo = produtos.filter((p) => p.estoque < 5).length

  return (
    <div>
      <h2 className={styles.titulo}>Visão geral</h2>
      <div className={styles.cards}>
        <Link to="/clientes" className={styles.card}>
          <strong className={styles.numero}>{clientes.length}</strong>
          <span className={styles.rotulo}>Clientes</span>
        </Link>
        <Link to="/fornecedores" className={styles.card}>
          <strong className={styles.numero}>{fornecedores.length}</strong>
          <span className={styles.rotulo}>Fornecedores</span>
        </Link>
        <Link to="/produtos" className={styles.card}>
          <strong className={styles.numero}>{produtos.length}</strong>
          <span className={styles.rotulo}>Produtos</span>
        </Link>
      </div>
      {estoqueBaixo > 0 && (
        <p className={styles.alerta}>⚠ {estoqueBaixo} produtos com estoque baixo</p>
      )}
    </div>
  )
}

export default Dashboard
