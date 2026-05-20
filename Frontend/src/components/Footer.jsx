export default function Footer() {
  return (
    <footer style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      height: '92px',
      backgroundColor: '#1a1a1a',
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      fontFamily: 'Sansita, sans-serif',
      fontSize: '24px'
    }}>
      <p>© 2026 Restaurante. Todos os direitos reservados.</p>
    </footer>
  );
}