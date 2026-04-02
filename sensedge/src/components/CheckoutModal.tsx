import { FormEvent, useState } from "react";
import { X, ShieldCheck, Zap, Lock, AlertTriangle, ShoppingCart } from "lucide-react";
import { CheatProduct } from "@/lib/products-data";

const API_BASE = "/api";

interface CheckoutModalProps {
  product: CheatProduct;
  selectedVariant?: { label: string; price: string };
  onClose: () => void;
}

function parsePrice(price: string): number {
  return parseFloat(price.replace("€", "").replace(",", "."));
}


function StripeCheckout({ product, variant, onClose }: {
  product: CheatProduct;
  variant?: { label: string; price: string };
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const price = parsePrice(variant?.price || product.price);

  async function handleCheckout(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) {
      setError("Veuillez renseigner votre adresse email");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/checkout/create-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: price,
          currency: "eur",
          productName: product.title + (variant ? ` - ${variant.label}` : ""),
          productId: product.id,
          clientEmail: email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || data?.error || `Erreur serveur (${response.status})`);
      }

      if (!data.url) {
        throw new Error("Aucune URL de redirection Stripe reçue.");
      }

      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message || "Impossible de contacter le serveur de paiement.");
      setLoading(false);
    }
  }

  if (error === "stripe_not_configured") {
    return (
      <div className="text-center py-10 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8 text-amber-400" />
        </div>
        <h3 className="text-white font-bold text-lg" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          PAIEMENT EN CONFIGURATION
        </h3>
        <p className="text-gray-400 text-sm max-w-xs mx-auto">
          Le système de paiement Stripe n'est pas encore activé. Contactez-nous sur Discord pour commander ce produit.
        </p>
        <a
          href="https://discord.gg/xjz9vw4G"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold rounded-xl transition-all"
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.042.032.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
          </svg>
          Commander sur Discord
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleCheckout} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email" className="text-xs text-gray-500 uppercase tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          Votre adresse email
        </label>
        <div className="relative">
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            placeholder="nom@exemple.fr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#0a0a1a] border border-violet-900/30 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
        <p className="text-[10px] text-gray-600">L'email est requis pour recevoir vos accès après paiement.</p>
      </div>

      {error && !error.includes("stripe_not_configured") && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-cyan-900/40 hover:shadow-cyan-700/50 flex items-center justify-center gap-2 text-base tracking-wide"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            REDIRECTION...
          </>
        ) : (
          <>
            <ShoppingCart className="w-4 h-4" />
            PASSER À LA CAISSE
          </>
        )}
      </button>
    </form>
  );
}


export default function CheckoutModal({ product, selectedVariant, onClose }: CheckoutModalProps) {
  const [variant, setVariant] = useState(selectedVariant || product.variants?.[0]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#08081a] border border-violet-900/30 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Neon top bar */}
        <div className="h-0.5 w-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500" />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs text-cyan-400 font-bold uppercase tracking-widest mb-0.5" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  ACHAT SÉCURISÉ
                </p>
                <h3 className="text-white font-bold text-sm leading-snug line-clamp-2">{product.title}</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-white transition-colors p-1 flex-shrink-0"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Variant selector */}
          {product.variants && product.variants.length > 1 && (
            <div className="mb-6">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                DURÉE DE LICENCE
              </p>
              <div className="grid grid-cols-2 gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.label}
                    onClick={() => setVariant(v)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      variant?.label === v.label
                        ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-300"
                        : "border-violet-900/30 bg-violet-900/5 text-gray-400 hover:border-violet-600/40"
                    }`}
                  >
                    <div className="text-[10px] uppercase tracking-widest mb-1 opacity-70" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      {v.label}
                    </div>
                    <div className="text-base font-black">{v.price}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trust badges */}
          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-violet-900/20">
            {[
              { icon: ShieldCheck, label: "Paiement sécurisé", color: "text-emerald-400" },
              { icon: Zap, label: "Livraison instantanée", color: "text-cyan-400" },
              { icon: Lock, label: "Chiffrement SSL", color: "text-violet-400" },
            ].map(({ icon: Icon, label, color }) => (
              <div key={label} className="flex items-center gap-1.5 flex-1">
                <Icon className={`w-4 h-4 ${color} flex-shrink-0`} />
                <span className="text-[10px] text-gray-500 leading-tight">{label}</span>
              </div>
            ))}
          </div>

          {/* Stripe Checkout */}
          <StripeCheckout product={product} variant={variant} onClose={onClose} />

          {/* Stripe branding */}
          <p className="text-center text-[10px] text-gray-600 mt-4 flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" />
            Paiement sécurisé par Stripe
          </p>
        </div>
      </div>
    </div>
  );
}
