import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Megaphone, Palette, Camera, Monitor, Settings,
  Smartphone, BookOpen, ShoppingCart, CreditCard,
  CheckCircle2, ArrowRight, ChevronRight, Sparkles
} from 'lucide-react';

// Data Structure reflecting the user's detailed content
const DETAILED_SERVICES = [
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    icon: Megaphone,
    description: "We help businesses in Kenya and across Africa grow online, attract customers, and increase sales through data-driven digital strategies.",
    subsections: [
      {
        title: "Social Media Marketing",
        items: ["Facebook, Instagram, TikTok, X (Twitter), LinkedIn", "Content creation & posting schedules", "Page optimization & branding", "Community management & replies"]
      },
      {
        title: "Influencer Marketing",
        items: [
          "Influencer identification & vetting (micro and macro creators)",
          "Campaign strategy & creative concept development",
          "Influencer outreach, negotiation & contract coordination",
          "Campaign execution & content management",
          "Performance tracking & ROI reporting"
        ]
      },
      {
        title: "Social Media Management",
        items: [
          "Content calendar planning & scheduling",
          "Branded visual content & short-form video creation",
          "Caption writing & hashtag strategy",
          "Community engagement & inbox management",
          "Monthly performance insights & optimization"
        ]
      },
      {
        title: "Paid Advertising (Ads Management)",
        items: ["Facebook & Instagram Ads", "Google Search & Display Ads", "TikTok Ads", "Budget setup & optimization", "Ad copywriting & creatives"]
      },
      {
        title: "Search Engine Optimization (SEO)",
        items: ["Keyword research (Kenya-focused searches)", "On-page SEO optimization", "Google My Business setup & optimization", "Local SEO for Kenyan businesses"]
      },
      {
        title: "Email & SMS Marketing",
        items: ["Promotional SMS campaigns", "Bulk SMS integration", "Email newsletter design & automation"]
      },
      {
        title: "Analytics & Reporting",
        items: ["Monthly performance reports", "Traffic, leads & conversion tracking"]
      }
    ]
  },
  {
    id: "branding",
    title: "Branding & Creatives",
    icon: Palette,
    description: "We build strong, memorable brands that connect emotionally with your target audience.",
    subsections: [
      {
        title: "Brand Strategy",
        items: ["Brand identity development", "Brand voice & messaging", "Target audience analysis"]
      },
      {
        title: "Logo Design",
        items: ["Primary & secondary logos", "Logo variations for print & digital", "High-resolution files"]
      },
      {
        title: "Visual Identity",
        items: ["Brand colors & typography", "Brand guidelines document"]
      },
      {
        title: "Creative Design",
        items: ["Social media posters", "Flyers, brochures & banners", "Business cards & letterheads", "Company profiles & pitch decks"]
      },
      {
        title: "Rebranding Services",
        items: ["Logo redesign", "Brand refresh for growing businesses"]
      }
    ]
  },
  {
    id: "photography",
    title: "Photography & Videography",
    icon: Camera,
    description: "Professional visual content that elevates your brand and increases engagement.",
    subsections: [
      {
        title: "Photography Services",
        items: ["Product photography", "Corporate & business portraits", "Event photography", "Real estate & interior photography"]
      },
      {
        title: "Videography Services",
        items: ["Promotional & marketing videos", "Social media reels & short videos", "Corporate documentaries", "Event coverage"]
      },
      {
        title: "Post-Production",
        items: ["Photo retouching & editing", "Video editing & color grading", "Motion graphics & subtitles"]
      },
      {
        title: "Content Optimization",
        items: ["Videos optimized for Instagram, TikTok & YouTube", "High-quality export formats"]
      }
    ]
  },
  {
    id: "website-design",
    title: "Website Design",
    icon: Monitor,
    description: "We design modern, responsive, and conversion-focused websites for businesses of all sizes.",
    subsections: [
      {
        title: "Custom Website Design",
        items: ["Unique UI/UX design", "Mobile-friendly & responsive layout"]
      },
      {
        title: "Business Websites",
        items: ["Corporate websites", "Portfolio websites", "NGO & institutional websites"]
      },
      {
        title: "Landing Pages",
        items: ["Sales & lead generation pages"]
      },
      {
        title: "Content Integration",
        items: ["Text, images & videos", "Contact forms & inquiry systems"]
      },
      {
        title: "SEO-Ready Structure",
        items: ["Clean URLs", "Fast loading speeds"]
      },
      {
        title: "Website Security",
        items: ["SSL certificate setup", "Basic security configuration"]
      }
    ]
  },
  {
    id: "website-maintenance",
    title: "Website Maintenance",
    icon: Settings,
    description: "We ensure your website remains secure, fast, and up-to-date at all times.",
    subsections: [
      {
        title: "Core Updates",
        items: ["Regular website updates", "Content updates & uploads", "Website backups", "Security monitoring"]
      },
      {
        title: "Performance & Support",
        items: ["Bug fixes & error resolution", "Speed & performance optimization", "Uptime monitoring", "Technical support"]
      }
    ]
  },
  {
    id: "software-dev",
    title: "Software & Mobile App Development",
    icon: Smartphone,
    description: "Custom digital solutions tailored to your business needs.",
    subsections: [
      {
        title: "Custom Software Development",
        items: ["Business management systems", "CRM & ERP systems", "Inventory & POS systems"]
      },
      {
        title: "Mobile App Development",
        items: ["Android applications", "iOS applications", "Cross-platform apps"]
      },
      {
        title: "Web Applications",
        items: ["Dashboards & portals", "SaaS platforms"]
      },
      {
        title: "Technical Execution",
        items: ["Third-party API Integrations", "Quality assurance testing", "App deployment & support"]
      }
    ]
  },
  // {
  //   id: "academic-writing",
  //   title: "Academic Script Writing",
  //   icon: BookOpen,
  //   description: "Professional academic and research writing support for students and professionals.",
  //   subsections: [
  //     {
  //       title: "Writing Services",
  //       items: ["Research proposals", "Term papers & assignments", "Dissertations & theses", "Literature reviews"]
  //     },
  //     {
  //       title: "Analysis & Presentation",
  //       items: ["Data analysis & interpretation", "PowerPoint presentations"]
  //     },
  //     {
  //       title: "Quality Assurance",
  //       items: ["Editing & proofreading", "Referencing (APA, MLA, Harvard, Chicago)", "Plagiarism checking & originality assurance"]
  //     }
  //   ],
  //   note: "Note: All academic work is provided for research and reference purposes only."
  // },
  {
    id: "ecommerce",
    title: "E-Commerce Website Development",
    icon: ShoppingCart,
    description: "We build online stores that sell, scale, and accept payments easily.",
    subsections: [
      {
        title: "Store Setup",
        items: ["Custom e-commerce website design", "Product catalog setup", "Shopping cart & checkout system", "Order & inventory management"]
      },
      {
        title: "Customer Features",
        items: ["Customer accounts & profiles", "Discount & coupon systems", "Mobile-friendly shopping experience"]
      },
      {
        title: "Optimization",
        items: ["SEO & performance optimization", "Integration with delivery & logistics platforms"]
      }
    ]
  },
  {
    id: "payment-integration",
    title: "Payment Integration",
    icon: CreditCard,
    description: "Seamless and secure payment solutions for Kenyan and international customers.",
    subsections: [
      {
        title: "M-PESA Integration",
        items: ["STK Push", "Paybill & Till Number integration"]
      },
      {
        title: "Other Payment Gateways",
        items: ["Cards (Visa & Mastercard)", "Bank payments", "PayPal & international payments"]
      },
      {
        title: "Technical Implementation",
        items: ["Automated order confirmation", "Payment status notifications", "Secure payment processing", "Transaction testing & validation", "Payment flow setup & documentation"]
      }
    ]
  }
];

const Services: React.FC = () => {
  const [activeService, setActiveService] = useState(DETAILED_SERVICES[0].id);
  const location = useLocation();

  // Smooth scroll handler
  const scrollToService = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setActiveService(id);
    }
  };

  // Update active state on scroll
  useEffect(() => {
    const handleScroll = () => {
      const headerOffset = 150;
      // Reverse loop to find the last element that is above the offset line
      for (let i = DETAILED_SERVICES.length - 1; i >= 0; i--) {
        const service = DETAILED_SERVICES[i];
        const element = document.getElementById(service.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= headerOffset) {
            setActiveService(service.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle hash navigation
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash) {
      // Small delay to ensure the page is rendered
      setTimeout(() => {
        scrollToService(hash);
      }, 100);
    }
  }, [location.hash]);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-navy-900 py-20 text-center text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[100px] -mr-20 -mt-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-500/10 rounded-full blur-[80px] -ml-20 -mb-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6">
              Our <span className="text-gold-500">Expertise</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              We provide end-to-end digital solutions designed to help Kenyan businesses thrive.
              From strategy to execution, we cover it all.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/quote"
                className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-8 py-3 rounded-full transition-all hover:scale-105 shadow-lg"
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Layout */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Desktop Sticky Sidebar Navigation */}
            <div className="hidden lg:block w-1/4">
              <div className="sticky top-32 space-y-6">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="p-4 bg-navy-900 text-white font-bold text-lg">
                    Service Menu
                  </div>
                  <div className="py-2">
                    {DETAILED_SERVICES.map((service, index) => (
                      <button
                        key={service.id}
                        onClick={() => scrollToService(service.id)}
                        className={`w-full text-left px-5 py-3 text-sm font-medium transition-all flex items-center justify-between group ${activeService === service.id
                          ? 'text-gold-600 bg-gold-50 border-l-4 border-gold-500'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-navy-900 border-l-4 border-transparent'
                          }`}
                      >
                        <span className="truncate mr-2">{index + 1}. {service.title}</span>
                        {activeService === service.id && <ChevronRight size={16} />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quick CTA in Sidebar */}
                <div className="bg-gradient-to-br from-gold-500 to-orange-500 rounded-2xl p-6 text-white text-center shadow-lg">
                  <h3 className="font-bold text-xl mb-2">Ready to start?</h3>
                  <p className="text-sm opacity-90 mb-4">Let's discuss how we can help your business grow.</p>
                  <Link to="/contact" className="block w-full bg-white text-navy-900 font-bold py-2 rounded-lg hover:bg-navy-900 hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="w-full lg:w-3/4 space-y-20">
              {DETAILED_SERVICES.map((service, index) => (
                <div key={service.id} id={service.id} className="scroll-mt-32">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-8">
                      <div className="bg-navy-900 text-white p-4 rounded-2xl shadow-lg shrink-0">
                        <service.icon size={32} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-gold-500 font-bold text-sm tracking-wider uppercase">Service {index + 1}</span>
                          <div className="h-px bg-gold-200 w-12"></div>
                        </div>
                        <h2 className="text-3xl font-heading font-bold text-navy-900">{service.title}</h2>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm mb-8">
                      <p className="text-lg text-gray-700 leading-relaxed mb-6">
                        {service.description}
                      </p>

                      {/* Note for Academic Writing
                      {service.note && (
                        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4 rounded-r-lg">
                          <p className="text-amber-800 text-sm italic font-medium">{service.note}</p>
                        </div>
                      )} */}

                      <h3 className="text-lg font-bold text-navy-900 mb-6 flex items-center gap-2">
                        <Sparkles className="text-gold-500" size={20} />
                        What's Included:
                      </h3>

                      {/* Subsections Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {service.subsections.map((sub, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:border-gold-200 hover:shadow-md transition-all">
                            <h4 className="font-bold text-navy-900 mb-3 border-b border-gray-200 pb-2">{sub.title}</h4>
                            <ul className="space-y-2">
                              {sub.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                                  <CheckCircle2 size={16} className="text-teal-500 shrink-0 mt-0.5" />
                                  <span className="leading-snug">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 flex justify-end">
                        <Link
                          to="/quote"
                          className="inline-flex items-center gap-2 text-gold-600 font-bold hover:text-gold-700 transition-colors group"
                        >
                          Request this service <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-navy-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Not sure what you need?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Our team is ready to analyze your business and recommend the perfect strategy.
          </p>
          <Link
            to="/contact"
            className="bg-gold-500 hover:bg-gold-600 text-navy-900 text-lg font-bold px-12 py-4 rounded-full shadow-2xl transition-all hover:scale-105 inline-block"
          >
            Book a Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;