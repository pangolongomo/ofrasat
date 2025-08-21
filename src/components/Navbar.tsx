"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import UserDropdown from "@/components/UserDropdown";

const navigationLinks = [
  {
    href: "/consulting",
    label: "Consulting",
    ariaLabel: "Accéder à la section Consulting",
  },
  {
    href: "/finance",
    label: "Finance",
    ariaLabel: "Accéder à la section Finance",
  },
  {
    href: "/communication",
    label: "Communication",
    ariaLabel: "Accéder à la section Communication",
  },
] as const;

export default function Navbar() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = useCallback((path: string) => pathname === path, [pathname]);
  const toggleMobileMenu = useCallback(
    () => setIsMobileMenuOpen((prev) => !prev),
    []
  );

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-gradient-to-r from-[#060097]/95 via-[#0800b3]/95 to-[#1a0fb8]/95 text-white shadow-2xl border-b border-white/20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="group flex items-center space-x-3 hover:scale-105 transition-all duration-300 focus:outline-none rounded-xl p-2 -m-2"
              aria-label="Retour à l'accueil OFRASAT"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-white/10 rounded-lg blur-sm group-hover:bg-white/20 transition-all duration-300" />
                <Image
                  src="/logo-ofrasat.png"
                  alt="Logo OFRASAT"
                  width={160}
                  height={50}
                  className="h-10 sm:h-12 w-auto relative z-10 drop-shadow-lg"
                  priority
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav
              className="hidden md:flex items-center space-x-6"
              role="navigation"
              aria-label="Navigation principale"
            >
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-semibold transition-all duration-300 focus:outline-none group",
                    isActive(link.href)
                      ? "text-white"
                      : "text-white/80 hover:text-white hover:scale-105"
                  )}
                  aria-label={link.ariaLabel}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive(link.href) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/50 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}
            </nav>

            {/* Right side - User menu & Mobile toggle */}
            <div className="flex items-center space-x-2">
              {status === "loading" ? (
                <div className="h-12 w-24 bg-white/10 rounded-2xl animate-pulse" />
              ) : session ? (
                <UserDropdown user={session.user} variant="navbar" />
              ) : (
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="bg-gradient-to-r from-white to-gray-50 text-[#060097] hover:from-white hover:to-white font-semibold shadow-lg hover:shadow-xl focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 hover:scale-105 rounded-2xl px-6 py-3 border border-white/20"
                >
                  <Link href="/auth/signin">Connexion</Link>
                </Button>
              )}

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-white hover:text-white hover:bg-white/10 focus:bg-white/10 focus:outline-none rounded-2xl p-3 backdrop-blur-sm bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105"
                onClick={toggleMobileMenu}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={
                  isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"
                }
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden backdrop-blur-xl bg-gradient-to-b from-[#060097]/95 to-[#0800b3]/95 border-t border-white/20 shadow-2xl"
          role="navigation"
          aria-label="Navigation mobile"
        >
          <div className="px-6 py-6 space-y-3">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block px-4 py-3 rounded-2xl text-base font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent backdrop-blur-sm border",
                  isActive(link.href)
                    ? "bg-white/20 text-white shadow-lg border-white/20"
                    : "text-white/90 hover:text-white hover:bg-white/10 hover:shadow-md border-white/10 hover:border-white/20"
                )}
                onClick={closeMobileMenu}
                aria-label={link.ariaLabel}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
