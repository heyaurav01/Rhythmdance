"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Check, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

type PlanId = "junior-monthly" | "junior-yearly" | "youth-monthly" | "youth-yearly";
type BillingCycle = "monthly" | "yearly";

interface Plan {
  id: PlanId;
  ageGroup: string;
  ageRange: string;
  label: string;
  tag: string;
  priceINR: number;
  period: string;
  highlight: boolean;
  description: string;
  features: string[];
}

const plans: Plan[] = [
  {
    id: "junior-monthly",
    ageGroup: "junior",
    ageRange: "8 – 16 years",
    label: "Junior",
    tag: "FOR YOUNG LEARNERS",
    priceINR: 99,
    period: "/month",
    highlight: false,
    description: "Perfect for kids & teens beginning their classical dance journey.",
    features: [
      "Age-appropriate dance curriculum",
      "HD video lessons with slow-motion replay",
      "Fun interactive quizzes & badges",
      "Progress tracking for parents",
      "Basic certificate on completion",
    ],
  },
  {
    id: "junior-yearly",
    ageGroup: "junior",
    ageRange: "8 – 16 years",
    label: "Junior",
    tag: "BEST VALUE",
    priceINR: 499,
    period: "/year",
    highlight: true,
    description: "Save more with an annual plan for young dancers.",
    features: [
      "Everything in Junior Monthly",
      "Save 58% compared to monthly",
      "Cultural stories & reading material",
      "Offline lesson notes (PDF)",
      "Early access to new junior courses",
      "Priority certificate generation",
    ],
  },
  {
    id: "youth-monthly",
    ageGroup: "youth",
    ageRange: "18 – 24 years",
    label: "Youth",
    tag: "FOR YOUNG ADULTS",
    priceINR: 149,
    period: "/month",
    highlight: false,
    description: "Advanced classical training for serious young performers.",
    features: [
      "Full access to all dance forms",
      "Advanced choreography modules",
      "Performance technique workshops",
      "Community forum access",
      "Standard certificate on completion",
    ],
  },
  {
    id: "youth-yearly",
    ageGroup: "youth",
    ageRange: "18 – 24 years",
    label: "Youth",
    tag: "BEST VALUE",
    priceINR: 799,
    period: "/year",
    highlight: true,
    description: "Commit to a year of mastery with maximum savings.",
    features: [
      "Everything in Youth Monthly",
      "Save 55% compared to monthly",
      "1-on-1 virtual guru feedback session",
      "Gold-seal premium certificate",
      "Offline lesson notes & sheet music",
      "Exclusive premium community access",
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
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");

  const getPrice = (inrPrice: number) => {
    const converted = inrPrice * exchangeRates[currency];
    if (currency === "INR") return Math.round(converted).toLocaleString("en-IN");
    return converted.toFixed(2);
  };

  const handleCheckout = (planId: PlanId) => {
    router.push(`/checkout?plan=${planId}&currency=${currency}`);
  };

  const filteredPlans = plans.filter((p) => p.id.endsWith(billingCycle));

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
            Pricing{" "}
            <span className="text-[#B42318]">Plans</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base text-[#999999] font-medium max-w-xl mx-auto leading-relaxed"
          >
            Manage, track, and optimize your classical dance learning with a plan built for your age group.
          </motion.p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center">
          <div className="bg-white p-1 rounded-full border border-[#E8DEC8] inline-flex items-center gap-1 shadow-sm">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                billingCycle === "monthly"
                  ? "bg-[#111111] text-white shadow-md"
                  : "text-[#999999] hover:text-[#111111]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                billingCycle === "yearly"
                  ? "bg-[#111111] text-white shadow-md"
                  : "text-[#999999] hover:text-[#111111]"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Currency Switcher */}
        <div className="flex justify-center">
          <div className="bg-[#EFE7DA] p-1 rounded-full border border-[#E8DEC8] inline-flex items-center gap-1">
            {(["INR", "USD", "EUR", "GBP"] as const).map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-bold font-mono transition-all cursor-pointer ${
                  currency === curr
                    ? "bg-[#111111] text-white"
                    : "text-[#999999] hover:text-[#111111]"
                }`}
              >
                {symbols[curr]} {curr}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards — 2 columns */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
          {filteredPlans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + idx * 0.1 }}
              className={`group rounded-[24px] p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden transition-all duration-300 cursor-default ${
                plan.highlight
                  ? "bg-white border-2 border-[#B42318]/60 shadow-md hover:shadow-xl hover:border-[#B42318] hover:-translate-y-1"
                  : "bg-white border border-[#E0D8CB] shadow-sm hover:shadow-lg hover:border-[#C0B8A8] hover:-translate-y-1"
              }`}
            >
              {/* Gradient accent for highlighted cards */}
              {plan.highlight && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#B42318] via-[#E85D4A] to-[#B42318]" />
              )}

              <div>
                {/* Age Range Badge */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[11px] font-black uppercase tracking-widest text-[#B42318] bg-[#FDF2F2] px-3 py-1 rounded-full">
                    {plan.ageRange}
                  </span>
                  {plan.highlight && (
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#B42318] font-mono">
                      {plan.tag}
                    </span>
                  )}
                </div>

                {/* Plan name */}
                <h3 className="text-2xl sm:text-3xl font-black uppercase font-mono tracking-tight mb-1 text-[#222222]">
                  {plan.label}
                </h3>
                <p className="text-xs font-medium mb-6 text-[#999999]">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <span className="text-4xl sm:text-5xl font-black font-mono text-[#222222]">
                    {symbols[currency]}
                    {getPrice(plan.priceINR)}
                  </span>
                  <span className="text-xs font-mono text-[#999999] ml-1">
                    {plan.period}
                  </span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feat, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-[#444444]"
                    >
                      <Check
                        size={15}
                        className={`flex-shrink-0 mt-0.5 ${plan.highlight ? "text-[#B42318]" : "text-[#999999]"}`}
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <button
                onClick={() => handleCheckout(plan.id)}
                className={`w-full py-3.5 font-bold uppercase tracking-wider text-sm rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer flex items-center justify-center gap-2 ${
                  plan.highlight
                    ? "bg-[#B42318] hover:bg-[#9E1F14] text-white shadow-md"
                    : "bg-[#111111] hover:bg-[#222222] text-white shadow-sm"
                }`}
              >
                Get Started
              </button>
            </motion.div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="max-w-2xl mx-auto text-center space-y-2 pt-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#999999]">
            <ShieldCheck size={16} className="text-[#B42318]" />
            <span>Secure Payment Gateway · 256-bit SSL Encrypted</span>
          </div>
          <p className="text-[11px] text-[#999999]">
            Rhythm of India — India's premier classical dance learning platform.
          </p>
        </div>
      </main>
    </div>
  );
}
