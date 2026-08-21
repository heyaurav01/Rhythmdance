"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Search,
  Bell,
  LogOut,
  User as UserIcon,
  CreditCard,
  Award,
  BookOpen,
  ChevronDown,
  Globe,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

export default function Navbar({ onSearch }: NavbarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [langCurrencyOpen, setLangCurrencyOpen] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("EN");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
      if (
        langRef.current &&
        !langRef.current.contains(event.target as Node)
      ) {
        setLangCurrencyOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setProfileOpen(false);
    await logout();
    router.push("/");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const isLessonsActive =
    pathname.startsWith("/dashboard") || pathname.startsWith("/dance");
  const isPricingActive = pathname.startsWith("/pricing");
  const isCertificateActive = pathname.startsWith("/certificate");

  const userName = user?.isAnonymous
    ? "Guest Explorer"
    : user?.email?.split("@")[0] || "Dancer";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F8F1E6]/95 backdrop-blur-md border-b border-[#E8DEC8] transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-3.5">
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-4 lg:gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#111111] text-[#F8F1E6] flex items-center justify-center font-black text-sm tracking-tighter group-hover:bg-[#B42318] transition-colors">
              ♫
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black tracking-tight text-[#111111] uppercase font-mono">
                RHYTHM
              </span>
              <span className="text-[10px] font-bold tracking-widest text-[#B42318] -mt-1 uppercase">
                OF INDIA
              </span>
            </div>
          </Link>

          {/* Search Pill - Inspired by Art Course reference */}
          <div className="hidden md:flex items-center bg-[#EFE7DA] border border-[#E8DEC8] rounded-full px-3.5 py-1.5 w-48 lg:w-64 focus-within:w-72 focus-within:border-[#B42318] focus-within:bg-white transition-all duration-300">
            <Search size={14} className="text-[#777777] mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search dance, lessons..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-transparent text-xs text-[#111111] placeholder-[#777777] outline-none w-full font-medium"
            />
          </div>
        </div>

        {/* Center: Navigation Links with Red dot indicator */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-wide text-[#252525]">
          <Link
            href="/dashboard"
            className={`relative py-1 transition-colors hover:text-[#111111] flex flex-col items-center ${
              isLessonsActive ? "text-[#111111]" : "text-[#777777]"
            }`}
          >
            <span>My Lessons</span>
            {isLessonsActive && (
              <span className="absolute -bottom-1 w-1.5 h-1.5 bg-[#B42318] rounded-full" />
            )}
          </Link>

          <Link
            href="/dashboard#dance-forms"
            className="relative py-1 transition-colors hover:text-[#111111] text-[#777777] flex flex-col items-center"
          >
            <span>Browse</span>
          </Link>

          <Link
            href="/certificate"
            className={`relative py-1 transition-colors hover:text-[#111111] flex flex-col items-center ${
              isCertificateActive ? "text-[#111111]" : "text-[#777777]"
            }`}
          >
            <span>Certificates</span>
            {isCertificateActive && (
              <span className="absolute -bottom-1 w-1.5 h-1.5 bg-[#B42318] rounded-full" />
            )}
          </Link>

          <Link
            href="/pricing"
            className={`relative py-1 transition-colors hover:text-[#111111] flex flex-col items-center ${
              isPricingActive ? "text-[#111111]" : "text-[#777777]"
            }`}
          >
            <span>Pricing</span>
            {isPricingActive && (
              <span className="absolute -bottom-1 w-1.5 h-1.5 bg-[#B42318] rounded-full" />
            )}
          </Link>
        </nav>

        {/* Right: Currency/Language, Notifications, Profile */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Currency & Language Popover */}
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangCurrencyOpen(!langCurrencyOpen)}
              className="flex items-center gap-1.5 bg-[#EFE7DA] hover:bg-[#E8DEC8] border border-[#E8DEC8] px-2.5 py-1.5 rounded-full text-xs font-bold text-[#111111] transition-colors cursor-pointer"
            >
              <Globe size={13} className="text-[#B42318]" />
              <span>{currency}</span>
              <span className="text-[#777777]">·</span>
              <span>{language}</span>
              <ChevronDown size={12} className="text-[#777777]" />
            </button>

            {langCurrencyOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E8DEC8] rounded-2xl shadow-xl p-3 z-50 animate-fade-slide-up text-xs">
                <div className="mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#777777] block mb-1.5">
                    Currency
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    {["USD", "INR", "EUR", "GBP"].map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setCurrency(c);
                          setLangCurrencyOpen(false);
                        }}
                        className={`py-1 rounded-lg font-bold text-center transition-all ${
                          currency === c
                            ? "bg-[#B42318] text-white"
                            : "bg-[#F8F1E6] text-[#252525] hover:bg-[#EFE7DA]"
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="pt-2 border-t border-[#E8DEC8]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#777777] block mb-1.5">
                    Language
                  </span>
                  <div className="grid grid-cols-3 gap-1">
                    {["EN", "ES", "FR", "RU", "HI"].map((l) => (
                      <button
                        key={l}
                        onClick={() => {
                          setLanguage(l);
                          setLangCurrencyOpen(false);
                        }}
                        className={`py-1 rounded-lg font-bold text-center transition-all ${
                          language === l
                            ? "bg-[#111111] text-white"
                            : "bg-[#F8F1E6] text-[#252525] hover:bg-[#EFE7DA]"
                        }`}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bell Icon */}
          <button
            onClick={() => router.push("/pricing")}
            className="p-2 text-[#252525] hover:text-[#B42318] rounded-full hover:bg-[#EFE7DA] transition-colors relative"
            title="Premium Updates"
          >
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#B42318] rounded-full animate-pulse" />
          </button>

          {/* User Profile Avatar & Dropdown */}
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-[#111111] text-[#F8F1E6] pl-2 pr-2.5 py-1 rounded-full text-xs font-bold hover:bg-[#252525] transition-all cursor-pointer shadow-sm"
              >
                <div className="w-5 h-5 rounded-full bg-[#B42318] text-white flex items-center justify-center text-[10px] font-black uppercase">
                  {userName.charAt(0)}
                </div>
                <span className="hidden sm:inline max-w-[90px] truncate">
                  {userName}
                </span>
                <ChevronDown size={12} className="text-[#E8DEC8]" />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E8DEC8] rounded-2xl shadow-xl p-2 z-50 animate-fade-slide-up">
                  <div className="p-3 bg-[#F8F1E6] rounded-xl mb-1">
                    <p className="text-xs font-black text-[#111111] truncate">
                      {userName}
                    </p>
                    <p className="text-[10px] text-[#777777] truncate">
                      {user.email || "guest@rhythmofindia.org"}
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1 bg-[#B42318]/10 text-[#B42318] px-2 py-0.5 rounded-md text-[10px] font-bold">
                      <Sparkles size={10} />
                      Classical Scholar
                    </div>
                  </div>

                  <Link
                    href="/dashboard"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#252525] hover:bg-[#F8F1E6] rounded-lg transition-colors"
                  >
                    <BookOpen size={14} className="text-[#B42318]" />
                    My Learning
                  </Link>

                  <Link
                    href="/pricing"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#252525] hover:bg-[#F8F1E6] rounded-lg transition-colors"
                  >
                    <CreditCard size={14} className="text-[#B42318]" />
                    Membership & Passes
                  </Link>

                  <Link
                    href="/certificate"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#252525] hover:bg-[#F8F1E6] rounded-lg transition-colors"
                  >
                    <Award size={14} className="text-[#B42318]" />
                    Certificates
                  </Link>

                  <div className="my-1 border-t border-[#E8DEC8]" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-[#B42318] hover:bg-[#FDF2F2] rounded-lg transition-colors cursor-pointer"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/"
              className="bg-[#B42318] hover:bg-[#C92A1E] text-white px-4 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#111111] hover:bg-[#EFE7DA] rounded-lg transition-colors"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F8F1E6] border-b border-[#E8DEC8] px-4 py-4 space-y-3 animate-fade-slide-up">
          <div className="flex items-center bg-[#EFE7DA] border border-[#E8DEC8] rounded-full px-3 py-2">
            <Search size={14} className="text-[#777777] mr-2" />
            <input
              type="text"
              placeholder="Search dance forms..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-transparent text-xs text-[#111111] placeholder-[#777777] outline-none w-full font-medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-bold">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-white rounded-xl text-center border border-[#E8DEC8]"
            >
              My Lessons
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-white rounded-xl text-center border border-[#E8DEC8]"
            >
              Pricing
            </Link>
            <Link
              href="/certificate"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-white rounded-xl text-center border border-[#E8DEC8]"
            >
              Certificates
            </Link>
            {user && (
              <button
                onClick={handleLogout}
                className="p-3 bg-[#FDF2F2] text-[#B42318] rounded-xl text-center border border-red-200"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
