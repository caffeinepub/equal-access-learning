import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/" as const, label: "Home" },
  { to: "/issue" as const, label: "The Issue" },
  { to: "/survey" as const, label: "Survey" },
  { to: "/quiz" as const, label: "Quiz" },
  { to: "/resources" as const, label: "Resources" },
  { to: "/advocate" as const, label: "Advocate" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const routerState = useRouterState();
  const pathname = routerState.location.pathname;

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-2 font-display font-bold text-lg text-brand-red"
            data-ocid="nav.link"
          >
            <BookOpen size={22} className="text-brand-red" />
            Equal Access
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                data-ocid="nav.link"
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  pathname === l.to
                    ? "text-brand-red font-semibold"
                    : "text-gray-600 hover:text-brand-red hover:bg-red-50"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/advocate"
              data-ocid="nav.primary_button"
              className="ml-2 px-4 py-1.5 bg-brand-red text-white rounded-full text-sm font-semibold hover:bg-brand-red-dark transition-colors"
            >
              Take Action
            </Link>
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-gray-600"
            onClick={() => setOpen(!open)}
            data-ocid="nav.toggle"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-ocid="nav.link"
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                pathname === l.to ? "text-brand-red" : "text-gray-700"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
