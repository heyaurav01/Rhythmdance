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
      (selectedRegion === "east" && (d.region.toLowerCase().includes("east") || d.region.toLowerCase().includes("odisha") || d.region.toLowerCase().includes("manipur") || d.region.toLowerCase().includes("assam"))) ||
      (selectedRegion === "south" && (d.region.toLowerCase().includes("south") || d.region.toLowerCase().includes("tamil nadu") || d.region.toLowerCase().includes("andhra pradesh") || d.region.toLowerCase().includes("kerala"))) ||
      (selectedRegion === "north" && (d.region.toLowerCase().includes("north") && !d.region.toLowerCase().includes("northeast")));

    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-[#F8F1E6] text-[#111111] selection:bg-[#B42318] selection:text-white">
      <Navbar onSearch={setSearchQuery} />

      {/* ── 1. True Fullscreen Video Hero ── */}
      <section className="relative w-full h-screen overflow-hidden">
        {/* YouTube iframe stretched to cover full screen - no controls, no player UI */}
        <div className="absolute inset-0 w-full h-full pointer-events-none bg-black">
          <iframe
            src="https://www.youtube.com/embed/UBYqv21c0Yk?autoplay=1&mute=1&loop=1&playlist=UBYqv21c0Yk&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&disablekb=1"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            className="absolute"
            style={{
              top: '50%',
              left: '50%',
              width: '177.78vh', /* 16:9 aspect ratio */
              height: '56.25vw', /* 16:9 aspect ratio */
              minWidth: '100%',
              minHeight: '100%',
              transform: 'translate(-50%, -50%)',
              border: 'none',
              opacity: 0.75,
            }}
          />
        </div>

        {/* Dark gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/30 z-10" />

        {/* Hero Content — centered on screen */}
        <div className="relative z-20 flex flex-col items-start justify-center h-full px-8 sm:px-16 lg:px-24 max-w-7xl mx-auto">
          {/* Micro badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 text-xs font-bold text-white mb-8">
            <span className="w-2 h-2 rounded-full bg-[#B42318] animate-pulse" />
            <span>CLASSICAL INDIAN DANCE ACADEMY</span>
            <span className="text-white/50">·</span>
            <span className="text-[#B42318] uppercase">Est. 2026</span>
          </div>

          {/* Big cinematic headline */}
          <h1 className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black text-white tracking-tight uppercase font-mono leading-[0.9] mb-6 drop-shadow-2xl">
            RHYTHM <br />
            <span className="text-[#B42318]">OF INDIA</span>
          </h1>

          <p className="text-base sm:text-xl text-white/80 font-medium leading-relaxed max-w-xl mb-10">
            Learn India&apos;s classical dance traditions through movement,
            rhythm, expression and storytelling.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="#classical-forms"
              className="inline-flex items-center gap-2 bg-[#B42318] hover:bg-[#C92A1E] text-white px-8 py-4 rounded-full text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-2xl shadow-[#B42318]/40"
            >
              <span>Explore Dance Forms</span>
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white px-7 py-4 rounded-full text-sm font-bold transition-all duration-300"
            >
              <span>Get Lifetime Pass</span>
              <Sparkles size={14} className="text-[#B42318]" />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/50">
          <span className="text-[10px] font-bold tracking-widest uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent animate-pulse" />
        </div>
      </section>

      <main className="pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-12 pt-12">

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
                { id: "east", label: "East & NE" },
                { id: "south", label: "South" },
                { id: "north", label: "North" },
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
      </main>

      {/* ── 6. Real Footer ── */}
      <footer className="mt-24 bg-[#111111] text-[#F8F1E6] overflow-hidden relative shadow-2xl pt-24 sm:pt-36 flex flex-col justify-between" style={{ minHeight: '80vh' }}>
          {/* Top section */}
          <div className="px-10 sm:px-14 lg:px-24 flex-grow relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
              {/* Brand column */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-[#B42318] flex items-center justify-center font-black text-white text-3xl shadow-lg shadow-[#B42318]/20">♫</div>
                  <div>
                    <p className="text-3xl font-black uppercase font-mono tracking-tighter">RHYTHM OF INDIA</p>
                    <p className="text-sm text-[#777777] uppercase tracking-widest font-bold">Classical Dance Academy</p>
                  </div>
                </div>
                <p className="text-[#A0A0A0] text-lg max-w-md leading-relaxed mb-10">
                  Preserving India&apos;s sacred movement arts through a premium digital academy. Explore all 8 Indian classical dance forms, earn certificates, and learn from structured masterclasses.
                </p>
                {/* Social links - BIGGER */}
                <div className="flex flex-wrap items-center gap-4">
                  {/* X (Twitter) */}
                  <a href="#" aria-label="X (Twitter)" className="w-14 h-14 rounded-full border-2 border-white/10 flex items-center justify-center hover:bg-[#B42318] hover:border-[#B42318] transition-all hover:scale-110 group">
                    <svg className="w-6 h-6 text-white group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-14 h-14 rounded-full border-2 border-white/10 flex items-center justify-center hover:bg-[#B42318] hover:border-[#B42318] transition-all hover:scale-110 group">
                    <svg className="w-6 h-6 text-white group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                  </a>
                  {/* LinkedIn */}
                  <a href="#" aria-label="LinkedIn" className="w-14 h-14 rounded-full border-2 border-white/10 flex items-center justify-center hover:bg-[#B42318] hover:border-[#B42318] transition-all hover:scale-110 group">
                    <svg className="w-6 h-6 text-white group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" /></svg>
                  </a>
                  {/* Facebook */}
                  <a href="#" aria-label="Facebook" className="w-14 h-14 rounded-full border-2 border-white/10 flex items-center justify-center hover:bg-[#B42318] hover:border-[#B42318] transition-all hover:scale-110 group">
                    <svg className="w-6 h-6 text-white group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" clipRule="evenodd" /></svg>
                  </a>
                </div>
              </div>

              {/* Academy links */}
              <div className="pt-2">
                <h5 className="text-sm font-bold text-[#777777] uppercase tracking-widest font-mono mb-6">Academy</h5>
                <ul className="space-y-4 text-base text-gray-300 font-medium">
                  <li><Link href="/dashboard#classical-forms" className="hover:text-white transition-colors">Classical Traditions</Link></li>
                  <li><Link href="/dashboard#folk-forms" className="hover:text-white transition-colors">Folk Dances</Link></li>
                  <li><Link href="/learning" className="hover:text-white transition-colors">My Learning</Link></li>
                  <li><Link href="/certificate" className="hover:text-white transition-colors">Certificates</Link></li>
                  <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing Plans</Link></li>
                </ul>
              </div>

              {/* Support + GitHub */}
              <div className="pt-2">
                <h5 className="text-sm font-bold text-[#777777] uppercase tracking-widest font-mono mb-6">Connect</h5>
                <ul className="space-y-4 text-base text-gray-300 font-medium">
                  <li>
                    <a
                      href="https://github.com/heyaurav01/Rhythmdance"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                      GitHub Repository
                    </a>
                  </li>
                  <li><a href="mailto:megouravpaul2003@gmail.com" className="hover:text-white transition-colors">Contact Us</a></li>
                  <li><Link href="/settings" className="hover:text-white transition-colors">Settings</Link></li>
                  <li><Link href="/profile" className="hover:text-white transition-colors">My Profile</Link></li>
                </ul>

                {/* SIH 2026 badge */}
                <div className="mt-8 inline-flex items-center gap-2 bg-[#B42318]/20 border border-[#B42318]/40 text-[#B42318] px-4 py-2 rounded-xl text-sm font-bold font-mono">
                  <span className="w-2 h-2 rounded-full bg-[#B42318] animate-pulse" />
                  Rhythm of India
                </div>
              </div>
            </div>
          </div>

          {/* Watermark - increased size slightly and placed absolute behind */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-8 text-[26vw] leading-none font-black font-sans text-white/[0.03] tracking-tighter pointer-events-none select-none z-0 whitespace-nowrap overflow-hidden">
            rhythmofindia
          </div>

          {/* Bottom bar */}
          <div className="mt-16 px-10 sm:px-14 lg:px-24 py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10 bg-black/40 backdrop-blur-md">
            <p className="text-sm text-[#777777] font-mono font-medium">© 2026 Rhythm of India. All rights reserved.</p>
            <a
              href="https://github.com/heyaurav01/Rhythmdance"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#777777] hover:text-[#B42318] font-mono transition-colors flex items-center gap-2 font-medium"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
              heyaurav01/Rhythmdance
            </a>
          </div>
        </footer>
    </div>
  );
}



