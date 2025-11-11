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
            <span className="font-semibold">Employer Hub</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Post Jobs &
            <span className="text-[#8C00FF]"> Hire Students</span>
            <br />for Your Projects
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Post your job requirements and review applications from talented university students
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-[#8C00FF] text-white rounded-lg font-semibold hover:bg-[#7300CC] transition text-lg"
            >
              Post a Job
            </button>
            <button
              onClick={() => navigate('/how-to-hire')}
              className="px-8 py-4 bg-white text-[#8C00FF] border-2 border-[#8C00FF] rounded-lg font-semibold hover:bg-purple-50 transition text-lg"
            >
              Learn How It Works
            </button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to find the perfect student for your project</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Post Your Job</h3>
              <p className="text-gray-600">Create a detailed job posting with your requirements, budget, and timeline</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Receive Applications</h3>
              <p className="text-gray-600">Students search for jobs and submit applications with their profiles and proposals</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Review & Hire</h3>
              <p className="text-gray-600">Review applications, compare candidates, and select the best student for your project</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Hire Through PeerPay</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-[#8C00FF] transition">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Verified Students</h3>
              <p className="text-gray-600">All students are verified with university credentials for quality assurance</p>
            </div>
            <div className="text-center p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-[#8C00FF] transition">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Easy Application Review</h3>
              <p className="text-gray-600">Review all applications in one place and compare candidates easily</p>
            </div>
            <div className="text-center p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-[#8C00FF] transition">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">Quality Guaranteed</h3>
              <p className="text-gray-600">Our rating system and reviews ensure consistent high quality work</p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories */}
      <section className="py-16 px-4 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Popular Job Categories</h2>
            <p className="text-xl text-purple-100">Students with diverse skills are ready for your projects</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center hover:bg-white/20 transition">
              <Code className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-lg font-bold mb-2">Web Development</h3>
              <p className="text-sm text-purple-100">React, Node.js, Full Stack</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center hover:bg-white/20 transition">
              <Palette className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-lg font-bold mb-2">Graphic Design</h3>
              <p className="text-sm text-purple-100">UI/UX, Branding, Illustration</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center hover:bg-white/20 transition">
              <BookOpen className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-lg font-bold mb-2">Content Writing</h3>
              <p className="text-sm text-purple-100">SEO, Copywriting, Blogging</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center hover:bg-white/20 transition">
              <Video className="w-12 h-12 mx-auto mb-3" />
              <h3 className="text-lg font-bold mb-2">Video Editing</h3>
              <p className="text-sm text-purple-100">Adobe Premiere, After Effects</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Hire Talented Students?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Post your job and start receiving applications from qualified students today
          </p>
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-4 bg-[#8C00FF] text-white rounded-lg font-semibold hover:bg-[#7300CC] transition text-lg"
          >
            Post Your First Job
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
