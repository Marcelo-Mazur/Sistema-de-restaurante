import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function addInfo(e) {
        e.preventDefault();

        const apiUrl = `${import.meta.env.VITE_API_URL}api/auth/login`;
        const body = {
            email: email,
            senha: password
        }

        await axios.post(apiUrl, body).then((response) => {
            const tokenDaApi = response.data.token;
            localStorage.setItem('tokenSessao', tokenDaApi);

            alert("Login realizado com sucesso!");
            navigate('/cardapio');
        }).catch((err) => {
            alert(err.response.data);
        });
    }


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
                    marginBottom: '20px' 
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
                    gap: '30px' 
                }}>
                    
                    <form onSubmit={addInfo}
                    style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '20px' 
                        }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
                            <label style={{ fontSize: '24px', fontWeight: 'bold', fontFamily: 'sans-serif' }}>
                                Email:
                            </label>
                            <input 
                                type="text"
                                style={{
                                    width: '500px',
                                    height: '53px',
                                    borderRadius: '8px',
                                    border: 'none', 
                                    padding: '0 16px',
                                    backgroundColor: '#FFFFFF',
                                    fontSize: '18px',
                                    outline: 'none' 
                                }} 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" style={{
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

                    </form>
                    
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