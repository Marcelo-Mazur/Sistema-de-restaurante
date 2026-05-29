import { useState, useEffect, useCallback } from "react";
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
  AlertCircle
} from "lucide-react";

const CATEGORIES = [
  { id: "all", name: "Todos", Icon: UtensilsCrossed },
  { id: 0, name: "Lanches", Icon: Beef },
  { id: 1, name: "Bebidas", Icon: CupSoda },
  { id: 2, name: "Sobremesas", Icon: CakeSlice },
  { id: 3, name: "Pratos", Icon: Soup },
  { id: 4, name: "Acompanhamentos", Icon: FishSymbol },
  { id: 5, name: "Outros", Icon: Pizza }
];

const CATEGORY_STYLES = {
  0: { bg: "from-amber-500/20 to-orange-600/20", border: "border-orange-500/30", text: "text-orange-400", Icon: Beef },
  1: { bg: "from-blue-500/20 to-indigo-600/20", border: "border-blue-500/30", text: "text-blue-400", Icon: CupSoda },
  2: { bg: "from-pink-500/20 to-purple-600/20", border: "border-pink-500/30", text: "text-pink-400", Icon: CakeSlice },
  3: { bg: "from-emerald-500/20 to-teal-600/20", border: "border-emerald-500/30", text: "text-emerald-400", Icon: Soup },
  4: { bg: "from-yellow-500/20 to-amber-600/20", border: "border-yellow-500/30", text: "text-yellow-400", Icon: FishSymbol },
  5: { bg: "from-rose-500/20 to-red-600/20", border: "border-rose-500/30", text: "text-rose-400", Icon: Pizza }
};

const CATEGORY_MATCH = {
  lanche: 0, lanches: 0,
  bebida: 1, bebidas: 1,
  sobremesa: 2, sobremesas: 2,
  prato: 3, pratos: 3,
  acompanhamento: 4, acompanhamentos: 4,
  outro: 5, outros: 5
};

function resolveCategoryId(categoria) {
  if (typeof categoria === "number") return categoria;
  return CATEGORY_MATCH[String(categoria).toLowerCase()] ?? 5;
}

function Notification({ message, type, onClose }) {
  if (!message) return null;

  const styles = {
    success: "bg-emerald-500/10 border-emerald-500/50 text-emerald-400",
    error: "bg-red-500/10 border-red-500/50 text-red-400"
  };

  const icons = {
    success: <Check className="w-5 h-5 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 shrink-0" />
  };

  return (
    <div className={`fixed top-24 right-4 z-50 flex items-center gap-3 px-5 py-3 rounded-xl border shadow-lg backdrop-blur-md ${styles[type]}`}>
      {icons[type]}
      <span className="text-sm font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

function getCategoryStyle(item) {
  const categoryId = resolveCategoryId(item.categoria);
  const style = CATEGORY_STYLES[categoryId] || CATEGORY_STYLES[5];
  return { categoryId, style };
}

function getCategoryName(categoryId) {
  return CATEGORIES.find((c) => c.id === categoryId)?.name ?? "Outros";
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

    if (!token || !userId) {
      navigate("/login");
      return;
    }

    try {
      setAddingToCart(true);
      await api.post(`api/pedidos/carrinho/${userId}`, {
        cardapioId: item.id,
        quantidade: quantity
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

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans pb-24">
      <Header />
      <NavBar />

      <Notification
        message={notification.message}
        type={notification.type}
        onClose={clearNotification}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
            {CATEGORIES.map((category) => {
              const CatIcon = category.Icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/30 scale-105"
                      : "bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }`}
                >
                  <CatIcon className="w-4 h-4" />
                  <span>{category.name}</span>
                </button>
              );
            })}
          </div>

          <div className="relative w-full md:w-80 shrink-0">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar no cardápio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-900/60 border border-slate-800 rounded-full text-slate-200 placeholder-slate-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-red-500 animate-spin" />
            <p className="mt-4 text-slate-400 font-medium">Carregando cardápio...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-900/20 border border-slate-900 rounded-3xl p-8">
            <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center mb-4">
              <ChefHat className="w-8 h-8 text-slate-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-300">Nenhum prato encontrado</h3>
            <p className="text-slate-500 mt-1 max-w-sm">
              Não encontramos nenhum item correspondente. Tente buscar por outro termo!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const { categoryId, style } = getCategoryStyle(item);
              const ItemIcon = style.Icon;

              return (
                <div
                  key={item.id}
                  className="group bg-slate-900/40 border border-slate-800 hover:border-slate-700 rounded-2xl p-4 flex flex-col justify-between hover:bg-slate-800/40 hover:shadow-xl hover:shadow-red-900/10 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div onClick={() => openItemModal(item)} className="cursor-pointer">
                    <div className={`aspect-square w-full rounded-xl bg-gradient-to-br ${style.bg} border ${style.border} flex items-center justify-center relative overflow-hidden mb-4 transition-transform duration-300`}>
                      <ItemIcon className={`w-20 h-20 ${style.text} transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-3">
                        <span className="text-xs font-bold tracking-wider text-white bg-red-600/90 py-1.5 px-4 rounded-full uppercase shadow-md shadow-black/50 backdrop-blur-sm border border-red-500/50">Ver detalhes</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-wider mb-2 px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 ${style.text}`}>
                        {getCategoryName(categoryId)}
                      </span>
                      <h3 className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors line-clamp-1">
                        {item.nome}
                      </h3>
                      <p className="text-sm text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                        {item.descricao || `Delicioso ${item.nome?.toLowerCase()} preparado na hora.`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-4 border-t border-slate-800/50 mt-2">
                    <span className="text-xl font-bold text-amber-400">
                      R$ {item.preco.toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item, 1);
                      }}
                      className="p-2.5 bg-slate-800 hover:bg-red-600 active:scale-95 text-slate-300 hover:text-white rounded-xl hover:shadow-lg hover:shadow-red-600/20 border border-slate-700 hover:border-red-500 transition-all cursor-pointer"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {selectedItem && <ItemModal
        item={selectedItem}
        quantity={modalQuantity}
        onQuantityChange={setModalQuantity}
        onClose={closeItemModal}
        onAddToCart={handleAddToCart}
        addingToCart={addingToCart}
        successAnimation={successAnimation}
      />}

      <Footer />
    </div>
  );
}

function ItemModal({ item, quantity, onQuantityChange, onClose, onAddToCart, addingToCart, successAnimation }) {
  const { categoryId, style } = getCategoryStyle(item);
  const ModalIcon = style.Icon;

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="absolute inset-0 cursor-pointer" onClick={onClose}></div>

      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-3xl overflow-hidden relative shadow-2xl z-10">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 bg-slate-800/80 text-slate-400 hover:text-white rounded-full hover:bg-slate-700 transition-colors z-20 cursor-pointer backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className={`bg-gradient-to-br ${style.bg} border-b md:border-b-0 md:border-r border-slate-800 flex items-center justify-center py-12 md:py-0 select-none min-h-[250px] relative`}>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </div>
            <ModalIcon className={`w-28 h-28 ${style.text} relative z-10 drop-shadow-2xl`} />
          </div>

          <div className="p-6 md:p-8 flex flex-col justify-between bg-slate-900">
            <div>
              <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-slate-300 bg-slate-800 border border-slate-700 px-3 py-1 rounded-full mb-4">
                {getCategoryName(categoryId)}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">
                {item.nome}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {item.descricao || `Nossa versão exclusiva de ${item.nome}. Preparado com maestria pela nossa cozinha.`}
              </p>
            </div>

            <div className="mt-4">
              <QuantitySelector quantity={quantity} onChange={onQuantityChange} />

              <div className="flex items-center justify-between gap-4 mt-6">
                <div className="flex flex-col">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-0.5">Total</span>
                  <span className="text-2xl font-bold text-amber-400 leading-none">
                    R$ {(item.preco * quantity).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={() => onAddToCart(item, quantity)}
                  disabled={addingToCart || successAnimation}
                  className={`flex-1 py-3.5 px-6 rounded-2xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                    successAnimation
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/50"
                      : "bg-red-600 hover:bg-red-500 text-white border-red-500 shadow-lg shadow-red-900/20 active:scale-[0.98]"
                  }`}
                >
                  {successAnimation ? (
                    <><Check className="w-5 h-5" /> Adicionado</>
                  ) : addingToCart ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Processando...</>
                  ) : (
                    <><ShoppingBag className="w-4 h-4" /> Adicionar</>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuantitySelector({ quantity, onChange }) {
  return (
    <div className="flex items-center justify-between bg-slate-950 p-3 rounded-2xl border border-slate-800">
      <span className="text-xs font-bold text-slate-400 uppercase tracking-wide pl-2">Quantidade</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange((prev) => Math.max(1, prev - 1))}
          disabled={quantity <= 1}
          className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl disabled:opacity-30 disabled:pointer-events-none hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="text-lg font-bold text-white w-8 text-center">{quantity}</span>
        <button
          onClick={() => onChange((prev) => prev + 1)}
          className="p-2 bg-slate-800 text-slate-300 hover:text-white rounded-xl hover:bg-slate-700 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}