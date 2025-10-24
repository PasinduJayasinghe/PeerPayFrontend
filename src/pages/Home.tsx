import React, { useState } from 'react';
import { Search, TrendingUp, Shield, Clock, Star, ChevronRight, Users, Briefcase, Award, ArrowRight, Menu, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import PeerPayLogo from '../assets/images/PeerPayLogo.png';
import BannerImage from '../assets/images/BannerImage.jpeg';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('hire');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const categories = [
    { name: 'Web Development', icon: '💻', jobs: '2.5k+' },
    { name: 'Mobile Apps', icon: '📱', jobs: '1.8k+' },
    { name: 'Design & Creative', icon: '🎨', jobs: '3.2k+' },
    { name: 'Writing & Content', icon: '✍️', jobs: '1.5k+' },
    { name: 'Marketing', icon: '📊', jobs: '2.1k+' },
    { name: 'Data Science', icon: '📈', jobs: '890+' },
    { name: 'Video & Animation', icon: '🎬', jobs: '1.2k+' },
    { name: 'Music & Audio', icon: '🎵', jobs: '650+' },
  ];

  const topFreelancers = [
    { name: 'Sarah Johnson', role: 'Full Stack Developer', rating: 4.9, jobs: 127, hourlyRate: 85, avatar: '👩‍💻', skills: ['React', 'Node.js', 'AWS'] },
    { name: 'Michael Chen', role: 'UI/UX Designer', rating: 5.0, jobs: 93, hourlyRate: 75, avatar: '👨‍🎨', skills: ['Figma', 'Adobe XD', 'Prototyping'] },
    { name: 'Emma Williams', role: 'Content Writer', rating: 4.8, jobs: 156, hourlyRate: 55, avatar: '👩‍💼', skills: ['SEO', 'Blog Writing', 'Copywriting'] },
    { name: 'David Kumar', role: 'Mobile Developer', rating: 4.9, jobs: 82, hourlyRate: 90, avatar: '👨‍💻', skills: ['React Native', 'Flutter', 'iOS'] },
  ];

  const featuredJobs = [
    { title: 'E-commerce Website Development', budget: '$3000-$5000', duration: '1-3 months', proposals: 12, posted: '2 hours ago', skills: ['React', 'Node.js', 'MongoDB'] },
    { title: 'Mobile App UI/UX Design', budget: '$1500-$2500', duration: '2-4 weeks', proposals: 8, posted: '5 hours ago', skills: ['Figma', 'UI Design', 'Mobile'] },
    { title: 'SEO Content Writing', budget: '$500-$1000', duration: '1 month', proposals: 15, posted: '1 day ago', skills: ['SEO', 'Content Writing', 'Research'] },
    { title: 'Logo & Brand Identity', budget: '$800-$1200', duration: '1-2 weeks', proposals: 22, posted: '3 hours ago', skills: ['Illustrator', 'Branding', 'Logo Design'] },
  ];

  const stats = [
    { label: 'Active Jobs', value: '10,000+', icon: Briefcase },
    { label: 'Freelancers', value: '50,000+', icon: Users },
    { label: 'Projects Completed', value: '1M+', icon: Award },
    { label: 'Avg. Response Time', value: '2 hours', icon: Clock },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <img src={PeerPayLogo} alt="PeerPay Logo" className="h-10 w-auto cursor-pointer" onClick={() => navigate('/')} />
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              <button className="text-slate-700 hover:text-[#8C00FF] font-medium transition-colors">Find Work</button>
              <button className="text-slate-700 hover:text-[#8C00FF] font-medium transition-colors">Find Talent</button>
              <button className="text-slate-700 hover:text-[#8C00FF] font-medium transition-colors">How it Works</button>
            </div>
            
            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-slate-700 hover:text-[#8C00FF] font-medium transition-colors" onClick={() => navigate("/login")}>Log In</button>
              <button className="bg-[#8C00FF] text-white px-6 py-2 rounded-full hover:bg-[#7000CC] transition-all shadow-lg hover:shadow-xl" onClick={() => navigate("/login")}>
                Sign Up
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-700" />
              ) : (
                <Menu className="w-6 h-6 text-slate-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200">
              <div className="flex flex-col space-y-4">
                <button className="text-slate-700 hover:text-[#8C00FF] font-medium transition-colors text-left px-4 py-2 hover:bg-gray-50 rounded-lg">
                  Find Work
                </button>
                <button className="text-slate-700 hover:text-[#8C00FF] font-medium transition-colors text-left px-4 py-2 hover:bg-gray-50 rounded-lg">
                  Find Talent
                </button>
                <button className="text-slate-700 hover:text-[#8C00FF] font-medium transition-colors text-left px-4 py-2 hover:bg-gray-50 rounded-lg">
                  How it Works
                </button>
                <div className="border-t border-slate-200 pt-4 px-4 space-y-3">
                  <button 
                    className="w-full text-slate-700 hover:text-[#8C00FF] font-medium transition-colors py-2 border border-slate-300 rounded-lg hover:border-[#8C00FF]" 
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </button>
                  <button 
                    className="w-full bg-[#8C00FF] text-white py-2 rounded-lg hover:bg-[#7000CC] transition-all shadow-lg" 
                    onClick={() => navigate("/login")}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden text-white py-20" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${BannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find the Perfect Freelancer or Your Next Job
            </h1>
            <p className="text-xl text-gray-100 mb-10">
              Connect with talented professionals worldwide. Post jobs, hire talent, or find work that matches your skills.
            </p>

            {/* Tab Switcher */}
            <div className="flex justify-center mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 inline-flex">
                <button
                  onClick={() => setActiveTab('hire')}
                  className={`px-8 py-3 rounded-full font-medium transition-all ${
                    activeTab === 'hire' ? 'bg-white text-[#8C00FF] shadow-lg' : 'text-white hover:bg-white/20'
                  }`}
                >
                  Hire Talent
                </button>
                <button
                  onClick={() => setActiveTab('work')}
                  className={`px-8 py-3 rounded-full font-medium transition-all ${
                    activeTab === 'work' ? 'bg-white text-[#8C00FF] shadow-lg' : 'text-white hover:bg-white/20'
                  }`}
                >
                  Find Work
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-full shadow-2xl p-2 flex items-center">
                <Search className="ml-4 text-slate-400" size={24} />
                <input
                  type="text"
                  placeholder={activeTab === 'hire' ? 'Search for freelancers or skills...' : 'Search for jobs...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 py-3 text-slate-800 outline-none text-lg"
                />
                <button className="bg-[#8C00FF] text-white px-8 py-3 rounded-full hover:bg-[#7000CC] transition-all font-medium shadow-lg">
                  Search
                </button>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="text-gray-100 text-sm">Popular:</span>
                {['Web Development', 'Logo Design', 'Content Writing', 'Mobile Apps'].map((tag) => (
                  <button key={tag} className="bg-white/20 hover:bg-white/30 px-4 py-1 rounded-full text-sm transition-all">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="bg-purple-50 p-3 rounded-full">
                    <stat.icon className="text-[#8C00FF]" size={28} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-slate-800">{stat.value}</div>
                <div className="text-slate-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Browse by Category</h2>
            <p className="text-slate-600 text-lg">Explore opportunities in your field of expertise</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#8C00FF] hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">{category.icon}</div>
                <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-[#8C00FF] transition-colors">
                  {category.name}
                </h3>
                <p className="text-slate-500 text-sm">{category.jobs} jobs available</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Freelancers Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-2">Top Rated Freelancers</h2>
              <p className="text-slate-600 text-lg">Hire the best talent for your projects</p>
            </div>
            <button className="flex items-center text-[#8C00FF] hover:text-[#7000CC] font-medium">
              View All <ChevronRight size={20} />
            </button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topFreelancers.map((freelancer, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{freelancer.avatar}</div>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                    <Star className="text-yellow-500 fill-yellow-500" size={16} />
                    <span className="ml-1 font-semibold text-sm">{freelancer.rating}</span>
                  </div>
                </div>
                <h3 className="font-bold text-slate-800 mb-1">{freelancer.name}</h3>
                <p className="text-slate-600 text-sm mb-4">{freelancer.role}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {freelancer.skills.map((skill, i) => (
                    <span key={i} className="bg-purple-50 text-[#8C00FF] px-3 py-1 rounded-full text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                  <div>
                    <div className="text-2xl font-bold text-slate-800">${freelancer.hourlyRate}</div>
                    <div className="text-xs text-slate-500">per hour</div>
                  </div>
                  <button className="bg-[#8C00FF] text-white px-4 py-2 rounded-lg hover:bg-[#7000CC] transition-all text-sm font-medium">
                    Hire Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-slate-800 mb-2">Featured Jobs</h2>
              <p className="text-slate-600 text-lg">Start applying to top opportunities</p>
            </div>
            <button className="flex items-center text-[#8C00FF] hover:text-[#7000CC] font-medium">
              View All <ChevronRight size={20} />
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredJobs.map((job, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-slate-800 text-xl">{job.title}</h3>
                  <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
                    {job.posted}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill, i) => (
                    <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                  <div>
                    <div className="text-slate-500 mb-1">Budget</div>
                    <div className="font-semibold text-slate-800">${job.payAmount}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 mb-1">Duration</div>
                    <div className="font-semibold text-slate-800">{job.durationDays} days</div>
                  </div>
                  <div>
                    <div className="text-slate-500 mb-1">Applications</div>
                    <div className="font-semibold text-slate-800">{job.applicationCount || 0}</div>
                  </div>
                </div>
                <button className="w-full bg-[#8C00FF] text-white py-3 rounded-lg hover:bg-[#7000CC] transition-all font-medium flex items-center justify-center group">
                  Apply Now
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Why Choose PeerPay?</h2>
            <p className="text-slate-600 text-lg">Secure, reliable, and designed for success</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Shield className="text-[#8C00FF]" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Secure Payments</h3>
              <p className="text-slate-600">
                Your payments are protected with escrow. Money is only released when you approve the work.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="bg-green-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Quality Guarantee</h3>
              <p className="text-slate-600">
                All freelancers are verified and rated. Hire with confidence based on real reviews.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Clock className="text-purple-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">24/7 Support</h3>
              <p className="text-slate-600">
                Our dedicated support team is always ready to help you with any questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#8C00FF] to-[#7000CC] text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-100 mb-8">
            Join thousands of professionals who trust PeerPay for their freelance needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#8C00FF] px-8 py-4 rounded-full hover:bg-gray-50 transition-all font-semibold text-lg shadow-xl">
              Post a Job
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-[#8C00FF] transition-all font-semibold text-lg">
              Find Work
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#8C00FF] to-[#FFC400] bg-clip-text text-transparent">
                PeerPay
              </h3>
              <p className="text-slate-400">Connecting talent with opportunity worldwide.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Clients</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">How to Hire</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Talent Marketplace</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Project Catalog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Enterprise</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Talent</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">How to Find Work</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Direct Contracts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Find Freelance Jobs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help & Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trust & Safety</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2024 PeerPay. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}