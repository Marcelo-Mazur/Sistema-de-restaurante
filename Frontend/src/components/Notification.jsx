import { Check, AlertCircle, X } from "lucide-react";

const STYLES = {
  success: "bg-emerald-50/95 border-emerald-300 text-emerald-800",
  error:   "bg-red-50/95 border-red-300 text-red-700",
};

const ICONS = {
  success: <Check className="h-[0.95rem] w-[0.95rem] shrink-0 text-emerald-600" />,
  error:   <AlertCircle className="h-[0.95rem] w-[0.95rem] shrink-0 text-red-600" />,
};


export default function Notification({ message, type, onClose }) {
  if (!message) return null;

  return (
    <div
      className={`
        fixed right-[1rem] top-[7.25rem] z-[60]
        flex max-w-[20rem] items-center gap-[0.65rem]
        rounded-[1rem] border px-[0.85rem] py-[0.75rem]
        shadow-[0_0.9rem_1.8rem_rgba(120,47,18,0.2)] backdrop-blur-sm
        transition-all
        ${STYLES[type]}
      `}
    >
      {ICONS[type]}
      <span className="flex-1 text-[0.8rem] font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-[0.1rem] opacity-50 transition-opacity hover:opacity-100 cursor-pointer"
        aria-label="Fechar notificação"
      >
        <X className="h-[0.8rem] w-[0.8rem]" />
      </button>
    </div>
  );
}