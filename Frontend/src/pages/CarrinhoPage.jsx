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
    <div className="flex min-h-screen w-full flex-col text-zinc-900">
      <Header />
      <NavBar />

      <main className="mx-auto w-full max-w-[78rem] flex-1 px-[1rem] py-[1.3rem] sm:px-[1.5rem] lg:px-[2rem] lg:py-[1.75rem]">
        <div className="mb-[1.2rem] flex items-center gap-[0.65rem]">
          <span className="inline-flex h-[2.5rem] w-[2.5rem] items-center justify-center rounded-[0.85rem] bg-brand-600 text-white shadow-[0_0.7rem_1.5rem_rgba(185,71,15,0.26)]">
            <ShoppingCart className="h-[1.2rem] w-[1.2rem]" />
          </span>
          <h1 className="font-brand text-[2rem] leading-none text-zinc-900">Seu Carrinho</h1>
        </div>

        {erro && <ErroAviso mensagem={erro} />}

        {loading ? (
          <CarregandoState />
        ) : cartItems.length === 0 ? (
          <VazioState onVerCardapio={() => navigate("/cardapio")} />
        ) : (
          <div className="grid grid-cols-1 gap-[1rem] xl:grid-cols-3">
            <div className="flex flex-col gap-[0.7rem] xl:col-span-2">
              {cartItems.map((item) => (
                <CarrinhoItem
                  key={item.id}
                  item={item}
                  onAtualizar={atualizarQuantidade}
                  onRemover={removerItem}
                />
              ))}
            </div>
            <CarrinhoResumo
              total={total}
              onCheckout={() => navigate("/checkout")}
              checkoutDisabled={loading || cartItems.length === 0}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function ErroAviso({ mensagem }) {
  return (
    <div className="mb-[1rem] flex items-center gap-[0.55rem] rounded-[0.95rem] border border-red-300 bg-red-50 px-[0.9rem] py-[0.75rem] text-red-700">
      <AlertCircle className="h-[1rem] w-[1rem] shrink-0" />
      <p className="text-[0.82rem] font-medium">{mensagem}</p>
    </div>
  );
}

function CarregandoState() {
  return (
    <div className="flex flex-col items-center justify-center py-[4.5rem]">
      <Loader2 className="h-[2.2rem] w-[2.2rem] animate-spin text-brand-600" />
      <p className="mt-[0.55rem] text-[0.86rem] font-medium text-zinc-600">Buscando seu pedido...</p>
    </div>
  );
}

function VazioState({ onVerCardapio }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[1.6rem] border border-orange-200 bg-white/88 p-[1.4rem] py-[3.2rem] text-center shadow-[0_1rem_2rem_rgba(194,65,12,0.12)]">
      <div className="mb-[0.9rem] flex h-[4.8rem] w-[4.8rem] items-center justify-center rounded-full bg-orange-100/70">
        <ChefHat className="h-[2.2rem] w-[2.2rem] text-brand-500" />
      </div>
      <h2 className="mb-[0.4rem] text-[1.55rem] font-bold text-zinc-900">Seu carrinho esta vazio</h2>
      <p className="mb-[1.2rem] max-w-[24rem] text-[0.86rem] text-zinc-600">
        Parece que voce ainda nao escolheu nenhuma delicia do nosso cardapio.
      </p>
      <button
        onClick={onVerCardapio}
        className="inline-flex h-[3rem] items-center justify-center rounded-[0.95rem] bg-brand-600 px-[1.25rem] text-[0.86rem] font-bold text-white transition-all hover:-translate-y-[0.04rem] hover:bg-brand-700 cursor-pointer"
      >
        Ver Cardapio
      </button>
    </div>
  );
}