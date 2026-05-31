import { Check, AlertCircle, X } from "lucide-react";

const STYLES = {
  success: "bg-emerald-950/90 border-emerald-500/40 text-emerald-300",
  error:   "bg-red-950/90 border-red-500/40 text-red-300",
};

const ICONS = {
  success: <Check        className="w-4 h-4 shrink-0 text-emerald-400" />,
  error:   <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />,
};


export default function Notification({ message, type, onClose }) {
  if (!message) return null;

  return (
    <div
      className={`
        fixed top-20 right-4 z-[60]
        flex items-center gap-3 px-4 py-3
        rounded-2xl border shadow-2xl backdrop-blur-xl
        max-w-xs animate-in slide-in-from-right-4
        ${STYLES[type]}
      `}
    >
      {ICONS[type]}
      <span className="text-sm font-medium flex-1">{message}</span>
      <button
        onClick={onClose}
        className="opacity-50 hover:opacity-100 transition-opacity ml-1 cursor-pointer"
        aria-label="Fechar notificação"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}