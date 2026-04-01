import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { gameCategories, CheatStatus, CheatProduct } from "@/lib/products-data";
import { ShoppingCart, ExternalLink } from "lucide-react";
import CheckoutModal from "./CheckoutModal";

function StatusBadge({ status }: { status: CheatStatus }) {
  const config: Record<CheatStatus, { label: string; color: string; bg: string; dot: string }> = {
    UNDETECTED: { label: "UNDETECTED", color: "#34d399", bg: "#34d39918", dot: "bg-emerald-400" },
    SAFE: { label: "ACTIF & SAFE", color: "#34d399", bg: "#34d39918", dot: "bg-emerald-400" },
    UPDATING: { label: "UPDATING", color: "#fbbf24", bg: "#fbbf2418", dot: "bg-amber-400" },
    DOWN: { label: "DOWN", color: "#f87171", bg: "#f8717118", dot: "bg-red-400" },
    UNKNOWN: { label: "UNKNOWN", color: "#94a3b8", bg: "#94a3b818", dot: "bg-slate-400" },
  };
  const c = config[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest border"
      style={{ color: c.color, backgroundColor: c.bg, borderColor: `${c.color}30`, fontFamily: "'Orbitron', sans-serif" }}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot} animate-pulse`} />
      {c.label}
    </span>
  );
}

export default function ProductsSection() {
  const { t } = useLanguage();
  const [activeGame, setActiveGame] = useState(gameCategories[0].id);
  const [checkoutProduct, setCheckoutProduct] = useState<CheatProduct | null>(null);

  const currentGame = gameCategories.find((g) => g.id === activeGame) || gameCategories[0];

  return (
    <section className="min-h-screen py-24 px-4 relative overflow-hidden" id="products">
      {/* Cyber grid background */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      {/* Neon glow blobs */}
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-4 tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            ⚡ BOUTIQUE
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            <span className="cyber-text-gradient">{t("products_title")}</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t("products_subtitle")}
          </p>
          <a
            href="https://virtualand.shop/store"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-xs text-cyan-500/70 hover:text-cyan-400 transition-colors"
          >
            {t("products_see_all")}
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="flex gap-6">
          {/* Game sidebar — desktop */}
          <div className="hidden md:flex flex-col gap-1 w-52 flex-shrink-0">
            {gameCategories.map((game) => (
              <button
                key={game.id}
                onClick={() => setActiveGame(game.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-all ${
                  activeGame === game.id
                    ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10"
                    : "text-gray-500 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
                style={{ fontFamily: activeGame === game.id ? "'Orbitron', sans-serif" : undefined }}
              >
                <div className="w-8 h-8 rounded-lg overflow-hidden flex-shrink-0 bg-gray-800">
                  <img src={game.coverImage} alt={game.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <span className="truncate">{game.name}</span>
              </button>
            ))}
          </div>

          {/* Mobile game selector */}
          <div className="md:hidden w-full mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {gameCategories.map((game) => (
                <button
                  key={game.id}
                  onClick={() => setActiveGame(game.id)}
                  className={`flex-shrink-0 flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                    activeGame === game.id
                      ? "bg-cyan-500/10 border border-cyan-500/30"
                      : "bg-[#0d0d20] border border-violet-900/20"
                  }`}
                >
                  <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-800">
                    <img src={game.coverImage} alt={game.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <span className="text-[9px] text-gray-400 whitespace-nowrap">{game.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Products grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0 border border-cyan-500/20">
                <img src={currentGame.coverImage} alt={currentGame.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  {currentGame.name}
                </h3>
                <p className="text-sm text-gray-500">{currentGame.products.length} {t("products_count")}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentGame.products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-[#0a0a1a] border border-violet-900/20 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-cyan-900/20 flex flex-col"
                >
                  {/* Product image */}
                  <div className="relative h-36 overflow-hidden bg-gray-900">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-[#0a0a1a]/20 to-transparent" />
                    <div className="absolute bottom-2 left-2">
                      <StatusBadge status={product.status} />
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <h4 className="text-sm font-semibold text-white mb-3 leading-snug group-hover:text-cyan-200 transition-colors line-clamp-2">
                      {product.title}
                    </h4>

                    {product.variants && (
                      <div className="grid grid-cols-2 gap-1 mb-3">
                        {product.variants.slice(0, 4).map((v) => (
                          <div key={v.label} className="bg-violet-900/10 border border-violet-900/20 rounded-lg p-2 text-center">
                            <div className="text-[8px] text-gray-600 uppercase tracking-widest mb-0.5" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                              {v.label.replace("LICENSE ", "")}
                            </div>
                            <div className="text-xs font-bold text-cyan-300">{v.price}</div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-auto pt-2 border-t border-violet-900/10">
                      <div>
                        <div className="text-[9px] text-gray-600 uppercase tracking-widest" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                          {t("products_from")}
                        </div>
                        <div className="text-base font-black text-cyan-300">{product.price}</div>
                      </div>
                      <button
                        onClick={() => setCheckoutProduct(product)}
                        disabled={product.status === "DOWN"}
                        className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-bold rounded-lg transition-all hover:shadow-lg hover:shadow-cyan-900/40"
                        style={{ fontFamily: "'Orbitron', sans-serif" }}
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        {t("products_buy")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {checkoutProduct && (
        <CheckoutModal
          product={checkoutProduct}
          onClose={() => setCheckoutProduct(null)}
        />
      )}
    </section>
  );
}
