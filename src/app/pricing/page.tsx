"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import {
  Check,
  AlertCircle,
  RefreshCw,
  Lock,
  ArrowRight,
  ShieldCheck,
  Smartphone,
  CreditCard as CreditCardIcon,
  ShoppingBag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type PlanId = "monthly" | "yearly" | "lifetime";

interface Plan {
  id: PlanId;
  label: string;
  tag: string;
  priceINR: number;
  period: string;
  highlight: boolean;
  features: string[];
}

const plans: Plan[] = [
  {
    id: "monthly",
    label: "Monthly",
    tag: "FLEXIBLE",
    priceINR: 139,
    period: "/month",
    highlight: false,
    features: [
      "Access to all classical dance courses",
      "HD video lessons & tutorials",
      "Interactive quizzes after modules",
      "Progress tracking dashboard",
      "Basic certificate on completion",
    ],
  },
  {
    id: "yearly",
    label: "Yearly",
    tag: "BEST VALUE",
    priceINR: 699,
    period: "/year",
    highlight: true,
    features: [
      "Everything in Monthly",
      "Save 58% compared to monthly",
      "Cultural articles & reading material",
      "Priority certificate generation",
      "Offline lesson notes (PDF)",
      "Early access to new dance forms",
    ],
  },
  {
    id: "lifetime",
    label: "Lifetime",
    tag: "ONE-TIME",
    priceINR: 1999,
    period: " one-time",
    highlight: false,
    features: [
      "Everything in Yearly",
      "Lifetime access — no renewals",
      "All future courses & dance additions",
      "Gold-seal premium certificate",
      "1-on-1 virtual guru feedback session",
      "Exclusive SIH community access",
    ],
  },
];

const exchangeRates: Record<string, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.0095,
};

const symbols: Record<string, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

export default function PricingPage() {
  const router = useRouter();
  const [currency, setCurrency] = useState<"INR" | "USD" | "EUR" | "GBP">("INR");
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [processingState, setProcessingState] = useState<"idle" | "processing" | "success">("idle");
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("yearly");
  const [paymentMethod, setPaymentMethod] = useState<"phonepe" | "gpay" | "upi" | "card">("phonepe");
  const [includeMerch, setIncludeMerch] = useState(false);

  const getPrice = (inrPrice: number) => {
    let base = inrPrice;
    if (includeMerch) base += 500;
    const converted = base * exchangeRates[currency];
    if (currency === "INR") return Math.round(converted).toLocaleString("en-IN");
    return converted.toFixed(2);
  };

  const activePlan = plans.find((p) => p.id === selectedPlan)!;

  const handleCheckout = (planId: PlanId) => {
    router.push(`/checkout?plan=${planId}&currency=${currency}`);
  };

  return (
    <div className="min-h-screen bg-[#F8F1E6] text-[#111111] selection:bg-[#B42318] selection:text-white">
      <Navbar />

      <main className="pt-28 pb-20 px-4 sm:px-8 max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto pt-6">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl font-black uppercase text-[#111111] font-mono tracking-tight leading-[0.95] mb-4"
          >
            Choose your{" "}
            <span className="text-[#B42318]">learning plan</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base text-[#777777] font-medium max-w-xl mx-auto leading-relaxed"
          >
            Access Indian classical dance courses, lessons, cultural articles, quizzes, progress tracking, and certificates.
          </motion.p>
        </div>

        {/* Currency Switcher */}
        <div className="flex justify-center">
          <div className="bg-[#EFE7DA] p-1.5 rounded-full border border-[#E8DEC8] inline-flex items-center gap-1 shadow-sm">
            {(["INR", "USD", "EUR", "GBP"] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold font-mono transition-all cursor-pointer ${
                  currency === curr
                    ? "bg-[#111111] text-white shadow-md"
                    : "text-[#777777] hover:text-[#111111]"
                }`}
              >
                {symbols[curr]} {curr}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards — 3 columns */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + idx * 0.1 }}
              className={`rounded-[28px] p-7 sm:p-8 flex flex-col justify-between relative overflow-hidden transition-all ${
                plan.highlight
                  ? "bg-[#111111] text-[#F8F1E6] border-2 border-[#B42318] shadow-2xl scale-[1.03]"
                  : "bg-white border border-[#E8DEC8] shadow-sm"
              }`}
            >
              <div>
                {/* Tag */}
                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`text-[10px] font-black uppercase font-mono tracking-widest ${
                      plan.highlight ? "text-[#B42318]" : "text-[#777777]"
                    }`}
                  >
                    {plan.tag}
                  </span>
                </div>

                {/* Plan name */}
                <h3
                  className={`text-xl sm:text-2xl font-black uppercase font-mono tracking-tight mb-1 ${
                    plan.highlight ? "text-white" : "text-[#111111]"
                  }`}
                >
                  {plan.label}
                </h3>
                <p
                  className={`text-xs font-medium mb-6 ${
                    plan.highlight ? "text-gray-400" : "text-[#777777]"
                  }`}
                >
                  {plan.id === "monthly" && "Pay as you learn, cancel anytime."}
                  {plan.id === "yearly" && "Best value for committed learners."}
                  {plan.id === "lifetime" && "One payment, access forever."}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <span
                    className={`text-4xl sm:text-5xl font-black font-mono ${
                      plan.highlight ? "text-white" : "text-[#111111]"
                    }`}
                  >
                    {symbols[currency]}
                    {getPrice(plan.priceINR)}
                  </span>
                  <span
                    className={`text-xs font-mono ${
                      plan.highlight ? "text-gray-400" : "text-[#777777]"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-2.5 text-xs sm:text-sm font-semibold ${
                        plan.highlight ? "text-gray-200" : "text-[#252525]"
                      }`}
                    >
                      <Check
                        size={15}
                        className="text-[#B42318] flex-shrink-0 mt-0.5"
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <button
                onClick={() => handleCheckout(plan.id)}
                className={`w-full py-3.5 font-black uppercase tracking-wider text-xs rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
                  plan.highlight
                    ? "bg-[#B42318] hover:bg-[#C92A1E] text-white shadow-xl shadow-[#B42318]/30"
                    : "bg-[#EFE7DA] hover:bg-[#E8DEC8] text-[#111111]"
                }`}
              >
                <span>
                  Get {plan.label} →
                </span>
              </button>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="max-w-2xl mx-auto text-center space-y-2 pt-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#777777]">
            <ShieldCheck size={16} className="text-[#B42318]" />
            <span>Demo UPI Gateway · No real charges will occur</span>
          </div>
          <p className="text-[11px] text-[#777777]">
            Rhythm of India is a Smart India Hackathon learning prototype. Payment is simulated.
          </p>
        </div>
      </main>
    </div>
  );
}
