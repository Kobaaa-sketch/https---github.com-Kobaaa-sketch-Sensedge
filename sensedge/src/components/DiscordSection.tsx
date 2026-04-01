import { useLanguage } from "@/lib/language-context";
import { Users, MessageSquare, Bell, Zap } from "lucide-react";

export default function DiscordSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-[#07071a] py-24 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[500px] h-[500px] rounded-full bg-[#5865F2]/5 blur-[80px]" />
          </div>

          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#5865F2]/20 border border-[#5865F2]/30 mb-8 shadow-xl shadow-[#5865F2]/20">
            <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current text-[#5865F2]">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.042.032.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
          </div>

          <h2 className="relative text-4xl sm:text-5xl font-black text-white mb-4">
            {t("discord_title")}
          </h2>
          <p className="relative text-gray-400 text-lg mb-10 max-w-xl mx-auto">
            {t("discord_subtitle")}
          </p>

          <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 max-w-2xl mx-auto">
            {[
              { icon: Users, label: "Communauté", value: "Entraide" },
              { icon: Bell, label: "Alertes", value: "Temps réel" },
              { icon: MessageSquare, label: "Support", value: "24/7" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-[#0d0d20] border border-violet-900/20 rounded-xl p-4 flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#5865F2]/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-[#5865F2]" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-gray-500">{label}</div>
                  <div className="text-sm font-semibold text-white">{value}</div>
                </div>
              </div>
            ))}
          </div>

          <a
            href="https://discord.gg/xjz9vw4G"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center gap-3 px-10 py-4 bg-[#5865F2] hover:bg-[#4752c4] text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-[#5865F2]/30 hover:shadow-[#5865F2]/50 hover:scale-105 text-lg"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057c.002.022.015.042.032.056a19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
            </svg>
            {t("discord_btn")}
          </a>
        </div>
      </div>
    </section>
  );
}
