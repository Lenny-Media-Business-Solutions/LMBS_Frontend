import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, Video, Camera, Mic2 } from 'lucide-react';

const OurBrands: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Header */}
      <div className="bg-navy-900 py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Brands</h1>
          <p className="text-xl text-gray-300">Expanding the LMBS ecosystem to serve you better.</p>
        </div>
      </div>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="bg-navy-900 p-12 flex flex-col justify-center items-center text-center relative overflow-hidden">
                {/* Decorative background */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/camera-aperture.png')]"></div>

                <div className="relative z-10 bg-white/10 p-8 rounded-full mb-6 backdrop-blur-sm">
                  <Video size={64} className="text-gold-500" />
                </div>
                <h2 className="text-3xl font-heading font-bold text-white mb-2 tracking-wide">LENNY MEDIA</h2>
                <p className="text-gold-500 font-semibold tracking-widest text-sm">KENYA</p>
              </div>

              <div className="p-10 md:p-12 flex flex-col justify-center">
                <div className="inline-block px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-xs font-bold mb-6 w-max">
                  SISTER BRAND
                </div>
                <h3 className="text-3xl font-bold text-navy-900 mb-6">Lenny Media Kenya</h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Lenny Media Kenya is our dedicated arm for high-end multimedia production. Specializing in corporate photography, documentary filmmaking, event coverage, and podcast production, Lenny Media brings your brand's story to life through the lens.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <Camera className="text-teal-500" size={20} />
                    <span className="text-gray-700 font-medium">Professional Photography</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Video className="text-teal-500" size={20} />
                    <span className="text-gray-700 font-medium">Video Production & Editing</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mic2 className="text-teal-500" size={20} />
                    <span className="text-gray-700 font-medium">Audio & Podcast Services</span>
                  </div>
                </div>

                <button className="flex items-center gap-2 text-navy-900 font-bold hover:text-gold-600 transition-colors group">
                  <span>Visit Lenny Media</span>
                  <ExternalLink size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-navy-900 mb-4">Want to work with our brands?</h2>
          <p className="text-gray-600 mb-8">Whether it's strategy with LMBS or production with Lenny Media, we have you covered.</p>
          <Link to="/contact" className="inline-block bg-navy-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gold-500 transition-colors">
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default OurBrands;