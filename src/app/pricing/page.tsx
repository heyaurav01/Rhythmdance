"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  Check,
  CreditCard,
  Sparkles,
  AlertCircle,
  RefreshCw,
  Lock,
  ArrowRight,
  ShieldCheck,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function PricingPage() {
  const router = useRouter();
  const [currency, setCurrency] = useState<"USD" | "INR" | "EUR" | "GBP" | "RUB">("USD");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [processingState, setProcessingState] = useState<"idle" | "processing" | "success">("idle");
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "lifetime">("lifetime");

  const exchangeRates = {
    USD: 1,
    INR: 83,
    EUR: 0.92,
    GBP: 0.79,
    RUB: 91,
  };

  const symbols = {
    USD: "$",
    INR: "₹",
    EUR: "€",
    GBP: "£",
    RUB: "₽",
  };

  const getPrice = (usdPrice: number) => {
    const converted = usdPrice * exchangeRates[currency];
    return currency === "INR" || currency === "RUB"
      ? Math.round(converted).toLocaleString()
      : converted.toFixed(2);
  };

  const handleCheckout = (plan: "monthly" | "lifetime") => {
    setSelectedPlan(plan);
    setIsCheckoutOpen(true);
    setProcessingState("idle");
  };

  const simulatePayment = () => {
    setProcessingState("processing");
    setTimeout(() => {
      setProcessingState("success");
      setTimeout(() => {
        setIsCheckoutOpen(false);
        router.push("/dashboard");
      }, 2500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F1E6] text-[#111111] selection:bg-[#B42318] selection:text-white">
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-8 max-w-6xl mx-auto space-y-12">
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto pt-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-[#EFE7DA] border border-[#E8DEC8] rounded-full px-4 py-1.5 text-xs font-bold text-[#111111] mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#B42318] animate-pulse" />
            <span>PREMIUM MEMBERSHIP & CERTIFICATION</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black uppercase text-[#111111] font-mono tracking-tight leading-[0.95] mb-4"
          >
            MASTER THE <br />
            <span className="text-[#B42318]">SACRED RHYTHM</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#252525] font-medium max-w-xl mx-auto leading-relaxed"
          >
            Unlock full masterclasses for Odissi, Bharatanatyam, Kathak, and Kuchipudi with accredited diplomas and direct feedback from lineage gurus.
          </motion.p>
        </div>

        {/* Currency Switcher Pill Bar */}
        <div className="flex justify-center">
          <div className="bg-[#EFE7DA] p-1.5 rounded-full border border-[#E8DEC8] inline-flex items-center gap-1 shadow-sm">
            {(["USD", "INR", "EUR", "GBP", "RUB"] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-4 sm:px-6 py-2 rounded-full text-xs font-bold font-mono transition-all cursor-pointer ${
                  currency === curr
                    ? "bg-[#B42318] text-white shadow-md"
                    : "text-[#777777] hover:text-[#111111]"
                }`}
              >
                {curr} ({symbols[curr]})
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {/* Monthly Pro Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-[32px] p-8 sm:p-10 border border-[#E8DEC8] shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-black uppercase font-mono tracking-widest text-[#777777]">
                  STUDENT PASS
                </span>
                <span className="bg-[#F8F1E6] text-[#111111] rounded-full px-3 py-0.5 text-[10px] font-bold font-mono">
                  FLEXIBLE
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#111111] font-mono tracking-tight mb-1">
                Monthly Scholar
              </h3>
              <p className="text-xs text-[#777777] font-medium mb-6">
                Full streaming access for dedicated continuous learners.
              </p>

              <div className="mb-8">
                <span className="text-4xl sm:text-5xl font-black text-[#111111] font-mono">
                  {symbols[currency]}{getPrice(19)}
                </span>
                <span className="text-[#777777] text-xs font-mono"> / month</span>
              </div>

              <ul className="space-y-3.5 mb-8">
                {[
                  "Access to all 4 classical dance traditions",
                  "44 High Definition masterclass lessons",
                  "Real-time interactive knowledge assessments",
                  "Official diploma certificate generation",
                  "Standard discussion forum participation",
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-[#252525]">
                    <Check size={16} className="text-[#B42318] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleCheckout("monthly")}
              className="w-full py-4 bg-[#EFE7DA] hover:bg-[#E8DEC8] text-[#111111] font-black uppercase tracking-wider text-xs rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>SUBSCRIBE {symbols[currency]}{getPrice(19)} / MO →</span>
            </button>
          </motion.div>

          {/* Lifetime Pass Card (Featured with Deep Red Accent) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-[#111111] text-[#F8F1E6] rounded-[32px] p-8 sm:p-10 border border-[#252525] shadow-2xl relative flex flex-col justify-between overflow-hidden"
          >
            {/* Top Red Badge */}
            <div className="absolute top-0 right-0 bg-[#B42318] text-white text-[10px] font-black font-mono px-5 py-2 rounded-bl-2xl uppercase tracking-widest shadow-md">
              MOST POPULAR
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-black uppercase font-mono tracking-widest text-[#B42318]">
                  MASTERY PASS
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white font-mono tracking-tight mb-1">
                Lifetime Heritage Pass
              </h3>
              <p className="text-xs text-gray-400 font-medium mb-6">
                One-time contribution for lifetime cultural academy access.
              </p>

              <div className="mb-8">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono">
                  {symbols[currency]}{getPrice(149)}
                </span>
                <span className="text-gray-400 text-xs font-mono"> one-time payment</span>
              </div>

              <ul className="space-y-3.5 mb-8">
                {[
                  "Everything included in Monthly Scholar",
                  "Lifetime updates & future dance additions",
                  "High-res printable diploma with gold digital seal",
                  "Direct 1-on-1 virtual guru posture evaluation",
                  "Offline download access to audio bol recitations",
                  "Early access to SIH cultural performance events",
                ].map((feat, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm font-semibold text-gray-200">
                    <Check size={16} className="text-[#B42318] flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleCheckout("lifetime")}
              className="w-full py-4 bg-[#B42318] hover:bg-[#C92A1E] text-white font-black uppercase tracking-wider text-xs rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-[#B42318]/30 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>SUBSCRIBE LIFETIME →</span>
              <ArrowRight size={15} />
            </button>
          </motion.div>
        </div>

        {/* Security & SIH Prototype Disclaimer */}
        <div className="max-w-2xl mx-auto text-center space-y-2 pt-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#777777]">
            <ShieldCheck size={16} className="text-[#B42318]" />
            <span>256-Bit Encrypted Demo Gateway · No real card charges occur</span>
          </div>
          <p className="text-[11px] text-[#777777]">
            Rhythm of India is an official Smart India Hackathon learning prototype.
          </p>
        </div>
      </main>

      {/* ── Mock Checkout Modal ── */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => processingState === "idle" && setIsCheckoutOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-[#F8F1E6] rounded-[32px] w-full max-w-md shadow-2xl overflow-hidden border border-[#E8DEC8] flex flex-col z-10"
            >
              {processingState === "idle" ? (
                <>
                  <div className="bg-[#EFE7DA] p-6 border-b border-[#E8DEC8] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black uppercase font-mono tracking-widest text-[#B42318] block">
                        SECURE CHECKOUT
                      </span>
                      <h4 className="font-black text-lg text-[#111111] font-mono">
                        Complete Registration
                      </h4>
                    </div>
                    <CreditCard className="text-[#B42318]" size={28} />
                  </div>

                  <div className="p-6 space-y-5">
                    <div className="flex justify-between items-center text-xs font-bold bg-white p-4 rounded-2xl border border-[#E8DEC8] text-[#111111]">
                      <div>
                        <p className="font-mono uppercase font-black">
                          {selectedPlan === "monthly" ? "Monthly Scholar Pass" : "Lifetime Heritage Pass"}
                        </p>
                        <p className="text-[11px] text-[#777777]">All 4 dance traditions</p>
                      </div>
                      <span className="text-base font-black font-mono text-[#B42318]">
                        {symbols[currency]}
                        {getPrice(selectedPlan === "monthly" ? 19 : 149)}
                      </span>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider text-[#777777] font-mono mb-1 block">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          defaultValue="Ananya Sharma"
                          className="w-full bg-white border border-[#E8DEC8] rounded-xl px-4 py-3 text-xs font-semibold focus:border-[#B42318] outline-none text-[#111111]"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] font-black uppercase tracking-wider text-[#777777] font-mono mb-1 block">
                          Card Number
                        </label>
                        <input
                          type="text"
                          placeholder="4242 •••• •••• 4242"
                          defaultValue="4242 4242 4242 4242"
                          className="w-full bg-white border border-[#E8DEC8] rounded-xl px-4 py-3 font-mono text-xs focus:border-[#B42318] outline-none text-[#111111]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-wider text-[#777777] font-mono mb-1 block">
                            Expiry
                          </label>
                          <input
                            type="text"
                            defaultValue="12/28"
                            className="w-full bg-white border border-[#E8DEC8] rounded-xl px-4 py-3 font-mono text-xs focus:border-[#B42318] outline-none text-[#111111]"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-black uppercase tracking-wider text-[#777777] font-mono mb-1 block">
                            CVC
                          </label>
                          <input
                            type="text"
                            defaultValue="888"
                            className="w-full bg-white border border-[#E8DEC8] rounded-xl px-4 py-3 font-mono text-xs focus:border-[#B42318] outline-none text-[#111111]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-[#B42318] bg-[#FDF2F2] p-3 rounded-xl border border-red-200">
                      <AlertCircle size={14} className="flex-shrink-0" />
                      <span>Demo Mode: Click below to simulate instant mock payment.</span>
                    </div>

                    <button
                      onClick={simulatePayment}
                      className="w-full py-4 bg-[#B42318] hover:bg-[#C92A1E] text-white font-black uppercase tracking-wider text-xs rounded-full flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-[#B42318]/30 cursor-pointer"
                    >
                      <Lock size={14} />
                      <span>
                        PAY {symbols[currency]}
                        {getPrice(selectedPlan === "monthly" ? 19 : 149)} →
                      </span>
                    </button>
                  </div>
                </>
              ) : processingState === "processing" ? (
                <div className="p-12 flex flex-col items-center justify-center text-center text-[#111111] space-y-4">
                  <RefreshCw className="animate-spin text-[#B42318]" size={42} />
                  <h3 className="font-black text-xl uppercase font-mono">
                    Authenticating Payment...
                  </h3>
                  <p className="text-[#777777] text-xs">
                    Connecting to Smart India cultural accreditation gateway...
                  </p>
                </div>
              ) : (
                <div className="p-12 flex flex-col items-center justify-center text-center bg-[#111111] text-white space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 bg-[#B42318] rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Check size={32} className="text-white" />
                  </motion.div>
                  <h3 className="font-black text-2xl uppercase font-mono tracking-tight">
                    Access Granted!
                  </h3>
                  <p className="text-gray-300 text-xs max-w-xs">
                    Welcome to the Rhythm of India Mastery Scholar program. Redirecting to your lessons...
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
