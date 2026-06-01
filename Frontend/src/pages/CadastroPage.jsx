import { useNavigate } from "react-router-dom";
import { ArrowRight, AtSign, LockKeyhole, Sparkles, UserRound } from "lucide-react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import axios from "axios";
import { useState } from "react";


export default function Cadastro() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [password, setPassword] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [feedback, setFeedback] = useState({ message: "", type: "success" });

    async function addInfo(e) {
        e.preventDefault();
        setFeedback({ message: "", type: "success" });

        if (submitting) {
            return;
        }

        const apiUrl = `${import.meta.env.VITE_API_URL}api/auth/cadastro`;
        const body = {
            email: email,
            nome: nome,
            senha: password
        };

        try {
            setSubmitting(true);
            const response = await axios.post(apiUrl, body);

            const tokenDaApi = response.data.token;
            localStorage.setItem('tokenSessao', tokenDaApi);

            const idDoUsuario = response.data.id || response.data.usuarioId;
            if (idDoUsuario) {
                localStorage.setItem('usuarioId', idDoUsuario);
            }

            setFeedback({ message: "Conta criada com sucesso! Redirecionando...", type: "success" });
            setTimeout(() => navigate('/cardapio'), 700);
        } catch (err) {
            const mensagemErro =
                typeof err.response?.data === "string"
                    ? err.response.data
                    : err.response?.data?.mensagem || "Nao foi possivel concluir seu cadastro.";

            setFeedback({ message: mensagemErro, type: "error" });
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen w-full text-zinc-900 flex flex-col">
            <Header />
            <NavBar />

            <main className="mx-auto w-full max-w-[78rem] flex-1 px-[1rem] py-[1.5rem] sm:px-[1.5rem] lg:px-[2rem] lg:py-[2.25rem]">
                <section className="grid items-stretch gap-[1rem] lg:grid-cols-[1fr_1.08fr]">
                    <article className="order-2 rounded-[2rem] border border-orange-200/70 bg-white/86 p-[1.25rem] shadow-warm backdrop-blur-sm sm:p-[2rem] lg:order-1 lg:p-[2.5rem]">
                        <div className="mb-[1.5rem] space-y-[0.45rem]">
                            <p className="text-[0.75rem] uppercase tracking-[0.16em] text-zinc-500">Novo cadastro</p>
                            <h2 className="font-brand text-[2.4rem] leading-[0.92] text-zinc-900">Crie sua conta</h2>
                            <p className="text-[0.9rem] text-zinc-600">
                                Em menos de 1 minuto voce ja pode montar pedidos completos.
                            </p>
                        </div>

                        {feedback.message && (
                            <div
                                className={`mb-[1rem] rounded-[0.9rem] border px-[0.9rem] py-[0.75rem] text-[0.82rem] font-medium ${
                                    feedback.type === 'error'
                                        ? 'border-red-300 bg-red-50 text-red-700'
                                        : 'border-emerald-300 bg-emerald-50 text-emerald-700'
                                }`}
                            >
                                {feedback.message}
                            </div>
                        )}

                        <form onSubmit={addInfo} className="space-y-[1rem]">
                            <label className="block space-y-[0.45rem]">
                                <span className="text-[0.83rem] font-semibold text-zinc-700">Nome</span>
                                <span className="relative block">
                                    <UserRound className="pointer-events-none absolute left-[0.9rem] top-1/2 h-[1rem] w-[1rem] -translate-y-1/2 text-zinc-400" />
                                    <input
                                        type="text"
                                        autoComplete="name"
                                        required
                                        className="h-[3.15rem] w-full rounded-[0.95rem] border border-orange-200 bg-white pl-[2.7rem] pr-[0.9rem] text-[0.95rem] text-zinc-800 outline-none transition-all placeholder:text-zinc-400 focus:border-brand-400 focus:ring-[0.2rem] focus:ring-brand-100"
                                        placeholder="Seu nome completo"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                </span>
                            </label>

                            <label className="block space-y-[0.45rem]">
                                <span className="text-[0.83rem] font-semibold text-zinc-700">Email</span>
                                <span className="relative block">
                                    <AtSign className="pointer-events-none absolute left-[0.9rem] top-1/2 h-[1rem] w-[1rem] -translate-y-1/2 text-zinc-400" />
                                    <input
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="h-[3.15rem] w-full rounded-[0.95rem] border border-orange-200 bg-white pl-[2.7rem] pr-[0.9rem] text-[0.95rem] text-zinc-800 outline-none transition-all placeholder:text-zinc-400 focus:border-brand-400 focus:ring-[0.2rem] focus:ring-brand-100"
                                        placeholder="voce@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </span>
                            </label>

                            <label className="block space-y-[0.45rem]">
                                <span className="text-[0.83rem] font-semibold text-zinc-700">Senha</span>
                                <span className="relative block">
                                    <LockKeyhole className="pointer-events-none absolute left-[0.9rem] top-1/2 h-[1rem] w-[1rem] -translate-y-1/2 text-zinc-400" />
                                    <input
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        className="h-[3.15rem] w-full rounded-[0.95rem] border border-orange-200 bg-white pl-[2.7rem] pr-[0.9rem] text-[0.95rem] text-zinc-800 outline-none transition-all placeholder:text-zinc-400 focus:border-brand-400 focus:ring-[0.2rem] focus:ring-brand-100"
                                        placeholder="Escolha uma senha"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </span>
                            </label>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="mt-[0.5rem] inline-flex h-[3.25rem] w-full items-center justify-center gap-[0.55rem] rounded-[1rem] bg-brand-600 text-[0.92rem] font-semibold text-white transition-all hover:-translate-y-[0.04rem] hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {submitting ? 'Criando conta...' : 'Finalizar cadastro'}
                                <ArrowRight className="h-[1rem] w-[1rem]" />
                            </button>
                        </form>

                        <button
                            onClick={() => navigate('/login')}
                            className="mt-[0.9rem] inline-flex h-[3rem] w-full items-center justify-center rounded-[1rem] border border-orange-200 bg-white text-[0.88rem] font-semibold text-zinc-700 transition-all hover:border-brand-300 hover:bg-brand-50 cursor-pointer"
                        >
                            Ja tenho conta
                        </button>
                    </article>

                    <article className="relative order-1 hidden overflow-hidden rounded-[2rem] border border-orange-300/70 bg-gradient-to-br from-sand-500 via-spice-500 to-brand-700 p-[2rem] text-white shadow-warm lg:order-2 lg:flex lg:flex-col gap-[3.5rem] lg:p-[2.5rem]">
                        <div className="pointer-events-none absolute -top-[3.5rem] right-[-2.6rem] h-[11rem] w-[11rem] rounded-full bg-white/20 blur-3xl" />
                        <div className="pointer-events-none absolute bottom-[-4rem] left-[-2rem] h-[10rem] w-[10rem] rounded-full bg-amber-200/35 blur-3xl" />

                        <div className="relative z-10 inline-flex w-fit items-center gap-[0.5rem] rounded-[999rem] border border-white/30 bg-white/15 px-[0.8rem] py-[0.45rem] text-[0.8rem] font-medium">
                            <Sparkles className="h-[0.95rem] w-[0.95rem]" />
                            Cadastro rapido
                        </div>

                        <div className="relative z-10 max-w-[27rem] space-y-[0.8rem]">
                            <h3 className="font-brand text-[2.85rem] leading-[0.92]">
                                Pronto para experimentar o melhor do cardapio?
                            </h3>
                            <p className="text-[0.94rem] leading-relaxed text-orange-50/95">
                                Crie sua conta e acompanhe cada etapa do pedido, do preparo ate a entrega.
                            </p>
                        </div>
                    </article>
                </section>
            </main>

            <Footer />
        </div>
    );
}