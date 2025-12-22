"use client"


import Skills from "@/components/skill/page";
import Hero from "@/components/hero/Hero";
import Testimonial from "@/components/Testimonials/page";


export default function Home() {
  return (
    <div>
      <main  className=" absolute inset-0 -z-10 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] backdrop-blur-3xl min-h-screen">
        <Hero />
        <Skills />
        <Testimonial />
      </main>
    </div>
  );
}


