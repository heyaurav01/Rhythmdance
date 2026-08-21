"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useProgress } from "@/context/ProgressContext";
import Navbar from "@/components/Navbar";
import DanceCard from "@/components/DanceCard";
import { danceStyles, DanceStyle } from "@/data/danceData";
import {
  Sparkles,
  ArrowRight,
  Play,
  Award,
  BookOpen,
  MapPin,
  CheckCircle2,
  TrendingUp,
  Flame,
} from "lucide-react";

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const { completedLessons, getProgress } = useProgress();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("all");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F8F1E6]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#B42318] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#111111] font-bold font-mono text-sm tracking-wider animate-pulse">
            LOADING RHYTHM OF INDIA...
          </p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  // Calculate total completed lessons across all dance forms
  const totalLessonsCount = danceStyles.reduce(
    (acc, d) => acc + d.lessons.length,
    0
  );
  const totalCompletedCount = Object.values(completedLessons).reduce(
    (acc, lessons) => acc + lessons.length,
    0
  );
  const overallPercentage = Math.round(
    (totalCompletedCount / Math.max(1, totalLessonsCount)) * 100
  );

  // Find the most recently active or first dance style
  const activeDance: DanceStyle =
    danceStyles.find(
      (d) => (completedLessons[d.slug]?.length || 0) < d.lessons.length
    ) || danceStyles[0];
  const activeCompleted = completedLessons[activeDance.slug]?.length || 0;
  const activeCurrentLessonIndex = Math.min(
    activeCompleted,
    activeDance.lessons.length - 1
  );
  const activeCurrentLesson = activeDance.lessons[activeCurrentLessonIndex];

  // Filter dance forms based on search query and region tab
  const filteredDanceStyles = danceStyles.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.tagline.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion =
      selectedRegion === "all" ||
      (selectedRegion === "east" && d.slug === "odissi") ||
      (selectedRegion === "south" &&
        (d.slug === "bharatanatyam" || d.slug === "kuchipudi")) ||
      (selectedRegion === "north" && d.slug === "kathak");

    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-[#F8F1E6] text-[#111111] selection:bg-[#B42318] selection:text-white">
      <Navbar onSearch={setSearchQuery} />

      <main className="pt-24 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12">
        {/* ── 1. Editorial Hero Header ── */}
        <section className="relative pt-6 sm:pt-10 pb-4 border-b border-[#E8DEC8]">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-3xl">
              {/* Micro badge */}
              <div className="inline-flex items-center gap-2 bg-[#EFE7DA] border border-[#E8DEC8] rounded-full px-3.5 py-1 text-xs font-bold text-[#111111] mb-6">
                <span className="w-2 h-2 rounded-full bg-[#B42318] animate-pulse" />
                <span>CLASSICAL INDIAN DANCE ACADEMY</span>
                <span className="text-[#777777]">·</span>
                <span className="text-[#B42318] uppercase">SIH 2026</span>
              </div>

              {/* Large Editorial Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#111111] tracking-tight uppercase font-mono leading-[0.95]">
                RHYTHM <br />
                <span className="text-[#B42318]">OF INDIA</span>
              </h1>

              <p className="mt-5 text-base sm:text-lg text-[#252525] font-medium leading-relaxed max-w-2xl">
                Learn India&apos;s classical dance traditions through movement,
                rhythm, expression and storytelling. Master centuries of sacred
                heritage through structured masterclasses.
              </p>
            </div>

            {/* Quick Action Pills & Stats */}
            <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-3">
              <Link
                href="#dance-forms"
                className="inline-flex items-center gap-2 bg-[#B42318] hover:bg-[#C92A1E] text-white px-6 py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-[#B42318]/20 cursor-pointer"
              >
                <span>Explore Dance Forms</span>
                <ArrowRight size={16} />
              </Link>

              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 bg-[#111111] hover:bg-[#252525] text-[#F8F1E6] px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 shadow-sm"
              >
                <span>Get Lifetime Pass</span>
                <Sparkles size={14} className="text-[#B42318]" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── 2. Dominant "Continue Learning" Feature Banner ── */}
        <section className="relative overflow-hidden rounded-[32px] bg-[#111111] text-[#F8F1E6] border border-[#252525] shadow-2xl">
          <div className="grid lg:grid-cols-12 items-center">
            {/* Left: Content */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 z-10 flex flex-col justify-between h-full">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#252525] text-[#F8F1E6] border border-white/10 rounded-full px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider mb-4">
                  <Flame size={13} className="text-[#B42318]" />
                  <span>CONTINUE LEARNING</span>
                  <span className="text-[#777777]">·</span>
                  <span className="text-gray-300">{activeDance.editorialTag}</span>
                </div>

                <h3 className="text-3xl sm:text-5xl font-black text-white uppercase font-mono tracking-tight leading-none mb-2">
                  {activeDance.name}
                </h3>

                <p className="text-sm sm:text-base text-gray-300 font-medium mb-4">
                  {activeCurrentLesson?.title} — {activeDance.tagline}
                </p>

                {activeDance.guru && (
                  <p className="text-xs text-[#777777] italic mb-6">
                    Taught in the tradition of {activeDance.guru}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-bold text-gray-400 font-mono">
                    CURRENT PROGRESS
                  </p>
                  <p className="text-lg font-black text-white font-mono">
                    Lesson {activeCurrentLessonIndex + 1} of{" "}
                    {activeDance.lessons.length}
                    <span className="text-[#B42318] ml-2">
                      ({getProgress(activeDance.slug, activeDance.lessons.length)}
                      %)
                    </span>
                  </p>
                </div>

                <Link
                  href={`/dance/${activeDance.slug}`}
                  className="inline-flex items-center gap-2.5 bg-[#B42318] hover:bg-[#C92A1E] text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-[#B42318]/30 cursor-pointer"
                >
                  <Play size={14} className="fill-white" />
                  <span>Resume Lesson</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Right: Cinematic Visual */}
            <div className="lg:col-span-5 relative h-64 sm:h-80 lg:h-full min-h-[300px] overflow-hidden">
              <Image
                src={activeDance.image}
                alt={activeDance.name}
                fill
                priority
                className="object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#111111] via-transparent to-transparent" />
            </div>
          </div>
        </section>

        {/* ── 3. "Your Lessons" / Learning Journey Progress Bar (Directly matching Art Course reference) ── */}
        <section className="bg-[#EFE7DA] border border-[#E8DEC8] rounded-[28px] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[#B42318] font-black text-lg">✦</span>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-[#111111] font-mono">
                  Your lessons (4)
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#777777] font-semibold mt-1">
                <span className="text-[#B42318] font-bold">
                  {totalCompletedCount}
                </span>{" "}
                /{totalLessonsCount} lessons completed ({overallPercentage}%)
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/certificate"
                className="inline-flex items-center gap-1.5 bg-white hover:bg-[#F8F1E6] border border-[#E8DEC8] text-[#111111] px-4 py-2 rounded-full text-xs font-bold transition-colors"
              >
                <Award size={14} className="text-[#B42318]" />
                <span>Certificates</span>
              </Link>

              <Link
                href="#classical-forms"
                className="bg-[#B42318] hover:bg-[#C92A1E] text-white px-4 py-2 rounded-full text-xs font-bold transition-colors shadow-sm"
              >
                Show all
              </Link>
            </div>
          </div>

          {/* Segmented red progress bar (16 segments like reference) */}
          <div className="grid grid-cols-8 sm:grid-cols-16 gap-1.5 sm:gap-2">
            {Array.from({ length: 16 }).map((_, idx) => {
              const segmentPercent = (idx + 1) * (100 / 16);
              const isFilled = overallPercentage >= segmentPercent;
              return (
                <div
                  key={idx}
                  className={`h-2.5 rounded-full transition-all duration-700 ${
                    isFilled ? "bg-[#B42318]" : "bg-[#E8DEC8]"
                  }`}
                />
              );
            })}
          </div>
        </section>



        {/* ── 4. Classical Dance Forms Section & Filter Tabs ── */}
        <section id="classical-forms" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#B42318] uppercase tracking-widest font-mono">
                <span>02 // CURRICULUM</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#111111] font-mono tracking-tight mt-1">
                Classical Traditions
              </h2>
            </div>

            {/* Region Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-[#EFE7DA] border border-[#E8DEC8] p-1 rounded-full text-xs font-bold">
              {[
                { id: "all", label: "All Traditions" },
                { id: "east", label: "East (Odissi)" },
                { id: "south", label: "South" },
                { id: "north", label: "North (Kathak)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedRegion(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                    selectedRegion === tab.id
                      ? "bg-[#111111] text-[#F8F1E6] shadow-sm"
                      : "text-[#777777] hover:text-[#111111]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Grid (Image-First Editorial Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredDanceStyles.filter(d => d.category === "classical").map((dance, i) => (
              <DanceCard
                key={dance.slug}
                dance={dance}
                index={i}
                featured={i === 0}
              />
            ))}
          </div>
        </section>

        {/* ── 5. Folk & Traditional Dance Forms Section ── */}
        <section id="folk-forms" className="space-y-6 pt-12 pb-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-t border-[#E8DEC8] pt-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#B42318] uppercase tracking-widest font-mono">
                <span>03 // EXPLORE</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#111111] font-mono tracking-tight mt-1">
                Folk & Traditional
              </h2>
            </div>
          </div>

          {/* Cards Grid for Folk Dances */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDanceStyles.filter(d => d.category === "folk").map((dance, i) => (
              <DanceCard
                key={dance.slug}
                dance={dance}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* ── 6. Culture / Premium Black Footer ── */}
        <footer className="mt-16 bg-[#111111] text-[#F8F1E6] rounded-[32px] p-10 sm:p-14 overflow-hidden relative shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            <div className="lg:col-span-2">
              <h4 className="text-2xl sm:text-3xl font-black uppercase font-mono tracking-tight mb-4">
                Rhythm <span className="text-[#B42318]">of India</span>
              </h4>
              <p className="text-gray-400 text-sm max-w-sm leading-relaxed mb-8">
                Preserving India&apos;s sacred movement arts through a premium digital academy. Learn from masters, achieve excellence.
              </p>
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#B42318] hover:border-[#B42318] transition-all cursor-pointer">
                  {/* IG Icon placeholder */}
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                </span>
                <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#B42318] hover:border-[#B42318] transition-all cursor-pointer">
                  {/* Twitter Icon placeholder */}
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </span>
                <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#B42318] hover:border-[#B42318] transition-all cursor-pointer">
                  {/* YouTube Icon placeholder */}
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" /></svg>
                </span>
              </div>
            </div>

            <div>
              <h5 className="text-[11px] font-bold text-[#777777] uppercase tracking-widest font-mono mb-4">Academy</h5>
              <ul className="space-y-3 text-sm text-gray-300 font-medium">
                <li><Link href="#classical-forms" className="hover:text-white transition-colors">Classical Traditions</Link></li>
                <li><Link href="#folk-forms" className="hover:text-white transition-colors">Folk Dances</Link></li>
                <li><Link href="/certificate" className="hover:text-white transition-colors">Certificates</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="text-[11px] font-bold text-[#777777] uppercase tracking-widest font-mono mb-4">Support</h5>
              <ul className="space-y-3 text-sm text-gray-300 font-medium">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="relative z-10 mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[#777777] font-medium font-mono">
            <p>© 2026 Rhythm of India. All rights reserved.</p>
            <p>SIH 2026 Prototype</p>
          </div>
          
          {/* Subtle watermark background */}
          <div className="absolute right-[-10%] bottom-[-20%] text-[200px] font-black font-mono text-white/5 tracking-tighter pointer-events-none select-none z-0">
            INDIA
          </div>
        </footer>
      </main>
    </div>
  );
}
