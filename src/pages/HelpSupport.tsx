import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search,
  ChevronDown,
  ChevronUp,
  Book,
  MessageCircle,
  Mail,
  HelpCircle,
  ArrowLeft,
  User,
  Briefcase,
  DollarSign,
  Shield,
  CreditCard,
  FileText
} from 'lucide-react';
import PeerPayLogo from '../assets/images/PeerPayLogo.png';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const HelpSupport: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const faqs: FAQ[] = [
    {
      category: 'getting-started',
      question: 'How do I create an account on PeerPay?',
      answer: 'Click on "Sign Up" and choose whether you want to register as a Student (Worker) or Employer. Fill in your details, verify your email, and complete your profile to get started.'
    },
    {
      category: 'getting-started',
      question: 'Is PeerPay free to use?',
      answer: 'Yes! Creating an account and browsing jobs is completely free. We only charge a small service fee when payments are processed through our escrow system.'
    },
    {
      category: 'students',
      question: 'How do I find jobs as a student?',
      answer: 'Navigate to the Job Board from your dashboard. Use filters to search by category, pay type, location, and skills. Click on any job to view details and apply with your cover letter.'
    },
    {
      category: 'students',
      question: 'How do I get paid for completed work?',
      answer: 'Once you complete a job and the employer approves it, payment is released from escrow to your PeerPay wallet. You can then withdraw funds to your bank account or mobile wallet.'
    },
    {
      category: 'employers',
      question: 'How do I post a job?',
      answer: 'From your employer dashboard, click "Post New Job". Fill in the job details including title, description, budget, duration, and required skills. Once posted, students can start applying.'
    },
    {
      category: 'employers',
      question: 'How do I review applications?',
      answer: 'Go to your posted jobs and click "View Applications". You can see all applicants, their profiles, ratings, and cover letters. Accept the best candidate and start working together.'
    },
    {
      category: 'payments',
      question: 'How does the escrow payment system work?',
      answer: 'When you hire a student, payment is held securely in escrow. Once the work is completed and approved, funds are automatically released to the student. This protects both parties.'
    },
    {
      category: 'payments',
      question: 'What payment methods are accepted?',
      answer: 'We accept credit/debit cards, PayHere, eZ Cash, and mCash. All transactions are secure and encrypted.'
    },
    {
      category: 'account',
      question: 'How do I verify my account?',
      answer: 'After registration, verify your email address. Students should upload their university ID, and employers should provide business documents. Verification usually takes 24-48 hours.'
    },
    {
      category: 'account',
      question: 'Can I have both student and employer accounts?',
      answer: 'No, you need to choose one account type during registration. However, you can contact support to switch your account type if needed.'
    },
    {
      category: 'safety',
      question: 'How does PeerPay ensure my safety?',
      answer: 'We verify all users, use secure payment escrow, have a rating system, and provide dispute resolution. Report any suspicious activity to our support team immediately.'
    },
    {
      category: 'safety',
      question: 'What should I do if I encounter a problem?',
      answer: 'Contact our support team through the platform messaging system, email us at support@peerpay.lk, or use the "Report Issue" button on any job or profile.'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Topics', icon: Book },
    { id: 'getting-started', name: 'Getting Started', icon: User },
    { id: 'students', name: 'For Students', icon: Briefcase },
    { id: 'employers', name: 'For Employers', icon: DollarSign },
    { id: 'payments', name: 'Payments', icon: CreditCard },
    { id: 'account', name: 'Account', icon: Shield },
    { id: 'safety', name: 'Safety', icon: FileText }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

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

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <HelpCircle className="w-5 h-5" />
            <span className="font-semibold">Help Center</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            How Can We Help You?
          </h1>
          <p className="text-xl text-green-100 mb-8">
            Search our knowledge base or browse categories below
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-gray-900 text-lg focus:ring-4 focus:ring-white/30 outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills */}
      <section className="py-8 px-4 bg-white shadow-sm sticky top-[72px] z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                    selectedCategory === category.id
                      ? 'bg-[#8C00FF] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {selectedCategory === 'all' ? 'Frequently Asked Questions' : 
             categories.find(c => c.id === selectedCategory)?.name + ' - FAQs'}
          </h2>

          {filteredFaqs.length === 0 ? (
            <div className="bg-white p-12 rounded-xl shadow-sm text-center">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600">Try adjusting your search or browse other categories</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition"
                  >
                    <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-[#8C00FF] flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Still Need Help?
            </h2>
            <p className="text-xl text-gray-600">
              Our support team is here to assist you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">
                Chat with our support team in real-time
              </p>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                Start Chat
              </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-[#8C00FF]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">
                Get a response within 24 hours
              </p>
              <button 
                onClick={() => navigate('/contact')}
                className="px-6 py-2 bg-[#8C00FF] text-white rounded-lg font-semibold hover:bg-[#7300CC] transition"
              >
                Send Email
              </button>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Book className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Documentation</h3>
              <p className="text-gray-600 mb-4">
                Browse our detailed guides
              </p>
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition">
                View Guides
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 PeerPay. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HelpSupport;
