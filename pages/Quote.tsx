import React, { useState } from 'react';
import { Send, Check, Loader2, Code, Megaphone, Palette } from 'lucide-react';
import { motion } from 'framer-motion';
import { submitQuote } from '../services/api';

const SERVICE_GROUPS = [
  {
    id: "development",
    title: "Web & Development",
    icon: Code,
    theme: "gold",
    borderColor: "border-gold-500",
    bgColor: "bg-gold-50",
    activeBg: "bg-gold-500",
    items: [
      "Custom Website Design",
      "E-Commerce Development",
      "Website Maintenance",
      "Software & Mobile Apps",
      "Payment Integration (M-PESA)"
    ]
  },
  {
    id: "marketing",
    title: "Digital Marketing",
    icon: Megaphone,
    theme: "teal",
    borderColor: "border-teal-500",
    bgColor: "bg-teal-50",
    activeBg: "bg-teal-500",
    items: [
      "Social Media Marketing",
      "Paid Advertising (Ads)",
      "SEO & Optimization",
      "Email & SMS Marketing",
      "Analytics & Reporting"
    ]
  },
  {
    id: "creative",
    title: "Creative & Branding",
    icon: Palette,
    theme: "orange", // Using standard Tailwind orange
    borderColor: "border-orange-500",
    bgColor: "bg-orange-50",
    activeBg: "bg-orange-500",
    items: [
      "Brand Strategy & Identity",
      "Logo & Graphic Design",
      "Photography & Videography",
      "Academic Script Writing"
    ]
  }
];

const Quote: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(prev => prev.filter(s => s !== service));
    } else {
      setSelectedServices(prev => [...prev, service]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      await submitQuote({ ...formData, selected_services: selectedServices });
      setFormStatus('success');
      setSelectedServices([]);
      setFormData({ name: '', phone: '', email: '', message: '' });
    } catch (error: any) {
      console.error("Error submitting request:", error);
      let errorMessage = "Failed to submit quote request. Please try again.";

      if (error.response?.data) {
        const data = error.response.data;
        if (typeof data === 'string') errorMessage = data;
        else if (data.error) errorMessage = data.error;
        else if (data.detail) errorMessage = data.detail;
        else errorMessage = JSON.stringify(data);
      } else if (error.message) {
        errorMessage = error.message;
      }

      alert(errorMessage);
      setFormStatus('idle');
    }
  };

  return (
    <div className="pt-20">
      <div className="bg-navy-900 py-20 text-center text-white relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -ml-16 -mb-16"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-heading font-bold mb-4"
          >
            Get a Custom Quote
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Select the services you need, and we'll tailor a package just for you.
          </motion.p>
        </div>
      </div>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 max-w-5xl mx-auto"
          >
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-3xl font-heading font-bold text-navy-900">Project Details</h2>
              <p className="text-gray-600 mt-2">Tick the boxes below to indicate your requirements.</p>
            </div>

            {formStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-teal-50 border border-teal-200 text-teal-700 p-8 rounded-2xl flex flex-col items-center text-center py-20"
              >
                <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <Send size={40} className="text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-navy-900">Request Sent Successfully!</h3>
                <p className="text-lg text-teal-800/80 max-w-md">
                  Thank you for contacting LMBS Marketing. Our team will review your requirements and get back to you with a quote within 24 hours.
                </p>
                <button onClick={() => setFormStatus('idle')} className="mt-8 px-8 py-3 bg-teal-600 text-white rounded-full font-bold hover:bg-teal-700 transition-colors shadow-lg shadow-teal-500/20">
                  Send another request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Services Selection Groups */}
                <div className="space-y-10">
                  {SERVICE_GROUPS.map((group) => (
                    <div key={group.id}>
                      <h3 className={`text-lg font-bold text-navy-900 mb-4 flex items-center gap-2 border-b pb-2 ${group.borderColor.replace('border', 'border-opacity-30')}`}>
                        <div className={`p-1.5 rounded-lg ${group.bgColor} ${group.theme === 'gold' ? 'text-gold-600' : group.theme === 'teal' ? 'text-teal-600' : 'text-orange-600'}`}>
                          <group.icon size={18} />
                        </div>
                        {group.title}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {group.items.map(service => {
                          const isSelected = selectedServices.includes(service);
                          // Determine dynamic styling based on selection state and group theme
                          let containerClass = "cursor-pointer p-3 rounded-xl border flex items-center gap-3 transition-all duration-200 select-none ";

                          if (isSelected) {
                            containerClass += `${group.borderColor} ${group.bgColor} shadow-sm ring-1 ${group.borderColor.replace('border', 'ring')}`;
                          } else {
                            containerClass += `border-gray-200 hover:bg-gray-50 hover:border-gray-300`;
                          }

                          return (
                            <div
                              key={service}
                              onClick={() => toggleService(service)}
                              className={containerClass}
                            >
                              <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${isSelected ? `${group.activeBg} text-white` : 'bg-gray-200 text-transparent'
                                }`}>
                                <Check size={14} strokeWidth={3} />
                              </div>
                              <span className={`text-sm font-medium ${isSelected ? 'text-navy-900' : 'text-gray-600'}`}>
                                {service}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 my-8"></div>

                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 outline-none transition-all"
                      placeholder="+254 7XX XXX XXX"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 outline-none transition-all"
                    placeholder="john@company.com"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Additional Details</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:border-gold-500 focus:ring-4 focus:ring-gold-500/10 outline-none transition-all resize-none"
                    placeholder="Tell us a bit more about your project goals, timeline, or budget..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-gradient-to-r from-navy-900 to-navy-800 hover:from-gold-500 hover:to-orange-500 hover:text-navy-900 text-white font-bold py-4 rounded-xl transition-all shadow-xl hover:shadow-2xl hover:scale-[1.01] flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <Loader2 size={24} className="animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Quote Request</span>
                      <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Quote;