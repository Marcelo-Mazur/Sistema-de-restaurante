import { ClipboardList, LayoutGrid, ShoppingBasket } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Cardapio', path: '/cardapio', Icon: LayoutGrid },
  { label: 'Carrinho', path: '/carrinho', Icon: ShoppingBasket },
  { label: 'Pedidos', path: '/pedidos', Icon: ClipboardList },
];

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="sticky top-[var(--header-height)] z-40 border-b border-orange-200/45 bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-md">
      <div className="mx-auto flex h-[var(--nav-height)] w-full max-w-[78rem] items-center px-[1rem] sm:px-[1.5rem] lg:px-[2rem]">
        <div className="hide flex gap-[0.75rem] overflow-x-auto pb-[0.2rem]">
          {NAV_ITEMS.map(({ label, path, Icon }) => {
            const active = location.pathname === path;

            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                aria-current={active ? 'page' : undefined}
                className={`inline-flex h-[2.85rem] min-w-[8.5rem] items-center justify-center gap-[0.5rem] rounded-[0.95rem] border px-[1rem] text-[0.86rem] font-semibold transition-all cursor-pointer ${
                  active
                    ? 'border-brand-600 bg-brand-600 text-white'
                    : 'border-orange-200 bg-white/80 text-zinc-700 hover:-translate-y-[0.04rem] hover:border-brand-300 hover:bg-brand-50'
                }`}
              >
                <Icon className="h-[0.95rem] w-[0.95rem]" />
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}