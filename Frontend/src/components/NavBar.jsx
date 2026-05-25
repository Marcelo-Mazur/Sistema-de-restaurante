import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#FFE100',
      padding: '0 40px',
      height: '108px',
      width: '100%'
    }}>
      <button onClick={() => navigate('/cardapio')}style={{ 
        width: '195px',
        height: '63px', 
        backgroundColor: '#7C0000', 
        border: '2px solid #FF0000', 
        color: '#7C0000', 
        fontSize: '64px', 
        fontFamily: 'Jomhuria, sans-serif',
        borderRadius: '10px', 
        padding: '0 16px',
        WebkitTextStroke: '1px yellow' }}>
        Cardápio
      </button>
      <button onClick={() => navigate('/carrinho')}style={{ 
        width: '195px', 
        height: '63px', 
        backgroundColor: '#7C0000', 
        border: '2px solid #FF0000', 
        color: '#7C0000', 
        fontSize: '64px', 
        fontFamily: 'Jomhuria, sans-serif',
        borderRadius: '10px', 
        padding: '0 16px',
        WebkitTextStroke: '1px yellow' }}>
        Carrinho
      </button>
      <button onClick={() => navigate('/pedidos')}style={{ 
        width: '195px', 
        height: '63px', 
        backgroundColor: '#7C0000', 
        border: '2px solid #FF0000', 
        color: '#7C0000', 
        fontSize: '64px', 
        fontFamily: 'Jomhuria, sans-serif',
        borderRadius: '10px', 
        padding: '0 16px',
        WebkitTextStroke: '1px yellow' }}>
        Pedidos
      </button>
    </nav>
  );
}