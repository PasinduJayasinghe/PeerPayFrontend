// Comprehensive Mock Data for PeerPay Application - Properly Typed
import type { Job, JobApplication, Student, Employer, JobStatus, ApplicationStatus, PayType, JobType, UserType, UserStatus } from '../types';

// Mock Job Categories
export const mockJobCategories = [
  { categoryId: 'CAT001', name: 'Web Development', description: 'Full-stack, frontend, and backend web development projects', isActive: true, jobCount: 45 },
  { categoryId: 'CAT002', name: 'Mobile App Development', description: 'iOS, Android, and cross-platform mobile applications', isActive: true, jobCount: 32 },
  { categoryId: 'CAT003', name: 'Graphic Design', description: 'Logo design, branding, UI/UX design, and visual content', isActive: true, jobCount: 58 },
  { categoryId: 'CAT004', name: 'Content Writing', description: 'Blog posts, articles, copywriting, and technical writing', isActive: true, jobCount: 28 },
  { categoryId: 'CAT005', name: 'Video Editing', description: 'Video production, editing, animation, and post-production', isActive: true, jobCount: 19 },
  { categoryId: 'CAT006', name: 'Data Entry', description: 'Data entry, data processing, and administrative tasks', isActive: true, jobCount: 15 },
  { categoryId: 'CAT007', name: 'Digital Marketing', description: 'SEO, social media marketing, email campaigns, and ads', isActive: true, jobCount: 38 },
  { categoryId: 'CAT008', name: 'Translation', description: 'Language translation and localization services', isActive: true, jobCount: 12 },
  { categoryId: 'CAT009', name: 'Photography', description: 'Product photography, event coverage, and photo editing', isActive: true, jobCount: 22 },
  { categoryId: 'CAT010', name: 'Tutoring', description: 'Academic tutoring, skill training, and educational support', isActive: true, jobCount: 31 },
  { categoryId: 'CAT011', name: 'Data Analysis', description: 'Data science, analytics, visualization, and reporting', isActive: true, jobCount: 25 },
  { categoryId: 'CAT012', name: 'Voice Over', description: 'Voice acting, narration, and audio production', isActive: true, jobCount: 8 },
];

// Mock Students (minimal for applications)
export const mockStudents: Student[] = [
  {
    studentId: 'STU001',
    userId: 'USR_STU_001',
    university: 'University of Moratuwa',
    course: 'BSc (Hons) in Information Technology',
    yearOfStudy: 2,
    academicVerificationStatus: 'Verified',
    rating: 4.90,
    completedJobs: 47,
    totalEarnings: 235000.00,
    cvUrl: '/files/cv/kasun_perera_cv.pdf',
    user: {
      userId: 'USR_STU_001',
      id: 'USR_STU_001',
      email: 'kasun.perera@student.uom.lk',
      phone: '+94771234567',
      name: 'Kasun Perera',
      userType: 'Student' as UserType,
      createdAt: '2024-01-15',
      status: 'Active' as UserStatus,
      isVerified: true
    }
  },
  {
    studentId: 'STU002',
    userId: 'USR_STU_002',
    university: 'University of Colombo School of Computing',
    course: 'BSc in Computer Science',
    yearOfStudy: 3,
    academicVerificationStatus: 'Verified',
    rating: 4.80,
    completedJobs: 38,
    totalEarnings: 192000.00,
    user: {
      userId: 'USR_STU_002',
      id: 'USR_STU_002',
      email: 'nimali.silva@ucsc.cmb.ac.lk',
      phone: '+94772345678',
      name: 'Nimali Silva',
      userType: 'Student' as UserType,
      createdAt: '2024-02-20',
      status: 'Active' as UserStatus,
      isVerified: true
    }
  },
  {
    studentId: 'STU003',
    userId: 'USR_STU_003',
    university: 'Sri Lanka Institute of Information Technology',
    course: 'BSc (Hons) in IT specializing in Data Science',
    yearOfStudy: 2,
    academicVerificationStatus: 'Verified',
    rating: 4.90,
    completedJobs: 52,
    totalEarnings: 286000.00,
    user: {
      userId: 'USR_STU_003',
      id: 'USR_STU_003',
      email: 'ravindu.fernando@sliit.lk',
      phone: '+94773456789',
      name: 'Ravindu Fernando',
      userType: 'Student' as UserType,
      createdAt: '2024-01-10',
      status: 'Active' as UserStatus,
      isVerified: true
    }
  },
  {
    studentId: 'STU004',
    userId: 'USR_STU_004',
    university: 'University of Peradeniya',
    course: 'BA (Hons) in English',
    yearOfStudy: 3,
    academicVerificationStatus: 'Verified',
    rating: 4.70,
    completedJobs: 65,
    totalEarnings: 162500.00,
    user: {
      userId: 'USR_STU_004',
      id: 'USR_STU_004',
      email: 'thisara.j@pdn.ac.lk',
      phone: '+94774567890',
      name: 'Thisara Jayasinghe',
      userType: 'Student' as UserType,
      createdAt: '2023-11-05',
      status: 'Active' as UserStatus,
      isVerified: true
    }
  },
  {
    studentId: 'STU005',
    userId: 'USR_STU_005',
    university: 'University of Moratuwa',
    course: 'BSc in Multimedia and Web Technology',
    yearOfStudy: 2,
    academicVerificationStatus: 'Verified',
    rating: 4.85,
    completedJobs: 31,
    totalEarnings: 186000.00,
    user: {
      userId: 'USR_STU_005',
      id: 'USR_STU_005',
      email: 'dinuka.w@uom.lk',
      phone: '+94775678901',
      name: 'Dinuka Wickramasinghe',
      userType: 'Student' as UserType,
      createdAt: '2024-03-12',
      status: 'Active' as UserStatus,
      isVerified: true
    }
  }
];

// Mock Employers
export const mockEmployers: Employer[] = [
  {
    employerId: 'EMP001',
    userId: 'USR_EMP_001',
    companyName: 'Tech Startup Lanka',
    companyType: 'Software Company',
    description: 'Innovative tech startup building next-generation applications.',
    contactPerson: 'Nimal Fernando',
    verificationStatus: 'Verified',
    rating: 4.80,
    jobsPosted: 15,
    user: {
      userId: 'USR_EMP_001',
      id: 'USR_EMP_001',
      email: 'hr@techstartup.lk',
      phone: '+94112223344',
      name: 'Tech Startup Lanka',
      userType: 'Employer' as UserType,
      createdAt: '2023-09-01',
      status: 'Active' as UserStatus,
      isVerified: true
    }
  },
  {
    employerId: 'EMP002',
    userId: 'USR_EMP_002',
    companyName: 'Digital Hub Agency',
    companyType: 'Marketing Agency',
    description: 'Full-service digital marketing agency.',
    contactPerson: 'Sanduni Perera',
    verificationStatus: 'Verified',
    rating: 4.70,
    jobsPosted: 22,
    user: {
      userId: 'USR_EMP_002',
      id: 'USR_EMP_002',
      email: 'contact@digitalhub.lk',
      phone: '+94112334455',
      name: 'Digital Hub Agency',
      userType: 'Employer' as UserType,
      createdAt: '2023-07-15',
      status: 'Active' as UserStatus,
      isVerified: true
    }
  },
  {
    employerId: 'EMP003',
    userId: 'USR_EMP_003',
    companyName: 'ShopCeylon',
    companyType: 'E-commerce',
    description: 'Leading e-commerce platform.',
    contactPerson: 'Chaminda Rathnayake',
    verificationStatus: 'Verified',
    rating: 4.85,
    jobsPosted: 18,
    user: {
      userId: 'USR_EMP_003',
      id: 'USR_EMP_003',
      email: 'hiring@shopceylon.lk',
      phone: '+94112445566',
      name: 'ShopCeylon',
      userType: 'Employer' as UserType,
      createdAt: '2023-08-20',
      status: 'Active' as UserStatus,
      isVerified: true
    }
  }
];

// Helper to format dates as ISO strings
const daysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

const daysFromNow = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

// Mock Jobs - properly typed
export const mockJobs: Job[] = [
  {
    jobId: 'JOB001',
    id: 'JOB001',
    employerId: 'EMP001',
    categoryId: 'CAT001',
    title: 'React Developer for E-commerce Platform',
    description: 'We need an experienced React developer to build a modern e-commerce frontend with shopping cart, payment integration, and admin dashboard. Must have strong knowledge of React hooks, state management with Redux, and REST API integration.',
    payAmount: 35000.00,
    payType: 'Fixed' as PayType,
    durationDays: 60,
    requiredSkills: ['React', 'TypeScript', 'Redux', 'REST API'],
    postedDate: daysAgo(5),
    deadline: daysFromNow(25),
    status: 'Active' as JobStatus,
    location: 'Remote',
    jobType: 'ProjectBased' as JobType,
    maxApplicants: 10,
    applicationCount: 3
  },
  {
    jobId: 'JOB002',
    id: 'JOB002',
    employerId: 'EMP002',
    categoryId: 'CAT003',
    title: 'Brand Identity Design Package',
    description: 'Looking for a creative designer to create complete brand identity including logo, color palette, typography, and brand guidelines for a new startup.',
    payAmount: 25000.00,
    payType: 'Fixed' as PayType,
    durationDays: 21,
    requiredSkills: ['Adobe Illustrator', 'Photoshop', 'Brand Design'],
    postedDate: daysAgo(3),
    deadline: daysFromNow(18),
    status: 'Active' as JobStatus,
    location: 'Colombo',
    jobType: 'Freelance' as JobType,
    maxApplicants: 5,
    applicationCount: 2
  },
  {
    jobId: 'JOB003',
    id: 'JOB003',
    employerId: 'EMP003',
    categoryId: 'CAT004',
    title: 'SEO Blog Content Writer',
    description: 'Need talented writer for 20 SEO-optimized blog posts about e-commerce and online shopping trends in Sri Lanka. Must have strong research skills and SEO knowledge.',
    payAmount: 18000.00,
    payType: 'Fixed' as PayType,
    durationDays: 30,
    requiredSkills: ['Content Writing', 'SEO', 'Research'],
    postedDate: daysAgo(7),
    deadline: daysFromNow(23),
    status: 'Active' as JobStatus,
    location: 'Remote',
    jobType: 'ProjectBased' as JobType,
    maxApplicants: 8,
    applicationCount: 4
  },
  {
    jobId: 'JOB004',
    id: 'JOB004',
    employerId: 'EMP001',
    categoryId: 'CAT005',
    title: 'Product Demo Video Creation',
    description: 'Create engaging 2-minute product demo video with animations and professional voiceover for our SaaS product.',
    payAmount: 22000.00,
    payType: 'Fixed' as PayType,
    durationDays: 14,
    requiredSkills: ['Video Editing', 'After Effects', 'Animation'],
    postedDate: daysAgo(45),
    deadline: daysAgo(15),
    status: 'Completed' as JobStatus,
    location: 'Remote',
    jobType: 'Freelance' as JobType,
    maxApplicants: 5,
    applicationCount: 1
  },
  {
    jobId: 'JOB005',
    id: 'JOB005',
    employerId: 'EMP002',
    categoryId: 'CAT007',
    title: 'Social Media Marketing Campaign',
    description: 'Manage Instagram and Facebook accounts for 1 month, create content calendar and engaging posts for fashion brand.',
    payAmount: 15000.00,
    payType: 'Fixed' as PayType,
    durationDays: 30,
    requiredSkills: ['Social Media Marketing', 'Content Creation', 'Canva'],
    postedDate: daysAgo(60),
    deadline: daysAgo(30),
    status: 'Closed' as JobStatus,
    location: 'Remote',
    jobType: 'PartTime' as JobType,
    maxApplicants: 3,
    applicationCount: 2
  },
  {
    jobId: 'JOB006',
    id: 'JOB006',
    employerId: 'EMP003',
    categoryId: 'CAT011',
    title: 'Data Analysis Dashboard',
    description: 'Build interactive dashboard using Python and Tableau for sales data visualization and reporting. Must include trend analysis and forecasting.',
    payAmount: 40000.00,
    payType: 'Fixed' as PayType,
    durationDays: 45,
    requiredSkills: ['Python', 'Tableau', 'Data Analysis', 'SQL'],
    postedDate: daysAgo(2),
    deadline: daysFromNow(28),
    status: 'Active' as JobStatus,
    location: 'Remote',
    jobType: 'ProjectBased' as JobType,
    maxApplicants: 6,
    applicationCount: 1
  },
  {
    jobId: 'JOB007',
    id: 'JOB007',
    employerId: 'EMP001',
    categoryId: 'CAT002',
    title: 'Flutter Mobile App Development',
    description: 'Develop cross-platform mobile application for food delivery service. Must include real-time tracking, payment gateway, and user authentication.',
    payAmount: 55000.00,
    payType: 'Fixed' as PayType,
    durationDays: 90,
    requiredSkills: ['Flutter', 'Dart', 'Firebase', 'REST API'],
    postedDate: daysAgo(1),
    deadline: daysFromNow(29),
    status: 'Active' as JobStatus,
    location: 'Remote',
    jobType: 'ProjectBased' as JobType,
    maxApplicants: 8,
    applicationCount: 0
  },
  {
    jobId: 'JOB008',
    id: 'JOB008',
    employerId: 'EMP002',
    categoryId: 'CAT009',
    title: 'Product Photography for E-commerce',
    description: 'Professional product photography for 50+ items. Must include photo editing, background removal, and optimization for web.',
    payAmount: 30000.00,
    payType: 'Fixed' as PayType,
    durationDays: 20,
    requiredSkills: ['Photography', 'Photoshop', 'Lightroom'],
    postedDate: daysAgo(4),
    deadline: daysFromNow(16),
    status: 'Active' as JobStatus,
    location: 'Colombo',
    jobType: 'Freelance' as JobType,
    maxApplicants: 5,
    applicationCount: 2
  },
  {
    jobId: 'JOB009',
    id: 'JOB009',
    employerId: 'EMP003',
    categoryId: 'CAT010',
    title: 'Mathematics Tutor for Online Platform',
    description: 'Experienced tutor needed to create video lessons for high school mathematics. Must cover algebra, geometry, and calculus.',
    payAmount: 28000.00,
    payType: 'Fixed' as PayType,
    durationDays: 40,
    requiredSkills: ['Mathematics', 'Teaching', 'Video Recording'],
    postedDate: daysAgo(6),
    deadline: daysFromNow(24),
    status: 'Active' as JobStatus,
    location: 'Remote',
    jobType: 'PartTime' as JobType,
    maxApplicants: 4,
    applicationCount: 1
  },
  {
    jobId: 'JOB010',
    id: 'JOB010',
    employerId: 'EMP001',
    categoryId: 'CAT001',
    title: 'Full Stack Developer for SaaS Platform',
    description: 'Build complete SaaS platform with React frontend, Node.js backend, and PostgreSQL database. Must include user management, billing, and analytics.',
    payAmount: 80000.00,
    payType: 'Fixed' as PayType,
    durationDays: 120,
    requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    postedDate: daysAgo(8),
    deadline: daysFromNow(22),
    status: 'Active' as JobStatus,
    location: 'Remote',
    jobType: 'ProjectBased' as JobType,
    maxApplicants: 12,
    applicationCount: 5
  }
];

// Mock Job Applications - properly typed
export const mockJobApplications: JobApplication[] = [
  {
    applicationId: 'APP001',
    id: 'APP001',
    jobId: 'JOB001',
    jobTitle: 'React Developer for E-commerce Platform',
    employerName: 'Tech Startup Lanka',
    studentId: 'STU001',
    studentName: 'Kasun Perera',
    studentEmail: 'kasun.perera@student.uom.lk',
    studentPhone: '+94771234567',
    university: 'University of Moratuwa',
    course: 'BSc (Hons) in Information Technology',
    yearOfStudy: 2,
    appliedAt: daysAgo(4),
    status: 'Accepted' as ApplicationStatus,
    coverLetter: 'I am excited to apply for this position. With 2 years of React experience and 47 completed projects, I can deliver high-quality work.',
    statusUpdatedAt: daysAgo(3),
    employerNotes: 'Strong portfolio, accepted for interview'
  },
  {
    applicationId: 'APP002',
    id: 'APP002',
    jobId: 'JOB001',
    jobTitle: 'React Developer for E-commerce Platform',
    employerName: 'Tech Startup Lanka',
    studentId: 'STU003',
    studentName: 'Ravindu Fernando',
    studentEmail: 'ravindu.fernando@sliit.lk',
    studentPhone: '+94773456789',
    university: 'Sri Lanka Institute of Information Technology',
    course: 'BSc (Hons) in IT specializing in Data Science',
    yearOfStudy: 2,
    appliedAt: daysAgo(4),
    status: 'Pending' as ApplicationStatus,
    coverLetter: 'Hello, I have experience with React and would love to work on this project.',
    statusUpdatedAt: daysAgo(4),
    employerNotes: ''
  },
  {
    applicationId: 'APP003',
    id: 'APP003',
    jobId: 'JOB002',
    jobTitle: 'Brand Identity Design Package',
    employerName: 'Digital Hub Agency',
    studentId: 'STU002',
    studentName: 'Nimali Silva',
    studentEmail: 'nimali.silva@ucsc.cmb.ac.lk',
    studentPhone: '+94772345678',
    university: 'University of Colombo School of Computing',
    course: 'BSc in Computer Science',
    yearOfStudy: 3,
    appliedAt: daysAgo(2),
    status: 'Pending' as ApplicationStatus,
    coverLetter: 'I am a UI/UX designer with expertise in brand identity design. Check out my portfolio!',
    statusUpdatedAt: daysAgo(2),
    employerNotes: ''
  },
  {
    applicationId: 'APP004',
    id: 'APP004',
    jobId: 'JOB003',
    jobTitle: 'SEO Blog Content Writer',
    employerName: 'ShopCeylon',
    studentId: 'STU004',
    studentName: 'Thisara Jayasinghe',
    studentEmail: 'thisara.j@pdn.ac.lk',
    studentPhone: '+94774567890',
    university: 'University of Peradeniya',
    course: 'BA (Hons) in English',
    yearOfStudy: 3,
    appliedAt: daysAgo(6),
    status: 'Accepted' as ApplicationStatus,
    coverLetter: 'With 65 completed writing projects and SEO expertise, I can create engaging, optimized content.',
    statusUpdatedAt: daysAgo(5),
    employerNotes: 'Excellent samples, hired'
  },
  {
    applicationId: 'APP005',
    id: 'APP005',
    jobId: 'JOB004',
    jobTitle: 'Product Demo Video Creation',
    employerName: 'Tech Startup Lanka',
    studentId: 'STU005',
    studentName: 'Dinuka Wickramasinghe',
    studentEmail: 'dinuka.w@uom.lk',
    studentPhone: '+94775678901',
    university: 'University of Moratuwa',
    course: 'BSc in Multimedia and Web Technology',
    yearOfStudy: 2,
    appliedAt: daysAgo(44),
    status: 'Selected' as ApplicationStatus,
    coverLetter: 'I specialize in video editing and have created numerous product demos.',
    statusUpdatedAt: daysAgo(40),
    employerNotes: 'Completed successfully, excellent work'
  },
  {
    applicationId: 'APP006',
    id: 'APP006',
    jobId: 'JOB006',
    jobTitle: 'Data Analysis Dashboard',
    employerName: 'ShopCeylon',
    studentId: 'STU003',
    studentName: 'Ravindu Fernando',
    studentEmail: 'ravindu.fernando@sliit.lk',
    studentPhone: '+94773456789',
    university: 'Sri Lanka Institute of Information Technology',
    course: 'BSc (Hons) in IT specializing in Data Science',
    yearOfStudy: 2,
    appliedAt: daysAgo(1),
    status: 'Pending' as ApplicationStatus,
    coverLetter: 'Data analysis is my specialty. I have experience with Python, Tableau, and building dashboards.',
    statusUpdatedAt: daysAgo(1),
    employerNotes: ''
  },
  {
    applicationId: 'APP007',
    id: 'APP007',
    jobId: 'JOB007',
    jobTitle: 'Flutter Mobile App Development',
    employerName: 'Tech Startup Lanka',
    studentId: 'STU001',
    studentName: 'Kasun Perera',
    studentEmail: 'kasun.perera@student.uom.lk',
    studentPhone: '+94771234567',
    university: 'University of Moratuwa',
    course: 'BSc (Hons) in Information Technology',
    yearOfStudy: 2,
    appliedAt: daysAgo(0.5),
    status: 'Pending' as ApplicationStatus,
    coverLetter: 'I have extensive experience with Flutter and have built several production apps. Would love to work on this project.',
    statusUpdatedAt: daysAgo(0.5),
    employerNotes: ''
  },
  {
    applicationId: 'APP008',
    id: 'APP008',
    jobId: 'JOB008',
    jobTitle: 'Product Photography for E-commerce',
    employerName: 'Digital Hub Agency',
    studentId: 'STU002',
    studentName: 'Nimali Silva',
    studentEmail: 'nimali.silva@ucsc.cmb.ac.lk',
    studentPhone: '+94772345678',
    university: 'University of Colombo School of Computing',
    course: 'BSc in Computer Science',
    yearOfStudy: 3,
    appliedAt: daysAgo(3),
    status: 'Accepted' as ApplicationStatus,
    coverLetter: 'Professional photographer with 5+ years experience in product photography.',
    statusUpdatedAt: daysAgo(2),
    employerNotes: 'Great portfolio, starting work'
  },
  {
    applicationId: 'APP009',
    id: 'APP009',
    jobId: 'JOB010',
    jobTitle: 'Full Stack Developer for SaaS Platform',
    employerName: 'Tech Startup Lanka',
    studentId: 'STU003',
    studentName: 'Ravindu Fernando',
    studentEmail: 'ravindu.fernando@sliit.lk',
    studentPhone: '+94773456789',
    university: 'Sri Lanka Institute of Information Technology',
    course: 'BSc (Hons) in IT specializing in Data Science',
    yearOfStudy: 2,
    appliedAt: daysAgo(7),
    status: 'Pending' as ApplicationStatus,
    coverLetter: 'Full stack developer with 3+ years experience building SaaS platforms. Ready to take on this challenge.',
    statusUpdatedAt: daysAgo(7),
    employerNotes: ''
  }
];

// Helper function to search/filter jobs
export const searchJobs = (
  jobs: Job[],
  searchTerm?: string,
  categoryId?: string,
  location?: string,
  minPay?: number,
  maxPay?: number
): Job[] => {
  return jobs.filter(job => {
    // Only show active jobs in search
    if (job.status !== 'Active') return false;

    // Search term filter
    if (searchTerm && searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const matchesTitle = job.title.toLowerCase().includes(term);
      const matchesDescription = job.description.toLowerCase().includes(term);
      const matchesSkills = job.requiredSkills.some(skill => 
        skill.toLowerCase().includes(term)
      );
      
      if (!matchesTitle && !matchesDescription && !matchesSkills) {
        return false;
      }
    }

    // Category filter
    if (categoryId && job.categoryId !== categoryId) {
      return false;
    }

    // Location filter
    if (location && location.trim() && !job.location.toLowerCase().includes(location.toLowerCase())) {
      return false;
    }

    // Pay range filter
    if (minPay !== undefined && job.payAmount < minPay) {
      return false;
    }
    if (maxPay !== undefined && job.payAmount > maxPay) {
      return false;
    }

    return true;
  });
};
