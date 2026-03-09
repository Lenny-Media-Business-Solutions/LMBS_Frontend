import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Star } from 'lucide-react';
import { MONTHLY_PACKAGES } from '../constants';

const Packages: React.FC = () => {
  const [activeCategory, setActiveCategory] = React.useState('All');

  const SPECIAL_PACKAGES = [
    {
      title: "Starter Package",
      price: "25,900",
      category: "Website Development",
      description: "Ideal for: Small businesses, personal brands, startups",
      deliveryTime: "7–10 working days",
      features: [
        "Up to 10 professional pages (Home, About, Services, Contact, Gallery/Blog)",
        "Mobile-responsive design",
        "Clean, modern layout",
        "Contact form + WhatsApp integration",
        "Social media links",
        "Basic SEO setup",
        "Speed & security basics",
        "1 month post-launch support"
      ]
    },
    {
      title: "Business Package",
      price: "45,300",
      category: "Website Development",
      description: "Ideal for: Growing businesses, agencies, SMEs",
      deliveryTime: "14–21 working days",
      features: [
        "Up to 15 custom-designed pages",
        "Fully responsive (mobile, tablet, desktop)",
        "Custom UI/UX design (no generic templates)",
        "Advanced contact & inquiry forms",
        "Google Maps integration",
        "Blog / News section",
        "SEO-ready structure",
        "Speed optimization",
        "2 months post-launch support"
      ]
    },
    {
      title: "E-Commerce Package",
      price: "97,500",
      category: "Website Development",
      description: "Ideal for: Online shops, product-based businesses",
      deliveryTime: "21–30 working days",
      features: [
        "Product catalog (up to 50 products)",
        "Shopping cart & checkout system",
        "M-Pesa & card payment integration",
        "Order & inventory management",
        "Customer accounts",
        "Mobile-friendly design",
        "Basic admin training",
        "Security & performance setup"
      ]
    },
    {
      title: "Premium / Custom Package",
      price: "From 177,900",
      category: "Website Development",
      description: "Ideal for: Corporations, schools, platforms, and advanced systems",
      deliveryTime: "Project-based",
      features: [
        "Fully custom design & functionality",
        "Admin dashboard & user management",
        "Custom features (booking systems, portals, integrations)",
        "High-level security & optimization",
        "API & third-party integrations",
        "Scalable architecture",
        "Priority support & maintenance options"
      ]
    },
    // Photography & Videography
    {
      title: "Professional Photography Only",
      price: "15,000",
      category: "Photography and Videography",
      description: "Comprehensive photography coverage",
      features: [
        "A Certified Photographer for 6 Hours",
        "Edited High-Resolution Digital Photo Files (Copyright Released)",
        "Unlimited Coverage Locations",
        "Unlimited Photos Captured",
        "One A3 Photo Mount",
        "Drive/Cloud Storage Shared link"
      ]
    },
    {
      title: "Classic Photo & Video",
      price: "20,000",
      category: "Photography and Videography",
      description: "Standard photo and video coverage",
      features: [
        "A Certified Photographer for 4 Hours",
        "A Certified Videographer for 4 Hours",
        "Photography Coverage",
        "Video Coverage",
        "5–15 Minute Edited HD Highlight Film",
        "Unlimited Coverage Locations",
        "Unlimited Photos & Video Captured"
      ]
    },
    {
      title: "Event Coverage Photo & Video",
      price: "25,000",
      category: "Photography and Videography",
      description: "Full event coverage service",
      features: [
        "A Certified Photographer for 6 Hours",
        "A Certified Videographer for 6 Hours",
        "Edited High-Resolution Digital Photo Files (Copyright Released)",
        "Unlimited Edited photos for the event",
        "A 30–60 Minute Edited HD Film",
        "Unlimited Coverage Locations",
        "Unlimited Photos & Video Captured"
      ]
    },
    {
      title: "Commercial Short Video Clips",
      price: "3,500/clip",
      category: "Photography and Videography",
      description: "Transport Exclusive, Min 2 Videos",
      features: [
        "15sec–1min Video",
        "1080p HD Resolution",
        "One location shoot",
        "Simple Editing with minimal video effects",
        "One Professional Camera & Videographer",
        "English Subtitle"
      ]
    },
    {
      title: "Wedding Bronze Package",
      price: "35,000",
      category: "Photography and Videography",
      description: "6am to 6pm Coverage Period",
      features: [
        "1 Professional Video Camera",
        "1 Professional Photography Camera",
        "Certified Videographer & Photographer",
        "Unlimited Unedited Photos",
        "30–60min Edited HD Film",
        "16GB USB Flash drive",
        "2 A4 Photo Mounts"
      ]
    },
    {
      title: "Wedding Silver Package",
      price: "50,000",
      category: "Photography and Videography",
      description: "Premium wedding coverage",
      features: [
        "Unlimited Edited Soft Digital Photos",
        "1 A2 + 1 A3 Photo Mount",
        "Photo Album",
        "30–60 Minute Edited HD Film",
        "2 Professional Videographers + 1 Photographer (8 hrs)",
        "16GB Flash Drive",
        "Unlimited Coverage Locations & Video"
      ]
    },
    {
      title: "Wedding Gold Package",
      price: "65,000",
      category: "Photography and Videography",
      description: "6am to 6pm Unlimited Locations",
      features: [
        "Unlimited Edited Soft Digital Photos",
        "60–90 HD Edited Film",
        "20-page Photobook",
        "One A2 + One A3 Photo Mount",
        "32GB USB Flash Drive",
        "1 Professional Drone Pilot",
        "Drone Video Shoot included",
        "Full Videography & Photography Team"
      ]
    },
    {
      title: "Live Stream Services",
      price: "From 25,000",
      category: "Photography and Videography",
      description: "Live streaming up to 6 hours/day",
      features: [
        "YouTube, Facebook, or Zoom streaming",
        "ONE professional video camera: KES 25,000",
        "TWO professional video cameras: KES 35,000",
        "Professional audio integration",
        "Stable streaming setup"
      ]
    }
  ];

  const filteredPackages = activeCategory === 'All'
    ? SPECIAL_PACKAGES
    : SPECIAL_PACKAGES.filter(pkg => pkg.category === activeCategory);

  return (
    <div className="pt-20">
      <div className="bg-navy-900 py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Our Packages</h1>
          <p className="text-xl text-gray-300">Clear, transparent pricing to help you plan your growth.</p>
        </div>
      </div>

      {/* Monthly Retainers */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navy-900 mb-4">Monthly Retainer Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive all-in-one solutions that include Design, Social Media, Ads, and Web Maintenance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {MONTHLY_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`flex flex-col relative p-8 rounded-3xl border transition-all hover:-translate-y-2 duration-300 ${pkg.recommended
                  ? 'border-gold-500 shadow-2xl bg-white ring-4 ring-gold-500/10'
                  : 'border-gray-200 bg-white hover:shadow-xl'
                  }`}
              >
                {pkg.recommended && (
                  <div className="bg-gold-500 text-white text-xs font-bold px-4 py-1.5 rounded-full w-max absolute -top-3 left-1/2 transform -translate-x-1/2 uppercase tracking-wide">
                    Best Value
                  </div>
                )}
                <h3 className="text-xl font-bold text-navy-900 mb-2">{pkg.title}</h3>
                <div className="flex items-baseline mb-6">
                  <span className="text-sm font-medium opacity-70">KES</span>
                  <span className="text-3xl font-bold mx-1 text-navy-900">{pkg.price}</span>
                  <span className="text-sm opacity-70">{pkg.period}</span>
                </div>

                <div className="flex-grow">
                  <ul className="space-y-4 mb-8">
                    {pkg.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <Check size={16} className="text-teal-500 shrink-0 mt-0.5" />
                        <span className={feature.toLowerCase().includes('web') && pkg.id !== 'bronze' ? 'font-bold text-navy-900' : ''}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  to="/contact"
                  state={{ packageName: pkg.title }}
                  className={`block w-full text-center py-3 rounded-xl font-bold transition-all ${pkg.recommended
                    ? 'bg-gold-500 hover:bg-gold-600 text-white'
                    : 'bg-navy-900 hover:bg-navy-800 text-white'
                    }`}
                >
                  Choose {pkg.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One-Off Packages */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-900 mb-8">One-Off Project Packages</h2>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {['All', 'Website Development', 'Photography and Videography'].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full font-bold transition-all ${activeCategory === category
                    ? 'bg-gold-500 text-white shadow-lg'
                    : 'bg-white text-navy-900 border border-gray-200 hover:border-gold-500'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {filteredPackages.map((pkg, idx) => (
              <div key={idx} className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 flex flex-col hover:shadow-xl transition-shadow duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-navy-900">{pkg.title}</h3>
                    <p className="text-gray-500 mt-2 text-sm">{pkg.description}</p>
                    {pkg.deliveryTime && (
                      <p className="text-teal-600 font-medium mt-1 text-xs">Delivery: {pkg.deliveryTime}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <span className="text-xl font-bold text-gold-600">
                      {pkg.price.includes('From') ? pkg.price : `KES ${pkg.price}`}
                    </span>
                  </div>
                </div>
                <hr className="border-gray-100 my-6" />
                <ul className="space-y-3 mb-8 flex-grow">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                      <Star size={14} className="text-gold-500 fill-current shrink-0 mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  state={{ packageName: pkg.title }}
                  className="w-full block text-center bg-navy-900 text-white hover:bg-gold-500 hover:text-navy-900 font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-xl transform hover:-translate-y-1"
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Packages;