"use client";

import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import { User, Award, Shield, MapPin, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfilePage() {
  const { user } = useAuth();
  
  const userName = user?.isAnonymous
    ? "Guest Explorer"
    : user?.email?.split("@")[0] || "Classical Scholar";
    
  const userInitial = userName.trim().charAt(0).toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-[#F8F1E6] text-[#111111] selection:bg-[#B42318] selection:text-white">
      <Navbar />
      
      <main className="pt-32 pb-20 px-4 sm:px-6 max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <h1 className="text-3xl sm:text-5xl font-black uppercase text-[#111111] font-mono tracking-tight">
            My Profile
          </h1>
          <p className="text-sm text-[#777777]">Manage your scholar identity</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-[32px] p-8 sm:p-12 border border-[#E8DEC8] shadow-sm max-w-2xl mx-auto"
        >
          <div className="flex flex-col items-center space-y-6">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-[#111111] text-white flex items-center justify-center text-4xl font-black uppercase shadow-lg border-4 border-[#F8F1E6]">
              {userInitial}
            </div>
            
            {/* Info */}
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-black capitalize text-[#111111] font-mono">
                {userName}
              </h2>
              <p className="text-sm text-[#777777]">
                {user?.email || "guest@rhythmofindia.org"}
              </p>
              
              <div className="pt-2 flex items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 bg-[#B42318]/10 text-[#B42318] px-3 py-1 rounded-full text-xs font-bold">
                  <Sparkles size={12} />
                  Classical Scholar
                </span>
                <span className="inline-flex items-center gap-1.5 bg-[#EFE7DA] text-[#777777] px-3 py-1 rounded-full text-xs font-bold">
                  <MapPin size={12} />
                  India
                </span>
              </div>
            </div>
            
            <div className="w-full h-px bg-[#E8DEC8] my-4" />
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 w-full text-center">
              <div className="p-4 bg-[#F8F1E6] rounded-2xl border border-[#E8DEC8]">
                <Shield size={24} className="text-[#B42318] mx-auto mb-2" />
                <p className="text-2xl font-black font-mono">0</p>
                <p className="text-[10px] font-bold text-[#777777] uppercase tracking-wider">Lessons Finished</p>
              </div>
              <div className="p-4 bg-[#F8F1E6] rounded-2xl border border-[#E8DEC8]">
                <Award size={24} className="text-[#B42318] mx-auto mb-2" />
                <p className="text-2xl font-black font-mono">0</p>
                <p className="text-[10px] font-bold text-[#777777] uppercase tracking-wider">Certificates</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
