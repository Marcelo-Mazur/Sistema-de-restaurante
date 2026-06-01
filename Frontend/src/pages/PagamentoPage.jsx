import { useEffect, useMemo, useState } from "react";
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

import api from "../services/api";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Notification from "../components/Notification";

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

	const [cartItems, setCartItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [erro, setErro] = useState("");
	const [formaPagamento, setFormaPagamento] = useState(2);
	const [finalizando, setFinalizando] = useState(false);
	const [notification, setNotification] = useState({ message: "", type: "success" });

	const total = useMemo(() => {
		return cartItems.reduce((acc, item) => {
			const preco = Number(item.cardapio?.preco ?? item.preco ?? item.precoUnitario ?? 0);
			const quantidade = Number(item.quantidade ?? 0);
			return acc + preco * quantidade;
		}, 0);
	}, [cartItems]);

	const totalItens = useMemo(() => {
		return cartItems.reduce((acc, item) => acc + Number(item.quantidade ?? 0), 0);
	}, [cartItems]);

	useEffect(() => {
		carregarCarrinho();
	}, [navigate]);

	async function carregarCarrinho() {
		const userId = localStorage.getItem("usuarioId");
		const token = localStorage.getItem("tokenSessao");

		if (!token || !userId) {
			navigate("/login");
			return;
		}

		try {
			setLoading(true);
			setErro("");

			const response = await api.get(`api/pedidos/carrinho/${userId}`);
			const itens = response.data?.itens || response.data?.Itens || [];
			setCartItems(itens);
		} catch (error) {
			if (error.response?.status === 404) {
				setCartItems([]);
			} else {
				setErro("Nao foi possivel carregar os itens do checkout.");
			}
		} finally {
			setLoading(false);
		}
	}

	async function finalizarCheckout() {
		const userId = localStorage.getItem("usuarioId");
		const token = localStorage.getItem("tokenSessao");

		if (!token || !userId) {
			navigate("/login");
			return;
		}

		if (cartItems.length === 0 || finalizando) {
			return;
		}

		try {
			setFinalizando(true);
			setErro("");

			const finalizacao = await api.post(`api/pedidos/carrinho/${userId}/finalizar`);
			const pedidoId = finalizacao.data?.pedidoId ?? finalizacao.data?.PedidoId;

			if (!pedidoId) {
				throw new Error("Pedido finalizado sem identificador de pedido.");
			}

			await api.post("api/pagamentos", {
				pedidoId,
				forma: formaPagamento,
			});

			setNotification({
				message: "Pagamento confirmado! Seu pedido foi para preparo.",
				type: "success",
			});

			window.dispatchEvent(new Event("cartUpdated"));
			setTimeout(() => navigate("/pedidos"), 1000);
		} catch (error) {
			const mensagemApi =
				typeof error.response?.data === "string"
					? error.response.data
					: error.response?.data?.mensagem;

			setNotification({
				message: mensagemApi || "Nao foi possivel concluir o pagamento.",
				type: "error",
			});
		} finally {
			setFinalizando(false);
		}
	}

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
				onClose={() => setNotification({ message: "", type: "success" })}
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

							{cartItems.map((item) => {
								const nome = item.cardapio?.nome || item.nome || "Item";
								const preco = Number(item.cardapio?.preco ?? item.preco ?? item.precoUnitario ?? 0);
								const quantidade = Number(item.quantidade ?? 0);

								return (
									<article
										key={item.id || `${item.cardapioId}-${nome}`}
										className="flex items-center justify-between gap-[0.75rem] rounded-[1.15rem] border border-orange-200 bg-white/92 p-[0.95rem] shadow-[0_0.75rem_1.4rem_rgba(194,65,12,0.1)]"
									>
										<div>
											<h3 className="font-bold text-zinc-900">{nome}</h3>
											<p className="mt-[0.15rem] text-[0.78rem] text-zinc-600">
												{quantidade} x R$ {preco.toFixed(2)}
											</p>
										</div>
										<strong className="text-[1.1rem] text-brand-700">
											R$ {(preco * quantidade).toFixed(2)}
										</strong>
									</article>
								);
							})}
						</section>

						<aside className="sticky top-[1rem] h-fit rounded-[1.5rem] border border-orange-200 bg-white/90 p-[1.2rem] shadow-[0_1rem_1.8rem_rgba(194,65,12,0.13)]">
							<h2 className="mb-[0.95rem] text-[1.2rem] font-bold text-zinc-900">Pagamento</h2>

							<div className="mb-[1rem] space-y-[0.55rem]">
								{FORMAS_PAGAMENTO.map((forma) => {
									const Icone = forma.icone;
									const selecionada = forma.id === formaPagamento;

									return (
										<label
											key={forma.id}
											className={`flex cursor-pointer items-center gap-[0.65rem] rounded-[0.9rem] border p-[0.65rem] transition-all ${
												selecionada
													? "border-brand-500 bg-brand-50"
													: "border-orange-200 bg-white hover:border-brand-300"
											}`}
										>
											<input
												type="radio"
												name="formaPagamento"
												value={forma.id}
												checked={selecionada}
												onChange={() => setFormaPagamento(forma.id)}
												className="accent-brand-600"
											/>
											<Icone className="h-[1rem] w-[1rem] text-zinc-700" />
											<div>
												<p className="text-[0.78rem] font-bold text-zinc-800">{forma.titulo}</p>
												<p className="text-[0.72rem] text-zinc-600">{forma.descricao}</p>
											</div>
										</label>
									);
								})}
							</div>

							<div className="mb-[1rem] space-y-[0.6rem] border-t border-orange-200 pt-[0.8rem]">
								<div className="flex justify-between text-[0.83rem] text-zinc-600">
									<span>Itens</span>
									<span>{totalItens}</span>
								</div>
								<div className="flex justify-between text-[0.83rem] text-zinc-600">
									<span>Entrega</span>
									<span className="text-emerald-700">Gratis</span>
								</div>
								<div className="flex items-center justify-between pt-[0.2rem]">
									<span className="font-bold text-zinc-900">Total</span>
									<span className="text-[1.85rem] font-bold text-brand-700">R$ {total.toFixed(2)}</span>
								</div>
							</div>

							<button
								onClick={finalizarCheckout}
								disabled={finalizando || cartItems.length === 0}
								className="flex h-[3rem] w-full items-center justify-center gap-[0.45rem] rounded-[0.95rem] bg-brand-600 text-[0.88rem] font-bold text-white transition-all hover:-translate-y-[0.04rem] hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:text-zinc-500 cursor-pointer"
							>
								{finalizando ? (
									<>
										<Loader2 className="h-[0.95rem] w-[0.95rem] animate-spin" />
										Processando pagamento...
									</>
								) : (
									"Confirmar e pagar"
								)}
							</button>
						</aside>
					</div>
				)}
			</main>

			<Footer />
		</div>
	);
}
