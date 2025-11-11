import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, Trash2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

const GeminiAIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini AI
  const ai = useRef<any>(null);
  
  useEffect(() => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyB63bpZjko1UUDu14XBrtDgmCAKi2JqWbM';
    if (apiKey) {
      ai.current = new GoogleGenAI({ apiKey });
    }
  }, []);

  // Initial welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: 1,
      text: "Hello! 👋 I'm your PeerPay AI assistant. I can help you with job searching, posting jobs, payments, platform features, and general freelancing advice. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // AI Response System with Gemini Integration
  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      // Check if Gemini AI is available
      if (ai.current) {
        const prompt = `You are a helpful and professional assistant for PeerPay, a freelance marketplace platform connecting students with employers.

Your expertise includes:
- Job search and application process for students
- Job posting and hiring process for employers
- Payment system, escrow, and earnings
- Profile creation and verification
- Platform features and policies
- General freelancing advice and tips
- Categories: Web Development, Mobile Apps, Graphic Design, Content Writing, Video Editing, Data Entry, Digital Marketing, Translation, Photography, Tutoring, Data Analysis, Voice Over

Platform Information:
- PeerPay connects talented student freelancers with employers in Sri Lanka
- Students can browse jobs, apply to opportunities, and earn money (Rs 8,000 to Rs 80,000+ per project)
- Employers can post jobs, review applications, and hire talented students
- Secure escrow payment system protects both parties
- Rating and review system ensures quality

Guidelines for responses:
- Be helpful, professional, and concise
- Provide accurate information about PeerPay
- Guide users to appropriate sections if needed
- Stay focused on PeerPay and freelancing topics
- Be friendly and conversational
- Keep responses under 150 words when possible

User question: ${userMessage}

Please provide a helpful response:`;

        const response = await ai.current.models.generateContent({
          model: "gemini-2.0-flash-exp",
          contents: prompt,
        });

        let aiResponse = response.text;

        return aiResponse;
      } else {
        // Fallback to rule-based responses if Gemini is not available
        return generateFallbackResponse(userMessage);
      }
    } catch (error) {
      console.error('Gemini AI Error:', error);
      // Fallback to rule-based responses on error
      return generateFallbackResponse(userMessage);
    }
  };

  // Fallback response system
  const generateFallbackResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Job search related
    if (message.includes('find') && (message.includes('job') || message.includes('work'))) {
      return "To find jobs on PeerPay:\n\n1. Click on 'Find Work' or 'Browse Jobs'\n2. Search by keywords or filter by category\n3. View job details including requirements, budget, and deadline\n4. Click 'Apply Now' to submit your application\n\nYou can find jobs in Web Development, Design, Writing, and many more categories! 💼";
    }
    
    if (message.includes('apply') || message.includes('application')) {
      return "To apply for a job:\n\n1. Read the job requirements carefully\n2. Click 'Apply Now' button\n3. Write a compelling cover letter explaining why you're perfect for the job\n4. Submit your application\n\n💡 Tip: Tailor your application to each job and highlight relevant skills!";
    }
    
    // Employer - posting jobs
    if (message.includes('post') && message.includes('job')) {
      return "To post a job on PeerPay:\n\n1. Log in as an Employer\n2. Click 'Post a Job'\n3. Fill in job details (title, description, budget, deadline)\n4. Select the job category\n5. Publish your job\n6. Review applications and hire the best candidate\n\nYou'll start receiving applications from talented students quickly! 📝";
    }
    
    // Payment and earnings
    if (message.includes('payment') || message.includes('pay') || message.includes('money') || message.includes('earn')) {
      return "PeerPay uses a secure escrow payment system:\n\n💰 How it works:\n- Employer deposits payment into escrow when hiring\n- Student works on the project\n- Employer reviews and approves work\n- Payment is released to student's wallet\n- Student withdraws to bank account\n\n✅ Your payment is protected and guaranteed! Jobs range from Rs 8,000 to Rs 80,000+.";
    }
    
    // Categories
    if (message.includes('categor') || message.includes('skill') || message.includes('service')) {
      return "PeerPay offers jobs in these categories:\n\n💻 Tech: Web Development, Mobile Apps, Data Analysis\n🎨 Creative: Graphic Design, Video Editing, Photography\n✍️ Content: Writing, Translation\n📊 Marketing: Digital Marketing, SEO\n📋 Admin: Data Entry, Virtual Assistant\n🎓 Education: Tutoring\n\nEach category has multiple opportunities posted daily!";
    }
    
    // Profile and account
    if (message.includes('profile') || message.includes('account') || message.includes('setup') || message.includes('register')) {
      return "Creating your PeerPay profile:\n\n1. Sign up as Student or Employer\n2. Complete your profile:\n   - Personal information\n   - Skills and experience\n   - Portfolio/work samples\n   - Education/company details\n3. Verify your email\n4. Start browsing jobs or posting projects!\n\n💡 A complete profile increases your success rate by 80%!";
    }
    
    // Platform info
    if (message.includes('peerpay') || message.includes('platform') || message.includes('about')) {
      return "PeerPay is a freelance marketplace connecting talented student freelancers with employers.\n\n✨ Key Features:\n• Verified student profiles\n• Secure escrow payments\n• Wide range of job categories\n• Rating and review system\n• Application tracking\n• 24/7 support\n\nWe make it easy for students to earn and employers to find skilled talent!";
    }
    
    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! 👋 Welcome to PeerPay! I'm here to help you with:\n\n• Finding and applying for jobs\n• Posting jobs and hiring students\n• Understanding payments and earnings\n• Platform features and account setup\n\nWhat would you like to know about?";
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
      return "You're welcome! 😊 I'm happy to help. Is there anything else you'd like to know about PeerPay or freelancing?";
    }
    
    // Default fallback response
    return "I can help you with:\n\n• 💼 Finding and applying for jobs\n• 📝 Posting jobs and hiring talent\n• 💰 Payments and earnings\n• 👤 Account setup and profiles\n• 🎯 Platform features and policies\n\nWhat specific information would you like to know about PeerPay?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    // Get AI response
    try {
      const aiResponseText = await generateAIResponse(currentInput);
      
      const botResponse = {
        id: Date.now() + 1,
        text: aiResponseText,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting response:', error);
      const errorResponse = {
        id: Date.now() + 1,
        text: "I'm having trouble responding right now. Please try again or contact our support team.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      const welcomeMessage = {
        id: Date.now(),
        text: "Chat cleared! How can I help you today?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chat Widget Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#8C00FF] to-[#7000CC] hover:from-[#7000CC] hover:to-[#8C00FF] text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 z-50"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 h-[500px] bg-white border border-gray-200 rounded-2xl shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-[#8C00FF] to-[#7000CC] rounded-t-2xl">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-3">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">PeerPay AI Assistant</h3>
                <p className="text-white/80 text-xs">Powered by Gemini AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={clearChat}
                className="text-white/80 hover:text-white transition-colors"
                title="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-[#8C00FF] text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-white/70' : 'text-gray-400'}`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-[#8C00FF] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#8C00FF] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-[#8C00FF] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about PeerPay..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="px-4 py-2 bg-[#8C00FF] hover:bg-[#7000CC] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GeminiAIChatBot;
