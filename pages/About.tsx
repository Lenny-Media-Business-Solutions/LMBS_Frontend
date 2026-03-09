import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, MapPin, Palette, ShieldCheck, Users, Zap, TrendingUp, Award } from 'lucide-react';

import aboutTeamImg from '../assets/images/about_team.png';

const About: React.FC = () => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-navy-900 py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">About LMBS Marketing</h1>
          <p className="text-xl text-gray-300">Creativity meets Strategy in the heart of Digital world.</p>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-heading font-bold text-navy-900 mb-6">Who We Are</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                LMBS Marketing is a premier creative and digital agency based in Juja Square, Kenya. We were founded with a simple belief: that every Kenyan business, regardless of size, deserves world-class branding and digital representation.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We empower businesses to thrive in the digital age. Combining cutting-edge creativity with data-driven strategies, we deliver tailored solutions that elevate brands, engage audiences, increase sales, and drive measurable growth.
              </p>
              <div className="flex items-center gap-2 text-gold-600 font-semibold mt-6">
                <MapPin size={20} />
                <span>Juja Square, 1st Floor, Juja</span>
              </div>
            </motion.div>

            <div className="relative bg-navy-50 rounded-2xl shadow-xl min-h-[300px]">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl"></div>
              )}
              <img
                src={aboutTeamImg}
                alt="Our Team"
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                className={`rounded-2xl w-full transition-opacity duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg border-l-4 border-gold-500 hidden md:block z-10">
                <p className="font-bold text-navy-900 text-2xl">5+ Years</p>
                <p className="text-sm text-gray-500">Of Digital Excellence</p>
              </div>
            </div>
          </div>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="bg-navy-50 p-10 rounded-3xl border border-navy-100">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center text-gold-500 mb-6 shadow-md">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To help businesses grow by delivering innovative, data-driven, and creative marketing solutions that connect brands with their audiences, strengthen their presence, and drive measurable results.
              </p>
            </div>
            <div className="bg-navy-50 p-10 rounded-3xl border border-navy-100">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center text-teal-500 mb-6 shadow-md">
                <Lightbulb size={32} />
              </div>
              <h3 className="text-2xl font-bold text-navy-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the leading creative partner that empowers businesses to grow, connect, and thrive through innovative marketing solutions that inspire lasting impact.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-heading font-bold text-navy-900 mb-4">Our Core Values</h2>
              <p className="text-gray-600 text-lg">At LMBS, our work is guided by principles that ensure every project delivers meaningful impact. </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Creativity",
                  description: "We push boundaries to deliver fresh, original ideas that set our clients apart.",
                  icon: Palette,
                },
                {
                  title: "Excellence",
                  description: "We are committed to the highest standards in every project we undertake.",
                  icon: Award,
                },
                {
                  title: "Integrity",
                  description: "We build trust through honesty, transparency, and accountability.",
                  icon: ShieldCheck,
                },
                {
                  title: "Collaboration",
                  description: "We believe in the power of partnership, working closely with clients to achieve shared success.",
                  icon: Users,
                },
                {
                  title: "Innovation",
                  description: "We embrace new trends, technologies, and strategies to keep clients ahead of the competition.",
                  icon: Zap,
                },
                {
                  title: "Results-Driven",
                  description: "We focus on measurable outcomes that fuel growth and long-term impact.",
                  icon: TrendingUp,
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white p-8 rounded-2xl border border-navy-50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="mb-6 text-gold-500 group-hover:scale-110 transition-transform duration-300">
                    <value.icon size={32} strokeWidth={1.5} />
                  </div>
                  <h4 className="text-xl font-bold text-navy-900 mb-3 group-hover:text-gold-600 transition-colors">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Who We Serve */}
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-heading font-bold text-navy-900 mb-10">Who We Serve</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {['SMEs', 'Startups', 'Corporates', 'Schools', 'Churches', 'NGOs', 'Real Estate'].map((client, i) => (
                <span key={i} className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-full shadow-sm hover:shadow-md hover:border-gold-400 hover:text-gold-600 transition-all cursor-default font-medium">
                  {client}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;