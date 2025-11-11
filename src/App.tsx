import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import ErrorBoundary from './components/common/ErrorBoundary.tsx'


// Auth Components
import StudentOnboarding from './components/auth/StudentOnboarding.tsx'
 import  EmployerOnboarding from './components/auth/EmployerOnboarding.tsx'
 import LoginForm from './components/auth/LoginForm.tsx'

// // Student Components
import StudentDashboard from './components/student/StudentDashboard.tsx'
import AssignmentDashboard from './components/student/AssignmentDashboard.tsx'
import JobBoard from './components/student/JobBoard.tsx'
import JobDetails from './components/student/JobDetails.tsx'
import StudentProfile from './components/student/StudentProfile.tsx'

// // Employer Components
import EmployerDashboard from './components/employer/EmployerDashboard.tsx'
import PostJob from './components/employer/PostJob.tsx'
import ManageApplications from './components/employer/ManageApplications.tsx'
import EmployerProfile from './components/employer/EmployerProfile.tsx'
import ManageJobs from './components/employer/ManageJobs.tsx'
import JobDetailsView from './components/employer/JobDetailsView.tsx'

// // Admin Components             
 import AdminDashboard from './components/admin/AdminDashboard.tsx'
 import AdminLogin from './components/admin/AdminLogin.tsx'
// import VerificationQueue from './components/admin/VerificationQueue.tsx'
// import ContentModeration from './components/admin/ContentModeration.tsx'

// Messaging Pages
import MessagesPage from './pages/MessagesPage.tsx'
import ChatPage from './pages/ChatPage.tsx'

// Footer Pages
import AboutUs from './pages/AboutUs.tsx'
import Contact from './pages/Contact.tsx'
import HelpSupport from './pages/HelpSupport.tsx'
import TrustSafety from './pages/TrustSafety.tsx'
import HowToHire from './pages/HowToHire.tsx'
import HowToFindWork from './pages/HowToFindWork.tsx'
import TalentMarketplace from './pages/TalentMarketplace.tsx'
import ProjectCatalog from './pages/ProjectCatalog.tsx'
import Enterprise from './pages/Enterprise.tsx'
import DirectContracts from './pages/DirectContracts.tsx'
import FindFreelanceJobs from './pages/FindFreelanceJobs.tsx'

// Wallet Page
import WalletPage from './pages/WalletPage.tsx'

// Common
import Home from './pages/Home.tsx'
import NotFound from './pages/NotFound.tsx'
import BackendTestPage from './pages/BackendTestPage.tsx'

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/test" element={<BackendTestPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register/student" element={<StudentOnboarding />} />
          <Route path="/register/employer" element={<EmployerOnboarding />} />

          
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/assignments" element={<AssignmentDashboard />} />
          <Route path="/student/jobs" element={<JobBoard />} />
          <Route path="/student/jobs/:id" element={<JobDetails />} />
          <Route path="/student/profile" element={<StudentProfile />} />


          <Route path="/employer/dashboard" element={<EmployerDashboard />} />
          <Route path="/employer/jobs" element={<ManageJobs />} />
          <Route path="/employer/jobs/create" element={<PostJob />} />
          <Route path="/employer/jobs/:jobId" element={<JobDetailsView />} />
          <Route path="/employer/jobs/:jobId/applications" element={<ManageApplications />} />
          <Route path="/employer/profile" element={<EmployerProfile />} />

          {/* Messaging Routes */}
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/messages/:conversationId" element={<ChatPage />} />

          {/* Wallet Route */}
          <Route path="/wallet" element={<WalletPage />} />

          {/* Footer Pages */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<HelpSupport />} />
          <Route path="/trust-safety" element={<TrustSafety />} />
          
          {/* For Clients Pages */}
          <Route path="/how-to-hire" element={<HowToHire />} />
          <Route path="/talent-marketplace" element={<TalentMarketplace />} />
          <Route path="/project-catalog" element={<ProjectCatalog />} />
          <Route path="/enterprise" element={<Enterprise />} />
          
          {/* For Talent Pages */}
          <Route path="/how-to-find-work" element={<HowToFindWork />} />
          <Route path="/direct-contracts" element={<DirectContracts />} />
          <Route path="/find-freelance-jobs" element={<FindFreelanceJobs />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          {/* <Route path="/admin/verification" element={<VerificationQueue />} />
          <Route path="/admin/moderation" element={<ContentModeration />} />  */}


          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </Router>
    </ErrorBoundary>
  )
}

export default App