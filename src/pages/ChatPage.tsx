import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import ChatInterface from '../components/messaging/ChatInterface';

const ChatPage: React.FC = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return <ChatInterface currentUserId={user.userId} currentUserName={user.name} />;
};

export default ChatPage;
