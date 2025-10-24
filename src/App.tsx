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
// import ManageApplications from './components/employer/ManageApplications.tsx'

// // Admin Components             
 import AdminDashboard from './components/admin/AdminDashboard.tsx'
// import VerificationQueue from './components/admin/VerificationQueue.tsx'
// import ContentModeration from './components/admin/ContentModeration.tsx'

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
          <Route path="/employer/jobs/create" element={<PostJob />} />
          {/* <Route path="/employer/applications" element={<ManageApplications />} /> */}


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