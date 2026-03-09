import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Users, Heart, Coffee, Globe, Zap, ArrowRight, MapPin, Clock, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getJobs } from '../services/api';

export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  is_active: boolean;
  slug?: string;
}

const Careers: React.FC = () => {
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        // Backend returns all, but we only show active ones on the public page
        const activeJobs = data.filter((j: Job) => j.is_active);
        setJobs(activeJobs);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 bg-navy-950 overflow-hidden text-center text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-transparent to-navy-900 opacity-50"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-gold-500/10 rounded-full blur-[120px]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6">
              Join the <span className="text-gold-500">Creative Evolution</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              We are building the most innovative agency in East Africa.
              Are you ready to create work that matters?
            </p>
            <a href="#open-roles" className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-10 py-4 rounded-full transition-all shadow-xl hover:scale-105 inline-flex items-center gap-2">
              Explore Open Roles <ArrowRight size={20} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-900 mb-4">Why LMBS Marketing?</h2>
            <p className="text-gray-600">Our culture is built on creativity, growth, and community.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: "Innovation First", desc: "We use the latest tools and tech to stay ahead of the curve." },
              { icon: Users, title: "Collaborative Team", desc: "Work with designers, coders, and marketers in a flat hierarchy." },
              { icon: Globe, title: "Hybrid Work", desc: "Enjoy flexibility with a mix of office and remote work options." },
              { icon: Coffee, title: "Growth Mindset", desc: "We invest in your learning through courses and workshops." }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-3xl bg-gray-50 border border-transparent hover:border-gold-500/30 hover:bg-white hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-navy-900 text-gold-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section id="open-roles" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <span className="text-gold-600 font-bold uppercase tracking-widest text-sm">Opportunities</span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-navy-900 mt-2">Open Positions</h2>
              <p className="text-gray-600 mt-4">We are always looking for passionate individuals. If you don't see a role that fits, send us your CV anyway!</p>
            </div>
          </div>

          <div className="space-y-6 max-w-5xl mx-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <Loader2 className="w-12 h-12 text-gold-500 animate-spin mb-4" />
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Finding opportunities...</p>
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Briefcase size={32} className="text-gray-300" />
                </div>
                <h3 className="text-2xl font-black text-navy-900 mb-2">No Openings Right Now</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  No open positions at the moment. Please check back later.
                </p>
              </div>
            ) : (
              jobs.map((job) => (
                <motion.div
                  key={job.id}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row md:items-center justify-between gap-8 group"
                >
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-navy-900 group-hover:text-gold-600 transition-colors">{job.title}</h3>
                      <span className="bg-navy-50 text-navy-700 text-[10px] font-black uppercase px-3 py-1 rounded-full">{job.type}</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-4">{job.description}</p>
                    <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-400">
                      <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
                      <span className="flex items-center gap-1.5"><Briefcase size={14} /> {job.department}</span>
                    </div>
                  </div>
                  <Link
                    to={`/apply/${job.id}`}
                    className="bg-navy-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-gold-500 hover:text-navy-900 transition-all text-center whitespace-nowrap"
                  >
                    Apply Now
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Spontaneous Application CTA */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-navy-900 p-12 md:p-20 rounded-[3rem] text-white relative overflow-hidden shadow-2xl max-w-6xl mx-auto">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-[100px]"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-heading font-black mb-6">Didn't find your role?</h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                We're always looking for talents in sales, management, and tech.
                Drop us your CV and a link to your portfolio.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/apply/spontaneous" className="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-12 py-4 rounded-full transition-all">
                  Send Your Portfolio
                </Link>
                <a href="mailto:careers@lmbsmarketing.co.ke" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold px-12 py-4 rounded-full transition-all backdrop-blur-md">
                  Email Recruitment
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
