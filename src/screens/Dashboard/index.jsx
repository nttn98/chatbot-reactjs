import React from 'react';
import ChatbotBubble from '../../components/ChatbotBubble';

function Dashboard() {
  return (
    <div className="p-3">
      <h2>Welcome to the Dashboard</h2>
      <p>This is your main chat area.</p>
      <ChatbotBubble />
    </div>
  );
}

export default Dashboard;