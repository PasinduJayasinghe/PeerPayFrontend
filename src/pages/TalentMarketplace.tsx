import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Briefcase, 
  Search, 
  Star,
  Filter,
  ArrowLeft,
  TrendingUp,
  Award,
  Code,
  Palette,
  BookOpen,
  Video
} from 'lucide-react';
import PeerPayLogo from '../assets/images/PeerPayLogo.png';

const TalentMarketplace: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    { name: 'Web Development', icon: Code, count: 245, color: 'blue' },
    { name: 'Graphic Design', icon: Palette, count: 189, color: 'pink' },
    { name: 'Content Writing', icon: BookOpen, count: 312, color: 'green' },
    { name: 'Video Editing', icon: Video, count: 156, color: 'purple' },
  ];

  const topTalent = [
    {
      name: 'Kasun Perera',
      university: 'University of Moratuwa',
      skills: ['React', 'Node.js', 'TypeScript'],
      rating: 4.9,
      completedJobs: 47,
      hourlyRate: 1500
    },
    {
      name: 'Nimali Silva',
      university: 'University of Colombo',
      skills: ['UI/UX Design', 'Figma', 'Adobe XD'],
      rating: 4.8,
      completedJobs: 38,
      hourlyRate: 1200
    },
    {
      name: 'Ravindu Fernando',
      university: 'SLIIT',
      skills: ['Python', 'Data Analysis', 'Machine Learning'],
      rating: 4.9,
      completedJobs: 52,
      hourlyRate: 1800
    },
    {
      name: 'Thisara Jayasinghe',
      university: 'University of Peradeniya',
      skills: ['Content Writing', 'SEO', 'Copywriting'],
      rating: 4.7,
      completedJobs: 65,
      hourlyRate: 1000
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-[#8C00FF] rounded-full mb-6">
            <Users className="w-5 h-5" />
            <span className="font-semibold">Talent Marketplace</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Find the
            <span className="text-[#8C00FF]"> Perfect Student</span>
            <br />for Your Project
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Browse thousands of verified, talented university students ready to work on your projects
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register/employer')}
              className="px-8 py-4 bg-[#8C00FF] text-white rounded-lg font-semibold hover:bg-[#7300CC] transition text-lg"
            >
              Start Hiring
            </button>
            <button
              onClick={() => navigate('/student/jobs')}
              className="px-8 py-4 bg-white text-[#8C00FF] border-2 border-[#8C00FF] rounded-lg font-semibold hover:bg-purple-50 transition text-lg"
            >
              Browse Talent
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">1,500+</div>
              <div className="text-gray-600">Verified Students</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">3,200+</div>
              <div className="text-gray-600">Jobs Completed</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-[#8C00FF]" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">4.8/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600">Find students with the skills you need</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {categories.map((category) => {
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
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition cursor-pointer group"
                  onClick={() => navigate('/student/jobs')}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[category.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600">{category.count} students available</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Talent */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Rated Students</h2>
            <p className="text-xl text-gray-600">Hire proven performers with excellent track records</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {topTalent.map((student, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-[#8C00FF] hover:shadow-lg transition">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                    {student.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{student.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{student.university}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {student.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-purple-100 text-[#8C00FF] rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">{student.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4 text-gray-600" />
                          <span>{student.completedJobs} jobs</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-[#8C00FF]">Rs {student.hourlyRate}/hr</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why Choose PeerPay Talent</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Students</h3>
              <p className="text-purple-100">All students are verified with university credentials</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Advanced Filtering</h3>
              <p className="text-purple-100">Find exactly who you need with smart search tools</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Guaranteed</h3>
              <p className="text-purple-100">Our rating system ensures consistent high quality</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Hire Top Student Talent?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Post your first job for free and connect with skilled students today
          </p>
          <button
            onClick={() => navigate('/register/employer')}
            className="px-8 py-4 bg-[#8C00FF] text-white rounded-lg font-semibold hover:bg-[#7300CC] transition text-lg"
          >
            Get Started Now
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

export default TalentMarketplace;
