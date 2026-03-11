import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X } from "lucide-react";
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
      <footer className="bg-foreground text-primary-foreground py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <BookOpen className="w-3 h-3 text-white" />
            </div>
            <span className="font-display font-bold text-white">
              Equal Access Learning
            </span>
          </div>
          <p className="text-sm text-white/60 mb-3">
            Every student deserves a fair start.
          </p>
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()}. Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white/70 transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
