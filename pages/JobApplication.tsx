
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  Send,
  Upload,
  FileText,
  Briefcase,
  User,
  Linkedin,
  Globe,
  GraduationCap,
  Loader2,
  CheckCircle2,
  X,
  Plus,
  Calendar,
  Wrench,
  Building2,
  MapPin,
  Heart
} from 'lucide-react';
import { submitJobApplication, getJob, getJobs } from '../services/api';
import { Job } from './Careers';

// Internal icon for the security note
const ShieldCheckIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

const JobApplication: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [isLoadingJob, setIsLoadingJob] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);



  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingJob(true);
      try {
        // Fetch all jobs for the dropdown
        const jobsData = await getJobs();
        const activeJobs = jobsData.filter((j: Job) => j.is_active);
        setAllJobs(activeJobs);

        if (jobId === 'spontaneous') {
          setJob({ id: 0, title: 'Spontaneous Application', department: 'General', type: 'Any', description: '', is_active: true });
        } else if (jobId) {
          const data = await getJob(jobId);
          setJob(data);
        }
      } catch (error) {
        console.error("Failed to fetch job details:", error);
        // If it's a 404 for a specific job, we still want to show the dropdown for others
        if (jobId !== 'spontaneous') {
          // navigate('/careers'); // Removed to avoid abrupt redirects if they might want to pick another job
        }
      } finally {
        setIsLoadingJob(false);
      }
    };
    fetchData();
  }, [jobId, navigate]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    areaOfInterest: job?.title || 'General Inquiry',
    experienceLevel: 'Mid-Level',
    yearsExperience: '',
    highestEducation: 'Bachelor\'s Degree',
    skills: '',
    availability: 'Immediate',
    startDate: '',
    workPreference: 'Hybrid',
    linkedin: '',
    portfolio: '',
    expectedSalary: '',
    referralSource: 'LinkedIn',
    coverLetter: '',
  });

  // Sync area of interest if job changes (though it's unlikely without a navigation)
  useEffect(() => {
    if (job) {
      setFormData(prev => ({ ...prev, areaOfInterest: job.title }));
    }
  }, [job]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload your resume (PDF).");
      return;
    }

    setIsSubmitting(true);

    try {
      const fd = new FormData();
      // Map frontend fields to backend snake_case
      fd.append('first_name', formData.firstName);
      fd.append('last_name', formData.lastName);
      fd.append('email', formData.email);
      fd.append('phone', formData.phone);
      fd.append('area_of_interest', formData.areaOfInterest);
      fd.append('experience_level', formData.experienceLevel);
      fd.append('years_experience', formData.yearsExperience);
      fd.append('highest_education', formData.highestEducation);
      fd.append('skills', formData.skills);
      fd.append('availability', formData.availability);
      fd.append('start_date', formData.startDate);
      fd.append('work_preference', formData.workPreference);
      fd.append('linkedin', formData.linkedin);
      fd.append('portfolio', formData.portfolio);
      fd.append('expected_salary', formData.expectedSalary);
      fd.append('referral_source', formData.referralSource);
      fd.append('cover_letter', formData.coverLetter);
      fd.append('resume', file);

      // Attach numeric job ID if not spontaneous
      if (jobId && jobId !== 'spontaneous') {
        fd.append('job', jobId);
      }

      // If we have a numeric job ID or slug-like ID we might want to attach it
      // But for now we use area_of_interest since the IDs are hardcoded in frontend

      await submitJobApplication(fd);

      setIsSubmitting(false);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Application failed:", error);
      alert("There was an error submitting your application. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isLoadingJob) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-20">
        <Loader2 className="w-12 h-12 text-gold-500 animate-spin mb-4" />
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading position details...</p>
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="pt-28 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link to="/careers" className="inline-flex items-center gap-2 text-navy-900 font-bold mb-8 hover:text-gold-600 transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Careers
        </Link>

        <AnimatePresence mode="wait">
          {isSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2.5rem] shadow-2xl p-12 text-center border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-teal-500"></div>
              <div className="w-24 h-24 bg-teal-50 text-teal-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <CheckCircle2 size={48} />
              </div>
              <h2 className="text-4xl font-black text-navy-900 mb-4 tracking-tight">Application Received!</h2>
              <p className="text-xl text-gray-500 mb-10 max-w-md mx-auto">
                Thank you for applying for the <span className="text-navy-900 font-bold">{formData.areaOfInterest}</span> position. Our recruitment team will review your application and get back to you soon via <span className="text-navy-900 font-bold">{formData.email}</span>.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/" className="bg-navy-900 text-white px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-all shadow-xl block text-center min-w-[180px]">
                  Back to Home
                </Link>
                <Link to="/careers" className="bg-gray-100 text-navy-900 px-10 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-all block text-center min-w-[180px]">
                  Back to Careers
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <header className="mb-10 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-5 mb-6">
                  <div className="bg-gold-500 p-4 rounded-3xl text-navy-900 shadow-xl shadow-gold-500/20 mx-auto md:mx-0">
                    <Briefcase size={32} />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-5xl font-black text-navy-900 tracking-tight">
                      Applying for <span className="text-gold-600">{job.title}</span>
                    </h1>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-2">
                      <span className="text-gray-400 font-bold uppercase tracking-widest text-xs px-3 py-1 bg-gray-200 rounded-full">
                        {job.department}
                      </span>
                      <span className="text-gold-600 font-bold uppercase tracking-widest text-xs px-3 py-1 bg-gold-50 rounded-full border border-gold-100">
                        {job.type}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-500 max-w-2xl text-lg font-medium leading-relaxed mx-auto md:mx-0">
                  Ready to join the LMBS team? Provide your professional details and interest area below.
                </p>
              </header>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. Personal Information */}
                <section className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                  <h3 className="text-xl font-black text-navy-900 mb-8 flex items-center gap-3">
                    <User size={20} className="text-teal-500" /> Personal Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 ring-gold-500/10 transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 ring-gold-500/10 transition-all"
                        placeholder="Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 ring-gold-500/10 transition-all"
                        placeholder="hello@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 ring-gold-500/10 transition-all"
                        placeholder="+254 7XX XXX XXX"
                      />
                    </div>
                  </div>
                </section>

                {/* 2. Professional Background & Area of Interest */}
                <section className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                  <h3 className="text-xl font-black text-navy-900 mb-8 flex items-center gap-3">
                    <Heart size={20} className="text-red-500" /> Primary Area of Interest
                  </h3>
                  <div className="space-y-6 mb-8">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Position / Field of Interest</label>
                      <select
                        name="areaOfInterest"
                        value={formData.areaOfInterest}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-navy-900 text-white border-none rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 ring-gold-500/30 transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select a position</option>
                        {allJobs.map(p => (
                          <option key={p.id} value={p.title}>{p.title}</option>
                        ))}
                        <option value="General Marketing">General Marketing</option>
                        <option value="Sales & Business Development">Sales & Business Development</option>
                        <option value="IT & Support">IT & Support</option>
                        <option value="Creative Production">Creative Production (Photography/Video)</option>
                        <option value="Spontaneous Application">Other / Spontaneous</option>
                      </select>
                    </div>
                  </div>

                  <h3 className="text-xl font-black text-navy-900 mb-8 flex items-center gap-3">
                    <Wrench size={20} className="text-gold-500" /> Professional Background
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Years of Experience</label>
                      <input
                        type="number"
                        name="yearsExperience"
                        required
                        min="0"
                        value={formData.yearsExperience}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 ring-gold-500/10 transition-all"
                        placeholder="e.g. 3"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Highest Education Level</label>
                      <select
                        name="highestEducation"
                        value={formData.highestEducation}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 ring-gold-500/10 transition-all appearance-none cursor-pointer"
                      >
                        <option>Diploma</option>
                        <option>Bachelor's Degree</option>
                        <option>Master's Degree</option>
                        <option>PhD</option>
                        <option>Self-Taught / Certifications</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 mb-8">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Key Skills & Tools</label>
                    <textarea
                      name="skills"
                      required
                      value={formData.skills}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 ring-gold-500/10 transition-all resize-none"
                      placeholder="e.g. Adobe Suite, React.js, Google Ads, Content Strategy"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1.5"><Linkedin size={12} /> LinkedIn Profile</label>
                      <input
                        type="url"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 ring-gold-500/10 transition-all"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-1.5"><Plus size={12} /> Portfolio Link</label>
                      <input
                        type="url"
                        name="portfolio"
                        value={formData.portfolio}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 ring-gold-500/10 transition-all"
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                  </div>
                </section>

                {/* 3. Availability & Work Preferences */}
                <section className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                  <h3 className="text-xl font-black text-navy-900 mb-8 flex items-center gap-3">
                    <Calendar size={20} className="text-blue-500" /> Availability & Preferences
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Earliest Start Date</label>
                      <input
                        type="date"
                        name="startDate"
                        required
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 ring-gold-500/10 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Preferred Work Arrangement</label>
                      <select
                        name="workPreference"
                        value={formData.workPreference}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 ring-gold-500/10 transition-all appearance-none cursor-pointer"
                      >
                        <option>On-site (Juja)</option>
                        <option>Hybrid</option>
                        <option>Remote</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Expected Salary (KES/Month)</label>
                      <input
                        type="number"
                        name="expectedSalary"
                        required
                        value={formData.expectedSalary}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 ring-gold-500/10 transition-all"
                        placeholder="e.g. 80000"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Referral Source</label>
                      <select
                        name="referralSource"
                        value={formData.referralSource}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm font-bold focus:outline-none focus:ring-4 ring-gold-500/10 transition-all appearance-none cursor-pointer"
                      >
                        <option>LinkedIn</option>
                        <option>Instagram / Facebook</option>
                        <option>Word of Mouth</option>
                        <option>Google Search</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* 4. Application Letter & Documents */}
                <section className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                  <h3 className="text-xl font-black text-navy-900 mb-8 flex items-center gap-3">
                    <FileText size={20} className="text-purple-500" /> Application Documents
                  </h3>
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Application / Cover Letter</label>
                      <textarea
                        name="coverLetter"
                        required
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        rows={10}
                        className="w-full bg-gray-50 border border-gray-100 rounded-[2rem] px-8 py-6 text-sm font-medium focus:outline-none focus:ring-4 ring-gold-500/10 transition-all resize-none leading-relaxed"
                        placeholder="Tell us why you're a great fit for LMBS Marketing..."
                      ></textarea>
                      <p className="text-[10px] text-gray-400 ml-4 italic">Briefly explain your passion for the {formData.areaOfInterest || 'selected'} role.</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Upload CV / Resume (PDF Only)</label>
                      <div className="relative group">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange}
                          required
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className={`border-2 border-dashed rounded-[2.5rem] p-12 transition-all flex flex-col items-center justify-center text-center ${fileName ? 'border-teal-500 bg-teal-50' : 'border-gray-200 bg-gray-50 group-hover:border-gold-500 group-hover:bg-white'
                          }`}>
                          <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 transition-all ${fileName ? 'bg-teal-500 text-white shadow-xl shadow-teal-500/30' : 'bg-white text-gray-300 shadow-sm'
                            }`}>
                            <Upload size={32} />
                          </div>
                          <p className="font-black text-navy-900 text-lg mb-1">
                            {fileName ? fileName : 'Attach your Resume'}
                          </p>
                          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">
                            {fileName ? 'Click to replace' : 'PDF format only (Max 5MB)'}
                          </p>
                          {fileName && (
                            <button
                              type="button"
                              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFileName(null); }}
                              className="mt-6 text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-1.5 hover:bg-red-50 px-4 py-2 rounded-full transition-all"
                            >
                              <X size={14} /> Remove File
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="flex flex-col md:flex-row items-center gap-8 pt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting || !fileName}
                    className="w-full md:w-max px-14 py-6 bg-navy-900 hover:bg-gold-500 hover:text-navy-900 text-white font-black rounded-[2rem] shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-4 hover:scale-105 active:scale-95"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
                    {isSubmitting ? 'Sending Application...' : 'Submit Application'}
                  </button>
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                      <ShieldCheckIcon size={20} />
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest max-w-xs">
                      Secure Application. Your information is strictly for internal recruitment at LMBS.
                    </p>
                  </div>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JobApplication;
