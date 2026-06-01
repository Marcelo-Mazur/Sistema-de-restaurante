import { useNavigate } from "react-router-dom";
import {
	ArrowLeft,
	AlertCircle,
	CircleCheckBig,
	CreditCard,
	Loader2,
	QrCode,
	ReceiptText,
	Wallet,
} from "lucide-react";

import CheckoutItem from "../components/CheckoutItem";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Notification from "../components/Notification";
import PagamentoResumo from "../components/PagamentoResumo";
import { useCheckout } from "../hooks/useCheckout";

const FORMAS_PAGAMENTO = [
	{
		id: 0,
		titulo: "Dinheiro",
		descricao: "Pague no balcão ou na entrega.",
		icone: Wallet,
	},
	{
		id: 1,
		titulo: "Cartao",
		descricao: "Debito, credito ou aproximacao.",
		icone: CreditCard,
	},
	{
		id: 2,
		titulo: "Pix",
		descricao: "Pagamento instantaneo e confirmado na hora.",
		icone: QrCode,
	},
];

export default function PagamentoPage() {
	const navigate = useNavigate();
	const {
		cartItems,
		loading,
		erro,
		formaPagamento,
		setFormaPagamento,
		finalizando,
		notification,
		clearNotification,
		total,
		totalItens,
		finalizarCheckout,
	} = useCheckout();

	if (loading) {
		return (
			<div className="flex min-h-screen w-full flex-col text-zinc-900">
				<Header />
				<NavBar />
				<main className="mx-auto flex w-full max-w-[78rem] flex-1 items-center justify-center px-[1rem] py-[4rem] sm:px-[1.5rem] lg:px-[2rem]">
					<div className="flex flex-col items-center gap-[0.7rem]">
						<Loader2 className="h-[2.2rem] w-[2.2rem] animate-spin text-brand-600" />
						<p className="text-[0.86rem] text-zinc-600">Montando seu checkout...</p>
					</div>
				</main>
				<Footer />
			</div>
		);
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

			<main className="mx-auto w-full max-w-[78rem] flex-1 px-[1rem] py-[1.3rem] sm:px-[1.5rem] lg:px-[2rem] lg:py-[1.75rem]">
				<div className="mb-[1.2rem] flex flex-wrap items-center justify-between gap-[0.75rem]">
					<div className="flex items-center gap-[0.65rem]">
						<span className="inline-flex h-[2.45rem] w-[2.45rem] items-center justify-center rounded-[0.85rem] bg-brand-600 text-white shadow-[0_0.75rem_1.5rem_rgba(185,71,15,0.26)]">
							<ReceiptText className="h-[1.1rem] w-[1.1rem]" />
						</span>
						<h1 className="font-brand text-[2rem] leading-none text-zinc-900">Checkout</h1>
					</div>
					<button
						onClick={() => navigate("/carrinho")}
						className="inline-flex h-[2.65rem] items-center gap-[0.45rem] rounded-[0.85rem] border border-orange-200 bg-white px-[0.9rem] text-[0.82rem] font-semibold text-zinc-700 transition-all hover:border-brand-300 hover:bg-brand-50 cursor-pointer"
					>
						<ArrowLeft className="h-[0.85rem] w-[0.85rem]" />
						Voltar ao carrinho
					</button>
				</div>

				{erro && (
					<div className="mb-[1rem] flex items-center gap-[0.55rem] rounded-[0.95rem] border border-red-300 bg-red-50 px-[0.9rem] py-[0.75rem] text-red-700">
						<AlertCircle className="h-[1rem] w-[1rem] shrink-0" />
						<p className="text-[0.82rem] font-medium">{erro}</p>
					</div>
				)}

				{!erro && cartItems.length === 0 ? (
					<div className="flex flex-col items-center justify-center rounded-[1.6rem] border border-orange-200 bg-white/88 p-[1.4rem] py-[3.2rem] text-center shadow-[0_1rem_2rem_rgba(194,65,12,0.12)]">
						<CircleCheckBig className="mb-[0.7rem] h-[2.2rem] w-[2.2rem] text-brand-500" />
						<h2 className="mb-[0.35rem] text-[1.5rem] font-bold text-zinc-900">Seu carrinho esta vazio</h2>
						<p className="mb-[1.15rem] max-w-[24rem] text-[0.86rem] text-zinc-600">
							Adicione itens no cardapio para continuar com o checkout.
						</p>
						<button
							onClick={() => navigate("/cardapio")}
							className="inline-flex h-[3rem] items-center justify-center rounded-[0.95rem] bg-brand-600 px-[1.2rem] text-[0.86rem] font-bold text-white transition-all hover:-translate-y-[0.04rem] hover:bg-brand-700 cursor-pointer"
						>
							Ver Cardapio
						</button>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-[1rem] xl:grid-cols-3">
						<section className="flex flex-col gap-[0.7rem] xl:col-span-2">
							<h2 className="text-[1.02rem] font-bold text-zinc-900">Itens do pedido</h2>

							{cartItems.map((item) => (
								<CheckoutItem
									key={item.id || `${item.cardapioId}-${item.nome || item.cardapio?.nome || "Item"}`}
									item={item}
								/>
							))}
						</section>

						<PagamentoResumo
							formasPagamento={FORMAS_PAGAMENTO}
							formaPagamento={formaPagamento}
							onFormaPagamentoChange={setFormaPagamento}
							totalItens={totalItens}
							total={total}
							finalizando={finalizando}
							checkoutDisabled={cartItems.length === 0}
							onFinalizar={finalizarCheckout}
						/>
					</div>
				)}
			</main>

			<Footer />
		</div>
	);
}
