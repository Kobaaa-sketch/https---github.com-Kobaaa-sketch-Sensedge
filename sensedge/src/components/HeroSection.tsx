import { useLanguage } from "@/lib/language-context";
import { ChevronDown, ShieldCheck } from "lucide-react";

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-violet-700/10 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-purple-900/15 blur-[80px]" />
        <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-indigo-800/10 blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.5) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-8 backdrop-blur-sm">
          <ShieldCheck className="w-4 h-4" />
          Cheats Premium · Indétectables · Livraison instantanée
        </div>

        <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight neon-flicker" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          <span className="cyber-text-gradient">
            {t("hero_title")}
          </span>
        </h1>

        <p className="text-xl sm:text-2xl font-medium mb-4 max-w-3xl mx-auto text-cyan-100/70" style={{ fontFamily: "'Orbitron', sans-serif", letterSpacing: "0.05em" }}>
          {t("hero_subtitle")}
        </p>

        <p className="text-base sm:text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          {t("hero_desc")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => onNavigate("products")}
            className="group px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-violet-900/50 hover:shadow-violet-700/60 hover:scale-105 flex items-center gap-2"
          >
            🛒 {t("nav_products")}
          </button>
          <button
            onClick={() => onNavigate("status")}
            className="group px-8 py-4 bg-white/5 hover:bg-white/10 border border-violet-900/30 hover:border-violet-700/50 text-white font-semibold rounded-xl transition-all duration-200 flex items-center gap-2"
          >
            {t("hero_status_btn")}
          </button>
          <a
            href="https://discord.gg/xjz9vw4G"
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-[#5865F2]/20 hover:bg-[#5865F2]/30 border border-[#5865F2]/40 hover:border-[#5865F2]/60 text-white font-semibold rounded-xl transition-all duration-200 flex items-center gap-3"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current text-[#5865F2]">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.042.032.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
            {t("hero_discord_btn")}
          </a>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-8 max-w-md mx-auto">
          {[
            { value: "25K+", label: "Sold" },
            { value: "15+", label: "Games" },
            { value: "24/7", label: "Support" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-violet-300">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => onNavigate("products")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600 hover:text-violet-400 transition-colors animate-bounce"
      >
        <ChevronDown className="w-6 h-6" />
      </button>
    </section>
  );
}
