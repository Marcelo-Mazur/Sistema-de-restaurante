import { useState, useCallback } from "react";
import { Search, X, ChefHat, Loader2 } from "lucide-react";

import Header  from "../components/Header";
import NavBar  from "../components/NavBar";
import Footer  from "../components/Footer";
import Notification from "../components/Notification";

import CategoryBar    from "../components/CategoryBar";
import MenuCard       from "../components/MenuCard";
import ItemModal      from "../components/ItemModal";
import { useCardapio } from "../hooks/useCardapio";
import { useCart }     from "../hooks/useCart";
import { resolveCategoryId, getCategoryName } from "../constants/categories";

export default function CardapioPage() {
  const [notification, setNotification] = useState({ message: "", type: "success" });

  const showNotification = useCallback((message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "success" }), 4000);
  }, []);

  const clearNotification = useCallback(() => {
    setNotification({ message: "", type: "success" });
  }, []);

  const { items, loading } = useCardapio(showNotification);
  const { addToCart, addingToCart, successAnimation } = useCart(showNotification);

  const [searchTerm, setSearchTerm]           = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.nome?.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedCategory === "all") return matchesSearch;
    return matchesSearch && resolveCategoryId(item.categoria) === selectedCategory;
  });

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);

  function openItemModal(item) {
    setSelectedItem(item);
    setModalQuantity(1);
  }

  function closeItemModal() {
    setSelectedItem(null);
    setModalQuantity(1);
  }

  function handleAddToCart(item, quantity) {
    addToCart(item, quantity, closeItemModal);
  }

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header />
      <NavBar />

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={clearNotification}
      />

      {/* Toolbar fixa com busca e categorias */}
      <div className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/60 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">

          {/* Campo de busca */}
          <div className="relative sm:w-72 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar no cardápio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-11 py-3.5 bg-slate-800/60 border border-slate-700/60 rounded-2xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/30 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                aria-label="Limpar busca"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Categorias */}
          <div className="flex-1 overflow-hidden">
            <CategoryBar
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-8 py-8 pb-32">

        {/* Cabeçalho de resultados */}
        {!loading && (
          <div className="flex items-center justify-between mb-7">
            <div>
              <h2 className="text-base font-bold text-slate-200">
                {selectedCategory === "all"
                  ? "Cardápio completo"
                  : getCategoryName(selectedCategory)}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {filteredItems.length}{" "}
                {filteredItems.length === 1 ? "item" : "itens"} disponíveis
              </p>
            </div>
            {searchTerm && (
              <span className="text-xs text-slate-500 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-lg">
                Busca:{" "}
                <span className="text-slate-300 font-medium">"{searchTerm}"</span>
              </span>
            )}
          </div>
        )}

        {/* Estados: carregando / vazio / grade */}
        {loading ? (
          <LoadingState />
        ) : filteredItems.length === 0 ? (
          <EmptyState onClear={() => { setSearchTerm(""); setSelectedCategory("all"); }} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onOpen={openItemModal}
                onQuickAdd={(i) => addToCart(i, 1)}
              />
            ))}
          </div>
        )}
      </main>

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          quantity={modalQuantity}
          onQuantityChange={setModalQuantity}
          onClose={closeItemModal}
          onAddToCart={handleAddToCart}
          addingToCart={addingToCart}
          successAnimation={successAnimation}
        />
      )}

      <Footer />
    </div>
  );
}

// ── Sub-componentes de estado (internos à página) ─────────────────────────────

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-16 h-16 rounded-2xl bg-red-600/10 border border-red-500/20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
      </div>
      <div className="text-center">
        <p className="text-slate-300 font-semibold">Carregando cardápio</p>
        <p className="text-slate-500 text-sm mt-1">Preparando tudo com carinho...</p>
      </div>
    </div>
  );
}

function EmptyState({ onClear }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <div className="w-16 h-16 bg-slate-800/60 border border-slate-700 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
        <ChefHat className="w-8 h-8 text-slate-500" />
      </div>
      <h3 className="text-lg font-bold text-slate-300">Nenhum item encontrado</h3>
      <p className="text-slate-500 text-sm mt-1.5 max-w-xs leading-relaxed">
        Não encontramos nada com esses filtros. Tente outra busca ou categoria.
      </p>
      <button
        onClick={onClear}
        className="mt-5 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
      >
        Limpar filtros
      </button>
    </div>
  );
}