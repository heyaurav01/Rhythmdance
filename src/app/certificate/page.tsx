"use client";

import { Suspense, useRef, useMemo, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { Download, ArrowLeft, Award, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

function CertificateContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const certRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const danceName = searchParams.get("dance") || "Odissi";
  const [customName, setCustomName] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("roi_user_profile");
      if (stored) {
        const data = JSON.parse(stored);
        if (data.name) setCustomName(data.name);
      }
    } catch(e) {}
  }, []);

  const defaultName = user?.isAnonymous
    ? "Guest Explorer"
    : user?.email?.split("@")[0] || "Classical Scholar";
  const userName = customName || defaultName;
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Generate certId once per mount to avoid impure render calls
  const certId = useMemo(
    () =>
      `ROI-SIH26-${danceName.toUpperCase().slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`,
    [danceName]
  );

  const handleDownloadPDF = async () => {
    if (!certRef.current) return;
    setDownloading(true);

    try {
      // Dynamically import html2pdf in the browser
      const html2pdf = (await import("html2pdf.js")).default;
      
      const opt = {
        margin:       0,
        filename:     `Rhythm-of-India-Certificate.pdf`,
        image:        { type: 'jpeg' as const, quality: 1 },
        html2canvas:  { 
          scale: 2, 
          useCORS: true,
          backgroundColor: "#ffffff",
          foreignObjectRendering: false
        },
        jsPDF:        { unit: 'mm' as const, format: 'a4' as const, orientation: 'landscape' as const }
      };

      await html2pdf().set(opt).from(certRef.current).save();
    } catch (err) {
      console.error("PDF generation failed:", err);
      // Fallback to print
      window.print();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <main className="pt-28 pb-20 px-4 sm:px-6 max-w-4xl mx-auto space-y-8">
      {/* Top Congratulatory Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <div className="inline-flex items-center gap-2 bg-[#EFE7DA] border border-[#E8DEC8] rounded-full px-4 py-1.5 text-xs font-bold text-[#111111]">
          <Award size={15} className="text-[#B42318]" />
          <span>OFFICIAL ACCREDITATION DIPLOMA</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black uppercase text-[#111111] font-mono tracking-tight">
          Congratulations, {userName}!
        </h1>
        <p className="text-sm sm:text-base text-[#777777] max-w-lg mx-auto">
          You have successfully completed the <strong className="text-[#111111]">{danceName}</strong> masterclass curriculum and passed the verified knowledge assessment.
        </p>
      </motion.div>

      {/* ── Official Diploma Certificate Document ── */}
      <motion.div
        ref={certRef}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative bg-white border-4 border-[#111111] rounded-[36px] p-8 sm:p-16 mx-auto max-w-3xl overflow-hidden print:border-2 print:m-0"
      >
        {/* Ornate Red Corner Accents */}
        <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-[#B42318] rounded-tl-xl" />
        <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-[#B42318] rounded-tr-xl" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-[#B42318] rounded-bl-xl" />
        <div className="absolute bottom-4 right-4 w-12 h-12 border-b-4 border-r-4 border-[#B42318] rounded-br-xl" />

        <div className="text-center space-y-6">
          {/* Header Mark */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#111111] text-[#F8F1E6] flex items-center justify-center font-mono font-black text-xl mb-2">
              ♫
            </div>
            <p className="text-xs font-black uppercase tracking-[0.35em] text-[#777777] font-mono">
              RHYTHM OF INDIA ACADEMY
            </p>
            <p className="text-[10px] font-bold tracking-widest text-[#B42318] uppercase">
              SMART INDIA HACKATHON · NATIONAL HERITAGE PROTOCOL
            </p>
          </div>

          <div className="h-px w-24 bg-[#B42318] mx-auto" />

          {/* Certificate Title */}
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-[0.2em] text-[#111111] font-mono">
              CERTIFICATE OF MASTERY
            </h2>
            <p className="text-xs text-[#777777] mt-1 italic">This is proudly presented to</p>
          </div>

          {/* Scholar Name */}
          <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#111111] font-mono py-2 border-b-2 border-[#E5E5E5] max-w-md mx-auto">
            {userName}
          </h3>

          {/* Body Text */}
          <p className="text-xs sm:text-sm text-[#252525] max-w-lg mx-auto leading-relaxed font-medium">
            for successfully completing all curriculum modules, demonstrating mastery of classical hand mudras, rhythmic footwork (Tala), and expressive storytelling (Abhinaya) in the sacred tradition of{" "}
            <strong className="text-[#B42318] font-bold uppercase">{danceName}</strong>.
          </p>

          {/* Metadata & Seal Grid */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E8DEC8] items-center text-left sm:text-center text-xs">
            <div>
              <p className="font-mono font-bold text-[#111111]">{today}</p>
              <p className="text-[10px] text-[#777777] uppercase font-mono">DATE OF ISSUANCE</p>
            </div>

            {/* Red Digital Seal */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-[#B42318] bg-[#FDF2F2] flex flex-col items-center justify-center text-center p-1 shadow-sm">
                <CheckCircle2 size={18} className="text-[#B42318]" />
                <span className="text-[8px] font-black uppercase text-[#B42318] font-mono leading-tight">
                  OFFICIAL SEAL
                </span>
              </div>
            </div>

            <div>
              <p className="font-mono font-bold text-[#111111] truncate">{certId}</p>
              <p className="text-[10px] text-[#777777] uppercase font-mono">CREDENTIAL ID</p>
            </div>
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-8 pt-4 max-w-sm mx-auto text-center border-t border-[#F0EBE1]">
            <div>
              <p className="font-serif italic text-sm font-bold text-[#111111]">Guru Mandali</p>
              <p className="text-[9px] font-mono text-[#777777] uppercase">Lineage Academic Council</p>
            </div>
            <div>
              <p className="font-serif italic text-sm font-bold text-[#111111]">Directorate</p>
              <p className="text-[9px] font-mono text-[#777777] uppercase">Rhythm of India</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-center gap-4 pt-4 print:hidden"
      >
        <button
          onClick={() => router.push("/dashboard")}
          className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#EFE7DA] hover:bg-[#E8DEC8] text-[#111111] font-bold text-xs rounded-full transition-all active:scale-95 cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Return to Dashboard</span>
        </button>

        <button
          onClick={handleDownloadPDF}
          disabled={downloading}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#B42318] hover:bg-[#C92A1E] text-white font-black uppercase tracking-wider text-xs rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-[#B42318]/30 cursor-pointer disabled:opacity-60 disabled:cursor-wait disabled:hover:scale-100"
        >
          {downloading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download size={16} />
              <span>Download Certificate</span>
            </>
          )}
        </button>
      </motion.div>
    </main>
  );
}

export default function CertificatePage() {
  return (
    <div className="min-h-screen bg-[#F8F1E6] text-[#111111] selection:bg-[#B42318] selection:text-white">
      <Navbar />
      <Suspense
        fallback={
          <div className="h-screen flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#B42318] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <CertificateContent />
      </Suspense>
    </div>
  );
}
