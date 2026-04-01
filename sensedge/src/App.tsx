import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { LanguageProvider } from "@/lib/language-context";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import StatusSection from "@/components/StatusSection";
import DiscordSection from "@/components/DiscordSection";
import Footer from "@/components/Footer";
import LetterGlitch from "@/components/LetterGlitch";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SuccessPage from "@/pages/SuccessPage";

const queryClient = new QueryClient();

function HomePage() {
  const [currentSection, setCurrentSection] = useState("home");
  const { pathname } = useLocation();

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
    if (pathname !== "/") {
      window.location.href = `/#${section}`;
      return;
    }
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar currentSection={currentSection} onNavigate={handleNavigate} />
      <div id="home" onMouseEnter={() => setCurrentSection("home")}>
        <HeroSection onNavigate={handleNavigate} />
      </div>
      <div id="products" onMouseEnter={() => setCurrentSection("products")}>
        <ProductsSection />
      </div>
      <div id="status" onMouseEnter={() => setCurrentSection("status")}>
        <StatusSection />
      </div>
      <DiscordSection />
      <Footer />
    </>
  );
}

function AppContent() {
  return (
    <BrowserRouter>
      <div className="fixed inset-0 z-0">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      </div>
      <div className="relative z-10 min-h-screen text-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/success" element={<SuccessPage />} />
        </Routes>
        <Toaster />
      </div>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

