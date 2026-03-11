import {
  Palette,
  Share2,
  Megaphone,
  Monitor,
  Camera,
  PenTool,
  TrendingUp,
  Users,
  CheckCircle,
  MapPin,
  Clock,
  Phone,
  Mail,
  Settings,
  Smartphone,
  BookOpen,
  ShoppingCart,
  CreditCard
} from 'lucide-react';
import { ServiceItem, PricingPackage, Testimonial, PortfolioItem } from './types';

export const COMPANY_NAME = "LMBS Marketing";
export const COMPANY_LOCATION = "Juja Square, 1st Floor, Juja, Kenya";
export const COMPANY_PHONE = "+254 115 999 101 / +254 705 459 768";
export const COMPANY_EMAIL = "info@lmbsmarketing.com";

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Packages', path: '/packages' },
  { name: 'Our Brands', path: '/brands' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Careers', path: '/careers' },
  { name: 'Contact', path: '/contact' },
  { name: 'Client Portal', path: '/client-dashboard' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'digital-marketing',
    title: 'Digital Marketing',
    description: 'Grow online, attract customers, and increase sales through data-driven digital strategies.',
    icon: Megaphone,
  },
  {
    id: 'branding',
    title: 'Branding & Creatives',
    description: 'Build strong, memorable brands that connect emotionally with your target audience.',
    icon: Palette,
  },
  {
    id: 'photography',
    title: 'Photography & Video',
    description: 'Professional visual content that elevates your brand and increases engagement.',
    icon: Camera,
  },
  {
    id: 'website-design',
    title: 'Website Design',
    description: 'Modern, responsive, and conversion-focused websites for businesses of all sizes.',
    icon: Monitor,
  },
  {
    id: 'website-maintenance',
    title: 'Website Maintenance',
    description: 'Ensure your website remains secure, fast, and up-to-date at all times.',
    icon: Settings,
  },
  {
    id: 'software-dev',
    title: 'Software & App Dev',
    description: 'Custom digital solutions, mobile apps, and business systems tailored to your needs.',
    icon: Smartphone,
  },
  {
    id: 'academic-writing',
    title: 'Academic Script Writing',
    description: 'Professional academic and research writing support for students and professionals.',
    icon: BookOpen,
  },
  {
    id: 'ecommerce',
    title: 'E-Commerce Development',
    description: 'Online stores that sell, scale, and accept payments easily.',
    icon: ShoppingCart,
  },
  {
    id: 'payment-integration',
    title: 'Payment Integration',
    description: 'Seamless M-PESA and card payment solutions for Kenyan businesses.',
    icon: CreditCard,
  }
];

export const MONTHLY_PACKAGES: PricingPackage[] = [
  {
    id: 'starter',
    title: 'Starter Package',
    price: '7,000',
    period: '/month',
    features: [
      '8 custom posters/flyers',
      '2 social media platforms management',
      '6 posts per week (24 posts per month)',
      '12 photos per month',
      'Dedicated Account Manager'
    ]
  },
  {
    id: 'growth',
    title: 'Growth Package',
    price: '12,000',
    period: '/month',
    features: [
      '15 custom made posters/flyers',
      '3 social media platforms account management',
      '16 product photos per month',
      '2 video reels/ads per month',
      '9 posts per week (36 posts per month)',
      'Dedicated Account Manager'
    ]
  },
  {
    id: 'business',
    title: 'Business Package',
    price: '17,000',
    period: '/month',
    features: [
      '18 custom made posters/flyers',
      '4 managed social media platforms',
      '12 posts per week (48 posts per month)',
      '25 product photos per month',
      '2 ad video reels per month',
      'Priority support',
      'Dedicated Account Manager'
    ]
  },
  {
    id: 'enterprise',
    title: 'Enterprise Package',
    price: '29,000',
    period: '/month',
    recommended: true,
    features: [
      '20 custom made posters/flyers',
      '4 managed social media platforms',
      '15 posts per week (60 posts per month)',
      '30 product photos per month',
      '4 ad/reel videos per month',
      '1 targeted ad campaign per month',
      'Priority support',
      'Dedicated Account Manager'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Kamau",
    role: "Marketing Director",
    company: "Juja City Mall",
    content: "LMBS transformed our online presence. Their team is creative, timely, and truly understands the Kenyan market.",
    rating: 5,
    image: "https://picsum.photos/seed/sarah/100/100"
  },
  {
    id: 2,
    name: "David Ochieng",
    role: "Founder",
    company: "TechSolutions Kenya",
    content: "The branding package we got was world-class. From the logo to the website, everything screams professionalism.",
    rating: 5,
    image: "https://picsum.photos/seed/david/100/100"
  },
  {
    id: 3,
    name: "Wanjiku Mwangi",
    role: "Owner",
    company: "Safari Eats Restaurant",
    content: "Since starting the Growth Package, our foot traffic has increased by 40%. Highly recommend LMBS!",
    rating: 5,
    image: "https://picsum.photos/seed/wanjiku/100/100"
  }
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { id: 1, title: 'EcoLodge Branding', category: 'Branding', image: 'https://picsum.photos/seed/branding1/600/400' },
  { id: 2, title: 'Nairobi Tech Web', category: 'Website', image: 'https://picsum.photos/seed/web1/600/400' },
  { id: 3, title: 'Fashion Campaign', category: 'Social Media', image: 'https://picsum.photos/seed/social1/600/400' },
  { id: 4, title: 'Corporate Event', category: 'Photography', image: 'https://picsum.photos/seed/photo1/600/400' },
  { id: 5, title: 'Coffee Shop Launch', category: 'Branding', image: 'https://picsum.photos/seed/branding2/600/400' },
  { id: 6, title: 'Real Estate Tour', category: 'Video', image: 'https://picsum.photos/seed/video1/600/400' },
];

export const WHY_CHOOSE_US = [
  { icon: MapPin, title: "Local Expertise", text: "Deep understanding of the Kenyan market." },
  { icon: CheckCircle, title: "Transparent Pricing", text: "No hidden fees. You know exactly what you pay for." },
  { icon: Palette, title: "All-in-One Creative", text: "Design, code, marketing, and strategy under one roof." },
  { icon: Clock, title: "Reliable Support", text: "We deliver on time and communicate effectively." },
];