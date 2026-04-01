import { useLanguage } from "@/lib/language-context";
import { Activity, Bell, BarChart3, Layers, Shield, Lock } from "lucide-react";

const featureIcons = [Activity, Bell, BarChart3, Layers, Shield, Lock];

export default function FeaturesSection() {
  const { t } = useLanguage();

  const features = [
    {
      titleKey: "feature_realtime_title" as const,
      descKey: "feature_realtime_desc" as const,
      icon: Activity,
      gradient: "from-violet-500 to-purple-600",
      glow: "shadow-violet-900/50",
    },
    {
      titleKey: "feature_alerts_title" as const,
      descKey: "feature_alerts_desc" as const,
      icon: Bell,
      gradient: "from-fuchsia-500 to-violet-600",
      glow: "shadow-fuchsia-900/50",
    },
    {
      titleKey: "feature_reports_title" as const,
      descKey: "feature_reports_desc" as const,
      icon: BarChart3,
      gradient: "from-purple-500 to-indigo-600",
      glow: "shadow-purple-900/50",
    },
    {
      titleKey: "feature_multi_title" as const,
      descKey: "feature_multi_desc" as const,
      icon: Layers,
      gradient: "from-indigo-500 to-violet-600",
      glow: "shadow-indigo-900/50",
    },
    {
      titleKey: "feature_sla_title" as const,
      descKey: "feature_sla_desc" as const,
      icon: Shield,
      gradient: "from-violet-600 to-fuchsia-600",
      glow: "shadow-violet-900/50",
    },
    {
      titleKey: "feature_security_title" as const,
      descKey: "feature_security_desc" as const,
      icon: Lock,
      gradient: "from-purple-600 to-violet-700",
      glow: "shadow-purple-900/50",
    },
  ];

  return (
    <section className="min-h-screen py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            {t("features_title")}
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            {t("features_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="group relative bg-[#0d0d20] border border-violet-900/20 rounded-2xl p-6 hover:border-violet-700/40 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-violet-900/10 to-transparent" />
                <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 shadow-lg ${feature.glow}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="relative text-white font-bold text-lg mb-3 group-hover:text-violet-200 transition-colors">
                  {t(feature.titleKey)}
                </h3>
                <p className="relative text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">
                  {t(feature.descKey)}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { value: "99.99%", label: "SLA garanti" },
            { value: "<50ms", label: "Latence API" },
            { value: "24/7", label: "Surveillance" },
            { value: "4", label: "Langues" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#0d0d20] border border-violet-900/20 rounded-2xl p-6 text-center hover:border-violet-700/30 transition-all"
            >
              <div className="text-3xl font-black bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
