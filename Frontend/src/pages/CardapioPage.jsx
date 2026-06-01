import { useState, useCallback } from "react";
import { Search, X, ChefHat, Loader2 } from "lucide-react";

import Header  from "../components/Header";
import NavBar  from "../components/NavBar";
import Footer  from "../components/Footer";
import Notification from "../components/Notification";

import CategoryBar    from "../components/Categorybar";
import MenuCard       from "../components/Menucard";
import ItemModal      from "../components/Itemmodal";
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
    <div className="flex min-h-screen w-full flex-col text-zinc-900">
      <Header />
      <NavBar />

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={clearNotification}
      />

      {/* Toolbar fixa com busca e categorias */}
      <div className="sticky top-[calc(var(--header-height)+var(--nav-height))] z-30 border-b border-orange-200/45 bg-white/40 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[78rem] flex-col gap-[0.75rem] px-[1rem] py-[0.8rem] sm:px-[1.5rem] lg:flex-row lg:items-center lg:px-[2rem]">

          {/* Campo de busca */}
          <div className="relative w-full lg:w-[19rem] lg:shrink-0">
            <Search className="pointer-events-none absolute left-[0.95rem] top-1/2 h-[0.9rem] w-[0.9rem] -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Buscar no cardápio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-[2.85rem] w-full rounded-[0.95rem] border border-orange-200 bg-white pl-[2.6rem] pr-[2.5rem] text-[0.9rem] text-zinc-800 outline-none transition-all placeholder:text-zinc-400 focus:border-brand-400 focus:ring-[0.2rem] focus:ring-brand-100"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                aria-label="Limpar busca"
                className="absolute right-[0.7rem] top-1/2 -translate-y-1/2 rounded-full p-[0.25rem] text-zinc-400 transition-colors hover:text-zinc-700 cursor-pointer"
              >
                <X className="h-[0.8rem] w-[0.8rem]" />
              </button>
            )}
          </div>

          {/* Categorias */}
          <div className="flex-1 overflow-hidden rounded-[1rem] border border-orange-200/80 bg-orange-50/55 px-[0.45rem] py-[0.35rem]">
            <CategoryBar
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <main className="mx-auto w-full max-w-[78rem] flex-1 px-[1rem] py-[1.3rem] sm:px-[1.5rem] lg:px-[2rem] lg:py-[1.75rem]">

        {/* Cabeçalho de resultados */}
        {!loading && (
          <div className="mb-[1rem] flex flex-wrap items-center justify-between gap-[0.65rem]">
            <div>
              <h2 className="text-[1rem] font-bold text-zinc-900">
                {selectedCategory === "all"
                  ? "Cardápio completo"
                  : getCategoryName(selectedCategory)}
              </h2>
              <p className="mt-[0.16rem] text-[0.74rem] text-zinc-500">
                {filteredItems.length}{" "}
                {filteredItems.length === 1 ? "item" : "itens"} disponíveis
              </p>
            </div>
            {searchTerm && (
              <span className="rounded-[0.65rem] border border-orange-200 bg-white px-[0.6rem] py-[0.35rem] text-[0.72rem] text-zinc-600">
                Busca:{" "}
                <span className="font-semibold text-zinc-800">"{searchTerm}"</span>
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
          <div className="grid grid-cols-1 gap-[0.75rem] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
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

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center gap-[0.8rem] py-[5rem]">
      <div className="flex h-[3.9rem] w-[3.9rem] items-center justify-center rounded-[1rem] border border-brand-200 bg-brand-50">
        <Loader2 className="h-[1.8rem] w-[1.8rem] animate-spin text-brand-600" />
      </div>
      <div className="text-center">
        <p className="font-semibold text-zinc-800">Carregando cardapio</p>
        <p className="mt-[0.15rem] text-[0.82rem] text-zinc-600">Preparando tudo com carinho...</p>
      </div>
    </div>
  );
}

function EmptyState({ onClear }) {
  return (
    <div className="flex flex-col items-center justify-center px-[1rem] py-[4.2rem] text-center">
      <div className="mb-[0.8rem] flex h-[4.1rem] w-[4.1rem] items-center justify-center rounded-[1rem] border border-orange-200 bg-white shadow-[0_0.8rem_1.5rem_rgba(194,65,12,0.1)]">
        <ChefHat className="h-[2rem] w-[2rem] text-brand-500" />
      </div>
      <h3 className="text-[1.1rem] font-bold text-zinc-900">Nenhum item encontrado</h3>
      <p className="mt-[0.3rem] max-w-[20rem] text-[0.83rem] leading-relaxed text-zinc-600">
        Não encontramos nada com esses filtros. Tente outra busca ou categoria.
      </p>
      <button
        onClick={onClear}
        className="mt-[0.9rem] inline-flex h-[2.6rem] items-center justify-center rounded-[0.85rem] border border-brand-300 bg-brand-600 px-[1rem] text-[0.82rem] font-semibold text-white transition-all hover:bg-brand-700 cursor-pointer"
      >
        Limpar filtros
      </button>
    </div>
  );
}