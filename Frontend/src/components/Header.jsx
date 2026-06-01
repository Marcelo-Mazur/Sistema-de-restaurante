import { LogIn, LogOut, UtensilsCrossed } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('tokenSessao');
  const onAuthScreen = location.pathname === "/login" || location.pathname === "/cadastrar";

  const handleLogout = async () => {
    if (token) {
      try {
        const apiUrl = `${import.meta.env.VITE_API_URL}api/auth/logout`;
        await axios.post(apiUrl, { token: token });
      } catch (err) {
        console.error("Erro ao limpar sessão no backend:", err);
      }
    }

   
    localStorage.removeItem('tokenSessao');
    localStorage.removeItem('usuarioId');
    navigate('/login');
  };

  const handleAction = async () => {
    if (token) {
      await handleLogout();
      return;
    }

    if (onAuthScreen) {
      navigate('/cardapio');
      return;
    }

    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 h-[var(--header-height)] border-b border-orange-300/45 bg-gradient-to-b from-white/70 to-white/35 backdrop-blur-xl">
      <div className="mx-auto flex h-full w-full max-w-[78rem] items-center justify-between gap-[1rem] px-[1rem] sm:px-[1.5rem] lg:px-[2rem]">
        <button
          onClick={() => navigate('/cardapio')}
          className="group flex cursor-pointer items-center gap-[0.875rem] text-left"
          aria-label="Ir para cardapio"
        >
          <span className="flex h-[3rem] w-[3rem] items-center justify-center rounded-[1rem] bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-warm transition-transform group-hover:scale-105">
            <UtensilsCrossed className="h-[1.4rem] w-[1.4rem]" />
          </span>

          <span>
            <span className="block font-brand text-[1.55rem] leading-none text-zinc-900">
              Sabor de Dev
            </span>
            <span className="mt-[0.2rem] block text-[0.72rem] uppercase tracking-[0.18em] text-zinc-500">
              restaurante artesanal
            </span>
          </span>
        </button>

        <button
          onClick={handleAction}
          className="inline-flex h-[2.9rem] items-center gap-[0.55rem] rounded-[0.95rem] border border-brand-300 bg-white px-[1.1rem] text-[0.84rem] font-semibold text-brand-700 transition-all hover:-translate-y-[0.04rem] hover:border-brand-500 hover:bg-brand-50 hover:text-brand-800 cursor-pointer"
        >
          {token ? (
            <>
              <LogOut className="h-[1rem] w-[1rem]" />
              Sair
            </>
          ) : (
            <>
              <LogIn className="h-[1rem] w-[1rem]" />
              {onAuthScreen ? 'Ver cardapio' : 'Entrar / Cadastro'}
            </>
          )}
        </button>
      </div>
    </header>
  );
}