"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Check, ShieldCheck, CreditCard, Smartphone, Lock, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";

type PlanId = "monthly" | "yearly" | "lifetime";

interface Plan {
  id: PlanId;
  label: string;
  priceINR: number;
  period: string;
  features: string[];
}

const plans: Plan[] = [
  {
    id: "monthly",
    label: "Monthly Plan",
    priceINR: 139,
    period: "Month",
    features: [
      "Access to all classical dance courses",
      "HD video lessons & tutorials",
      "Interactive quizzes after modules",
      "Progress tracking dashboard"
    ]
  },
  {
    id: "yearly",
    label: "Annual Plan",
    priceINR: 699,
    period: "Year",
    features: [
      "Everything in Monthly",
      "Save 58% compared to monthly",
      "Priority certificate generation",
      "Offline lesson notes (PDF)"
    ]
  },
  {
    id: "lifetime",
    label: "Lifetime Plan",
    priceINR: 1999,
    period: "One-time",
    features: [
      "Everything in Yearly",
      "Lifetime access — no renewals",
      "Gold-seal premium certificate",
      "Exclusive premium community access"
    ]
  }
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

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialPlan = (searchParams.get("plan") as PlanId) || "yearly";
  const initialCurrency = searchParams.get("currency") || "INR";
  
  const [selectedPlan, setSelectedPlan] = useState<PlanId>(initialPlan);
  const [currency] = useState(initialCurrency);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "gpay">("card");
  const [processingState, setProcessingState] = useState<"idle" | "processing" | "success">("idle");
  const [billedTo, setBilledTo] = useState("Rhythm Learner");
  
  const activePlan = plans.find((p) => p.id === selectedPlan) || plans[1];

  const getPrice = (inrPrice: number) => {
    const converted = inrPrice * exchangeRates[currency];
    if (currency === "INR") return Math.round(converted).toLocaleString("en-IN");
    return converted.toFixed(2);
  };

  const simulatePayment = () => {
    setProcessingState("processing");
    setTimeout(() => {
      setProcessingState("success");
      
      const newInvoice = {
        id: `INV-${Math.floor(Math.random() * 1000000)}`,
        date: new Date().toLocaleDateString("en-IN"),
        plan: activePlan.label,
        amount: `${symbols[currency]}${getPrice(activePlan.priceINR)}`,
        method: paymentMethod === "card" ? "card" : "gpay",
        merch: false,
      };
      
      try {
        const stored = JSON.parse(localStorage.getItem("roi_invoices") || "[]");
        localStorage.setItem("roi_invoices", JSON.stringify([newInvoice, ...stored]));
      } catch(e) {}

      setTimeout(() => {
        router.push("/subscription");
      }, 2000);
    }, 2000);
  };

  if (processingState === "processing") {
    return (
      <div className="min-h-screen bg-[#F8F1E6] flex flex-col items-center justify-center p-4">
        <RefreshCw size={48} className="text-[#B42318] animate-spin mb-4" />
        <h2 className="text-2xl font-black font-mono uppercase tracking-tight text-[#111111]">Processing Payment</h2>
        <p className="text-[#777777]">Please do not close this window...</p>
      </div>
    );
  }

  if (processingState === "success") {
    return (
      <div className="min-h-screen bg-[#F8F1E6] flex flex-col items-center justify-center p-4 text-center">
        <div className="w-20 h-20 bg-[#111111] rounded-full flex items-center justify-center shadow-2xl mb-6">
          <Check size={40} className="text-[#F8F1E6]" />
        </div>
        <h2 className="text-4xl font-black font-mono uppercase tracking-tight text-[#111111] mb-2">Payment Successful!</h2>
        <p className="text-[#777777]">Welcome to Rhythm of India Pro. Redirecting you to your invoices...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F1E6] text-[#111111] selection:bg-[#B42318] selection:text-white">
      <Navbar />

      <main className="pt-28 pb-20 px-4 max-w-6xl mx-auto">
        <div className="bg-white rounded-[32px] shadow-sm border border-[#E8DEC8] overflow-hidden">
          <div className="grid md:grid-cols-2">
            
            {/* Left Column: Plan Selection */}
            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-[#E8DEC8] bg-[#FDFBF7]">
              <div className="mb-10">
                <h1 className="text-2xl font-black text-[#B42318] font-mono tracking-tighter mb-4">
                  Rhythm of India
                </h1>
                <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#111111]">
                  Activate Your Pro
                </h2>
                <p className="text-sm text-[#777777] mt-2">
                  Get unlimited access to classical dance courses in seconds.
                </p>
              </div>

              <div className="space-y-4 mb-10">
                <h3 className="text-lg font-black font-mono uppercase tracking-tight">Select Plan</h3>
                {plans.map((plan) => (
                  <label 
                    key={plan.id}
                    className={`flex items-center justify-between p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedPlan === plan.id 
                      ? "border-[#635BFF] bg-[#F4F3FF] shadow-sm" 
                      : "border-[#E8DEC8] hover:border-[#111111] bg-white"
                    }`}
                  >
                    <input type="radio" className="hidden" checked={selectedPlan === plan.id} onChange={() => setSelectedPlan(plan.id)} />
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === plan.id ? "border-[#635BFF]" : "border-[#777777]"}`}>
                        {selectedPlan === plan.id && <div className="w-2.5 h-2.5 rounded-full bg-[#635BFF]" />}
                      </div>
                      <div>
                        <p className="font-bold text-[#111111]">{plan.label}</p>
                        <p className="text-xs text-[#777777]">
                          {plan.id === "yearly" ? "Commit for a year with savings." : plan.id === "lifetime" ? "Pay once, access forever." : "Ideal for short-term learning."}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black font-mono text-lg text-[#111111]">
                        {symbols[currency]}{getPrice(plan.priceINR)}
                      </p>
                      <p className="text-[10px] text-[#777777] uppercase font-bold tracking-wider">/ {plan.period}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div>
                <h3 className="text-lg font-black font-mono uppercase tracking-tight mb-4 flex items-center gap-2">
                  What you'll unlock <ArrowRightIcon className="w-4 h-4" />
                </h3>
                <ul className="space-y-3">
                  {activePlan.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#111111] font-medium">
                      <Check size={16} className="text-[#635BFF] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-xs text-[#777777] mt-8 leading-relaxed">
                  Everything unlocked, synced, and built for speed. Collaborate in real time, scale your workflow smoothly, and get help fast with priority support.
                </p>
              </div>
            </div>

            {/* Right Column: Payment Details */}
            <div className="p-8 md:p-12">
              <div className="flex gap-2 p-1 bg-[#F8F1E6] rounded-xl mb-8 border border-[#E8DEC8]">
                <button 
                  onClick={() => setPaymentMethod("card")}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${paymentMethod === "card" ? "bg-white shadow-sm text-[#111111]" : "text-[#777777] hover:text-[#111111]"}`}
                >
                  Pay by Card
                </button>
                <button 
                  onClick={() => setPaymentMethod("gpay")}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${paymentMethod === "gpay" ? "bg-white shadow-sm text-[#111111]" : "text-[#777777] hover:text-[#111111]"}`}
                >
                  Pay with Google Pay
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-[#777777] mb-2 uppercase tracking-wider">Billed To</label>
                  <input 
                    type="text" 
                    value={billedTo}
                    onChange={(e) => setBilledTo(e.target.value)}
                    className="w-full p-4 rounded-xl border border-[#E8DEC8] bg-white outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all text-sm font-medium"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="pt-2">
                  <h3 className="text-lg font-black font-mono uppercase tracking-tight mb-4">Payment Detail</h3>
                  
                  {paymentMethod === "card" ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="border border-[#E8DEC8] rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-not-allowed opacity-50 bg-[#F8F1E6]">
                          <ShieldCheck size={20} className="text-[#777777]" />
                          <span className="text-xs font-bold text-[#777777]">Bank Transfer</span>
                        </div>
                        <div className="border-2 border-[#635BFF] bg-[#F4F3FF] rounded-xl p-4 flex flex-col items-center justify-center gap-2">
                          <CreditCard size={20} className="text-[#635BFF]" />
                          <span className="text-xs font-bold text-[#111111]">Credit Card</span>
                        </div>
                      </div>

                      <div className="relative">
                        <input 
                          type="text" 

                          className="w-full p-4 rounded-xl border border-[#E8DEC8] bg-white outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all text-sm font-mono tracking-widest"
                          placeholder="Card Number"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <input 
                          type="text" 

                          className="w-full p-4 rounded-xl border border-[#E8DEC8] bg-white outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all text-sm"
                          placeholder="MM/YY"
                        />
                        <input 
                          type="text" 

                          className="w-full p-4 rounded-xl border border-[#E8DEC8] bg-white outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all text-sm"
                          placeholder="CVV"
                        />
                      </div>

                      <select className="w-full p-4 rounded-xl border border-[#E8DEC8] bg-white outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all text-sm appearance-none cursor-pointer">
                        <option>India</option>
                        <option>United States</option>
                        <option>United Kingdom</option>
                      </select>

                      <div className="grid grid-cols-3 gap-3">
                        <input type="text" placeholder="City" className="w-full p-3 rounded-xl border border-[#E8DEC8] bg-white outline-none focus:border-[#635BFF] text-xs" />
                        <input type="text" placeholder="State" className="w-full p-3 rounded-xl border border-[#E8DEC8] bg-white outline-none focus:border-[#635BFF] text-xs" />
                        <input type="text" placeholder="ZIP" className="w-full p-3 rounded-xl border border-[#E8DEC8] bg-white outline-none focus:border-[#635BFF] text-xs" />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-[#F4F3FF] border-2 border-[#635BFF] rounded-2xl p-8 text-center space-y-4">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                        <Smartphone size={24} className="text-[#635BFF]" />
                      </div>
                      <h4 className="font-bold text-[#111111]">Google Pay Setup</h4>
                      <p className="text-xs text-[#777777] max-w-xs mx-auto">
                        Enter your Google Pay number or UPI ID below to receive a payment request on your device.
                      </p>
                      <input 
                        type="text" 

                        className="w-full p-4 rounded-xl border border-[#E8DEC8] bg-white outline-none focus:border-[#635BFF] focus:ring-1 focus:ring-[#635BFF] transition-all text-sm text-center font-mono"
                        placeholder="e.g. name@okaxis"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-[#E8DEC8]">
                <div className="flex items-end justify-between mb-6">
                  <span className="text-xl font-black font-mono tracking-tight text-[#111111]">Total</span>
                  <div className="text-right">
                    <span className="text-2xl font-black font-mono text-[#111111]">
                      {symbols[currency]}{getPrice(activePlan.priceINR)}
                    </span>
                    <span className="text-xs font-bold text-[#777777] uppercase tracking-wider ml-2">/ {activePlan.period}</span>
                  </div>
                </div>

                <button 
                  onClick={simulatePayment}
                  className="w-full py-4 bg-[#635BFF] hover:bg-[#5249E5] text-white font-bold rounded-xl transition-colors shadow-lg shadow-[#635BFF]/30 flex items-center justify-center gap-2"
                >
                  <Lock size={16} /> Subscribe
                </button>
                
                <p className="text-[10px] text-[#777777] mt-4 flex items-start gap-2 leading-relaxed">
                  <ShieldCheck size={14} className="flex-shrink-0 mt-0.5" />
                  Your payment data is fully encrypted and handled with the highest security standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F1E6] flex items-center justify-center"><RefreshCw className="animate-spin text-[#B42318]" /></div>}>
      <CheckoutContent />
    </Suspense>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
