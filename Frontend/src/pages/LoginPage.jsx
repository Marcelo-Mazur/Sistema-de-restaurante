import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";

import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();


    return (
        <div className="w-full">
            <Header/>
            <NavBar/>
            
            <div style={{
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
            }}>
                <h1 style={{
                    fontSize: '120px',
                    fontFamily: 'Jomhuria, sans-serif',
                    marginBottom: '20px' // Um respiro entre o título e a caixa
                }}>LOGIN</h1>
                
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '5px',
                    width: '800px',
                    height: '456px',
                    backgroundColor: '#D9D9D9',
                    gap: '30px' // Espaçamento entre o bloco de Nome e o bloco de Senha
                }}>
                    
                    {/* Bloco do Nome */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                        <label style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>
                            email:
                        </label>
                        <input 
                            type="text" // Corrigido de type="nome" para type="text"
                            style={{
                                width: '500px',
                                height: '53px',
                                borderRadius: '8px',
                                border: 'none', // Remove a borda padrão feia do navegador
                                padding: '0 16px',
                                backgroundColor: '#FFFFFF',
                                fontSize: '18px',
                                outline: 'none' // Tira aquela linha azul quando clica
                            }} 
                        />
                    </div>

                    {/* Bloco da Senha */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                        <label style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>
                            Senha:
                        </label>
                        <input 
                            type="password" 
                            style={{
                                width: '500px',
                                height: '53px',
                                borderRadius: '8px',
                                border: 'none',
                                padding: '0 16px',
                                fontSize: '18px',
                                backgroundColor: '#FFFFFF',
                                outline: 'none'
                            }} 
                        />
                    </div>

                    <button style={{
                        width: '257px',
                        height: '64px',
                        borderRadius: '10px',
                        fontSize: '48px',
                        fontFamily: 'Jomhuria, sans-serif',
                        color: '#FFFFFF',
                        backgroundColor: '#16FF01',
                        border: '2px solid #000000',
                    }}>
                        ENTER
                    </button>
                    <button onClick={() => navigate('/cadastrar')} style={{
                        width: '257px',
                        height: '64px',
                        borderRadius: '10px',
                        fontSize: '48px',
                        fontFamily: 'Jomhuria, sans-serif',
                        backgroundColor: '#9E9E9E',
                        border: '2px solid #000000',
                    }}>
                        CADASTRO
                    </button>

                </div>
            </div>
            
            <Footer/>
        </div>
    );
}