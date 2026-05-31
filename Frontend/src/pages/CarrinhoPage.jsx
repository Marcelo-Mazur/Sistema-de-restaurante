import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import api from "../services/api";
import { ShoppingCart, Trash2, ArrowRight, Loader2, ChefHat, AlertCircle, Plus, Minus } from "lucide-react";

export default function Carrinho() {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        carregarCarrinho(true);
    }, []);

    async function carregarCarrinho(primeiroCarregamento = false) {
        const userId = localStorage.getItem("usuarioId");
        const token = localStorage.getItem("tokenSessao");

        if (!token || !userId) {
            navigate("/login");
            return;
        }

        try {
            if (primeiroCarregamento) {
                setLoading(true);
            }
            
            setErro(null);
            const response = await api.get(`api/pedidos/carrinho/${userId}`);

            const itensDoCarrinho = response.data.itens || response.data.Itens || [];

            setCartItems(itensDoCarrinho);

            const valorTotal = itensDoCarrinho.reduce((acc, item) => {
                const precoItem = item.cardapio?.preco || item.preco || item.precoUnitario || 0;
                return acc + (precoItem * item.quantidade);
            }, 0);
            
            setTotal(valorTotal);
        }
        catch (error) {
            console.error("Erro ao buscar o carrinho:", error);
            setErro("Não foi possível carregar os itens do carrinho.");
        } finally {
            if (primeiroCarregamento) {
                setLoading(false);
            }
        }
    }

    async function removerDoCarrinho(itemId) {
        try {
            setErro(null); 
            await api.delete(`api/pedidos/carrinho/item/${itemId}`);

            carregarCarrinho();
        } catch (error) {
            console.error("Erro ao remover item:", error);
            setErro("Não foi possível remover o item.");
        }
    }

    async function atualizarQuantidade(itemId, quantidadeAtual, mudanca) {
        const novaQuantidade = quantidadeAtual + mudanca;

        if (novaQuantidade <= 0) {
            removerDoCarrinho(itemId);
            return;
        }

        try {
            setErro(null);
            await api.put(`api/pedidos/carrinho/item/${itemId}`, novaQuantidade, {
                headers: { 'Content-Type': 'application/json' }
            });
            
            carregarCarrinho();
        } catch (error) {
            console.error("Erro ao atualizar quantidade:", error);
            setErro("Não foi possível atualizar a quantidade do item.");
        }
    }

    return (
        <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-24">
            <Header />
            <NavBar />

            <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-8">
                <div className="flex items-center gap-3 mb-8">
                    <ShoppingCart className="w-8 h-8 text-red-500" />
                    <h1 className="text-3xl font-extrabold text-white">Seu Carrinho</h1>
                </div>

                {erro && (
                    <div className="mb-6 flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/50 text-red-400 rounded-xl">
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p className="text-sm font-medium">{erro}</p>
                    </div>
                )}

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
                        <p className="mt-4 text-slate-400 font-medium">Buscando seu pedido...</p>
                    </div>
                ) : cartItems.length === 0 && !erro ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-900/40 border border-slate-800 rounded-3xl p-8">
                        <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6">
                            <ChefHat className="w-10 h-10 text-slate-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-300 mb-2">Seu carrinho está vazio</h2>
                        <p className="text-slate-500 max-w-md mb-8">
                            Parece que você ainda não escolheu nenhuma delícia do nosso cardápio.
                        </p>
                        <button
                            onClick={() => navigate('/cardapio')}
                            className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white rounded-full font-bold transition-all shadow-lg shadow-red-900/20"
                        >
                            Ver Cardápio
                        </button>
                    </div>
                ) : cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 flex flex-col gap-4">
                            {cartItems.map((item) => {
                                const nome = item.cardapio?.nome || item.nome || "Item Indisponível";
                                const preco = item.cardapio?.preco || item.preco || item.precoUnitario || 0;
                                const idParaRemover = item.id || item.cardapioId;

                                return (
                                    <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-900/60 border border-slate-800 rounded-2xl hover:border-slate-700 transition-colors gap-4">
                                        
                                        {/* Informações e Controles */}
                                        <div className="flex flex-col gap-3">
                                            <div>
                                                <h3 className="text-lg font-bold text-white">{nome}</h3>
                                                <span className="text-sm text-slate-400">
                                                    Valor unitário: R$ {preco.toFixed(2)}
                                                </span>
                                            </div>

                                            {/* Seletor de Quantidade */}
                                            <div className="flex items-center gap-3 bg-slate-950 w-fit p-1 rounded-xl border border-slate-800">
                                                <button 
                                                    onClick={() => atualizarQuantidade(idParaRemover, item.quantidade, -1)}
                                                    className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                
                                                <span className="w-6 text-center text-sm font-bold text-slate-200">
                                                    {item.quantidade}
                                                </span>
                                                
                                                <button 
                                                    onClick={() => atualizarQuantidade(idParaRemover, item.quantidade, 1)}
                                                    className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Preço Total e Botão Lixeira */}
                                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-6 border-t border-slate-800/50 sm:border-0 pt-4 sm:pt-0 mt-2 sm:mt-0">
                                            <div className="flex flex-col items-end">
                                                <span className="text-xs text-slate-500 font-medium mb-1 hidden sm:block">Subtotal do item</span>
                                                <span className="text-xl font-bold text-amber-400">
                                                    R$ {(preco * item.quantidade).toFixed(2)}
                                                </span>
                                            </div>
                                            <button
                                                onClick={() => removerDoCarrinho(idParaRemover)}
                                                className="p-2.5 text-slate-500 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                                                title="Remover item"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Resumo do Pedido (Mantido Igual) */}
                        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-fit sticky top-6">
                            <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">Resumo do Pedido</h2>

                            <div className="flex justify-between items-center mb-4 text-slate-300">
                                <span>Subtotal</span>
                                <span>R$ {total.toFixed(2)}</span>
                            </div>

                            <div className="flex justify-between items-center mb-6 text-slate-300">
                                <span>Taxa de Entrega</span>
                                <span className="text-emerald-400 font-medium">Grátis</span>
                            </div>

                            <div className="flex justify-between items-center mb-8 border-t border-slate-800 pt-4">
                                <span className="text-lg font-bold text-white">Total</span>
                                <span className="text-3xl font-bold text-amber-400">
                                    R$ {total.toFixed(2)}
                                </span>
                            </div>

                            <button className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900/20 active:scale-[0.98]">
                                Finalizar Pedido
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ) : null}
            </main>

            <Footer />
        </div>
    );
}