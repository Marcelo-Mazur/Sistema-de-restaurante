export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-orange-300/70 bg-white/75 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[78rem] flex-col items-center justify-between gap-[0.5rem] px-[1rem] py-[1.1rem] text-center text-[0.82rem] text-zinc-600 sm:flex-row sm:px-[1.5rem] lg:px-[2rem]">
        <p>© {currentYear} Sabor de Dev. Todos os direitos reservados.</p>
        <p className="text-zinc-500">Feito com React + Tailwind.</p>
      </div>
    </footer>
  );
}