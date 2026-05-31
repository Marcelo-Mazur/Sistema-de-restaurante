import { useNavigate } from "react-router-dom"
import axios from "axios";
export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('tokenSessao');

  const handleLogout = async () => {
    if (token) {
      try {
        const apiUrl = `${import.meta.env.VITE_API_URL}api/auth/logout`;
        await axios.post(apiUrl, { token: token });
      } catch (err) {
        console.error("Erro ao limpar sessão no backend:", err);
      }
    }

   
    localStorage.removeItem('tokenSessao');
    localStorage.removeItem('usuarioId');
  }
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#FF0000',
      padding: '10px',
      height: '114px',
      color: '#FFE100'
    }}>
      <h1 onClick={() => navigate('/cardapio')} style={{ 
        fontSize: '64px',
        fontFamily: 'Jomhuria, sans-serif'
      }}>Restaurante</h1>
      <button onClick={token ? handleLogout : () => navigate('/login')}style={{
        backgroundColor: '#FF0000',
        color: '#FFFFFF',
        border: '2px solid #F6FF00',
        borderRadius: '10px',
        padding: '10px 20px',
        fontSize: '32px',
        fontFamily: 'Kumar One, sans-serif',
        cursor: 'pointer'
      }}>
        {token ? 'Logout' : 'Cadastro/Login'}
      </button>
    </nav>
  );
}