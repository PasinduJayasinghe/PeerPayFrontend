import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Shield,
  Clock,
  ArrowLeft,
  CheckCircle,
  Star,
  MessageCircle,
  DollarSign,
  Award,
  TrendingUp
} from 'lucide-react';
import PeerPayLogo from '../assets/images/PeerPayLogo.png';

const DirectContracts: React.FC = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: DollarSign,
      title: 'No Hidden Fees',
      description: 'Transparent pricing with no surprise charges. You only pay for the work delivered.',
      color: 'green'
    },
    {
      icon: Shield,
      title: 'Secure Escrow System',
      description: 'Payment is held securely and released only when you approve the completed work.',
      color: 'blue'
    },
    {
      icon: FileText,
      title: 'Smart Contracts',
      description: 'Automated agreements that protect both parties and ensure clear expectations.',
      color: 'purple'
    },
    {
      icon: Clock,
      title: 'Milestone-Based Payments',
      description: 'Break projects into milestones and pay as work progresses for better control.',
      color: 'orange'
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'Find Your Match',
      description: 'Browse student profiles or invite specific students to work with you directly.'
    },
    {
      number: 2,
      title: 'Negotiate Terms',
      description: 'Discuss scope, timeline, and payment directly with the student through our messaging system.'
    },
    {
      number: 3,
      title: 'Create Contract',
      description: 'Generate a smart contract with agreed terms, milestones, and payment schedule.'
    },
    {
      number: 4,
      title: 'Work Together',
      description: 'Collaborate using our built-in tools. Release payments as milestones are completed.'
    }
  ];

  const features = [
    {
      icon: MessageCircle,
      title: 'Direct Communication',
      description: 'Chat directly with students without any intermediaries'
    },
    {
      icon: Award,
      title: 'Build Relationships',
      description: 'Develop long-term partnerships with reliable students'
    },
    {
      icon: Star,
      title: 'Mutual Reviews',
      description: 'Both parties can leave reviews to build reputation'
    },
    {
      icon: TrendingUp,
      title: 'Better Rates',
      description: 'Negotiate competitive rates that work for both parties'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-100 text-teal-600 rounded-full mb-6">
            <FileText className="w-5 h-5" />
            <span className="font-semibold">Direct Contracts</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Work
            <span className="text-[#8C00FF]"> Directly</span> with
            <br />Talented Students
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Skip the middleman. Create smart contracts, negotiate terms, and collaborate seamlessly.
          </p>
          <button
            onClick={() => navigate('/register/employer')}
            className="px-8 py-4 bg-[#8C00FF] text-white rounded-lg font-semibold hover:bg-[#7300CC] transition text-lg"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Direct Contracts</h2>
            <p className="text-xl text-gray-600">More control, better value, stronger relationships</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              const colorClasses = {
                green: 'from-green-500 to-emerald-500',
                blue: 'from-blue-500 to-cyan-500',
                purple: 'from-purple-500 to-pink-500',
                orange: 'from-orange-500 to-red-500'
              };
              return (
                <div key={index} className="text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${colorClasses[benefit.color as keyof typeof colorClasses]} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Four simple steps to start working together</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#8C00FF] to-[#6000CC] rounded-lg flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Built-In Features</h2>
            <p className="text-xl text-gray-600">Everything you need for successful collaboration</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl hover:shadow-lg transition">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-[#8C00FF]" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Protection */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">You're Protected Every Step</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <CheckCircle className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-2">Escrow Protection</h3>
              <p className="text-blue-100">Funds held securely until work is approved</p>
            </div>
            <div>
              <CheckCircle className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-2">Dispute Resolution</h3>
              <p className="text-blue-100">Fair mediation if issues arise</p>
            </div>
            <div>
              <CheckCircle className="w-8 h-8 mb-3" />
              <h3 className="font-bold text-lg mb-2">Verified Students</h3>
              <p className="text-blue-100">All students verified with university credentials</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Direct Contracts Success</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-[#8C00FF] mb-2">2,500+</div>
              <div className="text-gray-600">Active Contracts</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#8C00FF] mb-2">95%</div>
              <div className="text-gray-600">Completion Rate</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#8C00FF] mb-2">4.9/5</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-[#8C00FF] mb-2">24hrs</div>
              <div className="text-gray-600">Avg. Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-teal-500 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your First Direct Contract?</h2>
          <p className="text-xl text-teal-100 mb-8">
            Join thousands of employers and students collaborating successfully
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register/employer')}
              className="px-8 py-4 bg-white text-teal-600 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
            >
              For Employers
            </button>
            <button
              onClick={() => navigate('/register/student')}
              className="px-8 py-4 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition text-lg border-2 border-white"
            >
              For Students
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

export default DirectContracts;
