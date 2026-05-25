import { useNavigate } from "react-router-dom"
export default function Header() {
  const navigate = useNavigate();
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
      <button onClick={() => navigate('/login')}style={{
        backgroundColor: '#FF0000',
        color: '#FFFFFF',
        border: '2px solid #F6FF00',
        borderRadius: '10px',
        padding: '10px 20px',
        fontSize: '32px',
        fontFamily: 'Kumar One, sans-serif',
        cursor: 'pointer'
      }}>
        Cadastro/Login
      </button>
    </nav>
  );
}