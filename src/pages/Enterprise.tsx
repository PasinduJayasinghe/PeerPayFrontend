import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  Shield,
  Zap,
  ArrowLeft,
  CheckCircle,
  TrendingUp,
  Award,
  Headphones,
  Lock,
  Globe,
  Clock
} from 'lucide-react';
import PeerPayLogo from '../assets/images/PeerPayLogo.png';

const Enterprise: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: 'Dedicated Account Manager',
      description: 'Get personalized support from a dedicated account manager who understands your business needs.'
    },
    {
      icon: Shield,
      title: 'Enhanced Security & Compliance',
      description: 'Enterprise-grade security with SOC 2 compliance, data encryption, and advanced access controls.'
    },
    {
      icon: Zap,
      title: 'Priority Job Posting',
      description: 'Your jobs get featured placement and reach top students first with our priority listing system.'
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Comprehensive dashboards with hiring metrics, performance tracking, and ROI analysis.'
    },
    {
      icon: Headphones,
      title: '24/7 Premium Support',
      description: 'Round-the-clock support with guaranteed response times and priority issue resolution.'
    },
    {
      icon: Lock,
      title: 'Custom Integration',
      description: 'Integrate PeerPay with your existing HR tools and workflows via our REST API.'
    }
  ];

  const benefits = [
    {
      icon: Globe,
      title: 'Scale Your Hiring',
      description: 'Post unlimited jobs and manage multiple projects simultaneously across your organization.'
    },
    {
      icon: Award,
      title: 'Access Top Talent',
      description: 'Get first access to our highest-rated students with verified skills and proven track records.'
    },
    {
      icon: Clock,
      title: 'Save Time & Money',
      description: 'Streamline your hiring process and reduce costs by up to 60% compared to traditional agencies.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Enterprise Clients' },
    { number: '10,000+', label: 'Projects Completed' },
    { number: '98%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Support Available' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
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
      <section className="py-20 px-4 bg-gradient-to-br from-gray-900 to-[#8C00FF] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Building2 className="w-5 h-5" />
            <span className="font-semibold">Enterprise Solutions</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Enterprise Hiring,
            <br />
            <span className="text-purple-200">Simplified</span>
          </h1>
          <p className="text-xl text-purple-100 mb-8">
            Scale your workforce with verified student talent. Purpose-built for large organizations with advanced needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-white text-[#8C00FF] rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
            >
              Contact Sales
            </button>
            <button
              onClick={() => navigate('/register/employer')}
              className="px-8 py-4 bg-[#8C00FF] text-white rounded-lg font-semibold hover:bg-[#7300CC] transition text-lg border-2 border-white"
            >
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-[#8C00FF] mb-2">{stat.number}</div>
                <div className="text-gray-600 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Enterprise Features</h2>
            <p className="text-xl text-gray-600">Everything you need to hire at scale</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition">
                  <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-[#8C00FF]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose PeerPay Enterprise</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-lg">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Enterprise Plans</h2>
            <p className="text-xl text-gray-600">Flexible pricing for organizations of all sizes</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
              <div className="text-4xl font-bold text-[#8C00FF] mb-4">Rs 25,000<span className="text-lg text-gray-600">/month</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Up to 10 job postings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Basic analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Email support</span>
                </li>
              </ul>
              <button className="w-full py-3 border-2 border-[#8C00FF] text-[#8C00FF] rounded-lg font-semibold hover:bg-purple-50 transition">
                Get Started
              </button>
            </div>

            <div className="bg-gradient-to-br from-[#8C00FF] to-[#6000CC] rounded-xl p-8 shadow-lg text-white relative">
              <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <div className="text-4xl font-bold mb-4">Rs 75,000<span className="text-lg opacity-90">/month</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-200 flex-shrink-0 mt-0.5" />
                  <span>Unlimited job postings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-200 flex-shrink-0 mt-0.5" />
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-200 flex-shrink-0 mt-0.5" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-purple-200 flex-shrink-0 mt-0.5" />
                  <span>Account manager</span>
                </li>
              </ul>
              <button className="w-full py-3 bg-white text-[#8C00FF] rounded-lg font-semibold hover:bg-gray-100 transition">
                Get Started
              </button>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-[#8C00FF] mb-4">Custom</div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Everything in Professional</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Custom integrations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>24/7 support</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span>Custom SLA</span>
                </li>
              </ul>
              <button 
                onClick={() => navigate('/contact')}
                className="w-full py-3 border-2 border-[#8C00FF] text-[#8C00FF] rounded-lg font-semibold hover:bg-purple-50 transition"
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-900 to-[#8C00FF] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Hiring?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join leading organizations using PeerPay to build their teams
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-4 bg-white text-[#8C00FF] rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
          >
            Schedule a Demo
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

export default Enterprise;
