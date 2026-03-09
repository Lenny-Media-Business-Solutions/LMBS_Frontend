import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Check, TrendingUp, Globe, ChevronRight, PlayCircle, Layers, Users, Zap, Layout, Loader2, Clock, Briefcase, Building2, Award } from 'lucide-react';
import { SERVICES, MONTHLY_PACKAGES, TESTIMONIALS, WHY_CHOOSE_US } from '../constants';

const WaveBackground = () => (
   <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] pointer-events-none">
      {/* First Wave Layer */}
      <motion.svg
         animate={{ x: [0, -400, 0] }}
         transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
         className="relative block w-[300%] h-[120px] md:h-[200px]"
         viewBox="0 0 1200 120"
         preserveAspectRatio="none"
      >
         <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="white" opacity="0.05"></path>
      </motion.svg>

      {/* Second Wave Layer */}
      <motion.svg
         animate={{ x: [-400, 0, -400] }}
         transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
         className="absolute bottom-0 left-0 block w-[300%] h-[100px] md:h-[160px]"
         viewBox="0 0 1200 120"
         preserveAspectRatio="none"
      >
         <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="white" opacity="0.03"></path>
      </motion.svg>

      {/* Third Wave Layer (Faster, lighter) */}
      <motion.svg
         animate={{ x: [0, -600, 0] }}
         transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
         className="absolute bottom-0 left-0 block w-[400%] h-[80px] md:h-[100px]"
         viewBox="0 0 1200 120"
         preserveAspectRatio="none"
      >
         <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="white" opacity="0.02"></path>
      </motion.svg>
   </div>
);

const Home: React.FC = () => {
   return (
      <div className="pt-20 bg-white">
         {/* 1. HERO SECTION: Premium Split Layout */}
         <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-navy-900">
            {/* Navy Gradient Background */}
            <div
               className="absolute inset-0 z-0"
               style={{
                  background: 'linear-gradient(135deg, #020617 0%, #0f172a 100%)'
               }}
            ></div>

            {/* Glossy Stardust Pattern Overlay */}
            <div className="absolute inset-0 z-[1] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.1]"></div>

            {/* Dynamic Background Elements */}
            <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[100px]"></div>

            {/* Dynamic Wave Background */}
            <WaveBackground />

            <div className="container mx-auto px-4 lg:px-6 relative z-10">
               <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                  {/* Left Column: Text Content */}
                  <motion.div
                     initial={{ opacity: 0, x: -50 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.8, ease: "easeOut" }}
                     className="w-full lg:w-1/2 text-left"
                  >
                     {/* Badge */}
                     <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-navy-900/40 backdrop-blur-md text-xs font-bold text-gray-200 mb-8 uppercase tracking-widest">
                        <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(255,122,0,0.8)]"></span>
                        Creative Agency Kenya
                     </div>

                     {/* Headline */}
                     <h1 className="text-3xl md:text-5xl xl:text-6xl font-heading font-extrabold text-white leading-[1.1] mb-6 tracking-tight">
                        We Build <span className="text-[#ff7a00]">Digital Experiences</span> That Drive Real Growth.
                     </h1>

                     {/* Subtext */}
                     <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-[580px]">
                        LMBS Marketing blends strategy, design, and technology to help ambitious Kenyan brands stand out, scale faster, and lead their industries.
                     </p>

                     {/* CTA Buttons */}
                     <div className="flex flex-col sm:flex-row gap-5 mb-14">
                        <Link
                           to="/quote"
                           className="group relative overflow-hidden bg-[#ff7a00] text-white font-bold text-lg px-8 py-4 rounded-full transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(255,122,0,0.5)] flex items-center justify-center gap-2"
                        >
                           <span className="relative z-10">Start Your Project</span>
                           <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                           to="/portfolio"
                           className="bg-transparent hover:bg-white text-white hover:text-navy-950 border-2 border-white/20 hover:border-white font-bold text-lg px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                           Explore Our Work
                        </Link>
                     </div>

                     {/* Stats Row */}
                     <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-white/10">
                        <div className="flex items-center gap-3">
                           <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                              <Briefcase size={16} className="text-orange-500" />
                           </div>
                           <span className="text-sm font-semibold text-gray-300">50+ Projects Delivered</span>
                        </div>
                        <div className="w-px h-6 bg-white/10 hidden md:block"></div>
                        <div className="flex items-center gap-3">
                           <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                              <Building2 size={16} className="text-orange-500" />
                           </div>
                           <span className="text-sm font-semibold text-gray-300">10+ Industries Served</span>
                        </div>
                        <div className="w-px h-6 bg-white/10 hidden md:block"></div>
                        <div className="flex items-center gap-3">
                           <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                              <Award size={16} className="text-orange-500" />
                           </div>
                           <span className="text-sm font-semibold text-gray-300">5+ Years Experience</span>
                        </div>
                     </div>
                  </motion.div>

                  {/* Right Column: High-Quality Image */}
                  <motion.div
                     initial={{ opacity: 0, scale: 0.9, x: 50 }}
                     animate={{ opacity: 1, scale: 1, x: 0 }}
                     transition={{ duration: 1, delay: 0.2 }}
                     className="w-full lg:w-1/2 relative group"
                  >
                     {/* Orange Glow Behind Image */}
                     <div className="absolute -inset-4 bg-[#ff7a00]/10 rounded-[2rem] blur-2xl group-hover:bg-[#ff7a00]/20 transition-all duration-700"></div>

                     {/* Image Container */}
                     <div className="relative z-10 rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
                        {/* Overlay for Readability/Premium Look */}
                        <div className="absolute inset-0 bg-navy-950/40 z-[2] group-hover:bg-navy-950/20 transition-all duration-700"></div>

                        <img
                           src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200"
                           alt="Creative Team Collaborating"
                           className="w-full h-full object-cover aspect-[4/3] md:aspect-auto md:h-[600px] transform group-hover:scale-105 transition-transform duration-1000"
                        />
                     </div>

                     {/* Floating Badge on Image (Optional touch for premium feel) */}
                     <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-2xl shadow-2xl hidden md:flex items-center gap-4 border border-gray-100"
                     >
                        <div className="w-12 h-12 bg-navy-900 rounded-xl flex items-center justify-center text-orange-500">
                           <Star size={24} fill="currentColor" />
                        </div>
                        <div>
                           <div className="text-navy-950 font-black text-xl leading-none">4.9/5</div>
                           <div className="text-gray-500 text-xs font-bold uppercase tracking-wider mt-1">Client Rating</div>
                        </div>
                     </motion.div>
                  </motion.div>
               </div>
            </div>
         </section>

         {/* 2. LOGO CLOUD / TRUST */}
         <div className="py-10 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4">
               <p className="text-center text-gray-400 font-bold uppercase tracking-widest text-xs mb-6">Trusted by growing businesses across Kenya</p>
               <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                  {/* Placeholder Logos */}
                  {['A', 'B', 'C', 'D', 'E'].map((item, i) => (
                     <div key={i} className="text-2xl font-black text-navy-900 flex items-center gap-2">
                        <div className="w-8 h-8 bg-navy-900 rounded-full"></div> CLIENT {item}
                     </div>
                  ))}
               </div>
            </div>
         </div>

         {/* 3. ABOUT / MANIFESTO */}
         <section className="py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
               <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl md:text-5xl font-heading font-bold text-navy-900 mb-8 leading-tight">
                     We Don't Just Design. <br />
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-navy-900">
                        We Solve Business Problems.
                     </span>
                  </h2>
                  <p className="text-xl text-gray-600 leading-relaxed mb-12">
                     In a crowded digital space, "good enough" doesn't cut it. You need a partner who understands the Kenyan market, consumer behavior, and world-class design standards. That's us.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                     {WHY_CHOOSE_US.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100">
                           <item.icon className="text-gold-500 mb-4" size={32} />
                           <h3 className="font-bold text-lg text-navy-900 mb-2">{item.title}</h3>
                           <p className="text-gray-600 text-sm">{item.text}</p>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* 4. SERVICES SHOWCASE */}
         <section className="py-24 bg-navy-900 text-white relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
               <div className="flex justify-between items-end mb-16">
                  <div>
                     <span className="text-gold-500 font-bold uppercase tracking-widest text-sm">Our Expertise</span>
                     <h2 className="text-4xl md:text-5xl font-heading font-bold mt-2">What We Do Best</h2>
                  </div>
                  <Link to="/services" className="hidden md:flex items-center gap-2 text-gold-400 font-bold hover:text-white transition-colors">
                     View All Services <ArrowRight size={20} />
                  </Link>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {SERVICES.slice(0, 6).map((service, i) => (
                     <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="group p-8 rounded-3xl bg-navy-800 border border-white/5 hover:border-gold-500/50 hover:bg-navy-700 transition-all duration-300"
                     >
                        <div className="w-14 h-14 bg-navy-900 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:bg-gold-500 group-hover:text-navy-900 transition-colors">
                           <service.icon size={28} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 group-hover:text-gray-300">
                           {service.description}
                        </p>
                        <Link to="/services" className="text-sm font-bold text-gold-500 flex items-center gap-2 group-hover:gap-3 transition-all">
                           Learn more <ChevronRight size={16} />
                        </Link>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* 5. PRICING / PACKAGES PREVIEW */}
         <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
               <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-900 mb-4">Pricing That Makes Sense</h2>
                  <p className="text-gray-600">Transparent packages designed for growth.</p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {MONTHLY_PACKAGES.slice(0, 3).map((pkg) => (
                     <div key={pkg.id} className={`bg-white p-8 rounded-3xl shadow-sm border ${pkg.recommended ? 'border-gold-500 ring-4 ring-gold-500/10' : 'border-gray-100'} hover:shadow-xl transition-all`}>
                        {pkg.recommended && <div className="text-gold-600 font-bold text-xs uppercase tracking-widest mb-2">Most Popular</div>}
                        <h3 className="text-xl font-bold text-navy-900 mb-2">{pkg.title}</h3>
                        <div className="text-3xl font-bold text-navy-900 mb-6">KES {pkg.price} <span className="text-sm font-normal text-gray-500">/mo</span></div>

                        <ul className="space-y-3 mb-8">
                           {pkg.features.slice(0, 4).map((f, i) => (
                              <li key={i} className="flex gap-3 text-sm text-gray-600">
                                 <Check size={16} className="text-teal-500 shrink-0 mt-0.5" />
                                 {f}
                              </li>
                           ))}
                        </ul>

                        <Link to="/packages" className={`block w-full text-center py-3 rounded-xl font-bold transition-colors ${pkg.recommended ? 'bg-gold-500 text-white hover:bg-gold-600' : 'bg-gray-100 text-navy-900 hover:bg-gray-200'}`}>
                           View Details
                        </Link>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* 6. BIG CTA */}
         <section className="py-24 bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-orange-500/10 rounded-t-[3rem] mx-4 md:mx-10 translate-y-20"></div>
            <div className="container mx-auto px-4 text-center relative z-10">
               <h4 className="text-3xl md:text-5xl font-heading font-black text-navy-900 mb-6">Let's Create Something Epic.</h4>
               <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                  Ready to take your brand to the next level? Book a free discovery call with our team.
               </p>
               <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/contact" className="bg-navy-900 text-white font-bold text-lg px-10 py-4 rounded-full hover:scale-105 transition-transform shadow-2xl">
                     Book Consultation
                  </Link>
                  <Link to="/services" className="bg-white text-navy-900 border border-gray-200 font-bold text-lg px-10 py-4 rounded-full hover:bg-gray-50 transition-colors">
                     Explore Our Services
                  </Link>
               </div>
            </div>
         </section>

      </div>
   );
};

export default Home;