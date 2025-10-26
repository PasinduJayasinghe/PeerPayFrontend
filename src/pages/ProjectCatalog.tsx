import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Folder, 
  Search, 
  Star,
  Filter,
  ArrowLeft,
  MapPin,
  Clock,
  DollarSign,
  Briefcase,
  Code,
  Palette,
  BookOpen,
  Video,
  Database,
  Globe
} from 'lucide-react';
import PeerPayLogo from '../assets/images/PeerPayLogo.png';

const ProjectCatalog: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'All', icon: Folder, count: 156 },
    { name: 'Web Development', icon: Code, count: 42 },
    { name: 'Design', icon: Palette, count: 35 },
    { name: 'Content', icon: BookOpen, count: 28 },
    { name: 'Video', icon: Video, count: 24 },
    { name: 'Data', icon: Database, count: 15 },
    { name: 'Marketing', icon: Globe, count: 12 },
  ];

  const projects = [
    {
      title: 'E-commerce Website Development',
      category: 'Web Development',
      budget: 45000,
      duration: '2-3 months',
      location: 'Colombo',
      description: 'Looking for a skilled student to build a modern e-commerce platform with React and Node.js',
      skills: ['React', 'Node.js', 'MongoDB', 'Payment Integration'],
      postedDate: '2 days ago',
      applications: 8
    },
    {
      title: 'Brand Identity Design Package',
      category: 'Design',
      budget: 25000,
      duration: '3-4 weeks',
      location: 'Remote',
      description: 'Need a creative designer for complete brand identity including logo, colors, and style guide',
      skills: ['Adobe Illustrator', 'Photoshop', 'Brand Design'],
      postedDate: '1 day ago',
      applications: 12
    },
    {
      title: 'SEO Blog Content Writing',
      category: 'Content',
      budget: 15000,
      duration: '1 month',
      location: 'Remote',
      description: 'Seeking talented writer for 20 SEO-optimized blog posts on technology topics',
      skills: ['Content Writing', 'SEO', 'Research'],
      postedDate: '3 days ago',
      applications: 15
    },
    {
      title: 'Product Demo Video Creation',
      category: 'Video',
      budget: 20000,
      duration: '2 weeks',
      location: 'Gampaha',
      description: 'Create engaging product demonstration video with animations and voiceover',
      skills: ['Video Editing', 'After Effects', 'Animation'],
      postedDate: '5 days ago',
      applications: 6
    },
    {
      title: 'Data Analysis Dashboard',
      category: 'Data',
      budget: 35000,
      duration: '1 month',
      location: 'Remote',
      description: 'Build interactive data visualization dashboard using Python and Tableau',
      skills: ['Python', 'Tableau', 'Data Analysis', 'SQL'],
      postedDate: '1 week ago',
      applications: 4
    },
    {
      title: 'Social Media Marketing Campaign',
      category: 'Marketing',
      budget: 18000,
      duration: '1 month',
      location: 'Kandy',
      description: 'Manage social media accounts and create engaging content for startup company',
      skills: ['Social Media', 'Content Creation', 'Analytics'],
      postedDate: '4 days ago',
      applications: 10
    },
  ];

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (categoryName: string) => {
    const category = categories.find(c => c.name === categoryName);
    return category ? category.icon : Folder;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-600 rounded-full mb-6">
            <Folder className="w-5 h-5" />
            <span className="font-semibold">Project Catalog</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Explore
            <span className="text-[#8C00FF]"> Available Projects</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Browse hundreds of exciting projects waiting for talented students like you
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 px-4 bg-white sticky top-20 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent"
              />
            </div>
            <button className="px-6 py-3 bg-[#8C00FF] text-white rounded-lg font-semibold hover:bg-[#7300CC] transition flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-3 overflow-x-auto pb-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.name}
                  onClick={() => setSelectedCategory(category.name)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition ${
                    selectedCategory === category.name
                      ? 'bg-[#8C00FF] text-white'
                      : 'bg-white text-gray-700 hover:bg-purple-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {category.name}
                  <span className="text-sm opacity-75">({category.count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-8 px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredProjects.length} Projects Found
            </h2>
          </div>

          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredProjects.map((project, index) => {
                const CategoryIcon = getCategoryIcon(project.category);
                return (
                  <div key={index} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-6 border border-gray-200 cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                          <CategoryIcon className="w-6 h-6 text-[#8C00FF]" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
                          <span className="text-sm text-gray-600">{project.category}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.skills.slice(0, 3).map((skill) => (
                        <span key={skill} className="px-3 py-1 bg-purple-50 text-[#8C00FF] rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                      {project.skills.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                          +{project.skills.length - 3} more
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span className="font-semibold">Rs {project.budget.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>{project.duration}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{project.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Briefcase className="w-4 h-4" />
                        <span>{project.applications} applicants</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className="text-sm text-gray-500">{project.postedDate}</span>
                      <button 
                        onClick={() => navigate('/student/jobs')}
                        className="px-4 py-2 bg-[#8C00FF] text-white rounded-lg font-semibold hover:bg-[#7300CC] transition"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Next Project?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Join PeerPay and connect with talented students today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register/student')}
              className="px-8 py-4 bg-white text-orange-600 rounded-lg font-semibold hover:bg-gray-100 transition text-lg"
            >
              Find Work
            </button>
            <button
              onClick={() => navigate('/register/employer')}
              className="px-8 py-4 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition text-lg border-2 border-white"
            >
              Post a Project
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

export default ProjectCatalog;
