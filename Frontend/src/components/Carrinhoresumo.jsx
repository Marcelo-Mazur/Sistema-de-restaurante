import { ArrowRight } from "lucide-react";

export default function CarrinhoResumo({ total }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 h-fit sticky top-6">
      <h2 className="text-xl font-bold text-white mb-6 border-b border-slate-800 pb-4">
        Resumo do Pedido
      </h2>

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

      <button className="w-full py-4 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-900/20 active:scale-[0.98] cursor-pointer">
        Finalizar Pedido
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}