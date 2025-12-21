"use client"


import Link from "next/link";
import Skills from "@/components/skill/page";
import Hero from "@/components/hero/Hero";
import Testimonial from "@/components/Testimonials/page";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Users, MessageCircle, Layers } from "lucide-react";

export default function Home() {
  return (
    <div>
      <main  className=" absolute inset-0 -z-10 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] backdrop-blur-3xl min-h-screen">
      {/* <main  className=" absolute inset-0 -z-10 bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] backdrop-blur-3xl min-h-screen"> */}
  {/* <main className="font-poppins text-white bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] min-h-screen"> */}
      <Hero />
      <Skills />
      <Testimonial />
    </main></div>
  );
}


