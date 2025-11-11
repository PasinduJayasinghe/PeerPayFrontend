import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import messageService from '../../services/messageService';
import './ChatInterface.css';

interface MessageDto {
  messageId: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  attachments: string[];
  timestamp: string;
  status: string;
  isRead: boolean;
  readAt?: string;
}

interface ChatInterfaceProps {
  currentUserId: string;
  currentUserName: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ currentUserId }) => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [otherUserName, setOtherUserName] = useState('');

  useEffect(() => {
    if (conversationId) {
      fetchMessages();
      // Poll for new messages every 5 seconds
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [conversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Get other user info from location state
    if (location.state?.otherUserName) {
      setOtherUserName(location.state.otherUserName || 'User');
    }
  }, [location]);

  const fetchMessages = async () => {
    try {
      if (!conversationId) return;
      
      const data = await messageService.getConversationMessages(conversationId, currentUserId);
      setMessages(data.messages || []);
      
      // Mark conversation as read
      await messageService.markConversationAsRead(conversationId, currentUserId);
      
      setError('');
    } catch (err: any) {
      console.error('Failed to load messages:', err);
      setError(err.response?.data?.error || err.message || 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending || !conversationId) return;

    setSending(true);
    setError('');

    try {
      const messageData = {
        conversationId,
        senderId: currentUserId,
        content: newMessage.trim(),
        attachments: []
      };
      
      const sentMessage = await messageService.sendMessage(messageData);
      setMessages([...messages, sentMessage]);
      setNewMessage('');
    } catch (err: any) {
      console.error('Failed to send message:', err);
      setError(err.response?.data?.error || err.message || 'Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) + 
           ' ' + date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="chat-container">
        <div className="chat-header">
          <button className="back-button" onClick={() => navigate('/messages')}>
            ← Back
          </button>
          <h2>Loading...</h2>
        </div>
        <div className="loading-state">Loading messages...</div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <button className="back-button" onClick={() => navigate('/messages')}>
          ← Back
        </button>
        <div className="chat-user-info">
          <div className="chat-avatar">
            {otherUserName.charAt(0).toUpperCase()}
          </div>
          <h2>{otherUserName || 'Conversation'}</h2>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-messages">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.messageId}
              className={`message ${message.senderId === currentUserId ? 'sent' : 'received'}`}
            >
              <div className="message-content">
                <p>{message.content}</p>
                <div className="message-meta">
                  <span className="message-time">{formatTime(message.timestamp)}</span>
                  {message.senderId === currentUserId && (
                    <span className="message-status">
                      {message.isRead ? '✓✓' : '✓'}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="message-input-container" onSubmit={handleSendMessage}>
        <input
          type="text"
          className="message-input"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={sending}
        />
        <button
          type="submit"
          className="send-button"
          disabled={!newMessage.trim() || sending}
        >
          {sending ? '...' : '➤'}
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;
