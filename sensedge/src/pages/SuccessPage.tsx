import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, ShoppingBag, ArrowRight, Home } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function SuccessPage() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, we might fetch session details from the backend
    // For now, we just show a generic success message
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      // Simulate getting an order number or just show the session ID
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06060f] px-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="max-w-md w-full relative z-10 text-center">
        <div className="mb-8 relative inline-block">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl scale-150 animate-pulse" />
          <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-900/50">
            <CheckCircle2 className="w-12 h-12 text-white" />
          </div>
        </div>

        <h1 className="text-4xl font-black text-white mb-4 tracking-tighter" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          COMMANDE <span className="text-cyan-400 uppercase">RÉUSSIE</span>
        </h1>
        
        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
          Merci pour votre achat ! Votre licence et les instructions ont été envoyées à votre adresse email.
        </p>

        <div className="bg-[#0d0d20] border border-violet-900/20 rounded-2xl p-6 mb-8 text-left">
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-violet-900/10">
            <ShoppingBag className="w-5 h-5 text-violet-400" />
            <span className="text-white font-bold text-sm uppercase tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif" }}>Détails de commande</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Statut</span>
              <span className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">Payé</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Livraison</span>
              <span className="text-cyan-400 font-bold">Instantanée</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            <Home className="w-4 h-4" />
            ACCUEIL
          </Link>
          <a
            href="https://discord.gg/xjz9vw4G"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-900/40"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            SUPPORT
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        
        <p className="mt-8 text-xs text-gray-600">
          Un problème ? Contactez-nous sur Discord ou par email à sensedgeoff@gmail.com
        </p>
      </div>
    </div>
  );
}
