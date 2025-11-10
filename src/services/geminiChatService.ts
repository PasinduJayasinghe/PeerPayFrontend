// Gemini AI Chatbot Service
import { GoogleGenerativeAI } from '@google/generative-ai';

// FOR DEMO VIDEO: Use mock responses instead of actual API calls
const USE_MOCK_RESPONSES = false;

const API_KEY = 'AIzaSyA-iVV8fAf2mnpT3NXsRNEMAteO8YFGcSs';

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

// Mock responses for demo
const MOCK_RESPONSES: { [key: string]: string } = {
  'how do i find jobs': 'To find jobs on PeerPay:\n\n1. **Browse Jobs**: Click on "Browse Jobs" from the home page\n2. **Search & Filter**: Use the search bar to find jobs by keywords, or filter by category, budget, and location\n3. **View Details**: Click on any job to see full details including requirements, budget, and deadline\n4. **Apply**: Click "Apply Now" and submit your application with a cover letter and relevant attachments\n\nYou can find jobs in categories like Web Development, Graphic Design, Content Writing, and more!',
  
  'payment': 'PeerPay uses a secure **escrow payment system**:\n\n💰 **How it works:**\n- Employer deposits payment into escrow when hiring\n- You work on the project\n- Upon completion, employer reviews your work\n- Payment is released to your wallet\n- You can withdraw to your bank account or PayPal\n\n✅ **Security:** Your payment is protected and guaranteed once the job starts!\n\n💵 **Rates:** Jobs typically range from Rs 8,000 to Rs 80,000+, with hourly rates between Rs 500 - Rs 2,000.',
  
  'apply': 'To apply for a job:\n\n1. Click on the job you\'re interested in\n2. Read all requirements carefully\n3. Click "Apply Now" button\n4. Write a compelling cover letter explaining why you\'re perfect for the job\n5. Upload relevant files (CV, portfolio, samples)\n6. Submit your application\n\n💡 **Tips:**\n- Tailor your cover letter to each job\n- Highlight relevant skills and experience\n- Include portfolio samples if applicable\n- Be professional and responsive',
  
  'categories': 'PeerPay offers jobs in these categories:\n\n💻 **Tech:** Web Development, Mobile Apps, Data Analysis\n🎨 **Creative:** Graphic Design, Video Editing, Photography\n✍️ **Content:** Writing, Translation, Content Creation\n📊 **Marketing:** Digital Marketing, SEO, Social Media\n📋 **Admin:** Data Entry, Virtual Assistant\n🎓 **Education:** Tutoring, Training\n\nEach category has multiple job opportunities posted daily!',
  
  'earn': 'Student earnings on PeerPay vary by skill and project:\n\n💰 **Typical Earnings:**\n- Entry Level: Rs 8,000 - Rs 25,000 per project\n- Intermediate: Rs 25,000 - Rs 50,000 per project\n- Advanced: Rs 50,000 - Rs 80,000+ per project\n\n⏰ **Hourly Rates:**\n- Beginner: Rs 500 - Rs 800/hour\n- Intermediate: Rs 800 - Rs 1,500/hour\n- Expert: Rs 1,500 - Rs 2,000+/hour\n\nYour earnings depend on your skills, experience, and the complexity of projects you take on!',
  
  'post job': 'Employers can post jobs easily:\n\n1. **Sign Up**: Create an employer account\n2. **Verify**: Complete company verification\n3. **Post Job**: Click "Post a Job" button\n4. **Fill Details**: Add job title, description, budget, deadline\n5. **Select Category**: Choose the right job category\n6. **Publish**: Your job goes live immediately\n7. **Review Applications**: View and manage applications\n8. **Hire**: Select the best candidate and start working!\n\n📝 Jobs can be posted in minutes and you\'ll start receiving applications quickly.',
  
  'secure': 'Yes! PeerPay ensures secure payments through:\n\n🔒 **Escrow Protection:**\n- Employer deposits funds before work starts\n- Funds held securely until work is approved\n- No direct payment handling\n\n✅ **Verification:**\n- Student academic verification\n- Employer company verification\n- Identity verification for all users\n\n⭐ **Trust System:**\n- Rating and review system\n- Dispute resolution process\n- 24/7 customer support\n\nYour money is safe and protected throughout the entire process!',
  
  'profile': 'Creating a great profile:\n\n1. **Personal Info**: Add your full name, university, course\n2. **Skills**: List all your relevant skills\n3. **Bio**: Write a compelling introduction\n4. **Education**: Add your academic details\n5. **Portfolio**: Upload work samples and projects\n6. **CV**: Attach your resume\n7. **Verification**: Complete email and academic verification\n\n💡 **Pro Tips:**\n- Use a professional profile photo\n- Highlight your unique skills\n- Keep your profile updated\n- Add relevant certifications\n- Include links to your work',
  
  'default': 'I\'m here to help you with PeerPay! 😊\n\nI can assist you with:\n• Finding and applying for jobs\n• Understanding payments and earnings\n• Platform features and how to use them\n• Account setup and profile creation\n• Job categories and opportunities\n• Employer job posting process\n\nWhat specific information would you like to know about PeerPay?'
};

class GeminiChatService {
  private model;
  private chatSession: any = null;

  constructor() {
    this.model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  }

  /**
   * Get mock response based on user message
   */
  private getMockResponse(message: string): string {
    const lowerMessage = message.toLowerCase();
    
    // Check for keywords and return appropriate response
    if (lowerMessage.includes('find') && (lowerMessage.includes('job') || lowerMessage.includes('work'))) {
      return MOCK_RESPONSES['how do i find jobs'];
    }
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay') || lowerMessage.includes('money') || lowerMessage.includes('escrow')) {
      return MOCK_RESPONSES['payment'];
    }
    if (lowerMessage.includes('apply') || lowerMessage.includes('application')) {
      return MOCK_RESPONSES['apply'];
    }
    if (lowerMessage.includes('categor') || lowerMessage.includes('type')) {
      return MOCK_RESPONSES['categories'];
    }
    if (lowerMessage.includes('earn') || lowerMessage.includes('make') || lowerMessage.includes('salary') || lowerMessage.includes('income')) {
      return MOCK_RESPONSES['earn'];
    }
    if (lowerMessage.includes('post') && lowerMessage.includes('job')) {
      return MOCK_RESPONSES['post job'];
    }
    if (lowerMessage.includes('secure') || lowerMessage.includes('safe') || lowerMessage.includes('trust')) {
      return MOCK_RESPONSES['secure'];
    }
    if (lowerMessage.includes('profile') || lowerMessage.includes('account') || lowerMessage.includes('setup') || lowerMessage.includes('create')) {
      return MOCK_RESPONSES['profile'];
    }
    
    return MOCK_RESPONSES['default'];
  }

  /**
   * Initialize or reset chat session with context
   */
  async initializeChat(): Promise<void> {
    // FOR DEMO VIDEO: Skip actual API initialization
    if (USE_MOCK_RESPONSES) {
      await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API delay
      return;
    }

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
    // FOR DEMO VIDEO: Use mock responses
    if (USE_MOCK_RESPONSES) {
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate thinking time
      return this.getMockResponse(message);
    }

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
    // FOR DEMO VIDEO: Use mock responses
    if (USE_MOCK_RESPONSES) {
      await new Promise(resolve => setTimeout(resolve, 600));
      return this.getMockResponse(question);
    }

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
