import React from 'react';
import ConversationList from '../components/messaging/ConversationList';

const MessagesPage: React.FC = () => {
  // TODO: Get actual user data from auth context/store
  const currentUserId = localStorage.getItem('userId') || 'temp-user-id';
  const userType = (localStorage.getItem('userType') as 'student' | 'employer') || 'employer';

  return <ConversationList currentUserId={currentUserId} userType={userType} />;
};

export default MessagesPage;
