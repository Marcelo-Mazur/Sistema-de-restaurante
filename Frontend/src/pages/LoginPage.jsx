import { useState } from "react";
import { ArrowRight, LockKeyhole, Mail, UtensilsCrossed } from "lucide-react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { useNavigate } from 'react-router-dom';
import { useAuthForm } from "../hooks/useAuthForm";

export default function Login() {
    const navigate = useNavigate();
    const { feedback, submitting, login } = useAuthForm();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function addInfo(e) {
        e.preventDefault();
        await login({ email, senha: password });
    }


    return (
        <div className="min-h-screen w-full text-zinc-900 flex flex-col">
            <Header />
            <NavBar />

            <main className="mx-auto w-full max-w-[78rem] flex-1 px-[1rem] py-[1.5rem] sm:px-[1.5rem] lg:px-[2rem] lg:py-[2.25rem]">
                <section className="grid items-stretch gap-[1rem] lg:grid-cols-[1.08fr_1fr]">
                    <article className="relative hidden overflow-hidden rounded-[2rem] border border-orange-300/70 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500 p-[2rem] text-white shadow-warm lg:flex lg:flex-col lg:justify-between">
                        <div className="pointer-events-none absolute -top-[4rem] right-[-3rem] h-[12rem] w-[12rem] rounded-full bg-white/10 blur-3xl" />
                        <div className="pointer-events-none absolute bottom-[-4rem] left-[-2rem] h-[10rem] w-[10rem] rounded-full bg-amber-200/30 blur-3xl" />

                        <div className="relative z-10 flex items-center gap-[0.8rem]">
                            <div className="flex h-[2.75rem] w-[2.75rem] items-center justify-center rounded-[0.9rem] bg-white/20">
                                <UtensilsCrossed className="h-[1.2rem] w-[1.2rem]" />
                            </div>
                            <p className="font-brand text-[1.5rem] leading-none">Sabor de Dev</p>
                        </div>

                        <div className="relative z-10 max-w-[28rem] space-y-[0.8rem]">
                            <h1 className="font-brand text-[3rem] leading-[0.94]">
                                Sua fome esta em boas maos.
                            </h1>
                            <p className="text-[0.95rem] leading-relaxed text-orange-50/95">
                                Entre para montar pedidos em segundos, acompanhar entregas e salvar seus pratos favoritos.
                            </p>
                        </div>

                        <p className="relative z-10 text-[0.78rem] uppercase tracking-[0.18em] text-orange-100/90">
                            cardapio dinamico • checkout simples • pedidos em tempo real
                        </p>
                    </article>

                    <article className="rounded-[2rem] border border-orange-200/70 bg-white/86 p-[1.25rem] shadow-warm backdrop-blur-sm sm:p-[2rem] lg:p-[2.5rem]">
                        <div className="mb-[1.5rem] space-y-[0.45rem]">
                            <p className="text-[0.75rem] uppercase tracking-[0.16em] text-zinc-500">Acesso a sua conta</p>
                            <h2 className="font-brand text-[2.6rem] leading-[0.9] text-zinc-900">Login</h2>
                            <p className="text-[0.9rem] text-zinc-600">
                                Use seu email e senha para continuar seu pedido.
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
                                <span className="text-[0.83rem] font-semibold text-zinc-700">Email</span>
                                <span className="relative block">
                                    <Mail className="pointer-events-none absolute left-[0.9rem] top-1/2 h-[1rem] w-[1rem] -translate-y-1/2 text-zinc-400" />
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
                                        autoComplete="current-password"
                                        required
                                        className="h-[3.15rem] w-full rounded-[0.95rem] border border-orange-200 bg-white pl-[2.7rem] pr-[0.9rem] text-[0.95rem] text-zinc-800 outline-none transition-all placeholder:text-zinc-400 focus:border-brand-400 focus:ring-[0.2rem] focus:ring-brand-100"
                                        placeholder="Digite sua senha"
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
                                {submitting ? 'Entrando...' : 'Entrar agora'}
                                <ArrowRight className="h-[1rem] w-[1rem]" />
                            </button>
                        </form>

                        <button
                            onClick={() => navigate('/cadastrar')}
                            className="mt-[0.9rem] inline-flex h-[3rem] w-full items-center justify-center rounded-[1rem] border border-orange-200 bg-white text-[0.88rem] font-semibold text-zinc-700 transition-all hover:border-brand-300 hover:bg-brand-50 cursor-pointer"
                        >
                            Criar conta
                        </button>
                    </article>
                </section>
            </main>

            <Footer />
        </div>
    );
}
