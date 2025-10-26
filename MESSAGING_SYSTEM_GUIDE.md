# Messaging System - Quick Guide

## ✅ What's Been Created

### Components
1. **ConversationList** (`src/components/messaging/ConversationList.tsx`)
   - Shows all conversations
   - Displays unread count
   - Click to open chat

2. **ChatInterface** (`src/components/messaging/ChatInterface.tsx`)
   - Real-time messaging UI
   - Auto-refresh every 5 seconds
   - Mark messages as read
   - Send/receive messages

### Pages
1. **MessagesPage** (`src/pages/MessagesPage.tsx`)
   - Wrapper for ConversationList
   - Route: `/messages`

2. **ChatPage** (`src/pages/ChatPage.tsx`)
   - Wrapper for ChatInterface
   - Route: `/messages/:conversationId`

### Features
✅ View all conversations  
✅ Unread message count  
✅ Send messages  
✅ Receive messages  
✅ Mark as read automatically  
✅ Real-time polling (5 second intervals)  
✅ Responsive design  
✅ Message timestamps  
✅ Read receipts (✓✓)  

## 🚀 How to Use

### Navigate to Messages
```
Go to: http://localhost:5173/messages
```

### "Message Student" Button
The button in NotFound.tsx (ManageApplications) now:
1. Creates a conversation with the student
2. Navigates to the chat interface
3. Opens ready to send messages

### API Endpoints Used
- `GET /api/conversation/user/{userId}` - Get user conversations
- `GET /api/message/conversation/{conversationId}` - Get messages
- `POST /api/message/send` - Send message
- `PUT /api/message/{messageId}/read` - Mark as read
- `POST /api/conversation` - Create conversation

## 📝 TODO: Connect to Real Auth

Currently using temporary user IDs. Update these files when auth is ready:

**MessagesPage.tsx:**
```typescript
// Replace this:
const currentUserId = localStorage.getItem('userId') || 'temp-user-id';

// With actual auth context:
const { user } = useAuth();
const currentUserId = user.id;
```

**ChatPage.tsx:**
```typescript
// Replace this:
const currentUserId = localStorage.getItem('userId') || 'temp-user-id';
const currentUserName = localStorage.getItem('userName') || 'Current User';

// With actual auth context:
const { user } = useAuth();
const currentUserId = user.id;
const currentUserName = user.name;
```

**NotFound.tsx (ManageApplications):**
```typescript
// Replace this line in handleMessage:
const currentUserId = 'employer-123';

// With actual auth:
const { user } = useAuth();
const currentUserId = user.id;
```

## 🎨 Styling

Both components have their own CSS files:
- `ConversationList.css` - Conversation list styling
- `ChatInterface.css` - Chat interface styling

All styles are responsive and mobile-friendly.

## 🔗 Navigation

Add messaging link to your navigation bars:

```tsx
<Link to="/messages">Messages</Link>
```

Or button:
```tsx
<button onClick={() => navigate('/messages')}>
  View Messages
</button>
```

## 🐛 Troubleshooting

**Issue:** Messages not appearing  
**Solution:** Check backend API is running on https://localhost:7255

**Issue:** Can't create conversation  
**Solution:** Verify user IDs are correct and exist in database

**Issue:** Real-time updates not working  
**Solution:** Polling is set to 5 seconds. Check network tab for API calls

## 📱 Mobile Support

Both interfaces are fully responsive and work on:
- Desktop (1000px+)
- Tablet (768px - 999px)
- Mobile (< 768px)
