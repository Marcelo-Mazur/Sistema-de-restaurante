export default function NavBar() {
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
      <button style={{ 
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
      <button style={{ 
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
      <button style={{ 
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