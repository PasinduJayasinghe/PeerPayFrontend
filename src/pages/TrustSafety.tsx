import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Shield,
  CheckCircle,
  Lock,
  Eye,
  AlertTriangle,
  UserCheck,
  CreditCard,
  MessageSquare,
  Flag,
  ArrowLeft,
  FileCheck,
  Bell
} from 'lucide-react';
import PeerPayLogo from '../assets/images/PeerPayLogo.png';

const TrustSafety: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
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
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Shield className="w-5 h-5" />
            <span className="font-semibold">Trust & Safety</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Your Safety is Our Priority
          </h1>
          <p className="text-xl text-indigo-100 mb-8 leading-relaxed">
            We're committed to creating a secure, trusted platform where students and employers 
            can work together with confidence. Learn about our comprehensive safety measures.
          </p>
        </div>
      </section>

      {/* Core Safety Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Safety Framework
            </h2>
            <p className="text-xl text-gray-600">
              Multiple layers of protection to ensure a safe experience for everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mb-6">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                User Verification
              </h3>
              <p className="text-gray-700 leading-relaxed">
                All users undergo identity verification. Students verify university enrollment, 
                and employers verify business credentials before accessing the platform.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-green-600 rounded-xl flex items-center justify-center mb-6">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Secure Escrow Payments
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Payments are held securely in escrow until work is completed and approved. 
                This protects both students and employers from fraud.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-[#8C00FF] rounded-xl flex items-center justify-center mb-6">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Data Encryption
              </h3>
              <p className="text-gray-700 leading-relaxed">
                All personal information and transactions are encrypted using industry-standard 
                256-bit SSL/TLS encryption to protect your privacy.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-orange-600 rounded-xl flex items-center justify-center mb-6">
                <FileCheck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Rating & Review System
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Build trust through transparent ratings and reviews. See feedback from previous 
                employers and students before starting any engagement.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center mb-6">
                <Flag className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                Report & Dispute System
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Quickly report suspicious activity or disputes. Our support team investigates 
                all reports within 24 hours and takes appropriate action.
              </p>
            </div>

            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-8 rounded-2xl">
              <div className="w-16 h-16 bg-cyan-600 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                24/7 Monitoring
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our automated systems and support team monitor platform activity around the clock 
                to detect and prevent fraudulent behavior.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Guidelines */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Safety Best Practices
            </h2>
            <p className="text-xl text-gray-600">
              Follow these guidelines to protect yourself on PeerPay
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* For Students */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">For Students</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    <strong>Verify employers</strong> before accepting jobs. Check ratings, reviews, 
                    and verification status.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    <strong>Never share personal contact information</strong> outside the platform 
                    until after hiring.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    <strong>Use platform messaging</strong> for all communications to maintain 
                    a record and protection.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    <strong>Report suspicious requests</strong> immediately, especially requests 
                    for personal information or off-platform payment.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    <strong>Document your work</strong> with screenshots, files, and messages 
                    to protect yourself in disputes.
                  </span>
                </li>
              </ul>
            </div>

            {/* For Employers */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#8C00FF]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">For Employers</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    <strong>Review student profiles</strong> thoroughly, including ratings, 
                    completed jobs, and skills before hiring.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    <strong>Set clear expectations</strong> in job descriptions including 
                    deliverables, deadlines, and payment terms.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    <strong>Use milestone payments</strong> for larger projects to ensure 
                    progress and quality control.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    <strong>Communicate professionally</strong> and provide constructive feedback 
                    throughout the project.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700">
                    <strong>Release payments promptly</strong> once work is completed satisfactorily 
                    to maintain good ratings.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 p-8 md:p-12 rounded-2xl text-white">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-10 h-10" />
              <h2 className="text-3xl font-bold">Red Flags to Watch For</h2>
            </div>
            <p className="text-lg text-red-100 mb-6">
              Be cautious if you encounter any of these warning signs:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <span className="text-lg">Requests to communicate or pay outside the platform</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <span className="text-lg">Jobs that seem too good to be true or offer unrealistic pay</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <span className="text-lg">Requests for personal information like bank details or passwords</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <span className="text-lg">Pressure to make quick decisions without proper review</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">⚠️</span>
                <span className="text-lg">Unverified accounts or profiles with no ratings or reviews</span>
              </li>
            </ul>
            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-lg font-semibold mb-3">
                If you encounter any of these red flags, report immediately!
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-3 bg-white text-red-600 rounded-lg font-semibold hover:bg-red-50 transition"
              >
                Report Suspicious Activity
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy & Security */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-[#8C00FF] rounded-full mb-4">
                <Lock className="w-4 h-4" />
                <span className="font-semibold text-sm">Privacy First</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Your Privacy Matters
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We take your privacy seriously and comply with all relevant data protection 
                regulations. Your personal information is never shared with third parties 
                without your explicit consent.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                We use advanced encryption, secure servers, and regular security audits to 
                protect your data. You have full control over your information and can 
                request data deletion at any time.
              </p>
              <button
                onClick={() => navigate('/privacy-policy')}
                className="px-6 py-3 bg-[#8C00FF] text-white rounded-lg font-semibold hover:bg-[#7300CC] transition"
              >
                Read Privacy Policy
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <Lock className="w-10 h-10 text-blue-600 mb-3" />
                <h4 className="font-bold text-gray-900 mb-1">256-bit SSL</h4>
                <p className="text-sm text-gray-600">Bank-level encryption</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm mt-8">
                <Shield className="w-10 h-10 text-green-600 mb-3" />
                <h4 className="font-bold text-gray-900 mb-1">GDPR Compliant</h4>
                <p className="text-sm text-gray-600">Data protection</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <Eye className="w-10 h-10 text-purple-600 mb-3" />
                <h4 className="font-bold text-gray-900 mb-1">Regular Audits</h4>
                <p className="text-sm text-gray-600">Security testing</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm mt-8">
                <Bell className="w-10 h-10 text-orange-600 mb-3" />
                <h4 className="font-bold text-gray-900 mb-1">Instant Alerts</h4>
                <p className="text-sm text-gray-600">Activity monitoring</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support CTA */}
      <section className="py-16 px-4 bg-gradient-to-r from-[#8C00FF] to-[#6000CC] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <MessageSquare className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Have Safety Concerns?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Our dedicated safety team is here to help 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="px-8 py-4 bg-white text-[#8C00FF] rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Contact Safety Team
            </button>
            <button
              onClick={() => navigate('/help')}
              className="px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition border-2 border-white"
            >
              Visit Help Center
            </button>
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

export default TrustSafety;
