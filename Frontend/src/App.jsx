import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Cardapio from "./pages/CardapioPage";
import Cadastro from "./pages/CadastroPage";
import Login from "./pages/LoginPage";
import Carrinho from "./pages/CarrinhoPage";
import Pedido from "./pages/PedidoPage";
// import { useState } from 'react'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/cardapio" element={<Cardapio />} />
        <Route path="*" element={<Navigate to="/cardapio"/>}/>
        <Route path="/cadastrar" element={<Cadastro />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/pedidos" element={<Pedido />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
