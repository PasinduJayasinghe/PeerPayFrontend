import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ConversationList.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:7255/api';

interface Conversation {
  conversationId: string;
  participant1Id: string;
  participant2Id: string;
  participant1Name: string;
  participant2Name: string;
  lastMessageContent?: string;
  lastMessageAt?: string;
  unreadCount: number;
  createdAt: string;
}

interface ConversationListProps {
  currentUserId: string;
  userType: 'student' | 'employer';
}

const ConversationList: React.FC<ConversationListProps> = ({ currentUserId, userType }) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchConversations();
  }, [currentUserId]);

  const fetchConversations = async () => {
    try {
      // FOR DEMO VIDEO: Mock conversation data
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockConversations: Conversation[] = [
        {
          conversationId: 'conv-1',
          participant1Id: currentUserId,
          participant2Id: userType === 'student' ? 'emp-101' : 'stu-201',
          participant1Name: 'You',
          participant2Name: userType === 'student' ? 'Tech Solutions Inc.' : 'John Smith',
          lastMessageContent: userType === 'student' 
            ? 'When can you start the project?' 
            : 'I can start immediately. The project looks interesting!',
          lastMessageAt: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
          unreadCount: 2,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          conversationId: 'conv-2',
          participant1Id: currentUserId,
          participant2Id: userType === 'student' ? 'emp-102' : 'stu-202',
          participant1Name: 'You',
          participant2Name: userType === 'student' ? 'Creative Agency' : 'Sarah Johnson',
          lastMessageContent: userType === 'student'
            ? 'Thanks for applying! Let me review your portfolio.'
            : 'I have 3 years of experience in this field.',
          lastMessageAt: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
          unreadCount: 0,
          createdAt: new Date(Date.now() - 172800000).toISOString(),
        },
        {
          conversationId: 'conv-3',
          participant1Id: currentUserId,
          participant2Id: userType === 'student' ? 'emp-103' : 'stu-203',
          participant1Name: 'You',
          participant2Name: userType === 'student' ? 'Digital Marketing Co.' : 'Mike Chen',
          lastMessageContent: userType === 'student'
            ? 'The deadline is flexible, we can discuss.'
            : 'What is the project timeline?',
          lastMessageAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          unreadCount: 1,
          createdAt: new Date(Date.now() - 259200000).toISOString(),
        },
      ];
      
      setConversations(mockConversations);
      
      // Original API call (commented for demo):
      // const response = await axios.get(`${API_BASE_URL}/conversation/user/${currentUserId}`);
      // setConversations(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  const getOtherParticipantName = (conv: Conversation) => {
    return conv.participant1Id === currentUserId ? conv.participant2Name : conv.participant1Name;
  };

  const getOtherParticipantId = (conv: Conversation) => {
    return conv.participant1Id === currentUserId ? conv.participant2Id : conv.participant1Id;
  };

  const handleConversationClick = (conversationId: string, otherUserId: string) => {
    navigate(`/messages/${conversationId}`, { state: { otherUserId } });
  };

  const formatTime = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="conversations-container">
        <div className="conversations-header">
          <h1>Messages</h1>
        </div>
        <div className="loading-state">Loading conversations...</div>
      </div>
    );
  }

  return (
    <div className="conversations-container">
      <div className="conversations-header">
        <h1>Messages</h1>
        <div className="conversations-count">{conversations.length} conversations</div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {conversations.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💬</div>
          <h3>No conversations yet</h3>
          <p>Start messaging with {userType === 'employer' ? 'students' : 'employers'} to see your conversations here</p>
        </div>
      ) : (
        <div className="conversations-list">
          {conversations.map((conv) => (
            <div
              key={conv.conversationId}
              className={`conversation-item ${conv.unreadCount > 0 ? 'unread' : ''}`}
              onClick={() => handleConversationClick(conv.conversationId, getOtherParticipantId(conv))}
            >
              <div className="conversation-avatar">
                {getOtherParticipantName(conv).charAt(0).toUpperCase()}
              </div>
              <div className="conversation-content">
                <div className="conversation-top">
                  <h3 className="conversation-name">{getOtherParticipantName(conv)}</h3>
                  <span className="conversation-time">{formatTime(conv.lastMessageAt)}</span>
                </div>
                <div className="conversation-bottom">
                  <p className="conversation-preview">
                    {conv.lastMessageContent || 'No messages yet'}
                  </p>
                  {conv.unreadCount > 0 && (
                    <span className="unread-badge">{conv.unreadCount}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConversationList;
