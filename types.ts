import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  priceRange?: string;
  deliverables?: string[];
  features?: string[];
}

export interface PricingPackage {
  id: string;
  title: string;
  price: string;
  period: string; // e.g., "per month" or "one-time"
  features: string[];
  recommended?: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  description?: string;
  website_url?: string;
}