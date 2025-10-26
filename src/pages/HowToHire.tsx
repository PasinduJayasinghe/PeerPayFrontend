import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Search, 
  CheckCircle, 
  Users,
  Star,
  ArrowLeft,
  Clock,
  DollarSign,
  TrendingUp
} from 'lucide-react';
import PeerPayLogo from '../assets/images/PeerPayLogo.png';

const HowToHire: React.FC = () => {
  const navigate = useNavigate();

  const steps = [
    {
      number: 1,
      title: 'Create Your Employer Account',
      description: 'Sign up as an employer and complete your company profile. Verify your business credentials to build trust with students.',
      icon: Users,
      color: 'blue'
    },
    {
      number: 2,
      title: 'Post Your Job',
      description: 'Describe your project, set your budget, and specify required skills. Our platform helps you create clear, attractive job postings.',
      icon: Briefcase,
      color: 'purple'
    },
    {
      number: 3,
      title: 'Review Applications',
      description: 'Browse student profiles, check ratings and previous work. Shortlist candidates and communicate directly through our platform.',
      icon: Search,
      color: 'green'
    },
    {
      number: 4,
      title: 'Hire & Collaborate',
      description: 'Select the best student, agree on terms, and start working. Use our built-in tools for communication and project management.',
      icon: CheckCircle,
      color: 'orange'
    }
  ];

  const tips = [
    {
      icon: Star,
      title: 'Write Clear Job Descriptions',
      description: 'Be specific about deliverables, deadlines, and expectations to attract qualified students.'
    },
    {
      icon: DollarSign,
      title: 'Set Fair Budgets',
      description: 'Competitive rates attract top talent. Consider the complexity and time required for your project.'
    },
    {
      icon: Clock,
      title: 'Be Responsive',
      description: 'Quick responses to applications show professionalism and help you secure the best candidates.'
    },
    {
      icon: TrendingUp,
      title: 'Build Your Reputation',
      description: 'Complete projects on time and leave reviews to build a strong employer profile.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-full mb-6">
            <Briefcase className="w-5 h-5" />
            <span className="font-semibold">For Employers</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            How to Hire on
            <span className="text-[#8C00FF]"> PeerPay</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Find talented students for your projects in 4 simple steps
          </p>
          <button
            onClick={() => navigate('/register/employer')}
            className="px-8 py-4 bg-[#8C00FF] text-white rounded-lg font-semibold hover:bg-[#7300CC] transition text-lg"
          >
            Get Started Today
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

      {/* Tips */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Pro Tips for Success</h2>
            <p className="text-xl text-gray-600">Maximize your chances of finding the perfect student</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {tips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#8C00FF]" />
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

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#8C00FF] to-[#6000CC] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Next Student Worker?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join hundreds of employers who trust PeerPay to connect with talented students
          </p>
          <button
            onClick={() => navigate('/register/employer')}
            className="px-8 py-4 bg-white text-[#8C00FF] rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
          >
            Create Employer Account
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

export default HowToHire;
