import { useState, useEffect } from 'react';
import { Search, TrendingUp, Shield, Clock, Star, ChevronRight, Users, Briefcase, Award, ArrowRight, Menu, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { jobService, jobCategoryService } from '../services';
import { toast } from 'sonner';
import PeerPayLogo from '../assets/images/PeerPayLogo.png';
import BannerImage from '../assets/images/BannerImage.jpeg';
import AIChatbot from '../components/chatbot/AIChatbot';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('hire');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch categories and jobs in parallel
      const [categoriesData, jobsData] = await Promise.all([
        jobCategoryService.getAllCategories().catch(err => {
          console.error('Error fetching categories:', err);
          return [];
        }),
        jobService.getAllJobs(1, 6).catch(err => {
          console.error('Error fetching jobs:', err);
          return { items: [], totalCount: 0, page: 1, pageSize: 6, totalPages: 0 };
        })
      ]);

      setCategories(categoriesData.slice(0, 8)); // Show max 8 categories
      setFeaturedJobs(jobsData.items || []);
    } catch (error: any) {
      console.error('Error loading data:', error);
      toast.error('Failed to load some data. Using cached data.');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (name: string) => {
    const iconMap: { [key: string]: string } = {
      'Web Development': '�',
      'Mobile App Development': '📱',
      'Graphic Design': '🎨',
      'Content Writing': '✍️',
      'Digital Marketing': '�',
      'Data Analysis': '📈',
      'Video Editing': '🎬',
      'Translation': '🌍',
      'Photography': '📷',
      'Tutoring': '�',
      'Voice Over': '🎵'
    };
    return iconMap[name] || '💼';
  };

  const formatBudget = (amount: number) => {
    return `Rs ${amount.toLocaleString()}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    
    if (diffDays === 0) {
      return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
      return '1 day ago';
    } else {
      return `${diffDays} days ago`;
    }
  };

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
      <section className="relative overflow-hidden text-white py-20 lg:py-32 xl:py-40" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${BannerImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]"></div>
        <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative">
          <div className="text-center max-w-4xl xl:max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 lg:mb-8 leading-tight">
              Find the Perfect Freelancer or Your Next Job
            </h1>
            <p className="text-xl lg:text-2xl xl:text-3xl text-gray-100 mb-10 lg:mb-14">
              Connect with talented professionals worldwide. Post jobs, hire talent, or find work that matches your skills.
            </p>

            {/* Tab Switcher */}
            <div className="flex justify-center mb-8 lg:mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 inline-flex">
                <button
                  onClick={() => setActiveTab('hire')}
                  className={`px-8 lg:px-12 py-3 lg:py-4 rounded-full font-medium text-base lg:text-lg transition-all ${
                    activeTab === 'hire' ? 'bg-white text-[#8C00FF] shadow-lg' : 'text-white hover:bg-white/20'
                  }`}
                >
                  Hire Talent
                </button>
                <button
                  onClick={() => setActiveTab('work')}
                  className={`px-8 lg:px-12 py-3 lg:py-4 rounded-full font-medium text-base lg:text-lg transition-all ${
                    activeTab === 'work' ? 'bg-white text-[#8C00FF] shadow-lg' : 'text-white hover:bg-white/20'
                  }`}
                >
                  Find Work
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-3xl xl:max-w-4xl mx-auto">
              <div className="bg-white rounded-full shadow-2xl p-2 lg:p-3 flex items-center">
                <Search className="ml-4 text-slate-400" size={28} />
                <input
                  type="text"
                  placeholder={activeTab === 'hire' ? 'Search for freelancers or skills...' : 'Search for jobs...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-4 lg:px-6 py-3 lg:py-4 text-slate-800 outline-none text-lg lg:text-xl"
                />
                <button className="bg-[#8C00FF] text-white px-8 lg:px-12 py-3 lg:py-4 rounded-full hover:bg-[#7000CC] transition-all font-medium text-base lg:text-lg shadow-lg">
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

      {/* Why Choose PeerPay Section */}
      <section className="py-16 lg:py-24 xl:py-32 bg-white border-b border-slate-200">
        <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-800 mb-4 lg:mb-6">Why Choose PeerPay?</h2>
            <p className="text-slate-600 text-lg lg:text-xl xl:text-2xl">Sri Lanka's trusted platform for freelance opportunities</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 lg:gap-10 xl:gap-12">
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl group-hover:shadow-lg transition-shadow">
                  <Shield className="text-[#8C00FF]" size={32} />
                </div>
              </div>
              <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-slate-800 mb-2 lg:mb-3">Secure Payments</h3>
              <p className="text-slate-600 text-sm lg:text-base xl:text-lg">Escrow protection ensures safe transactions for both parties</p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl group-hover:shadow-lg transition-shadow">
                  <Clock className="text-blue-600" size={32} />
                </div>
              </div>
              <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-slate-800 mb-2 lg:mb-3">Fast Matching</h3>
              <p className="text-slate-600 text-sm lg:text-base xl:text-lg">Connect with the right talent or jobs quickly and efficiently</p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl group-hover:shadow-lg transition-shadow">
                  <Star className="text-green-600" size={32} />
                </div>
              </div>
              <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-slate-800 mb-2 lg:mb-3">Quality Work</h3>
              <p className="text-slate-600 text-sm lg:text-base xl:text-lg">Verified students and employers ensure high-quality projects</p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-2xl group-hover:shadow-lg transition-shadow">
                  <Award className="text-orange-600" size={32} />
                </div>
              </div>
              <h3 className="text-xl lg:text-2xl xl:text-3xl font-bold text-slate-800 mb-2 lg:mb-3">Local Focus</h3>
              <p className="text-slate-600 text-sm lg:text-base xl:text-lg">Built specifically for Sri Lankan students and businesses</p>
            </div>
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
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mb-4"></div>
                  <div className="h-5 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <div
                  key={category.categoryId || index}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#8C00FF] hover:shadow-xl transition-all cursor-pointer group"
                  onClick={() => navigate(`/student/jobs?category=${category.categoryId}`)}
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                    {getCategoryIcon(category.name)}
                  </div>
                  <h3 className="font-semibold text-slate-800 mb-2 group-hover:text-[#8C00FF] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-slate-500 text-sm">{category.jobCount || 0} jobs available</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-slate-500 py-12">
              <p>No categories available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* Popular Skills & Opportunities Section */}
      <section className="py-16 lg:py-24 xl:py-32 bg-slate-50">
        <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-800 mb-2 lg:mb-4">Explore Opportunities</h2>
            <p className="text-slate-600 text-lg lg:text-xl xl:text-2xl">Find the perfect match for your skills or project needs</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 xl:gap-10">
            {[
              { title: 'Web Development', icon: '💻', color: 'from-blue-500 to-cyan-500', skills: ['React', 'Node.js', 'Python', 'PHP'], description: 'Build modern websites and applications' },
              { title: 'Mobile Apps', icon: '📱', color: 'from-purple-500 to-pink-500', skills: ['React Native', 'Flutter', 'iOS', 'Android'], description: 'Create mobile experiences' },
              { title: 'Design & Creative', icon: '🎨', color: 'from-orange-500 to-red-500', skills: ['UI/UX', 'Figma', 'Photoshop', 'Branding'], description: 'Bring ideas to visual life' },
              { title: 'Content & Writing', icon: '✍️', color: 'from-green-500 to-teal-500', skills: ['Blog Writing', 'SEO', 'Copywriting', 'Social Media'], description: 'Engage audiences with words' },
              { title: 'Digital Marketing', icon: '📊', color: 'from-yellow-500 to-orange-500', skills: ['SEO', 'Social Media', 'Analytics', 'Ads'], description: 'Grow your online presence' },
              { title: 'Video & Animation', icon: '🎬', color: 'from-red-500 to-pink-500', skills: ['Video Editing', 'Motion Graphics', 'Animation'], description: 'Create engaging visual content' },
              { title: 'Data & Analytics', icon: '📈', color: 'from-indigo-500 to-purple-500', skills: ['Excel', 'Data Entry', 'SQL', 'Reporting'], description: 'Transform data into insights' },
              { title: 'Virtual Assistant', icon: '🤝', color: 'from-cyan-500 to-blue-500', skills: ['Admin', 'Support', 'Scheduling', 'Communication'], description: 'Provide professional support' },
            ].map((category, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl p-6 lg:p-8 xl:p-10 border border-slate-200 hover:shadow-2xl transition-all cursor-pointer hover:-translate-y-1"
                onClick={() => navigate('/student/jobs')}
              >
                <div className={`w-16 h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center text-3xl lg:text-4xl xl:text-5xl mb-4 lg:mb-6 group-hover:scale-110 transition-transform`}>
                  {category.icon}
                </div>
                <h3 className="font-bold text-slate-800 text-lg lg:text-xl xl:text-2xl mb-2 lg:mb-3">{category.title}</h3>
                <p className="text-slate-600 text-sm lg:text-base xl:text-lg mb-4 lg:mb-6">{category.description}</p>
                <div className="flex flex-wrap gap-2">
                  {category.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-medium group-hover:bg-purple-50 group-hover:text-[#8C00FF] transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12 lg:mt-16">
            <button 
              onClick={() => navigate('/student/jobs')}
              className="inline-flex items-center bg-[#8C00FF] text-white px-8 lg:px-12 xl:px-16 py-4 lg:py-5 xl:py-6 text-base lg:text-lg xl:text-xl rounded-full hover:bg-[#7000CC] transition-all font-medium shadow-lg hover:shadow-xl"
            >
              Browse All Categories
              <ArrowRight className="ml-2 lg:ml-3" size={24} />
            </button>
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
            <button 
              onClick={() => navigate('/student/jobs')}
              className="flex items-center text-[#8C00FF] hover:text-[#7000CC] font-medium"
            >
              View All <ChevronRight size={20} />
            </button>
          </div>
          {loading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="h-12 bg-gray-200 rounded"></div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                    <div className="h-12 bg-gray-200 rounded"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : featuredJobs.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {featuredJobs.map((job, index) => (
                <div key={job.jobId || index} className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-xl transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-slate-800 text-xl">{job.title}</h3>
                    <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2">
                      {formatDate(job.postedDate)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(job.requiredSkills || []).slice(0, 3).map((skill: string, i: number) => (
                      <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                    <div>
                      <div className="text-slate-500 mb-1">Budget</div>
                      <div className="font-semibold text-slate-800">{formatBudget(job.payAmount)}</div>
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
                  <button 
                    onClick={() => navigate(`/student/jobs/${job.jobId}`)}
                    className="w-full bg-[#8C00FF] text-white py-3 rounded-lg hover:bg-[#7000CC] transition-all font-medium flex items-center justify-center group"
                  >
                    View Details
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-slate-500 py-12 bg-white rounded-2xl border border-slate-200">
              <Briefcase className="mx-auto mb-4 text-slate-400" size={48} />
              <p className="text-lg mb-2">No featured jobs available at the moment.</p>
              <p className="text-sm">Check back soon for new opportunities!</p>
            </div>
          )}
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
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center">
            <button className="bg-white text-[#8C00FF] px-8 lg:px-12 xl:px-16 py-4 lg:py-5 xl:py-6 rounded-full hover:bg-gray-50 transition-all font-semibold text-lg lg:text-xl xl:text-2xl shadow-xl">
              Post a Job
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 lg:px-12 xl:px-16 py-4 lg:py-5 xl:py-6 rounded-full hover:bg-white hover:text-[#8C00FF] transition-all font-semibold text-lg lg:text-xl xl:text-2xl">
              Find Work
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 lg:py-16 xl:py-20">
        <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid md:grid-cols-4 gap-8 lg:gap-10 xl:gap-12 mb-8 lg:mb-12">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#8C00FF] to-[#FFC400] bg-clip-text text-transparent">
                PeerPay
              </h3>
              <p className="text-slate-400">Connecting talent with opportunity worldwide.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Clients</h4>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => navigate('/how-to-hire')} className="hover:text-white transition-colors">How to Hire</button></li>
                <li><button onClick={() => navigate('/talent-marketplace')} className="hover:text-white transition-colors">Talent Marketplace</button></li>
                <li><button onClick={() => navigate('/project-catalog')} className="hover:text-white transition-colors">Project Catalog</button></li>
                <li><button onClick={() => navigate('/enterprise')} className="hover:text-white transition-colors">Enterprise</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Talent</h4>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => navigate('/how-to-find-work')} className="hover:text-white transition-colors">How to Find Work</button></li>
                <li><button onClick={() => navigate('/direct-contracts')} className="hover:text-white transition-colors">Direct Contracts</button></li>
                <li><button onClick={() => navigate('/find-freelance-jobs')} className="hover:text-white transition-colors">Find Freelance Jobs</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><button onClick={() => navigate('/about')} className="hover:text-white transition-colors">About Us</button></li>
                <li><button onClick={() => navigate('/contact')} className="hover:text-white transition-colors">Contact</button></li>
                <li><button onClick={() => navigate('/help')} className="hover:text-white transition-colors">Help & Support</button></li>
                <li><button onClick={() => navigate('/trust-safety')} className="hover:text-white transition-colors">Trust & Safety</button></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
            <p>&copy; 2025 PeerPay. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
}