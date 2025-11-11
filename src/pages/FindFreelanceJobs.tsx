import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Search,
  Filter,
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Star,
  TrendingUp,
  CheckCircle,
  Code,
  Palette,
  BookOpen,
  Zap
} from 'lucide-react';
import PeerPayLogo from '../assets/images/PeerPayLogo.png';
import { jobService, jobCategoryService } from '../services';
import { toast } from 'sonner';

const FindFreelanceJobs: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<any[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [categoriesData, jobsData] = await Promise.all([
        jobCategoryService.getAllCategories().catch(err => {
          console.error('Categories error:', err);
          return [];
        }),
        jobService.getActiveJobs().catch(err => {
          console.error('Jobs error:', err);
          return [];
        })
      ]);

      console.log('Categories:', categoriesData);
      console.log('Jobs:', jobsData);

      setCategories(categoriesData.slice(0, 4)); // Show 4 categories
      
      // Get latest 6 jobs
      const sortedJobs = (jobsData || [])
        .filter((job: any) => job && job.jobId) // Filter out invalid jobs
        .sort((a: any, b: any) => {
          const dateA = a.postedDate ? new Date(a.postedDate).getTime() : 0;
          const dateB = b.postedDate ? new Date(b.postedDate).getTime() : 0;
          return dateB - dateA;
        })
        .slice(0, 6);
      
      setFeaturedJobs(sortedJobs);
      console.log('Featured jobs set:', sortedJobs);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('web') || lowerName.includes('development')) return Code;
    if (lowerName.includes('design') || lowerName.includes('graphic')) return Palette;
    if (lowerName.includes('content') || lowerName.includes('writing')) return BookOpen;
    if (lowerName.includes('marketing')) return TrendingUp;
    return Briefcase;
  };

  const getCategoryColor = (index: number) => {
    const colors = ['blue', 'pink', 'green', 'purple'];
    return colors[index % colors.length];
  };

  const formatBudget = (amount?: number, payType?: string) => {
    if (!amount) return 'Budget not specified';
    const formattedAmount = `Rs ${amount.toLocaleString()}`;
    
    if (!payType || payType === 'Fixed') {
      return formattedAmount;
    }
    
    return `${formattedAmount}/${payType.toLowerCase()}`;
  };

  const formatTimeAgo = (date?: string) => {
    if (!date) return 'Recently';
    
    try {
      const now = new Date();
      const posted = new Date(date);
      const diffMs = now.getTime() - posted.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHours / 24);
      
      if (diffHours < 1) return 'Just now';
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      if (diffDays === 1) return 'Yesterday';
      return `${diffDays} days ago`;
    } catch {
      return 'Recently';
    }
  };

  const tips = [
    {
      icon: Star,
      title: 'Complete Your Profile',
      description: 'Students with complete profiles get more job invitations'
    },
    {
      icon: Zap,
      title: 'Apply Early',
      description: 'First applicants have higher chance of getting hired'
    },
    {
      icon: CheckCircle,
      title: 'Custom Proposals',
      description: 'Personalized applications get more responses'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={PeerPayLogo} alt="PeerPay Logo" className="h-12 w-auto" />
              <span className="text-2xl font-bold text-[#8C00FF]">PeerPay</span>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-[#8C00FF] transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-100 text-cyan-600 rounded-full mb-6">
            <Briefcase className="w-5 h-5" />
            <span className="font-semibold">Freelance Jobs</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find
            <span className="text-[#8C00FF]"> Freelance Jobs</span>
            <br />That Fit Your Schedule
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Browse hundreds of flexible opportunities and start earning while you study
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register/student')}
              className="px-8 py-4 bg-[#8C00FF] text-white rounded-lg font-semibold hover:bg-[#7300CC] transition text-lg"
            >
              Sign Up & Browse Jobs
            </button>
            <button
              onClick={() => navigate('/student/jobs')}
              className="px-8 py-4 bg-white text-[#8C00FF] border-2 border-[#8C00FF] rounded-lg font-semibold hover:bg-purple-50 transition text-lg"
            >
              View All Jobs
            </button>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="py-8 px-4 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by skills or job title..."
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent"
              />
            </div>
            <button className="px-6 py-3 bg-[#8C00FF] text-white rounded-lg font-semibold hover:bg-[#7300CC] transition flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Categories</h2>
            <p className="text-xl text-gray-600">Find jobs that match your skills</p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8C00FF] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading categories...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              No categories available
            </div>
          ) : (
            <div className="grid md:grid-cols-4 gap-6">
              {categories.map((category, index) => {
                const Icon = getCategoryIcon(category.name);
                const color = getCategoryColor(index);
                const colorClasses = {
                  blue: 'from-blue-500 to-cyan-500',
                  pink: 'from-pink-500 to-rose-500',
                  green: 'from-green-500 to-emerald-500',
                  purple: 'from-purple-500 to-pink-500'
                };
                return (
                  <div 
                    key={category.categoryId}
                    className="bg-white border-2 border-gray-200 p-6 rounded-xl hover:border-[#8C00FF] hover:shadow-lg transition cursor-pointer group"
                    onClick={() => navigate('/student/jobs')}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600 text-sm">{category.description || 'Explore opportunities'}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Jobs</h2>
            <p className="text-xl text-gray-600">Start applying to these opportunities</p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8C00FF] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading jobs...</p>
            </div>
          ) : featuredJobs.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Briefcase className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <p>No jobs available at the moment</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {featuredJobs.map((job) => (
                <div 
                  key={job.jobId} 
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition border border-gray-200 cursor-pointer"
                  onClick={() => navigate(`/student/jobs/${job.jobId}`)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-2">{job.title}</h3>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full flex-shrink-0 ml-2">New</span>
                  </div>
                  <p className="text-gray-600 mb-4">{job.employerName || job.companyName || 'Company'}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{formatBudget(job.payAmount, job.payType)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm capitalize">{job.jobType?.replace(/([A-Z])/g, ' $1').trim() || 'Full Time'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="text-sm">{job.location || 'Remote'}</span>
                    </div>
                  </div>

                  {job.requiredSkills && job.requiredSkills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.requiredSkills.slice(0, 3).map((skill: string, idx: number) => (
                        <span key={idx} className="px-2 py-1 bg-purple-50 text-[#8C00FF] rounded text-xs">
                          {skill}
                        </span>
                      ))}
                      {job.requiredSkills.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{job.requiredSkills.length - 3} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-xs text-gray-500">{formatTimeAgo(job.postedDate)}</span>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/student/jobs/${job.jobId}`);
                      }}
                      className="px-4 py-2 bg-[#8C00FF] text-white rounded-lg font-semibold hover:bg-[#7300CC] transition text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {featuredJobs.length > 0 && (
            <div className="text-center mt-10">
              <button
                onClick={() => navigate('/student/jobs')}
                className="px-8 py-3 bg-[#8C00FF] text-white rounded-lg font-semibold hover:bg-[#7300CC] transition"
              >
                View All Jobs
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pro Tips to Get Hired</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {tips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#8C00FF] to-[#6000CC] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-gray-600">{tip.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Freelance Journey?</h2>
          <p className="text-xl text-cyan-100 mb-8">
            Join students already earning on PeerPay
          </p>
          <button
            onClick={() => navigate('/register/student')}
            className="px-8 py-4 bg-white text-cyan-600 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
          >
            Create Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 PeerPay. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default FindFreelanceJobs;
