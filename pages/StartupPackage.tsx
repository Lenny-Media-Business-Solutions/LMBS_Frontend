import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, ShieldCheck, Clock, CheckCircle, CreditCard, Layout, Store, Key, Handshake, Users, TrendingUp, MessageCircle, Code2, PartyPopper, ChevronDown, ChevronUp, HelpCircle, Server } from 'lucide-react';
import { COMPANY_PHONE } from '../constants';

const PARTNER_TIERS = [
  {
    title: 'The "Starter" Partner',
    subtitle: '(Side Hustle)',
    icon: Layout,
    bestFor: 'Personal brands, consultants, or simple landing pages.',
    totalValue: 'KES 20,000',
    deposit: 'KES 8,000',
    depositNote: '40% Deposit',
    installment: 'KES 4,000',
    duration: '3 months',
    features: [
      'One-Page Website (Modern scrolling design)',
      'Domain Name (.co.ke or .com free for 1yr)',
      'Hosting Included during payment period',
      '2 Professional Business Emails',
      'WhatsApp Chat & Google Maps Integration',
      'Mobile Responsive Design',
      'No CMS Access (Managed to lower risk)'
    ],
    popular: false
  },
  {
    title: 'The "Business" Partner',
    subtitle: '(SME Standard)',
    icon: Rocket,
    bestFor: 'Established small businesses, NGOs, Law firms, Agencies.',
    totalValue: 'KES 45,000',
    deposit: 'KES 15,000',
    depositNote: '33% Deposit',
    installment: 'KES 5,000',
    duration: '6 months',
    features: [
      '5-7 Page Website (Home, About, Services, etc)',
      'Basic SEO Setup for Google',
      'High-performance Hosting included',
      '5 Professional Business Emails',
      'Social Media Integration',
      'Contact Forms & Blog functionality',
      'Editor CMS Access (Update text/images)'
    ],
    popular: true
  },
  {
    title: 'The "E-Commerce" Partner',
    subtitle: '(Duka Online)',
    icon: Store,
    bestFor: 'Boutiques, Electronics shops, Hardware stores selling online.',
    totalValue: 'KES 85,000',
    deposit: 'KES 25,000',
    depositNote: '30% Deposit',
    installment: 'KES 10,000',
    duration: '6 months',
    features: [
      'Full Online Store (WooCommerce/Custom)',
      'Upload up to 20 products (training provided)',
      'M-PESA & Card Payment Integration',
      'SSL Certificate & Daily Backups',
      'Shopping Cart & Checkout System',
      'Order Management Dashboard',
      'Priority Technical Support'
    ],
    popular: false
  }
];

const HOW_IT_WORKS_STEPS = [
  {
    icon: Rocket,
    title: "1. Pay Small Deposit, Launch Fast 🚀",
    content: "We help startups launch professional websites without paying everything upfront. Start with a small deposit, get a fully functional website, and complete payment pole pole over 3–6 months while we host and manage everything for you.",
    faq: {
      question: "How much deposit do I pay?",
      answer: "Typically 30–50% depending on the project scope."
    }
  },
  {
    icon: Server,
    title: "2. We Host, Maintain & Support Your Website 🛠️",
    content: "During the payment period, your website is securely hosted on our infrastructure. We handle hosting, backups, updates, security, and technical support so you can focus on growing your business.",
    faq: {
      question: "Can I host the website elsewhere during installments?",
      answer: "No. Hosting remains with us until the project is fully paid."
    }
  },
  {
    icon: Key,
    title: "3. Ownership Transfers After Full Payment 🔑",
    content: "Full ownership of the website—including source code, files, and database—is transferred to you after the final payment is completed.",
    faq: {
      question: "Do I own the website immediately?",
      answer: "You have full usage rights, but technical ownership transfers after final payment."
    }
  },
  {
    icon: Clock,
    title: "4. What Happens If Payments Delay? ⏸️",
    content: "We understand business challenges. If a payment is delayed, we offer a grace period. However, extended non-payment may lead to temporary suspension until payments resume.",
    faq: {
      question: "Will my website be deleted if I miss a payment?",
      answer: "No. Websites are suspended, not deleted, and can be restored once payments continue."
    }
  },
  {
    icon: ShieldCheck,
    title: "5. Transparent Pricing & No Hidden Charges 💡",
    content: "All costs are clearly outlined before the project begins. No hidden fees. No surprises. Just honest pricing designed for startups.",
    faq: {
      question: "Are there penalties for early completion?",
      answer: "No. You can clear the balance early and receive full ownership immediately."
    }
  }
];

const FAQS = [
  {
    question: "Why do I have to host with you during the payment period?",
    answer: "Hosting with us allows us to offer you the installment plan without running credit checks. It acts as our security while ensuring your website is maintained by the people who built it. It’s a win-win: you get financial flexibility, and we ensure the site runs perfectly."
  },
  {
    question: "Can I access the backend of my website?",
    answer: "Yes! You will have full access to the dashboard to update content, add products, and manage your business. However, deep technical access (like source code or server settings) is reserved for our team until the payment plan is complete to ensure system stability."
  },
  {
    question: "What happens if I miss a payment?",
    answer: "We know business can be tough. We offer a 5-day grace period for late payments. If payment is not received by then, the website will be temporarily paused until the account is brought up to date. No data will be lost during this time."
  },
  {
    question: "Once I finish paying, can I move my website to another host?",
    answer: "Absolutely. Once your balance is cleared, the website is 100% yours. We can continue hosting it for you at our standard rate, or we can package the files for you to move elsewhere."
  }
];

const StartupPackage: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToTiers = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('tiers');
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const getWhatsAppLink = (tierTitle: string) => {
    const message = `Hello LMBS, I am interested in the ${tierTitle} partnership program. Can you help me get started?`;
    // Clean phone number: remove spaces and +
    const cleanPhone = COMPANY_PHONE.replace(/[^0-9]/g, '');
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 py-24 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl -mr-20 -mt-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl -ml-16 -mb-16"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 font-bold text-sm mb-6 uppercase tracking-wider">
               <Handshake size={16} /> Entrepreneur Partnership Program
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6 leading-tight">
              We Don't Just Build Websites <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-orange-400">
                We Partner in Your Success
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              LMBS Marketing invests in your vision by lowering the barrier to entry. Get a world-class digital presence today, and pay comfortably as you grow.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                state={{ packageName: "Partner Program Application" }}
                className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-600 text-navy-900 text-lg font-bold px-10 py-4 rounded-full transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Apply for Partnership <Handshake size={20} />
              </Link>
              <button 
                onClick={scrollToTiers}
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-lg font-bold px-10 py-4 rounded-full transition-all backdrop-blur-md cursor-pointer"
              >
                View Tiers
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* The Partnership Pitch (Problem & Solution) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
               <div className="bg-navy-50 p-4 rounded-full">
                  <Users className="text-navy-900" size={40} />
               </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-900 mb-8 text-center">We Are Looking for Ambitious Entrepreneurs</h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed text-center">
              Starting a business is tough. Whether you are launching in Juja, Nairobi, or beyond, the cost of professional branding and development can be a massive hurdle.
            </p>
            <p className="text-lg text-gray-700 mb-10 leading-relaxed text-center">
              At LMBS, we decided to change the game. Instead of asking for huge upfront fees, we treat our relationship as a <span className="font-bold text-gold-600">Partnership</span>. We invest our time and expertise into building your platform now, trusting that as you succeed, we succeed.
            </p>
            
            <div className="bg-gradient-to-r from-navy-900 to-navy-800 p-8 md:p-12 rounded-3xl shadow-xl relative overflow-hidden group hover:scale-[1.01] transition-transform duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                 <div className="md:w-3/4">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                      <Handshake className="text-gold-500" /> The Partner Promise
                    </h3>
                    <p className="text-lg text-gray-200 italic leading-relaxed font-medium">
                      “Get your dream website live today with just a deposit! Pay the balance monthly while we host, maintain, and support your website. Ownership is fully yours once the payment plan ends. Flexible, affordable, and perfect for Kenyan startups ready to grow online.”
                    </p>
                 </div>
                 <div className="md:w-1/4 flex flex-col gap-3 w-full">
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                       <CheckCircle size={16} className="text-teal-400" /> 0% Interest
                    </div>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                       <CheckCircle size={16} className="text-teal-400" /> Full Support
                    </div>
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                       <CheckCircle size={16} className="text-teal-400" /> Cancel Anytime
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-gold-600 font-bold uppercase tracking-wider text-sm">The Journey</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-900 mb-4 mt-2">How Our Partnership Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">A transparent roadmap to your digital independence.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <div key={index} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)] bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                <div className="w-16 h-16 bg-navy-50 rounded-2xl flex items-center justify-center text-navy-900 mb-6 shadow-inner">
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-4 leading-tight">{step.title}</h3>
                <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                  {step.content}
                </p>
                <div className="mt-auto bg-gold-50/50 p-4 rounded-xl border border-gold-100">
                  <p className="font-bold text-navy-900 text-xs mb-1 flex items-center gap-2">
                    <HelpCircle size={14} className="text-gold-500 fill-current"/> FAQ: {step.faq.question}
                  </p>
                  <p className="text-gray-600 text-sm italic">
                    "{step.faq.answer}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section id="tiers" className="py-24 bg-navy-900 relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
           <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Choose Your Tier</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Select the package that fits your current business stage. Upgrade anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {PARTNER_TIERS.map((tier, index) => (
              <div 
                key={index}
                className={`rounded-3xl p-8 flex flex-col relative transition-all duration-300 ${
                  tier.popular 
                    ? 'bg-white text-navy-900 transform scale-105 shadow-2xl z-10' 
                    : 'bg-navy-800 text-white border border-navy-700 hover:border-gold-500/50'
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-gold-500 to-orange-500 text-white font-bold px-6 py-2 rounded-full shadow-lg uppercase tracking-wider text-sm">
                    Most Popular
                  </div>
                )}

                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                  tier.popular ? 'bg-navy-100 text-navy-900' : 'bg-navy-700 text-gold-500'
                }`}>
                  <tier.icon size={28} />
                </div>

                <h3 className="text-2xl font-heading font-bold mb-1">{tier.title}</h3>
                <p className={`text-sm font-medium mb-6 ${tier.popular ? 'text-gray-500' : 'text-gray-400'}`}>{tier.subtitle}</p>
                
                <div className="mb-8 p-4 rounded-xl bg-opacity-50 bg-gray-100/10 border border-gray-200/20">
                   <div className="flex justify-between items-end mb-2">
                     <span className="text-sm opacity-80">Deposit</span>
                     <span className={`text-xl font-bold ${tier.popular ? 'text-navy-900' : 'text-white'}`}>{tier.deposit}</span>
                   </div>
                   <div className="w-full bg-gray-200/30 rounded-full h-2 mb-4">
                     <div className="bg-gold-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                   </div>
                   <div className="flex justify-between items-end">
                     <span className="text-sm opacity-80">Then Pay</span>
                     <span className={`text-lg font-bold ${tier.popular ? 'text-teal-600' : 'text-teal-400'}`}>{tier.installment}<span className="text-xs font-normal opacity-70">/mo</span></span>
                   </div>
                   <div className="text-center mt-2 text-xs opacity-60">
                     for {tier.duration} only
                   </div>
                </div>

                <div className="flex-grow">
                  <h4 className="font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wide opacity-80">
                    <ShieldCheck size={16} /> What you get
                  </h4>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm">
                        <CheckCircle size={16} className={`shrink-0 mt-0.5 ${
                          tier.popular ? 'text-teal-500' : 'text-teal-400'
                        }`} />
                        <span className={tier.popular ? 'text-gray-600' : 'text-gray-300'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 mt-auto">
                  <Link
                    to="/contact"
                    state={{ packageName: `Partner Program: ${tier.title}` }}
                    className={`block w-full text-center py-4 rounded-xl font-bold transition-all shadow-lg ${
                      tier.popular 
                        ? 'bg-navy-900 text-white hover:bg-navy-800' 
                        : 'bg-gold-500 text-navy-900 hover:bg-gold-400'
                    }`}
                  >
                    Apply Now
                  </Link>
                  <a
                    href={getWhatsAppLink(tier.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-4 rounded-xl font-bold transition-all border flex items-center justify-center gap-2 bg-[#25D366] text-white hover:bg-[#128C7E] border-transparent shadow-md"
                  >
                    <MessageCircle size={18} /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold text-navy-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about partnering with LMBS.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {FAQS.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className="font-bold text-lg text-navy-900 pr-4">{faq.question}</span>
                  <div className={`p-2 rounded-full transition-colors ${openFaq === index ? 'bg-gold-100 text-gold-600' : 'bg-gray-100 text-gray-400'}`}>
                     {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-navy-900 mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            We understand that partnership is a big step. Our team is available to answer all your questions about ownership, payments, and deliverables.
          </p>
          <div className="flex justify-center gap-6">
             <Link to="/contact" className="text-navy-900 font-bold border-b-2 border-navy-900 pb-1 hover:text-gold-600 hover:border-gold-600 transition-colors">
               Contact Support
             </Link>
             <Link to="/services" className="text-navy-900 font-bold border-b-2 border-navy-900 pb-1 hover:text-gold-600 hover:border-gold-600 transition-colors">
               View All Services
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StartupPackage;