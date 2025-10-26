import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  FileText, 
  MessageCircle, 
  DollarSign,
  Star,
  Award,
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  Clock
} from 'lucide-react';
import PeerPayLogo from '../assets/images/PeerPayLogo.png';

const HowToFindWork: React.FC = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: 1,
      title: 'Create Your Student Profile',
      description: 'Sign up with your university email, complete your profile, and showcase your skills. Add your portfolio, CV, and academic credentials.',
      icon: FileText,
      color: 'blue'
    },
    {
      number: 2,
      title: 'Browse & Search Jobs',
      description: 'Explore hundreds of flexible job opportunities. Filter by category, budget, skills, and time commitment to find perfect matches.',
      icon: Search,
      color: 'purple'
    },
    {
      number: 3,
      title: 'Submit Strong Applications',
      description: 'Write personalized cover letters highlighting relevant experience. Stand out by demonstrating enthusiasm and competence.',
      icon: MessageCircle,
      color: 'green'
    },
    {
      number: 4,
      title: 'Work & Get Paid',
      description: 'Complete projects on time, communicate effectively, and receive secure payments through our escrow system.',
      icon: DollarSign,
      color: 'orange'
    }
  ];

  const tips = [
    {
      icon: Star,
      title: 'Build a Strong Profile',
      description: 'A complete profile with skills, portfolio, and certifications increases your chances of getting hired by 80%.'
    },
    {
      icon: Clock,
      title: 'Apply Quickly',
      description: 'Be among the first to apply. Early applications have a higher chance of being reviewed and accepted.'
    },
    {
      icon: TrendingUp,
      title: 'Start Small, Grow Big',
      description: 'Begin with smaller projects to build your reputation and ratings, then take on larger, higher-paying jobs.'
    },
    {
      icon: Award,
      title: 'Deliver Quality Work',
      description: 'Exceed expectations to earn 5-star reviews. Great ratings lead to more job opportunities and higher pay.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-600 rounded-full mb-6">
            <Search className="w-5 h-5" />
            <span className="font-semibold">For Students</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            How to Find Work on
            <span className="text-[#8C00FF]"> PeerPay</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Start earning while studying with flexible jobs that fit your schedule
          </p>
          <button
            onClick={() => navigate('/register/student')}
            className="px-8 py-4 bg-[#8C00FF] text-white rounded-lg font-semibold hover:bg-[#7300CC] transition text-lg"
          >
            Create Student Account
          </button>
        </div>
      </section>

      {/* Steps */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            {steps.map((step) => {
              const Icon = step.icon;
              const colorClasses = {
                blue: 'from-blue-500 to-cyan-500',
                purple: 'from-purple-500 to-pink-500',
                green: 'from-green-500 to-emerald-500',
                orange: 'from-orange-500 to-red-500'
              };

              return (
                <div key={step.number} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
                  <div className="flex items-start gap-6">
                    <div className={`flex-shrink-0 w-16 h-16 bg-gradient-to-br ${colorClasses[step.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center text-white text-2xl font-bold`}>
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className="w-6 h-6 text-gray-700" />
                        <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                      </div>
                      <p className="text-gray-600 text-lg leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Students Love PeerPay</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-[#8C00FF] mb-2">1,500+</div>
              <div className="text-gray-600 text-lg">Active Students</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#8C00FF] mb-2">Rs 2.5M+</div>
              <div className="text-gray-600 text-lg">Paid to Students</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-[#8C00FF] mb-2">4.8/5</div>
              <div className="text-gray-600 text-lg">Average Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tips to Get Hired Faster</h2>
            <p className="text-xl text-gray-600">Stand out from the crowd and land your dream jobs</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">{tip.title}</h4>
                      <p className="text-gray-600">{tip.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What You Can Do */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Job Categories</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {['Content Writing', 'Graphic Design', 'Web Development', 'Data Entry', 'Social Media', 'Tutoring', 'Translation', 'Video Editing'].map((category) => (
              <div key={category} className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl text-center hover:shadow-lg transition cursor-pointer">
                <CheckCircle className="w-8 h-8 text-[#8C00FF] mx-auto mb-3" />
                <h4 className="font-semibold text-gray-900">{category}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Start Your Earning Journey Today</h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of students already earning on PeerPay
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register/student')}
              className="px-8 py-4 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
            >
              Sign Up Now
            </button>
            <button
              onClick={() => navigate('/student/jobs')}
              className="px-8 py-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition text-lg border-2 border-white"
            >
              Browse Jobs
            </button>
          </div>
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

export default HowToFindWork;
