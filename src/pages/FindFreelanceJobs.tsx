import React from 'react';
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

const FindFreelanceJobs: React.FC = () => {
  const navigate = useNavigate();

  const jobCategories = [
    { name: 'Web Development', icon: Code, count: 245, color: 'blue' },
    { name: 'Graphic Design', icon: Palette, count: 189, color: 'pink' },
    { name: 'Content Writing', icon: BookOpen, count: 312, color: 'green' },
    { name: 'Digital Marketing', icon: TrendingUp, count: 156, color: 'purple' },
  ];

  const tips = [
    {
      icon: Star,
      title: 'Complete Your Profile',
      description: 'Students with complete profiles get 3x more job invitations'
    },
    {
      icon: Zap,
      title: 'Apply Early',
      description: 'First 5 applicants have 60% higher chance of getting hired'
    },
    {
      icon: CheckCircle,
      title: 'Custom Proposals',
      description: 'Personalized applications get 80% more responses'
    }
  ];

  const featuredJobs = [
    {
      title: 'React Developer Needed',
      company: 'Tech Startup',
      budget: '25,000 - 35,000',
      duration: '1-2 months',
      location: 'Remote',
      skills: ['React', 'TypeScript', 'Node.js'],
      postedTime: '2 hours ago'
    },
    {
      title: 'Logo Design for Cafe',
      company: 'Local Business',
      budget: '8,000 - 12,000',
      duration: '1 week',
      location: 'Colombo',
      skills: ['Adobe Illustrator', 'Branding'],
      postedTime: '5 hours ago'
    },
    {
      title: 'SEO Content Writer',
      company: 'Digital Agency',
      budget: '15,000 - 20,000',
      duration: '2-3 weeks',
      location: 'Remote',
      skills: ['SEO', 'Content Writing', 'Research'],
      postedTime: '1 day ago'
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

      {/* Stats */}
      <section className="py-16 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">900+</div>
              <div className="text-cyan-100">Active Jobs</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">Rs 2.5M+</div>
              <div className="text-cyan-100">Paid Monthly</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">1,500+</div>
              <div className="text-cyan-100">Students Earning</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">4.8/5</div>
              <div className="text-cyan-100">Average Rating</div>
            </div>
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
          <div className="grid md:grid-cols-4 gap-6">
            {jobCategories.map((category) => {
              const Icon = category.icon;
              const colorClasses = {
                blue: 'from-blue-500 to-cyan-500',
                pink: 'from-pink-500 to-rose-500',
                green: 'from-green-500 to-emerald-500',
                purple: 'from-purple-500 to-pink-500'
              };
              return (
                <div 
                  key={category.name}
                  className="bg-white border-2 border-gray-200 p-6 rounded-xl hover:border-[#8C00FF] hover:shadow-lg transition cursor-pointer group"
                  onClick={() => navigate('/student/jobs')}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[category.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600">{category.count} jobs available</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Jobs</h2>
            <p className="text-xl text-gray-600">Start applying to these hot opportunities</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredJobs.map((job, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition border border-gray-200 cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">New</span>
                </div>
                <p className="text-gray-600 mb-4">{job.company}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">Rs {job.budget}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{job.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-purple-50 text-[#8C00FF] rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-xs text-gray-500">{job.postedTime}</span>
                  <button 
                    onClick={() => navigate('/student/jobs')}
                    className="px-4 py-2 bg-[#8C00FF] text-white rounded-lg font-semibold hover:bg-[#7300CC] transition text-sm"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
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
            Join 1,500+ students already earning on PeerPay
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
