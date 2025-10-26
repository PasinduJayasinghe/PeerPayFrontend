// AI Chatbot Component
import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Loader2,
  Sparkles,
  MinusCircle
} from 'lucide-react';
import { geminiChatService } from '../../services/geminiChatService';
import type { ChatMessage } from '../../services/geminiChatService';
import { toast } from 'sonner';

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chat when opened for the first time
  useEffect(() => {
    if (isOpen && !isInitialized) {
      initializeChat();
    }
  }, [isOpen]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const initializeChat = async () => {
    try {
      await geminiChatService.initializeChat();
      setIsInitialized(true);
      
      // Add welcome message
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Hello! 👋 I'm your PeerPay AI assistant. I can help you with:\n\n• Finding and applying for jobs\n• Understanding how the platform works\n• Payment and pricing information\n• Account setup and profile creation\n• General questions about PeerPay\n\nHow can I help you today?",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    } catch (error: any) {
      console.error('Failed to initialize chat:', error);
      toast.error('Failed to initialize chatbot. Please try again.');
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await geminiChatService.sendMessage(inputMessage);
      
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error(error.message || 'Failed to get response');
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm sorry, I'm having trouble responding right now. Please try again or contact our support team for assistance.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputMessage(question);
    inputRef.current?.focus();
  };

  const handleNewChat = () => {
    geminiChatService.resetChat();
    setIsInitialized(false);
    setMessages([]);
    initializeChat();
  };

  const suggestedQuestions = geminiChatService.getSuggestedQuestions();

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-[#8C00FF] to-[#7000CC] text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all hover:scale-110 z-50 group"
        aria-label="Open AI Chatbot"
      >
        <MessageCircle size={28} className="group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white animate-pulse"></span>
      </button>
    );
  }

  return (
    <div 
      className={`fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl z-50 flex flex-col transition-all ${
        isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
      }`}
      style={{ maxHeight: 'calc(100vh - 100px)' }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#8C00FF] to-[#7000CC] text-white p-4 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-full backdrop-blur-sm">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-bold text-lg">PeerPay AI Assistant</h3>
            <p className="text-xs text-white/80">Powered by Gemini AI</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Minimize"
          >
            <MinusCircle size={20} />
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.length === 0 && (
              <div className="text-center text-slate-500 py-8">
                <Bot size={48} className="mx-auto mb-4 text-[#8C00FF]" />
                <p>Start a conversation!</p>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="bg-gradient-to-br from-[#8C00FF] to-[#7000CC] p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <Bot size={18} className="text-white" />
                  </div>
                )}
                
                <div
                  className={`max-w-[75%] rounded-2xl p-3 ${
                    message.role === 'user'
                      ? 'bg-[#8C00FF] text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  <span className={`text-xs mt-1 block ${
                    message.role === 'user' ? 'text-white/70' : 'text-slate-400'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {message.role === 'user' && (
                  <div className="bg-slate-200 p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                    <User size={18} className="text-slate-600" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="bg-gradient-to-br from-[#8C00FF] to-[#7000CC] p-2 rounded-full h-8 w-8 flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-none p-3">
                  <Loader2 size={20} className="animate-spin text-[#8C00FF]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions (show when no messages yet) */}
          {messages.length === 1 && (
            <div className="px-4 py-2 bg-white border-t border-slate-200">
              <p className="text-xs text-slate-500 mb-2 font-medium">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestedQuestion(question)}
                    className="text-xs bg-purple-50 text-[#8C00FF] px-3 py-1.5 rounded-full hover:bg-purple-100 transition-colors border border-purple-200"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-200 rounded-b-2xl">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about PeerPay..."
                className="flex-1 px-4 py-2 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#8C00FF] focus:border-transparent text-sm"
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-[#8C00FF] text-white p-2 rounded-full hover:bg-[#7000CC] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <Send size={20} />
                )}
              </button>
            </div>
            
            {messages.length > 1 && (
              <button
                onClick={handleNewChat}
                className="text-xs text-slate-500 hover:text-[#8C00FF] mt-2 transition-colors"
              >
                Start new conversation
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AIChatbot;
