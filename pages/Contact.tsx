import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { COMPANY_LOCATION, COMPANY_EMAIL, COMPANY_PHONE } from '../constants';
import { submitContact } from '../services/api';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  // Handle incoming package selection
  useEffect(() => {
    if (location.state && location.state.packageName) {
      setFormData(prev => ({
        ...prev,
        subject: `Inquiry about: ${location.state.packageName}`,
        message: `Hi, I am interested in the ${location.state.packageName}. Please contact me with more details.`
      }));
    }
  }, [location.state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      await submitContact(formData);
      setFormStatus('success');
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
    } catch (error: any) {
      console.error("Error submitting contact form:", error);
      let errorMessage = "Failed to send message. Please try again.";

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
        <div className="container mx-auto px-4 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold mb-4"
          >
            Contact Us
          </motion.h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Have a question or want to book a package? Reach out to us.
          </p>
        </div>
      </div>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* Contact Info & Map */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-navy-900 mb-6">Get in Touch</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gold-50 p-3 rounded-xl text-gold-600 shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-900">Visit Us</h4>
                      <p className="text-gray-600">{COMPANY_LOCATION}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-gold-50 p-3 rounded-xl text-gold-600 shrink-0">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-900">Call Us</h4>
                      <p className="text-gray-600">{COMPANY_PHONE}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-gold-50 p-3 rounded-xl text-gold-600 shrink-0">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-900">Email Us</h4>
                      <p className="text-gray-600">{COMPANY_EMAIL}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-64 bg-gray-200 rounded-2xl overflow-hidden shadow-sm border border-gray-200">
                <iframe
                  title="Juja Square Location"
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  scrolling="no"
                  src="https://maps.google.com/maps?q=Juja+Square+Juja+Kenya&t=&z=13&ie=UTF8&iwloc=&output=embed"
                ></iframe>
              </div>
            </div>

            {/* General Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-bold text-navy-900 mb-6">Send a Message</h3>

                {formStatus === 'success' ? (
                  <div className="text-center py-10">
                    <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send size={32} />
                    </div>
                    <h4 className="text-2xl font-bold text-navy-900 mb-2">Message Sent!</h4>
                    <p className="text-gray-600">We'll get back to you shortly.</p>
                    <button onClick={() => setFormStatus('idle')} className="mt-6 text-gold-600 font-bold underline">Send another</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500 transition-colors"
                          placeholder="Your Name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500 transition-colors"
                          placeholder="Your Phone"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500 transition-colors"
                        placeholder="General Inquiry"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Message</label>
                      <textarea
                        rows={5}
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-gold-500 transition-colors resize-none"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full bg-navy-900 hover:bg-gold-500 hover:text-navy-900 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                    >
                      {formStatus === 'submitting' ? <Loader2 className="animate-spin" /> : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;