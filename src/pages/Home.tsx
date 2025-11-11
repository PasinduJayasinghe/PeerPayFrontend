import { useState, useEffect } from 'react';
import { Search, TrendingUp, Shield, Clock, Star, ChevronRight, Briefcase, Award, ArrowRight, Menu, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { jobService } from '../services';
import { toast } from 'sonner';
import PeerPayLogo from '../assets/images/PeerPayLogo.png';
import BannerImage from '../assets/images/BannerImage.jpeg';
import GeminiAIChatBot from '../components/chatbot/GeminiAIChatBot';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [featuredJobs, setFeaturedJobs] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch latest jobs
      const jobsData = await jobService.getActiveJobs().catch(err => {
        console.error('Error fetching jobs:', err);
        return [];
      });

      // Get the 6 most recent jobs
      const sortedJobs = (jobsData || []).sort((a: any, b: any) => 
        new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      ).slice(0, 6);
      setFeaturedJobs(sortedJobs);
    } catch (error: any) {
      console.error('Error loading data:', error);
      toast.error('Failed to load some data.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search term');
      return;
    }

    try {
      setSearching(true);
      const results = await jobService.searchJobsByKeyword(searchQuery, 1, 50);
      
      if (results.length === 0) {
        toast.info('No jobs found matching your search');
        setSearchResults([]);
        setIsSearchMode(true);
        return;
      }

      // Display results on the same page
      setSearchResults(results);
      setIsSearchMode(true);
      toast.success(`Found ${results.length} jobs matching "${searchQuery}"`);
      
      // Scroll to results section
      setTimeout(() => {
        document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Failed to search jobs');
    } finally {
      setSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchMode(false);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const formatBudget = (amount: number, payType?: string) => {
    const formattedAmount = `Rs ${amount.toLocaleString()}`;
    if (payType) {
      return `${formattedAmount}/${payType}`;
    }
    return formattedAmount;
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
              <button 
                className="text-slate-700 hover:text-[#8C00FF] font-medium transition-colors"
                onClick={() => navigate('/find-freelance-jobs')}
              >
                Find Work
              </button>
              <button 
                className="text-slate-700 hover:text-[#8C00FF] font-medium transition-colors"
                onClick={() => navigate('/talent-marketplace')}
              >
                Find Talent
              </button>
              <button 
                className="text-slate-700 hover:text-[#8C00FF] font-medium transition-colors"
                onClick={() => navigate('/how-to-find-work')}
              >
                How it Works
              </button>
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
                <button 
                  className="text-slate-700 hover:text-[#8C00FF] font-medium transition-colors text-left px-4 py-2 hover:bg-gray-50 rounded-lg"
                  onClick={() => {
                    navigate('/find-freelance-jobs');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Find Work
                </button>
                <button 
                  className="text-slate-700 hover:text-[#8C00FF] font-medium transition-colors text-left px-4 py-2 hover:bg-gray-50 rounded-lg"
                  onClick={() => {
                    navigate('/talent-marketplace');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Find Talent
                </button>
                <button 
                  className="text-slate-700 hover:text-[#8C00FF] font-medium transition-colors text-left px-4 py-2 hover:bg-gray-50 rounded-lg"
                  onClick={() => {
                    navigate('/how-to-find-work');
                    setIsMobileMenuOpen(false);
                  }}
                >
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
              Connect with talented professionals worldwide. Post jobs and find skilled students to work on your projects.
            </p>

            {/* Employer Workflow Info */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-white mb-6 text-center">How It Works</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-bold text-white">1</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Post a Job</h4>
                    <p className="text-gray-200 text-sm">Employers create and post job opportunities with details and requirements</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-bold text-white">2</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Students Apply</h4>
                    <p className="text-gray-200 text-sm">Talented students search for jobs and submit their applications</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-bold text-white">3</span>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">Review & Hire</h4>
                    <p className="text-gray-200 text-sm">Employers review applications and select the best candidate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Bar - Only for Finding Jobs */}
            <div className="max-w-3xl xl:max-w-4xl mx-auto">
              <div className="bg-white rounded-full shadow-2xl p-2 lg:p-3 flex items-center">
                <Search className="ml-4 text-slate-400" size={28} />
                <input
                  type="text"
                  placeholder="Search for jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  className="flex-1 px-4 lg:px-6 py-3 lg:py-4 text-slate-800 outline-none text-lg lg:text-xl"
                />
                <button 
                  onClick={handleSearch}
                  disabled={searching}
                  className="bg-[#8C00FF] text-white px-8 lg:px-12 py-3 lg:py-4 rounded-full hover:bg-[#7000CC] transition-all font-medium text-base lg:text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {searching ? 'Searching...' : 'Search'}
                </button>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <span className="text-gray-100 text-sm">Popular:</span>
                {['Web Development', 'Logo Design', 'Content Writing', 'Mobile Apps'].map((tag) => (
                  <button 
                    key={tag} 
                    onClick={async () => {
                      setSearchQuery(tag);
                      // Trigger search with the tag
                      try {
                        setSearching(true);
                        const results = await jobService.searchJobsByKeyword(tag, 1, 50);
                        if (results.length === 0) {
                          toast.info(`No jobs found for "${tag}"`);
                          setSearchResults([]);
                        } else {
                          setSearchResults(results);
                          setIsSearchMode(true);
                          toast.success(`Found ${results.length} jobs for "${tag}"`);
                          setTimeout(() => {
                            document.getElementById('search-results')?.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }
                      } catch (error) {
                        toast.error('Failed to search jobs');
                      } finally {
                        setSearching(false);
                      }
                    }}
                    className="bg-white/20 hover:bg-white/30 px-4 py-1 rounded-full text-sm transition-all"
                  >
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

      {/* Available Jobs Section */}
      <section className="py-16 lg:py-24 xl:py-32 bg-slate-50">
        <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-800 mb-2 lg:mb-4">Explore Opportunities</h2>
            <p className="text-slate-600 text-lg lg:text-xl xl:text-2xl">Find the perfect match for your skills or project needs</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#8C00FF]"></div>
            </div>
          ) : featuredJobs.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {featuredJobs.map((job) => (
                  <div 
                    key={job.jobId} 
                    className="group bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 hover:shadow-2xl transition-all cursor-pointer hover:-translate-y-1"
                    onClick={() => navigate(`/student/jobs/${job.jobId}`)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-slate-800 text-lg lg:text-xl xl:text-2xl line-clamp-2 flex-1">
                        {job.title}
                      </h3>
                      <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2">
                        {formatDate(job.postedDate)}
                      </span>
                    </div>
                    
                    <p className="text-slate-600 text-sm lg:text-base mb-4 line-clamp-3">
                      {job.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(job.requiredSkills || []).slice(0, 3).map((skill: string, i: number) => (
                        <span key={i} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg text-xs font-medium group-hover:bg-[#8C00FF] group-hover:text-white transition-colors">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                      <div>
                        <div className="text-slate-500 text-xs mb-1">Budget</div>
                        <div className="font-bold text-[#8C00FF] text-lg">{formatBudget(job.payAmount, job.payType)}</div>
                      </div>
                      <div>
                        <div className="text-slate-500 text-xs mb-1">Duration</div>
                        <div className="font-semibold text-slate-800">{job.durationDays} days</div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center text-slate-500 text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {job.location}
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-12 lg:mt-16">
                <button 
                  onClick={() => navigate('/find-freelance-jobs')}
                  className="inline-flex items-center bg-[#8C00FF] text-white px-8 lg:px-12 xl:px-16 py-4 lg:py-5 xl:py-6 text-base lg:text-lg xl:text-xl rounded-full hover:bg-[#7000CC] transition-all font-medium shadow-lg hover:shadow-xl"
                >
                  View All Jobs
                  <ArrowRight className="ml-2 lg:ml-3" size={24} />
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <Briefcase className="mx-auto h-16 w-16 text-slate-300 mb-4" />
              <h3 className="text-xl font-semibold text-slate-600 mb-2">No jobs available yet</h3>
              <p className="text-slate-500">Check back soon for new opportunities!</p>
            </div>
          )}
        </div>
      </section>

      {/* Search Results Section */}
      {isSearchMode && (
        <section id="search-results" className="py-16 bg-gradient-to-b from-purple-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-4xl font-bold text-slate-800 mb-2">
                  Search Results for "{searchQuery}"
                </h2>
                <p className="text-slate-600 text-lg">
                  {searchResults.length} {searchResults.length === 1 ? 'job' : 'jobs'} found
                </p>
              </div>
              <button
                onClick={clearSearch}
                className="flex items-center gap-2 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-all font-medium"
              >
                <X size={20} />
                Clear Search
              </button>
            </div>

            {searchResults.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {searchResults.map((job, index) => (
                  <div key={job.jobId || index} className="bg-white rounded-2xl p-6 border-2 border-purple-200 hover:shadow-xl transition-all hover:border-[#8C00FF]">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="font-bold text-slate-800 text-xl">{job.title}</h3>
                      <span className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ml-2">
                        {formatDate(job.postedDate)}
                      </span>
                    </div>
                    
                    <p className="text-slate-600 mb-4 line-clamp-2">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(job.requiredSkills || []).slice(0, 4).map((skill: string, i: number) => (
                        <span key={i} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                      <div>
                        <div className="text-slate-500 mb-1">Budget</div>
                        <div className="font-semibold text-[#8C00FF]">{formatBudget(job.payAmount)}</div>
                      </div>
                      <div>
                        <div className="text-slate-500 mb-1">Duration</div>
                        <div className="font-semibold text-slate-800">{job.durationDays} days</div>
                      </div>
                      <div>
                        <div className="text-slate-500 mb-1">Location</div>
                        <div className="font-semibold text-slate-800 truncate">{job.location}</div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <button 
                        onClick={() => navigate(`/student/jobs/${job.jobId}`)}
                        className="flex-1 bg-[#8C00FF] text-white py-3 rounded-lg hover:bg-[#7000CC] transition-all font-medium flex items-center justify-center group"
                      >
                        View Details
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                      </button>
                      <button 
                        onClick={() => navigate('/login')}
                        className="px-6 bg-purple-50 text-[#8C00FF] py-3 rounded-lg hover:bg-purple-100 transition-all font-medium"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-slate-300">
                <Search className="mx-auto mb-4 text-slate-400" size={64} />
                <h3 className="text-2xl font-bold text-slate-700 mb-2">No jobs found</h3>
                <p className="text-slate-500 mb-6">
                  We couldn't find any jobs matching "{searchQuery}". Try different keywords or browse all jobs.
                </p>
                <button
                  onClick={() => navigate('/student/jobs')}
                  className="inline-flex items-center bg-[#8C00FF] text-white px-8 py-3 rounded-full hover:bg-[#7000CC] transition-all font-medium"
                >
                  Browse All Jobs
                  <ArrowRight className="ml-2" size={20} />
                </button>
              </div>
            )}
          </div>
        </section>
      )}

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
            <button 
              onClick={() => navigate('/login')}
              className="bg-white text-[#8C00FF] px-8 lg:px-12 xl:px-16 py-4 lg:py-5 xl:py-6 rounded-full hover:bg-gray-50 transition-all font-semibold text-lg lg:text-xl xl:text-2xl shadow-xl"
            >
              Post a Job
            </button>
            <button 
              onClick={() => navigate('/find-freelance-jobs')}
              className="bg-transparent border-2 border-white text-white px-8 lg:px-12 xl:px-16 py-4 lg:py-5 xl:py-6 rounded-full hover:bg-white hover:text-[#8C00FF] transition-all font-semibold text-lg lg:text-xl xl:text-2xl"
            >
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
      <GeminiAIChatBot />
    </div>
  );
}