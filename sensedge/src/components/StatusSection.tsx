import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { CheckCircle2, AlertTriangle, XCircle, RefreshCw, Clock } from "lucide-react";
import { gameCategories, CheatStatus } from "@/lib/products-data";

type OverallStatus = "operational" | "degraded" | "outage";

function StatusDot({ status }: { status: CheatStatus }) {
  const config: Record<CheatStatus, { className: string; animate: string }> = {
    UNDETECTED: { className: "bg-emerald-400", animate: "animate-pulse" },
    SAFE: { className: "bg-emerald-400", animate: "animate-pulse" },
    UPDATING: { className: "bg-amber-400", animate: "animate-pulse" },
    DOWN: { className: "bg-red-400", animate: "" },
    UNKNOWN: { className: "bg-slate-400", animate: "" },
  };
  const c = config[status];
  return <span className={`inline-block w-2.5 h-2.5 rounded-full flex-shrink-0 ${c.className} ${c.animate}`} />;
}

function CheatStatusBadge({ status }: { status: CheatStatus }) {
  const config: Record<CheatStatus, { label: string; color: string; bg: string; border: string }> = {
    UNDETECTED: { label: "UNDETECTED", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
    SAFE: { label: "ACTIF & SAFE", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/20" },
    UPDATING: { label: "UPDATING", color: "text-amber-400", bg: "bg-amber-400/10", border: "border-amber-400/20" },
    DOWN: { label: "DOWN", color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20" },
    UNKNOWN: { label: "UNKNOWN", color: "text-slate-400", bg: "bg-slate-400/10", border: "border-slate-400/20" },
  };
  const c = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${c.color} ${c.bg} ${c.border}`}>
      <StatusDot status={status} />
      {c.label}
    </span>
  );
}

function getOverallStatus(statuses: CheatStatus[]): OverallStatus {
  if (statuses.some((s) => s === "DOWN")) return "outage";
  if (statuses.some((s) => s === "UPDATING" || s === "UNKNOWN")) return "degraded";
  return "operational";
}

export default function StatusSection() {
  const { t, lang } = useLanguage();
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const allStatuses = gameCategories.flatMap((g) => g.products.map((p) => p.status));
  const overallStatus = getOverallStatus(allStatuses);

  const operational = allStatuses.filter((s) => s === "UNDETECTED" || s === "SAFE").length;
  const updating = allStatuses.filter((s) => s === "UPDATING").length;
  const down = allStatuses.filter((s) => s === "DOWN").length;
  const total = allStatuses.length;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastUpdated(new Date());
      setIsRefreshing(false);
    }, 1200);
  };

  useEffect(() => {
    const interval = setInterval(() => setLastUpdated(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString(lang === "de" ? "de-DE" : lang === "es" ? "es-ES" : lang === "fr" ? "fr-FR" : "en-US", {
      hour: "2-digit", minute: "2-digit", second: "2-digit",
    });

  return (
    <section className="min-h-screen py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">{t("status_title")}</h2>
          <p className="text-gray-400 text-lg mb-8">{t("status_subtitle")}</p>

          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl border text-sm font-semibold ${overallStatus === "operational"
              ? "bg-green-500/10 border-green-500/20 text-green-400"
              : overallStatus === "degraded"
                ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}>
            {overallStatus === "operational" ? <CheckCircle2 className="w-5 h-5" /> :
              overallStatus === "degraded" ? <AlertTriangle className="w-5 h-5" /> :
                <XCircle className="w-5 h-5" />}
            {overallStatus === "operational" ? t("status_all_operational") :
              overallStatus === "degraded" ? t("status_degraded") : t("status_outage")}
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#0d0d20] border border-emerald-500/20 rounded-2xl p-4 text-center">
            <div className="text-2xl font-black text-emerald-400">{operational}</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">UNDETECTED</div>
          </div>
          <div className="bg-[#0d0d20] border border-amber-500/20 rounded-2xl p-4 text-center">
            <div className="text-2xl font-black text-amber-400">{updating}</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">UPDATING</div>
          </div>
          <div className="bg-[#0d0d20] border border-red-500/20 rounded-2xl p-4 text-center">
            <div className="text-2xl font-black text-red-400">{down}</div>
            <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">DOWN</div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4 px-1">
          <p className="text-sm text-gray-500">
            {t("status_last_updated")}: <span className="text-violet-400 font-mono">{formatTime(lastUpdated)}</span>
          </p>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-violet-400 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin text-violet-400" : ""}`} />
            {isRefreshing ? "..." : "Refresh"}
          </button>
        </div>

        {/* Game status grid */}
        <div className="space-y-3">
          {gameCategories.map((game) => {
            const gameStatuses = game.products.map((p) => p.status);
            const gameOverall = getOverallStatus(gameStatuses);
            const allUndetected = gameStatuses.every((s) => s === "UNDETECTED" || s === "SAFE");

            return (
              <div
                key={game.id}
                className="bg-[#0d0d20] border border-violet-900/20 rounded-2xl overflow-hidden hover:border-violet-700/30 transition-all group"
              >
                {/* Game header */}
                <div className="flex items-center gap-4 p-4 border-b border-violet-900/10">
                  <div className="w-10 h-10 rounded-xl overflow-hidden bg-gray-800 flex-shrink-0">
                    <img src={game.coverImage} alt={game.name} className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-bold text-sm group-hover:text-violet-200 transition-colors">{game.name}</h3>
                    <p className="text-xs text-gray-500">{game.products.length} {t("products_count")}</p>
                  </div>
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${gameOverall === "operational" ? "bg-emerald-400/10 text-emerald-400" :
                      gameOverall === "degraded" ? "bg-amber-400/10 text-amber-400" :
                        "bg-red-400/10 text-red-400"
                    }`}>
                    {allUndetected && <CheckCircle2 className="w-3.5 h-3.5" />}
                    {gameOverall === "operational" ? "✓ All OK" :
                      gameOverall === "degraded" ? "⚠ Partial" : "✗ Down"}
                  </div>
                </div>

                {/* Products */}
                <div className="divide-y divide-violet-900/10">
                  {game.products.map((product) => (
                    <a
                      key={product.id}
                      href={product.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-3 hover:bg-violet-900/5 transition-colors group/row"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <StatusDot status={product.status} />
                        <span className="text-sm text-gray-300 group-hover/row:text-white transition-colors truncate">
                          {product.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-sm font-bold text-violet-300">{product.price}</span>
                        <CheatStatusBadge status={product.status} />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Last updated note */}
        <div className="mt-8 text-center text-xs text-gray-600 flex items-center justify-center gap-2">
          <Clock className="w-3.5 h-3.5" />
          Les statuts sont mis à jour en temps réel depuis virtualand.shop
        </div>
      </div>
    </section>
  );
}
