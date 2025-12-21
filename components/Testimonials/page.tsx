"use client";
import { motion } from "framer-motion";

export default function Testimonial() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-64 h-64 md:w-80 md:h-80 bg-blue-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse" />
        <div className="absolute w-80 h-80 md:w-[28rem] md:h-[28rem] bg-purple-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse" />
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 text-center">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
          What Our Users Say
        </h2>
        <p className="text-gray-300 mb-16 text-base md:text-lg">
          Real stories from people using{" "}
          <span className="text-blue-400 font-semibold">Skill Wrap</span> every day 🚀
        </p>

        {/* Testimonials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {["John Doe", "Alex Smith", "Sarah Kim"].map((name, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="group bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 
                         p-6 md:p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-blue-400/40"
            >
              <p className="italic text-gray-200 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                “Skill Wrap has completely changed how I manage my projects. It’s intuitive, sleek, and super easy to use ✨”
              </p>
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white font-bold shadow-md group-hover:scale-110 transition">
                  {name[0]}
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-base md:text-lg">{name}</h4>
                  <span className="text-gray-400 text-xs md:text-sm">
                    {i === 0
                      ? "Freelance Developer"
                      : i === 1
                      ? "Graphic Designer"
                      : "University Student"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}














// export default function testimonial() {
//     return(

//       <section className="py-20 bg-gradient-to-r from-[#0f172a] to-[#1e293b]">
//         <div className="max-w-6xl mx-auto px-8 text-center">
//           <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
//           <p className="text-gray-400 mb-12">
//             Real stories from people using Skill Wrap every day.
//           </p>

//           <div className="grid md:grid-cols-3 gap-8">
//             {["John Doe", "Alex Smith", "Sarah Kim"].map((name, i) => (
//               <div
//                 key={i}
//                 className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-lg hover:scale-105 transition"
//               >
//                 <p className="italic text-gray-300 mb-6">
//                   “Skill Wrap has completely changed how I manage my projects.
//                   Intuitive and sleek!”
//                 </p>
//                 <div className="flex items-center gap-4">
//                   <div className="text-left">
//                     <h4 className="font-semibold">{name}</h4>
//                     <span className="text-gray-400 text-sm">
//                       {i === 0
//                         ? "Freelance Developer"
//                         : i === 1
//                         ? "Graphic Designer"
//                         : "University Student"}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//     )
// }