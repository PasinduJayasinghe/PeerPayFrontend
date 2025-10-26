import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import ConversationList from '../components/messaging/ConversationList';

const MessagesPage: React.FC = () => {
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

  const userType = user.userType.toLowerCase() as 'student' | 'employer';

  return <ConversationList currentUserId={user.userId} userType={userType} />;
};

export default MessagesPage;
