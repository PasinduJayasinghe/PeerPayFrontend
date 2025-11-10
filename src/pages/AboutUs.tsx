import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, 
  Target, 
  Users, 
  Award, 
  Rocket,
  Heart,
  TrendingUp,
  Shield,
  ArrowLeft
} from 'lucide-react';
import PeerPayLogo from '../assets/images/PeerPayLogo.png';

const AboutUs: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <img 
              src={PeerPayLogo} 
              alt="PeerPay Logo" 
              className="h-12 w-auto cursor-pointer" 
              onClick={() => navigate('/')}
            />
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
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-[#8C00FF] rounded-full mb-6">
            <GraduationCap className="w-5 h-5" />
            <span className="font-semibold">About PeerPay</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Empowering Students,
            <span className="text-[#8C00FF]"> One Job at a Time</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connecting talent with opportunity worldwide. We're building a platform 
            where Sri Lankan undergraduates can thrive financially while excelling academically.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-full mb-4">
                <Users className="w-4 h-4" />
                <span className="font-semibold text-sm">Our Story</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Born from Student Experience
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                We are second-year undergraduate students pursuing a Bachelor of Information Technology 
                degree at the <strong>University of Moratuwa</strong>. PeerPay started as our group project 
                for Semester Two, but it quickly became more than just an assignment.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Having experienced firsthand the financial struggles and time constraints of student life, 
                we recognized the urgent need for a platform that could help students earn income flexibly 
                without compromising their academic commitments.
              </p>
              <p className="text-gray-600 leading-relaxed">
                What began as a project has evolved into our passion. We're committed to continuing 
                PeerPay's development beyond our group project, making it a lasting solution for 
                students across Sri Lanka.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-8 rounded-2xl text-white">
                <GraduationCap className="w-12 h-12 mb-4" />
                <h3 className="text-3xl font-bold mb-2">2nd Year</h3>
                <p className="text-purple-100">BIT Students</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-8 rounded-2xl text-white mt-8">
                <Award className="w-12 h-12 mb-4" />
                <h3 className="text-3xl font-bold mb-2">UoM</h3>
                <p className="text-blue-100">University of Moratuwa</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-8 rounded-2xl text-white">
                <Rocket className="w-12 h-12 mb-4" />
                <h3 className="text-3xl font-bold mb-2">2025</h3>
                <p className="text-green-100">Semester 2 Project</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-red-500 p-8 rounded-2xl text-white mt-8">
                <Heart className="w-12 h-12 mb-4" />
                <h3 className="text-3xl font-bold mb-2">Future</h3>
                <p className="text-orange-100">Continuing Beyond</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The Challenge We're Solving
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sri Lankan undergraduates face unique challenges that traditional job markets fail to address
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Financial Stress</h3>
              <p className="text-gray-600 leading-relaxed">
                <strong>70% of Sri Lankan university students</strong> face financial difficulties. 
                High costs of tuition, accommodation, and daily living create overwhelming pressure, 
                reducing focus on academic growth.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">No Trust or Security</h3>
              <p className="text-gray-600 leading-relaxed">
                Current alternatives like informal Facebook and WhatsApp groups are fragmented, 
                lack security, and have no accountability. High risk of scams and delayed payments.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <GraduationCap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Inflexible Schedules</h3>
              <p className="text-gray-600 leading-relaxed">
                Traditional part-time jobs demand rigid schedules that conflict directly with 
                lectures, exams, and study time, making them impractical for students.
              </p>
            </div>
          </div>

          {/* Solution */}
          <div className="bg-gradient-to-br from-[#8C00FF] to-[#6000CC] p-12 rounded-2xl text-white">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
                <Rocket className="w-5 h-5" />
                <span className="font-semibold">Our Solution</span>
              </div>
              <h3 className="text-3xl font-bold mb-6">PeerPay.lk: A Verified Micro-Job Marketplace</h3>
              <p className="text-lg text-purple-100 mb-8 leading-relaxed">
                We've created a web platform that connects students (as "Workers") with "Employers" 
                — individuals, small businesses, or fellow students. Our user-centric approach features 
                robust verification, rating systems, task management dashboards, and secure escrow-based 
                payments to guarantee timely and secure transactions.
              </p>
              <div className="grid md:grid-cols-3 gap-6 text-left">
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <h4 className="font-bold mb-2">✓ Verified Users</h4>
                  <p className="text-sm text-purple-100">Robust verification system for trust and safety</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <h4 className="font-bold mb-2">✓ Secure Payments</h4>
                  <p className="text-sm text-purple-100">Escrow-based payment protection</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                  <h4 className="font-bold mb-2">✓ Flexible Work</h4>
                  <p className="text-sm text-purple-100">Jobs that fit your academic schedule</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Aim & Objectives */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-[#8C00FF] rounded-full mb-4">
              <Target className="w-5 h-5" />
              <span className="font-semibold">Our Mission</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Aim & Objectives
            </h2>
          </div>

          {/* Aim */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-[#8C00FF]" />
              Our Aim
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              To develop <strong>PeerPay.lk</strong>, a comprehensive web-based platform using modern 
              technologies (React with Vite, .NET Core, Azure cloud services with MSSQL database) that 
              creates a <strong>secure, verified micro-job marketplace</strong> specifically designed 
              for Sri Lankan undergraduates, incorporating escrow payment protection, reputation systems, 
              and intelligent job matching to enable flexible income generation while maintaining academic excellence.
            </p>
          </div>

          {/* Objectives */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Objectives</h3>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-[#8C00FF] font-bold">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-2">Scalable Web Architecture</h4>
                <p className="text-gray-600">
                  Architect a scalable web application using <strong>React with Vite</strong> for the frontend, 
                  implementing a component-based architecture with TypeScript for maintainability.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-2">Robust Backend API</h4>
                <p className="text-gray-600">
                  Develop a robust RESTful API backend using <strong>.NET Core 8.0</strong> with Clean Architecture 
                  principles, implementing the CQRS pattern with MediatR, the repository pattern, and JWT-based authentication.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-2">Cloud-Native Infrastructure</h4>
                <p className="text-gray-600">
                  Establish a cloud-native infrastructure on <strong>Microsoft Azure</strong>, utilizing Azure App Service 
                  for hosting, Azure SQL Database for MSSQL, Azure Blob Storage for file management, and Azure Key Vault for secrets.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                4
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-2">Local Payment Integration</h4>
                <p className="text-gray-600">
                  Integrate Sri Lankan payment ecosystems, including the <strong>PayHere gateway</strong>, standards, 
                  and mobile wallet providers (eZ Cash, mCash), ensuring seamless financial transactions.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-bold">
                5
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-2">Real-Time Communication</h4>
                <p className="text-gray-600">
                  Create real-time communication capabilities using <strong>SignalR</strong> for instant messaging, 
                  notifications, and live job updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built with Modern Technology
            </h2>
            <p className="text-xl text-gray-600">
              Enterprise-grade stack ensuring scalability, security, and performance
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-4xl mb-3">⚛️</div>
              <h4 className="font-bold text-gray-900 mb-2">React + Vite</h4>
              <p className="text-sm text-gray-600">Modern frontend with TypeScript</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-4xl mb-3">🔷</div>
              <h4 className="font-bold text-gray-900 mb-2">.NET Core 8.0</h4>
              <p className="text-sm text-gray-600">Clean Architecture backend</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-4xl mb-3">☁️</div>
              <h4 className="font-bold text-gray-900 mb-2">Microsoft Azure</h4>
              <p className="text-sm text-gray-600">Cloud-native infrastructure</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <div className="text-4xl mb-3">🗄️</div>
              <h4 className="font-bold text-gray-900 mb-2">MSSQL Database</h4>
              <p className="text-sm text-gray-600">Reliable data storage</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#8C00FF] to-[#6000CC]">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Join Our Growing Community</h2>
          <p className="text-xl text-purple-100 mb-8">
            Whether you're a student looking for flexible work or an employer seeking talented individuals, 
            PeerPay is here to connect you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register/student')}
              className="px-8 py-4 bg-white text-[#8C00FF] rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Sign Up as Student
            </button>
            <button
              onClick={() => navigate('/register/employer')}
              className="px-8 py-4 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition border-2 border-white"
            >
              Sign Up as Employer
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 PeerPay. All rights reserved. Built with ❤️ by UoM Students
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
