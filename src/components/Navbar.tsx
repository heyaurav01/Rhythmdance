"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  Settings,
} from "lucide-react";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

const languageLabels: Record<string, string> = {
  EN: "English",
  ES: "Español",
  FR: "Français",
  RU: "Русский",
  DE: "Deutsch",
  IT: "Italiano",
  PT: "Português",
  HI: "हिन्दी",
};

export default function Navbar({ onSearch }: NavbarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const [langCurrencyOpen, setLangCurrencyOpen] = useState(false);
  const [currency, setCurrency] = useState("INR");
  const [language, setLanguage] = useState("EN");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click or Escape key
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
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setProfileOpen(false);
        setLangCurrencyOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleLogout = useCallback(async () => {
    setProfileOpen(false);
    await logout();
    router.push("/");
  }, [logout, router]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const isHomeActive = pathname === "/dashboard" || pathname === "/";
  const isLessonsActive = pathname.startsWith("/learning") || pathname.startsWith("/dance");
  const isPricingActive = pathname.startsWith("/pricing");
  const isCertificateActive = pathname.startsWith("/certificate");

  const [customName, setCustomName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const loadProfile = useCallback(() => {
    try {
      const stored = localStorage.getItem("roi_user_profile");
      if (stored) {
        const data = JSON.parse(stored);
        if (data.name) setCustomName(data.name);
        if (data.avatarUrl) setAvatarUrl(data.avatarUrl);
      }
    } catch(e) {}
  }, []);

  useEffect(() => {
    loadProfile();
    window.addEventListener('roi_profile_updated', loadProfile);
    return () => window.removeEventListener('roi_profile_updated', loadProfile);
  }, [loadProfile]);

  // Derive display name and initial from authenticated user
  const defaultName = user?.isAnonymous
    ? "Guest Explorer"
    : user?.email?.split("@")[0] || "Dancer";

  const displayName = customName || defaultName;
  const userInitial = displayName.trim().charAt(0).toUpperCase() || "U";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F8F1E6]/95 backdrop-blur-md border-b border-[#E8DEC8] transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-8 py-2.5">
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

          {/* Search Field */}
          <div className="hidden md:flex items-center bg-[#EFE7DA] border border-[#E8DEC8] rounded-full px-3.5 py-1.5 w-48 lg:w-64 focus-within:w-72 focus-within:border-[#B42318] focus-within:bg-white transition-all duration-300">
            <Search size={14} className="text-[#777777] mr-2 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search dance, lessons..."
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search courses and lessons"
              className="bg-transparent text-xs text-[#111111] placeholder-[#777777] outline-none w-full font-medium"
            />
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold tracking-wide text-[#252525]">
          <Link
            href="/dashboard"
            className={`relative py-1 transition-colors hover:text-[#111111] flex flex-col items-center ${
              isHomeActive ? "text-[#111111]" : "text-[#777777]"
            }`}
          >
            <span>Home</span>
          </Link>

          <Link
            href="/learning"
            className={`relative py-1 transition-colors hover:text-[#111111] flex flex-col items-center ${
              isLessonsActive ? "text-[#111111]" : "text-[#777777]"
            }`}
          >
            <span>My Learning</span>
          </Link>

          <Link
            href="/dashboard#classical-forms"
            className="relative py-1 transition-colors hover:text-[#111111] text-[#777777] flex flex-col items-center"
          >
            <span>Classical Dances</span>
          </Link>

          <Link
            href="/certificate"
            className={`relative py-1 transition-colors hover:text-[#111111] flex flex-col items-center ${
              isCertificateActive ? "text-[#111111]" : "text-[#777777]"
            }`}
          >
            <span>Certificates</span>
          </Link>

          <Link
            href="/pricing"
            className={`relative py-1 transition-colors hover:text-[#111111] flex flex-col items-center ${
              isPricingActive ? "text-[#111111]" : "text-[#777777]"
            }`}
          >
            <span>Pricing</span>
          </Link>
        </nav>

        {/* Right: Currency/Language, Notifications, Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">


          {/* Bell Icon */}
          <button
            onClick={() => router.push("/notifications")}
            className="p-2 text-[#252525] hover:text-[#B42318] rounded-full hover:bg-[#EFE7DA] transition-colors relative"
            aria-label="Notifications"
          >
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[#B42318] rounded-full animate-pulse" />
          </button>

          {/* User Profile Avatar & Dropdown */}
          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="User profile"
                aria-expanded={profileOpen}
                className="flex items-center gap-1.5 cursor-pointer group"
              >
                {/* Large circular avatar — 44px desktop, 40px mobile */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#111111] text-white flex items-center justify-center text-base sm:text-lg font-black uppercase ring-2 ring-transparent group-hover:ring-[#B42318] transition-all shadow-md overflow-hidden">
                  {avatarUrl ? <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" /> : userInitial}
                </div>
                <ChevronDown size={14} className="text-[#777777] group-hover:text-[#111111] transition-colors hidden sm:block" />
              </button>

              {/* Profile Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 mt-2.5 w-60 bg-white border border-[#E8DEC8] rounded-2xl shadow-2xl p-2 z-50 animate-fade-slide-up">
                  {/* User identity card */}
                  <div className="p-3.5 bg-[#F8F1E6] rounded-xl mb-1.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center text-base font-black uppercase flex-shrink-0 overflow-hidden">
                        {avatarUrl ? <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" /> : userInitial}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-black text-[#111111] truncate capitalize">
                          {displayName}
                        </p>
                        <p className="text-[10px] text-[#777777] truncate">
                          {user.email || "guest@rhythmofindia.org"}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2.5 inline-flex items-center gap-1 bg-[#B42318]/10 text-[#B42318] px-2 py-0.5 rounded-md text-[10px] font-bold">
                      <Sparkles size={10} />
                      Classical Scholar
                    </div>
                  </div>

                  {/* Menu Items */}
                  <Link
                    href="/profile"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-[#252525] hover:bg-[#F8F1E6] rounded-lg transition-colors"
                  >
                    <UserIcon size={14} className="text-[#B42318]" />
                    My Profile
                  </Link>

                  <Link
                    href="/learning"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-[#252525] hover:bg-[#F8F1E6] rounded-lg transition-colors"
                  >
                    <BookOpen size={14} className="text-[#B42318]" />
                    My Learning
                  </Link>

                  <Link
                    href="/certificate"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-[#252525] hover:bg-[#F8F1E6] rounded-lg transition-colors"
                  >
                    <Award size={14} className="text-[#B42318]" />
                    Certificates
                  </Link>

                  <Link
                    href="/subscription"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-[#252525] hover:bg-[#F8F1E6] rounded-lg transition-colors"
                  >
                    <CreditCard size={14} className="text-[#B42318]" />
                    My Subscription
                  </Link>

                  <Link
                    href="/settings"
                    onClick={() => setProfileOpen(false)}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-[#252525] hover:bg-[#F8F1E6] rounded-lg transition-colors cursor-pointer"
                  >
                    <Settings size={14} className="text-[#B42318]" />
                    Settings
                  </Link>

                  <div className="my-1.5 border-t border-[#E8DEC8]" />

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-xs font-semibold text-[#B42318] hover:bg-[#FDF2F2] rounded-lg transition-colors cursor-pointer"
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
            aria-label="Toggle menu"
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
              placeholder="Search dance, lessons..."
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search courses and lessons"
              className="bg-transparent text-xs text-[#111111] placeholder-[#777777] outline-none w-full font-medium"
            />
          </div>

          {/* Mobile navigation + language/currency */}
          <div className="grid grid-cols-2 gap-2 pt-2 text-xs font-bold">
            <Link
              href="/learning"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-white rounded-xl text-center border border-[#E8DEC8]"
            >
              My Lessons
            </Link>
            <Link
              href="/dashboard#classical-forms"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 bg-white rounded-xl text-center border border-[#E8DEC8]"
            >
              Classical Dances
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
          </div>



          {user && (
            <button
              onClick={handleLogout}
              className="w-full p-3 bg-[#FDF2F2] text-[#B42318] rounded-xl text-center border border-red-200 text-xs font-bold"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
