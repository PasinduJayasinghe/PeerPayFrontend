import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import messageService from '../../services/messageService';
import './ConversationList.css';

interface ConversationDto {
  conversationId: string;
  participant1Id: string;
  participant1Name: string;
  participant2Id: string;
  participant2Name: string;
  jobId: string;
  jobTitle: string;
  lastMessageAt: string;
  isActive: boolean;
  lastMessage: {
    messageId: string;
    content: string;
    senderId: string;
    timestamp: string;
  } | null;
  unreadCount: number;
}

interface ConversationListProps {
  currentUserId: string;
  userType: 'student' | 'employer';
}

const ConversationList: React.FC<ConversationListProps> = ({ currentUserId, userType }) => {
  const [conversations, setConversations] = useState<ConversationDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchConversations();
  }, [currentUserId]);

  const fetchConversations = async () => {
    try {
      setLoading(true);
      const data = await messageService.getUserConversations(currentUserId);
      setConversations(data);
      setError('');
    } catch (err: any) {
      console.error('Failed to load conversations:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load conversations');
    } finally {
      setLoading(false);
    }
  };

  const handleConversationClick = (conv: ConversationDto) => {
    const otherUserId = conv.participant1Id === currentUserId ? conv.participant2Id : conv.participant1Id;
    const otherUserName = conv.participant1Id === currentUserId ? conv.participant2Name : conv.participant1Name;
    navigate(`/messages/${conv.conversationId}`, { 
      state: { 
        otherUserId,
        otherUserName,
        jobTitle: conv.jobTitle
      } 
    });
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
          {conversations.map((conv) => {
            const otherParticipantName = conv.participant1Id === currentUserId 
              ? conv.participant2Name 
              : conv.participant1Name;
            
            return (
              <div
                key={conv.conversationId}
                className={`conversation-item ${conv.unreadCount > 0 ? 'unread' : ''}`}
                onClick={() => handleConversationClick(conv)}
              >
                <div className="conversation-avatar">
                  {otherParticipantName.charAt(0).toUpperCase()}
                </div>
                <div className="conversation-content">
                  <div className="conversation-top">
                    <h3 className="conversation-name">{otherParticipantName}</h3>
                    <span className="conversation-time">{formatTime(conv.lastMessageAt)}</span>
                  </div>
                  <div className="conversation-bottom">
                    <p className="conversation-preview">
                      {conv.lastMessage?.content || 'No messages yet'}
                    </p>
                    {conv.unreadCount > 0 && (
                      <span className="unread-badge">{conv.unreadCount}</span>
                    )}
                  </div>
                  {conv.jobTitle && (
                    <div className="conversation-job">
                      <span>💼 {conv.jobTitle}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ConversationList;
