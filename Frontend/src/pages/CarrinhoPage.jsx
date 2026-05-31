import { useNavigate } from "react-router-dom";
import { ShoppingCart, Loader2, ChefHat, AlertCircle } from "lucide-react";

import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import CarrinhoItem   from "../components/Carrinhoitem";
import CarrinhoResumo from "../components/Carrinhoresumo";
import { useCarrinho } from "../hooks/useCarrinho";

export default function Carrinho() {
  const navigate = useNavigate();
  const { cartItems, loading, total, erro, removerItem, atualizarQuantidade } = useCarrinho();

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-24">
      <Header />
      <NavBar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="w-8 h-8 text-red-500" />
          <h1 className="text-3xl font-extrabold text-white">Seu Carrinho</h1>
        </div>

        {erro && <ErroAviso mensagem={erro} />}

        {loading ? (
          <CarregandoState />
        ) : cartItems.length === 0 ? (
          <VazioState onVerCardapio={() => navigate("/cardapio")} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 flex flex-col gap-4">
              {cartItems.map((item) => (
                <CarrinhoItem
                  key={item.id}
                  item={item}
                  onAtualizar={atualizarQuantidade}
                  onRemover={removerItem}
                />
              ))}
            </div>
            <CarrinhoResumo total={total} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function ErroAviso({ mensagem }) {
  return (
    <div className="mb-6 flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-xl">
      <AlertCircle className="w-5 h-5 shrink-0" />
      <p className="text-sm font-medium">{mensagem}</p>
    </div>
  );
}

function CarregandoState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
      <p className="mt-4 text-slate-400 font-medium">Buscando seu pedido...</p>
    </div>
  );
}

function VazioState({ onVerCardapio }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-900/40 border border-slate-800 rounded-3xl p-8">
      <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
        <ChefHat className="w-10 h-10 text-slate-500" />
      </div>
      <h2 className="text-2xl font-bold text-slate-300 mb-2">Seu carrinho está vazio</h2>
      <p className="text-slate-500 max-w-md mb-8">
        Parece que você ainda não escolheu nenhuma delícia do nosso cardápio.
      </p>
      <button
        onClick={onVerCardapio}
        className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white rounded-full font-bold transition-all shadow-lg shadow-red-900/20 cursor-pointer"
      >
        Ver Cardápio
      </button>
    </div>
  );
}