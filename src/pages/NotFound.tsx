import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Star, MessageCircle, Clock, DollarSign, CheckCircle, AlertCircle,
    Download, Eye, Filter, ChevronDown, User, Briefcase, TrendingUp,
    Plus, Search, Flag, X, Upload, FileText, Phone, Mail, MapPin, Award
} from 'lucide-react';

// ============ TYPE DEFINITIONS ============
interface ApplicationCandidate {
    id: number;
    studentName: string;
    rating: number;
    completedJobs: number;
    bio: string;
    coverLetter: string;
    status: 'new' | 'viewed' | 'rejected';
    avatar: string;
    bidAmount: number;
}

interface AdminUser {
    id: number;
    name: string;
    type: 'Student' | 'Employer';
    email: string;
    idStatus: 'verified' | 'pending' | 'rejected';
    emailStatus: 'verified' | 'pending';
    submittedAt: string;
    documents: string[];
}

interface FlaggedContent {
    id: number;
    type: 'Job Posting' | 'Review' | 'Message';
    title?: string;
    content?: string;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
    flaggedAt: string;
}

interface StatCardData {
    label: string;
    value: string;
    change: string;
}

interface EmployerJobOverview {
    id: number;
    title: string;
    status: 'Active' | 'Completed' | 'Cancelled';
    proposals: number;
    spent: number;
    createdAt: string;
}

// ============ EMPLOYER - MANAGE APPLICATIONS (TypeScript) ============
const EmployerManageApplications: React.FC = () => {
    const navigate = useNavigate();
    const [applications] = useState<ApplicationCandidate[]>([
        {
            id: 1,
            studentName: 'Roshan Perera',
            rating: 4.9,
            completedJobs: 45,
            bio: 'Expert React developer with 5+ years experience',
            coverLetter: 'I have extensive experience in React development and have completed similar projects. I can deliver high-quality blog posts with code examples.',
            status: 'new',
            avatar: '👨‍💻',
            bidAmount: 4800,
        },
        {
            id: 2,
            studentName: 'Asha Silva',
            rating: 4.7,
            completedJobs: 23,
            bio: 'Content writer and blogger',
            coverLetter: 'I specialize in tech blog writing and have published 100+ articles. My writing style is engaging and SEO-friendly.',
            status: 'new',
            avatar: '👩‍💻',
            bidAmount: 5000,
        },
        {
            id: 3,
            studentName: 'Kasun Dias',
            rating: 4.5,
            completedJobs: 12,
            bio: 'Junior developer learning React',
            coverLetter: 'I am looking to build experience with real projects. I can deliver quality work within your timeline.',
            status: 'viewed',
            avatar: '👨‍🎓',
            bidAmount: 3500,
        },
    ]);

    const [selectedApp, setSelectedApp] = useState<ApplicationCandidate | null>(applications[0]);
    const [filter, setFilter] = useState<'all' | 'new' | 'viewed'>('all');

    const filteredApps: ApplicationCandidate[] =
        filter === 'all' ? applications : applications.filter((app) => app.status === filter);

    const handleHire = (): void => {
        alert(`Hired ${selectedApp?.studentName}`);
    };

    const handleMessage = async (): Promise<void> => {
        if (!selectedApp) return;
        
        try {
            // Create or get conversation
            const currentUserId = 'employer-123'; // Replace with actual user ID from auth context
            const studentId = `student-${selectedApp.id}`;
            
            // Try to create conversation
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://localhost:7255/api'}/conversation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    participant1Id: currentUserId,
                    participant2Id: studentId,
                }),
            });
            
            const conversation = await response.json();
            
            // Navigate to chat
            navigate(`/messages/${conversation.conversationId}`, {
                state: {
                    otherUserId: studentId,
                    otherUserName: selectedApp.studentName,
                },
            });
        } catch (error) {
            console.error('Failed to create conversation:', error);
            // Fallback: just navigate to messages list
            navigate('/messages');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold">Applications for "Write Blog Post"</h1>
                    <p className="text-sm text-gray-600 mt-1">12 proposals • Sort by relevance</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-3 gap-6">
                {/* Applications List */}
                <div className="col-span-1">
                    <div className="flex gap-2 mb-4">
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as 'all' | 'new' | 'viewed')}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        >
                            <option value="all">All</option>
                            <option value="new">New</option>
                            <option value="viewed">Viewed</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        {filteredApps.map((app: ApplicationCandidate) => (
                            <div
                                key={app.id}
                                onClick={() => setSelectedApp(app)}
                                className={`p-4 rounded-lg border-2 cursor-pointer transition ${selectedApp?.id === app.id
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-200 bg-white hover:shadow-md'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="text-2xl">{app.avatar}</div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-sm text-gray-800">{app.studentName}</h3>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Star size={14} className="text-yellow-500 fill-yellow-500" />
                                            <span className="text-xs text-gray-600">{app.rating} • {app.completedJobs} jobs</span>
                                        </div>
                                        <div className="text-xs text-blue-600 font-medium mt-2">₨{app.bidAmount}</div>
                                    </div>
                                    {app.status === 'new' && (
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                                            NEW
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Application Details */}
                <div className="col-span-2">
                    {selectedApp && (
                        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
                            {/* Header */}
                            <div>
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-4xl">{selectedApp.avatar}</span>
                                            <div>
                                                <h2 className="text-2xl font-bold">{selectedApp.studentName}</h2>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                                                    <span className="text-sm text-gray-600">{selectedApp.rating}/5 ({selectedApp.completedJobs} completed jobs)</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-blue-600">₨{selectedApp.bidAmount}</div>
                                        <div className="text-xs text-gray-600 mt-1">Bid Amount</div>
                                    </div>
                                </div>
                            </div>

                            {/* Bio */}
                            <div className="border-b pb-4">
                                <h3 className="font-bold text-gray-800 mb-2">Profile</h3>
                                <p className="text-gray-700">{selectedApp.bio}</p>
                            </div>

                            {/* Cover Letter */}
                            <div className="border-b pb-4">
                                <h3 className="font-bold text-gray-800 mb-2">Cover Letter</h3>
                                <p className="text-gray-700 leading-relaxed">{selectedApp.coverLetter}</p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="text-xs text-gray-600">Success Rate</p>
                                    <p className="text-lg font-bold text-gray-800">98%</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600">Avg. Response Time</p>
                                    <p className="text-lg font-bold text-gray-800">2 hours</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600">Total Earned</p>
                                    <p className="text-lg font-bold text-gray-800">₨125,000</p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4 border-t">
                                <button
                                    onClick={handleHire}
                                    className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
                                >
                                    Hire
                                </button>
                                <button
                                    onClick={handleMessage}
                                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                                >
                                    Message Student
                                </button>
                                <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                                    <Flag size={18} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ============ ADMIN DASHBOARD ============
const AdminDashboard: React.FC = () => {
    const [stats] = useState<StatCardData[]>([
        { label: 'Total Users', value: '3,245', change: '+12%' },
        { label: 'Active Jobs', value: '156', change: '+8%' },
        { label: 'Total Revenue', value: '₨5.2M', change: '+15%' },
        { label: 'Disputes', value: '3', change: '-2%' },
    ]);

    const [quickActions] = useState([
        { icon: Briefcase, title: 'Verification Queue', description: '12 users pending verification', action: 'Review Now' },
        { icon: Flag, title: 'Content Moderation', description: '5 posts flagged for review', action: 'Review Now' },
        { icon: AlertCircle, title: 'Active Disputes', description: '3 disputes need resolution', action: 'Review Now' },
    ]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <p className="text-sm text-gray-600">Platform overview and management</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {stats.map((stat: StatCardData, idx: number) => (
                        <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                            <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                            <div className="flex items-baseline justify-between mt-2">
                                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                                <span className="text-green-600 text-sm font-medium">{stat.change}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {quickActions.map((action, idx: number) => {
                        const Icon = action.icon;
                        return (
                            <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                                <Icon size={24} className="text-blue-600 mb-3" />
                                <h3 className="font-bold text-gray-800 mb-2">{action.title}</h3>
                                <p className="text-sm text-gray-600 mb-3">{action.description}</p>
                                <button className="text-blue-600 font-medium text-sm hover:underline">
                                    {action.action} →
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
                    <div className="space-y-3">
                        <ActivityItem icon="✓" title="New user registered" time="5 min ago" />
                        <ActivityItem icon="💼" title="New job posted" time="12 min ago" />
                        <ActivityItem icon="⚠️" title="Suspicious payment detected" time="25 min ago" />
                        <ActivityItem icon="🚩" title="Content flagged for review" time="1 hour ago" />
                    </div>
                </div>
            </div>
        </div>
    );
};

interface ActivityItemProps {
    icon: string;
    title: string;
    time: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ icon, title, time }) => {
    return (
        <div className="flex items-center gap-3 pb-3 border-b last:border-b-0">
            <div className="text-xl">{icon}</div>
            <div className="flex-1">
                <p className="text-gray-800">{title}</p>
                <p className="text-xs text-gray-500">{time}</p>
            </div>
        </div>
    );
};

// ============ VERIFICATION QUEUE (TypeScript) ============
const VerificationQueue: React.FC = () => {
    const [users] = useState<AdminUser[]>([
        {
            id: 1,
            name: 'Roshan Perera',
            type: 'Student',
            email: 'roshan@uni.lk',
            idStatus: 'pending',
            emailStatus: 'verified',
            submittedAt: '2024-01-20',
            documents: ['Student ID', 'National ID'],
        },
        {
            id: 2,
            name: 'Tech Solutions Ltd',
            type: 'Employer',
            email: 'contact@techsol.lk',
            idStatus: 'pending',
            emailStatus: 'verified',
            submittedAt: '2024-01-19',
            documents: ['Business License', 'Tax ID'],
        },
        {
            id: 3,
            name: 'Asha Silva',
            type: 'Student',
            email: 'asha@uni.lk',
            idStatus: 'verified',
            emailStatus: 'verified',
            submittedAt: '2024-01-18',
            documents: ['Student ID', 'National ID'],
        },
    ]);

    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(users[0]);
    const [showDocumentModal, setShowDocumentModal] = useState<boolean>(false);

    const handleApprove = (): void => {
        alert(`Approved ${selectedUser?.name}`);
    };

    const handleReject = (): void => {
        alert(`Rejected ${selectedUser?.name}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold">Verification Queue</h1>
                    <p className="text-sm text-gray-600">
                        {users.filter((u) => u.idStatus === 'pending').length} users awaiting verification
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-3 gap-6">
                {/* Users List */}
                <div className="col-span-1">
                    <div className="space-y-2">
                        {users.map((user: AdminUser) => (
                            <div
                                key={user.id}
                                onClick={() => setSelectedUser(user)}
                                className={`p-4 rounded-lg border-2 cursor-pointer transition ${selectedUser?.id === user.id
                                        ? 'border-blue-600 bg-blue-50'
                                        : 'border-gray-200 bg-white hover:shadow-md'
                                    }`}
                            >
                                <div className="flex items-start gap-3">
                                    <div className="text-2xl">{user.type === 'Student' ? '👤' : '🏢'}</div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-sm text-gray-800">{user.name}</h3>
                                        <p className="text-xs text-gray-600">{user.type}</p>
                                        {user.idStatus === 'pending' && (
                                            <span className="inline-block mt-2 px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                                                PENDING
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* User Details & Verification */}
                <div className="col-span-2">
                    {selectedUser && (
                        <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
                            {/* User Header */}
                            <div>
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-4xl">{selectedUser.type === 'Student' ? '👤' : '🏢'}</span>
                                            <div>
                                                <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
                                                <p className="text-sm text-gray-600">{selectedUser.type}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${selectedUser.idStatus === 'verified'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                            }`}
                                    >
                                        {selectedUser.idStatus === 'verified' ? '✓ VERIFIED' : '⏳ PENDING'}
                                    </span>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="border-b pb-4">
                                <h3 className="font-bold text-gray-800 mb-3">Contact Information</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Mail size={16} className="text-gray-400" />
                                        <span>{selectedUser.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock size={16} className="text-gray-400" />
                                        <span>Submitted: {selectedUser.submittedAt}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Documents */}
                            <div className="border-b pb-4">
                                <h3 className="font-bold text-gray-800 mb-3">Documents</h3>
                                <div className="space-y-2">
                                    {selectedUser.documents.map((doc: string, idx: number) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <FileText size={16} className="text-gray-400" />
                                                <span className="text-sm text-gray-700">{doc}</span>
                                            </div>
                                            <button
                                                onClick={() => setShowDocumentModal(true)}
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                                            >
                                                <Eye size={14} /> View
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Verification Status */}
                            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                                <div>
                                    <p className="text-xs text-gray-600">Email Status</p>
                                    <p className="text-sm font-bold text-green-600 mt-1">✓ {selectedUser.emailStatus}</p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600">ID Status</p>
                                    <p
                                        className={`text-sm font-bold mt-1 ${selectedUser.idStatus === 'verified' ? 'text-green-600' : 'text-yellow-600'
                                            }`}
                                    >
                                        {selectedUser.idStatus === 'verified' ? '✓' : '⏳'} {selectedUser.idStatus}
                                    </p>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            {selectedUser.idStatus === 'pending' && (
                                <div className="flex gap-3 pt-4 border-t">
                                    <button
                                        onClick={handleApprove}
                                        className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={handleReject}
                                        className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg font-bold hover:bg-red-700"
                                    >
                                        Reject
                                    </button>
                                    <button className="px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                                        Request More Info
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Document Modal */}
            {showDocumentModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
                            <h2 className="text-xl font-bold">Document Preview</h2>
                            <button onClick={() => setShowDocumentModal(false)} className="text-gray-600 hover:text-gray-800">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 bg-gray-100 flex items-center justify-center h-96">
                            <div className="text-center">
                                <FileText size={48} className="text-gray-400 mx-auto mb-3" />
                                <p className="text-gray-600">Document preview would display here</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// ============ CONTENT MODERATION ============
const ContentModeration: React.FC = () => {
    const [flaggedContent] = useState<FlaggedContent[]>([
        {
            id: 1,
            type: 'Job Posting',
            title: 'Write 500 articles',
            reason: 'Unrealistic scope',
            status: 'pending',
            flaggedAt: '2024-01-20',
        },
        {
            id: 2,
            type: 'Review',
            content: 'This user scammed me...',
            reason: 'Unverified claim',
            status: 'pending',
            flaggedAt: '2024-01-19',
        },
    ]);

    const handleApprove = (id: number): void => {
        alert(`Approved content ${id}`);
    };

    const handleRemove = (id: number): void => {
        alert(`Removed content ${id}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <h1 className="text-2xl font-bold">Content Moderation Queue</h1>
                    <p className="text-sm text-gray-600">
                        {flaggedContent.filter((f) => f.status === 'pending').length} items pending review
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="space-y-4">
                    {flaggedContent.map((item: FlaggedContent) => (
                        <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                                            {item.type}
                                        </span>
                                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded">
                                            {item.reason}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-gray-800">{item.title || item.content}</h3>
                                    <p className="text-xs text-gray-500 mt-1">Flagged: {item.flaggedAt}</p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleApprove(item.id)}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
                                >
                                    Approve
                                </button>
                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700"
                                >
                                    Remove
                                </button>
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">
                                    Request Info
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ============ MAIN APP TAB SWITCHER ============
interface Tab {
    id: string;
    label: string;
    component: React.ComponentType<any>;
}

const PeerPayAdminScreen: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('employer-apps');

    const tabs: Tab[] = [
        { id: 'employer-apps', label: 'Manage Applications', component: EmployerManageApplications },
        { id: 'admin-dashboard', label: 'Admin Dashboard', component: AdminDashboard },
        { id: 'verification', label: 'Verification Queue', component: VerificationQueue },
        { id: 'moderation', label: 'Content Moderation', component: ContentModeration },
    ];

    const ActiveComponent = tabs.find((t) => t.id === activeTab)?.component;

    return (
        <div>
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-3 font-medium border-b-2 transition whitespace-nowrap ${activeTab === tab.id
                                        ? 'border-blue-600 text-blue-600'
                                        : 'border-transparent text-gray-600 hover:text-gray-800'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <div>{ActiveComponent && <ActiveComponent />}</div>
        </div>
    );
};

export default PeerPayAdminScreen;