import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ChatInterface.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:7255/api';

interface Message {
  messageId: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  isRead: boolean;
  sentAt: string;
  readAt?: string;
}

interface ChatInterfaceProps {
  currentUserId: string;
  currentUserName: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ currentUserId, currentUserName }) => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [otherUserId, setOtherUserId] = useState('');
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
    if (location.state?.otherUserId) {
      setOtherUserId(location.state.otherUserId);
      setOtherUserName(location.state.otherUserName || 'User');
    }
  }, [location]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/message/conversation/${conversationId}`);
      setMessages(response.data);
      
      // Mark unread messages as read
      const unreadMessages = response.data.filter(
        (msg: Message) => !msg.isRead && msg.receiverId === currentUserId
      );
      
      for (const msg of unreadMessages) {
        await markAsRead(msg.messageId);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      await axios.put(`${API_BASE_URL}/message/${messageId}/read`);
    } catch (err) {
      console.error('Failed to mark message as read:', err);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    setError('');

    try {
      const messageData = {
        conversationId,
        senderId: currentUserId,
        receiverId: otherUserId,
        content: newMessage.trim(),
      };

      const response = await axios.post(`${API_BASE_URL}/message/send`, messageData);
      setMessages([...messages, response.data]);
      setNewMessage('');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send message');
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
                  <span className="message-time">{formatTime(message.sentAt)}</span>
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
