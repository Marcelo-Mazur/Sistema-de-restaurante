import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
// import Cardapio from "./pages/Cardapio";
import Cadastro from "./pages/CadastroPage";
// import Login from "./pages/Login";
// import { useState } from 'react'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/cardapio" element={<Cardapio />} />
        <Route path="*" element={<Navigate to="/cardapio"/>}/> */}
        <Route path="/" element={<Cadastro />} /> 
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
