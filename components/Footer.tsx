import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from 'lucide-react';
import { COMPANY_NAME, COMPANY_LOCATION, COMPANY_EMAIL, COMPANY_PHONE, NAV_LINKS } from '../constants';

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-900 text-gray-300 pt-16 pb-8 border-t border-navy-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div>
            <h3 className="text-2xl font-heading font-bold text-white mb-6">
              <span className="text-gold-500">LMBS</span> Marketing
            </h3>
            <p className="mb-6 leading-relaxed">
              We create digital experiences that transform businesses. From Juja to the world, we are your partners in growth.
            </p>
            <div className="flex space-x-4">
              <a href={import.meta.env.VITE_FACEBOOK_URL || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors"><Facebook size={20} /></a>
              <a href={import.meta.env.VITE_INSTAGRAM_URL || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors"><Instagram size={20} /></a>
              <a href={import.meta.env.VITE_TWITTER_URL || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors"><Twitter size={20} /></a>
              <a href={import.meta.env.VITE_LINKEDIN_URL || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors"><Linkedin size={20} /></a>
              <a href={import.meta.env.VITE_TIKTOK_URL || "#"} target="_blank" rel="noopener noreferrer" className="hover:text-gold-500 transition-colors"><TikTokIcon size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map(link => (
                <li key={link.name}>
                  <Link to={link.path} className="hover:text-gold-500 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Services</h4>
            <ul className="space-y-3">
              <li><Link to="/services" className="hover:text-gold-500 transition-colors">Branding & Design</Link></li>
              <li><Link to="/services" className="hover:text-gold-500 transition-colors">Social Media Marketing</Link></li>
              <li><Link to="/services" className="hover:text-gold-500 transition-colors">Web Development</Link></li>
              <li><Link to="/services" className="hover:text-gold-500 transition-colors">Video Production</Link></li>
              <li><Link to="/services" className="hover:text-gold-500 transition-colors">Digital Strategy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-gold-500 shrink-0 mt-1" size={18} />
                <span>{COMPANY_LOCATION}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-gold-500 shrink-0" size={18} />
                <span>{COMPANY_PHONE}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-gold-500 shrink-0" size={18} />
                <span>{COMPANY_EMAIL}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/contact" className="hover:text-gold-500">Privacy Policy</Link>
            <Link to="/contact" className="hover:text-gold-500">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;