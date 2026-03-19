import { Button } from "@/components/ui/button";
import { BookOpen, Check, Copy, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import AdvocatePage from "./pages/AdvocatePage";
import HomePage from "./pages/HomePage";
import ResourcesPage from "./pages/ResourcesPage";
import SurveyPage from "./pages/SurveyPage";
import TheIssuePage from "./pages/TheIssuePage";
import TriviaPage from "./pages/TriviaPage";

type Page = "home" | "issue" | "survey" | "trivia" | "advocate" | "resources";

const navItems: { id: Page; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "issue", label: "The Issue" },
  { id: "survey", label: "Survey" },
  { id: "trivia", label: "Trivia" },
  { id: "advocate", label: "Advocate" },
  { id: "resources", label: "Resources" },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  function navigate(page: Page) {
    setCurrentPage(page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function renderPage() {
    switch (currentPage) {
      case "home":
        return <HomePage onNavigate={navigate} />;
      case "issue":
        return <TheIssuePage />;
      case "survey":
        return <SurveyPage onNavigate={navigate} />;
      case "trivia":
        return <TriviaPage />;
      case "advocate":
        return <AdvocatePage />;
      case "resources":
        return <ResourcesPage />;
    }
  }

  const siteUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://equalaccess.app";

  // Google Charts QR API
  const qrSrc = `https://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=${encodeURIComponent(siteUrl)}&chco=7f1d1d`;

  async function copyQRCode() {
    try {
      const response = await fetch(qrSrc);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob }),
      ]);
    } catch {
      // fallback: copy URL
      await navigator.clipboard.writeText(siteUrl);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Sticky Nav */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border shadow-xs">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          {/* Logo */}
          <button
            type="button"
            onClick={() => navigate("home")}
            className="flex items-center gap-2 font-display font-bold text-lg text-primary"
            data-ocid="nav.home.link"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="hidden sm:block">Equal Access Learning</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => navigate(item.id)}
                data-ocid={`nav.${item.id}.link`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            data-ocid="nav.mobile.toggle"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border bg-white"
            >
              <nav className="flex flex-col p-4 gap-1">
                {navItems.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => navigate(item.id)}
                    data-ocid={`nav.mobile.${item.id}.link`}
                    className={`px-4 py-3 rounded-lg text-sm font-medium text-left transition-colors ${
                      currentPage === item.id
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground/70 hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-red-900 text-primary-foreground py-10 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-6 h-6 rounded bg-red-700 flex items-center justify-center">
              <BookOpen className="w-3 h-3 text-white" />
            </div>
            <span className="font-display font-bold text-white">
              Equal Access Learning
            </span>
          </div>
          <p className="text-sm text-white/60 mb-6">
            Every student deserves a fair start.
          </p>

          {/* QR Code */}
          <div
            className="flex flex-col items-center gap-3 mb-6"
            data-ocid="footer.card"
          >
            <p className="text-xs text-white/50 uppercase tracking-widest font-medium">
              Scan to share this site
            </p>
            <div className="bg-white rounded-xl p-3 inline-block shadow-lg">
              <img
                src={qrSrc}
                alt="QR code for this site"
                width={100}
                height={100}
                className="block"
              />
            </div>
            <button
              type="button"
              onClick={copyQRCode}
              className="flex items-center gap-2 text-sm font-semibold text-white bg-red-700 hover:bg-red-600 px-5 py-2.5 rounded-full transition-colors shadow"
              data-ocid="footer.toggle"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy QR Code
                </>
              )}
            </button>
          </div>

          {/* Nearly invisible attribution */}
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.07)" }}>
            &copy; {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,0.07)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
