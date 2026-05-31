import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import api from "../services/api";
import {
  Search,
  Plus,
  Minus,
  ShoppingBag,
  UtensilsCrossed,
  X,
  Check,
  Beef,
  CupSoda,
  CakeSlice,
  Soup,
  FishSymbol,
  Pizza,
  Loader2,
  ChefHat,
  AlertCircle,
  SlidersHorizontal
} from "lucide-react";

const CATEGORIES = [
  { id: "all", name: "Todos", Icon: UtensilsCrossed },
  { id: 0, name: "Lanches", Icon: Beef },
  { id: 1, name: "Bebidas", Icon: CupSoda },
  { id: 2, name: "Sobremesas", Icon: CakeSlice },
  { id: 3, name: "Pratos", Icon: Soup },
  { id: 4, name: "Acompanhamentos", Icon: FishSymbol },
  { id: 5, name: "Outros", Icon: Pizza },
];

const CATEGORY_STYLES = {
  0: { bg: "from-amber-500/20 to-orange-600/20", border: "border-orange-500/30", text: "text-orange-400", badge: "bg-orange-500/10 text-orange-400 border-orange-500/20", Icon: Beef },
  1: { bg: "from-blue-500/20 to-indigo-600/20", border: "border-blue-500/30", text: "text-blue-400", badge: "bg-blue-500/10 text-blue-400 border-blue-500/20", Icon: CupSoda },
  2: { bg: "from-pink-500/20 to-purple-600/20", border: "border-pink-500/30", text: "text-pink-400", badge: "bg-pink-500/10 text-pink-400 border-pink-500/20", Icon: CakeSlice },
  3: { bg: "from-emerald-500/20 to-teal-600/20", border: "border-emerald-500/30", text: "text-emerald-400", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", Icon: Soup },
  4: { bg: "from-yellow-500/20 to-amber-600/20", border: "border-yellow-500/30", text: "text-yellow-400", badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20", Icon: FishSymbol },
  5: { bg: "from-rose-500/20 to-red-600/20", border: "border-rose-500/30", text: "text-rose-400", badge: "bg-rose-500/10 text-rose-400 border-rose-500/20", Icon: Pizza },
};

const CATEGORY_MATCH = {
  lanche: 0, lanches: 0,
  bebida: 1, bebidas: 1,
  sobremesa: 2, sobremesas: 2,
  prato: 3, pratos: 3,
  acompanhamento: 4, acompanhamentos: 4,
  outro: 5, outros: 5,
};

function resolveCategoryId(categoria) {
  if (typeof categoria === "number") return categoria;
  return CATEGORY_MATCH[String(categoria).toLowerCase()] ?? 5;
}

function getCategoryStyle(item) {
  const categoryId = resolveCategoryId(item.categoria);
  const style = CATEGORY_STYLES[categoryId] || CATEGORY_STYLES[5];
  return { categoryId, style };
}

function getCategoryName(categoryId) {
  return CATEGORIES.find((c) => c.id === categoryId)?.name ?? "Outros";
}

function Notification({ message, type, onClose }) {
  if (!message) return null;
  const styles = {
    success: "bg-emerald-950/90 border-emerald-500/40 text-emerald-300",
    error: "bg-red-950/90 border-red-500/40 text-red-300",
  };
  const icons = {
    success: <Check className="w-4 h-4 shrink-0 text-emerald-400" />,
    error: <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />,
  };
  return (
    <div
      className={`fixed top-20 right-4 z-[60] flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-xl max-w-xs animate-in slide-in-from-right-4 ${styles[type]}`}
    >
      {icons[type]}
      <span className="text-sm font-medium flex-1">{message}</span>
      <button
        onClick={onClose}
        className="opacity-50 hover:opacity-100 transition-opacity ml-1 cursor-pointer"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function CategoryBar({ selectedCategory, onSelect }) {
  const scrollRef = useRef(null);

  return (
    <div
      ref={scrollRef}
      className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {CATEGORIES.map(({ id, name, Icon }) => {
        const active = selectedCategory === id;
        return (
          <button
            key={id}
            onClick={() => onSelect(id)}
            className={`
              flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold
              whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer
              ${active
                ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-[1.03]"
                : "bg-slate-800/70 border border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-700/70 hover:border-slate-600"
              }
            `}
          >
            <Icon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{name}</span>
            <span className="sm:hidden">{name.split(" ")[0]}</span>
          </button>
        );
      })}
    </div>
  );
}

function MenuCard({ item, onOpen, onQuickAdd }) {
  const { categoryId, style } = getCategoryStyle(item);
  const ItemIcon = style.Icon;

  return (
    <div className="group relative bg-slate-900/50 border border-slate-800/80 hover:border-slate-700 rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-0.5">
      {/* Image area */}
      <div
        onClick={() => onOpen(item)}
        className={`relative cursor-pointer bg-gradient-to-br ${style.bg} flex items-center justify-center overflow-hidden`}
        style={{ paddingBottom: "85%" }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-32 h-32 rounded-full blur-3xl opacity-30 bg-white/20" />
          <ItemIcon
            className={`w-20 h-20 sm:w-24 sm:h-24 ${style.text} relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2`}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3 z-20">
          <span className="text-[10px] font-bold tracking-widest text-white bg-red-600/90 py-1 px-3 rounded-full uppercase border border-red-500/50 backdrop-blur-sm">
            Ver detalhes
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-1 p-5 sm:p-6">
        <span className={`self-start inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border mb-3.5 ${style.badge}`}>
          {getCategoryName(categoryId)}
        </span>

        <div onClick={() => onOpen(item)} className="cursor-pointer flex-1">
          <h3 className="text-sm font-bold text-slate-100 group-hover:text-white transition-colors line-clamp-1 mb-2 leading-tight">
            {item.nome}
          </h3>
          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
            {item.descricao || `Delicioso ${item.nome?.toLowerCase()} preparado na hora.`}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2 mt-5 pt-4 border-t border-slate-800/60">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-600 font-medium">Preço</span>
            <span className="text-base font-extrabold text-amber-400 leading-tight">
              R$ {item.preco.toFixed(2)}
            </span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onQuickAdd(item); }}
            className="flex items-center justify-center w-10 h-10 bg-slate-800 hover:bg-red-600 active:scale-90 text-slate-300 hover:text-white rounded-xl border border-slate-700 hover:border-red-500 transition-all duration-200 cursor-pointer shadow-sm"
            aria-label={`Adicionar ${item.nome} ao carrinho`}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function ItemModal({ item, quantity, onQuantityChange, onClose, onAddToCart, addingToCart, successAnimation }) {
  const { categoryId, style } = getCategoryStyle(item);
  const ModalIcon = style.Icon;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel — bottom sheet on mobile, centered modal on sm+ */}
      <div className="relative w-full sm:max-w-md bg-slate-900 sm:rounded-3xl rounded-t-3xl border border-slate-800 shadow-2xl z-10 overflow-hidden flex flex-col max-h-[92dvh] sm:max-h-[88vh]">
        {/* Close btn */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-20 p-2.5 bg-slate-800/90 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full transition-colors cursor-pointer backdrop-blur-md"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Drag handle (mobile only) */}
        <div className="sm:hidden flex justify-center pt-4 pb-2 shrink-0">
          <div className="w-10 h-1 rounded-full bg-slate-700" />
        </div>

        {/* Icon hero — full width, tall */}
        <div className={`relative bg-gradient-to-br ${style.bg} flex items-center justify-center shrink-0`} style={{ minHeight: "220px" }}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          </div>
          <ModalIcon className={`w-32 h-32 ${style.text} relative z-10 drop-shadow-2xl`} />
          {/* Category badge overlaid on image */}
          <span className={`absolute bottom-4 left-5 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border backdrop-blur-sm ${style.badge}`}>
            {getCategoryName(categoryId)}
          </span>
        </div>

        <div className="flex flex-col flex-1 p-6 sm:p-8 overflow-y-auto gap-5">
          <div>
            <h2 className="text-2xl font-extrabold text-white leading-tight mb-2">
              {item.nome}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              {item.descricao || `Nossa versão exclusiva de ${item.nome}. Preparado com maestria pela nossa cozinha.`}
            </p>
          </div>

          <QuantitySelector quantity={quantity} onChange={onQuantityChange} />

          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1">Total</p>
              <p className="text-2xl font-extrabold text-amber-400 leading-none">
                R$ {(item.preco * quantity).toFixed(2)}
              </p>
            </div>
            <button
              onClick={() => onAddToCart(item, quantity)}
              disabled={addingToCart || successAnimation}
              className={`flex-1 py-4 px-5 rounded-2xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                successAnimation
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/40"
                  : "bg-red-600 hover:bg-red-500 active:scale-95 text-white border-red-500 shadow-lg shadow-red-900/20"
              }`}
            >
              {successAnimation ? (
                <><Check className="w-4 h-4" /> Adicionado!</>
              ) : addingToCart ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Processando...</>
              ) : (
                <><ShoppingBag className="w-4 h-4" /> Adicionar ao carrinho</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuantitySelector({ quantity, onChange }) {
  return (
    <div className="flex items-center justify-between bg-slate-950/60 border border-slate-800 rounded-2xl px-5 py-4">
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
        Quantidade
      </span>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onChange((prev) => Math.max(1, prev - 1))}
          disabled={quantity <= 1}
          className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-lg font-bold text-white w-7 text-center tabular-nums">
          {quantity}
        </span>
        <button
          onClick={() => onChange((prev) => prev + 1)}
          className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function CardapioPage() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [selectedItem, setSelectedItem] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [successAnimation, setSuccessAnimation] = useState(false);

  const [notification, setNotification] = useState({ message: "", type: "success" });

  const showNotification = useCallback((message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "success" }), 4000);
  }, []);

  const clearNotification = useCallback(() => {
    setNotification({ message: "", type: "success" });
  }, []);

  useEffect(() => {
    async function fetchCardapio() {
      try {
        const response = await api.get("api/cardapio");
        setItems(response.data);
      } catch {
        showNotification("Não foi possível carregar o cardápio. Tente novamente.", "error");
      } finally {
        setLoading(false);
      }
    }
    fetchCardapio();
  }, [showNotification]);

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.nome?.toLowerCase().includes(searchTerm.toLowerCase());
    if (selectedCategory === "all") return matchesSearch;
    return matchesSearch && resolveCategoryId(item.categoria) === selectedCategory;
  });

  async function handleAddToCart(item, quantity = 1) {
    const userId = localStorage.getItem("usuarioId");
    const token = localStorage.getItem("tokenSessao");
    if (!token || !userId) { navigate("/login"); return; }

    try {
      setAddingToCart(true);
      await api.post(`api/pedidos/carrinho/${userId}`, {
        cardapioId: item.id,
        quantidade: quantity,
      });
      setSuccessAnimation(true);
      showNotification(`${item.nome} adicionado ao carrinho!`, "success");
      setTimeout(() => {
        setSuccessAnimation(false);
        setSelectedItem(null);
        setModalQuantity(1);
        window.dispatchEvent(new Event("cartUpdated"));
      }, 1200);
    } catch {
      showNotification("Não foi possível adicionar o item. Tente novamente.", "error");
    } finally {
      setAddingToCart(false);
    }
  }

  function openItemModal(item) {
    setSelectedItem(item);
    setModalQuantity(1);
    setSuccessAnimation(false);
  }

  function closeItemModal() {
    setSelectedItem(null);
    setModalQuantity(1);
  }

  const countByCategory = (catId) =>
    catId === "all"
      ? items.length
      : items.filter((i) => resolveCategoryId(i.categoria) === catId).length;

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header />
      <NavBar />

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={clearNotification}
      />

      {/* ── Sticky toolbar ── */}
      <div className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/60 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
          {/* Search */}
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="flex-1 overflow-hidden">
            <CategoryBar selectedCategory={selectedCategory} onSelect={setSelectedCategory} />
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-8 py-8 pb-32">

        {/* Results header */}
        {!loading && (
          <div className="flex items-center justify-between mb-7">
            <div>
              <h2 className="text-base font-bold text-slate-200">
                {selectedCategory === "all"
                  ? "Cardápio completo"
                  : getCategoryName(selectedCategory)}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {filteredItems.length} {filteredItems.length === 1 ? "item" : "itens"} disponíveis
              </p>
            </div>
            {searchTerm && (
              <span className="text-xs text-slate-500 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-lg">
                Busca: <span className="text-slate-300 font-medium">"{searchTerm}"</span>
              </span>
            )}
          </div>
        )}

        {/* States */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl bg-red-600/10 border border-red-500/20 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-slate-300 font-semibold">Carregando cardápio</p>
              <p className="text-slate-500 text-sm mt-1">Preparando tudo com carinho...</p>
            </div>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center px-4">
            <div className="w-16 h-16 bg-slate-800/60 border border-slate-700 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
              <ChefHat className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-300">Nenhum item encontrado</h3>
            <p className="text-slate-500 text-sm mt-1.5 max-w-xs leading-relaxed">
              Não encontramos nada com esses filtros. Tente outra busca ou categoria.
            </p>
            <button
              onClick={() => { setSearchTerm(""); setSelectedCategory("all"); }}
              className="mt-5 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm font-semibold rounded-xl transition-colors cursor-pointer"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {filteredItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onOpen={openItemModal}
                onQuickAdd={(i) => handleAddToCart(i, 1)}
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