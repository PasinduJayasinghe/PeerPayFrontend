// Gemini AI Chatbot Service
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyAcgoXNbaJfhg8NXcIixVhmsej9e94IbSY';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(API_KEY);

// System context about PeerPay
const PEERPAY_CONTEXT = `
You are a helpful AI assistant for PeerPay, a freelance marketplace platform connecting students with employers.

PeerPay Platform Information:
- PeerPay connects talented student freelancers with employers looking for quality work
- Students can browse jobs, apply to opportunities, and earn money
- Employers can post jobs, review applications, and hire talented students
- Platform features: Job postings, applications, messaging, payments, ratings, and reviews

Available Job Categories:
1. Web Development - Frontend, backend, and full-stack projects
2. Mobile App Development - iOS, Android, cross-platform apps
3. Graphic Design - Logo design, branding, UI/UX, visual content
4. Content Writing - Blog posts, articles, SEO content, copywriting
5. Video Editing - Video production, editing, animation
6. Data Entry - Data processing, administrative tasks
7. Digital Marketing - SEO, social media, email campaigns
8. Translation - Language translation services
9. Photography - Product photography, event coverage
10. Tutoring - Academic tutoring, skill training
11. Data Analysis - Data science, analytics, visualization
12. Voice Over - Voice acting, narration

Key Features:
- Secure escrow payment system
- Verified student profiles with academic verification
- Rating and review system (5-star ratings)
- Real-time messaging between employers and students
- Application tracking system
- Earnings dashboard for students
- Job management for employers
- 24/7 customer support

Payment & Pricing:
- Jobs range from Rs 8,000 to Rs 80,000+ 
- Average hourly rates: Rs 500 - Rs 2,000
- Payment types: Fixed price, hourly, weekly, monthly
- Secure escrow - payment released when work is approved

User Types:
1. Students: Browse jobs, apply, work on projects, earn money
2. Employers: Post jobs, review applications, hire students, manage projects
3. Admins: Platform management, user verification, dispute resolution

How to Get Started:
- Students: Sign up, complete profile, add skills, upload CV, browse jobs
- Employers: Sign up, verify company, post job, review applications, hire talent

Answer user questions about PeerPay, help them navigate the platform, explain features, and provide guidance.
Be friendly, helpful, and professional. If you don't know something specific, admit it and suggest contacting support.
`;

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

class GeminiChatService {
  private model;
  private chatSession: any = null;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  /**
   * Initialize or reset chat session with context
   */
  async initializeChat(): Promise<void> {
    try {
      this.chatSession = this.model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: PEERPAY_CONTEXT }],
          },
          {
            role: 'model',
            parts: [{ text: 'Hello! I\'m your PeerPay assistant. I can help you with information about our platform, how to find jobs, post projects, payments, and more. How can I assist you today?' }],
          },
        ],
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      });
    } catch (error) {
      console.error('Error initializing chat:', error);
      throw error;
    }
  }

  /**
   * Send a message and get AI response
   */
  async sendMessage(message: string): Promise<string> {
    try {
      if (!this.chatSession) {
        await this.initializeChat();
      }

      const result = await this.chatSession.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      // Handle specific errors
      if (error.message?.includes('API key')) {
        throw new Error('Invalid API key. Please check your configuration.');
      }
      if (error.message?.includes('quota')) {
        throw new Error('API quota exceeded. Please try again later.');
      }
      
      throw new Error('Failed to get response. Please try again.');
    }
  }

  /**
   * Get a quick answer without chat history (for one-off questions)
   */
  async getQuickAnswer(question: string): Promise<string> {
    try {
      const prompt = `${PEERPAY_CONTEXT}\n\nUser Question: ${question}\n\nProvide a concise, helpful answer:`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      console.error('Error getting quick answer:', error);
      throw new Error('Failed to get answer. Please try again.');
    }
  }

  /**
   * Reset the chat session
   */
  resetChat(): void {
    this.chatSession = null;
  }

  /**
   * Get suggested questions
   */
  getSuggestedQuestions(): string[] {
    return [
      'How do I find jobs on PeerPay?',
      'How does the payment system work?',
      'How do I apply for a job?',
      'What categories of work are available?',
      'How much can I earn as a student?',
      'How do employers post jobs?',
      'Is my payment secure?',
      'How do I create a profile?',
    ];
  }
}

export const geminiChatService = new GeminiChatService();
