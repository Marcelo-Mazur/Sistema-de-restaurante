import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";


export default function Pedido() {
    return (
        <div className="w-full">
            <Header/>
            <NavBar/>
            <div>
                <h1>Pedidos</h1>
            </div>
            <Footer/>
        </div>
    );
}