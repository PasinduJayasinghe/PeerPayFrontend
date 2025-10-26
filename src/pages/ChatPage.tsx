import React from 'react';
import ChatInterface from '../components/messaging/ChatInterface';

const ChatPage: React.FC = () => {
  // TODO: Get actual user data from auth context/store
  const currentUserId = localStorage.getItem('userId') || 'temp-user-id';
  const currentUserName = localStorage.getItem('userName') || 'Current User';

  return <ChatInterface currentUserId={currentUserId} currentUserName={currentUserName} />;
};

export default ChatPage;
