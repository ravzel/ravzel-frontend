import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

// Exact 10 Suggested Questions required by RAVZEL
const SUGGESTED_QUESTIONS = [
  "What is RAVZEL?",
  "What services do you offer?",
  "Can you build a custom web application?",
  "Do you develop admin dashboards?",
  "Can you build an e-commerce website?",
  "Do you provide poster and promotional design?",
  "Can I see your previous projects?",
  "How does your development process work?",
  "How much does a project cost?",
  "How can I contact RAVZEL?"
];

// Exact Welcome Message required by RAVZEL
const WELCOME_MESSAGE = {
  id: 'welcome-msg',
  role: 'assistant',
  content: "Hi! I'm RAVZEL's AI Assistant. 👋 Looking for a website, web application, or a digital solution for your business? Ask me about our services, projects, or how we can help you.",
  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

// Pre-cached Instant FAQ replies for instant zero-latency responses
const INSTANT_FAQS = [
  {
    triggers: ['what is ravzel', 'about ravzel', 'who are you', 'tell me about ravzel'],
    answer: `**RAVZEL** is a modern digital studio & software solution partner. We bring design, development, and technology together to create purposeful digital experiences for businesses.\n\n• **Tagline:** Build Beyond. Evolve Forward.\n• **Motto:** Where Innovation Creates Impact.\n• **Specialty:** Bespoke business websites, high-performance web applications, and digital marketing solutions.`
  },
  {
    triggers: ['what services do you offer', 'services', 'capabilities', 'what do you do', 'offerings'],
    answer: `RAVZEL offers **5 core digital services**:\n\n1. **Website Development:** High-converting commercial websites, landing pages, and portfolio sites.\n2. **Web Application Development:** Custom web apps, admin panels, interactive dashboards, user auth, and APIs.\n3. **Billing & Inventory Management Systems:** Smart POS billing, live stock tracking, and barcode integration.\n4. **Learning Management Systems (LMS):** Course portals, student dashboards, and progress tracking.\n5. **Digital Marketing Creatives:** High-impact social media creatives, ad campaigns, and promotional design.`
  },
  {
    triggers: ['can you build a custom web application', 'custom web application', 'web application', 'web app'],
    answer: `**Yes, absolutely.** We build scalable full-stack web applications tailored to your operational workflows:\n\n• Secure role-based user authentication\n• Custom interactive admin dashboards & business analytics\n• Scalable database architecture (MongoDB, PostgreSQL)\n• Robust REST & GraphQL APIs with third-party integrations`
  },
  {
    triggers: ['do you develop admin dashboards', 'admin dashboard', 'dashboard', 'admin panel'],
    answer: `**Yes!** We develop intuitive, real-time admin panels and operational dashboards.\n\nRecent deployments include the **FA Organics Custom Admin Suite** (live inventory, order tracking, and product controls) and the **SS Auto Spares Billing & POS Engine**.`
  },
  {
    triggers: ['can you build an e-commerce website', 'e-commerce', 'ecommerce', 'online store', 'shopping'],
    answer: `**Yes!** We engineer custom, high-converting e-commerce platforms with automated milestone rewards, dynamic category filtering, fast checkout, and unified admin management.\n\nCheck out our latest deployment: **FA Organics** (https://faaorganics.in) — a full-stack botanical skincare platform.`
  },
  {
    triggers: ['fa organics', 'faaorganics'],
    answer: `**FA Organics** (https://faaorganics.in) is our latest full-stack client deployment:\n\n• **Type:** Botanical Skincare E-Commerce & Custom Admin Suite\n• **Tech Stack:** React, Vite, Tailwind CSS, Node.js, Express, MongoDB\n• **Features:** Dynamic category filtering, cart milestone rewards, customer accounts, and an end-to-end admin dashboard for inventory and orders.`
  },
  {
    triggers: ['browtiful strokes'],
    answer: `**Browtiful Strokes** (https://browtiful-strokes.in) is a client platform built by RAVZEL for a premier Mehndi & Nails Studio and Academy, featuring natural henna catalogs, nail artistry galleries, course details, and appointment booking funnels.`
  },
  {
    triggers: ['nutrisun', 'nutri sun'],
    answer: `**Nutrisun** (https://app.nutrisun.cloud) is a cloud-based SaaS subscription web application built by RAVZEL featuring secure user authentication, personalized meal scheduling, and recurring subscription workflows.`
  },
  {
    triggers: ['do you provide poster and promotional design', 'poster', 'promotional design', 'graphic design', 'marketing creatives'],
    answer: `**Yes!** Through our **Digital Marketing Creatives & Advertising Design** service, we craft:\n\n• High-impact social media creatives & Instagram ads\n• Product launch posters, promotional flyers & festival banners\n• Brand identity systems with crisp visual storytelling`
  },
  {
    triggers: ['can i see your previous projects', 'projects', 'portfolio', 'previous work', 'our work', 'client work'],
    answer: `RAVZEL has delivered **11 verified client deployments**:\n\n1. **FA Organics** (https://faaorganics.in) – E-commerce & custom admin suite\n2. **Nutrisun** (https://app.nutrisun.cloud) – Cloud SaaS subscription platform\n3. **Browtiful Strokes** (https://browtiful-strokes.in) – Studio & academy booking site\n4. **Shas Evergreen Henna** (https://shas-evergreen-henna.netlify.app) – Henna store\n5. **SS Auto Spares Billing** (https://ssautospares.netlify.app) – POS billing engine\n\nScroll to the **Our Work** section to explore all 11 live projects!`
  },
  {
    triggers: ['how does your development process work', 'process', 'workflow', 'how do you work'],
    answer: `Our structured **5-stage development workflow** ensures high quality and timely delivery:\n\n1. **Discover:** Clarify your business goals, target audience, and scope.\n2. **Plan:** Architecture, wireframing, and tech stack roadmap.\n3. **Design & Develop:** Precision UI/UX paired with clean, modern code.\n4. **Test & Refine:** Rigorous mobile, cross-browser, and performance testing.\n5. **Launch:** Production deployment, DNS setup, and seamless handover.`
  },
  {
    triggers: ['how much does a project cost', 'cost', 'pricing', 'price', 'rates', 'quote', 'how much'],
    answer: `Every project is custom scoped based on your specific requirements, feature set, and target timeline. We focus on transparent, value-driven pricing without bloated agency markups.\n\nConnect with our core team for a fast, free estimate:\n• 💬 **WhatsApp:** https://wa.me/919360977952 (+91 93609 77952)\n• ✉️ **Email:** mailto:ravzel26@gmail.com`
  },
  {
    triggers: ['how can i contact ravzel', 'contact', 'email', 'phone', 'whatsapp', 'reach', 'talk'],
    answer: `Connect with the RAVZEL core team directly:\n\n• 💬 **WhatsApp:** https://wa.me/919360977952 (+91 93609 77952)\n• ✉️ **Email:** mailto:ravzel26@gmail.com\n• **Status:** Available for new client projects!`
  }
];

function findInstantFaq(query) {
  if (!query) return null;
  const normalized = query.toLowerCase().replace(/[?!.,'"]/g, '').trim();
  for (const item of INSTANT_FAQS) {
    if (item.triggers.some(t => normalized === t || normalized.includes(t))) {
      return item.answer;
    }
  }
  return null;
}

/**
 * FormattedMessage Helper
 * Parses markdown bold and converts verified contact/project URLs into clickable links.
 */
function FormattedMessage({ content }) {
  const lines = content.split('\n');

  return (
    <div className="space-y-1.5 text-xs sm:text-[13px] leading-relaxed break-words">
      {lines.map((line, lineIdx) => {
        if (!line.trim()) {
          return <div key={lineIdx} className="h-1" />;
        }

        const isBullet = line.trim().startsWith('•') || line.trim().startsWith('- ') || /^\d+\.\s/.test(line.trim());
        const cleanLine = line.replace(/^[•\-]\s*/, '').replace(/^\d+\.\s*/, '');

        const parts = cleanLine.split(/(\*\*.*?\*\*|https?:\/\/[^\s,]+|mailto:[^\s,]+)/g);

        const renderedLine = parts.map((part, partIdx) => {
          if (!part) return null;

          if (part.startsWith('**') && part.endsWith('**')) {
            return (
              <strong key={partIdx} className="text-[#F8F6EE] font-semibold">
                {part.slice(2, -2)}
              </strong>
            );
          }

          if (part.startsWith('http') || part.startsWith('mailto:')) {
            const isWhatsApp = part.includes('wa.me');
            const isEmail = part.startsWith('mailto:');
            const label = isWhatsApp
              ? '💬 WhatsApp'
              : isEmail
              ? '✉️ Email'
              : part.replace(/^https?:\/\//, '').replace(/\/$/, '');

            return (
              <a
                key={partIdx}
                href={part}
                target={isEmail ? '_self' : '_blank'}
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mx-0.5 px-1.5 py-0.5 rounded-md bg-[#A78BFA]/15 border border-[#A78BFA]/30 text-[#A78BFA] hover:text-white hover:bg-[#A78BFA]/30 transition-all font-mono text-[11px] font-medium break-all"
              >
                <span>{label}</span>
                {!isEmail && <ExternalLink className="w-2.5 h-2.5 shrink-0" />}
              </a>
            );
          }

          return <span key={partIdx}>{part}</span>;
        });

        return (
          <p
            key={lineIdx}
            className={`break-words ${isBullet ? 'pl-2 text-[#D9D9D9]/95 flex items-start gap-1.5' : 'text-[#D9D9D9]/90'}`}
          >
            {isBullet && <span className="text-[#A78BFA] font-bold shrink-0 mt-0.5">›</span>}
            <span className="flex-1 min-w-0">{renderedLine}</span>
          </p>
        );
      })}
    </div>
  );
}

export function AiAssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorInfo, setErrorInfo] = useState(null);

  const messagesContainerRef = useRef(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Auto-scroll ONLY the internal chat conversation container when new messages arrive
  useEffect(() => {
    if (isOpen && messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading, isOpen]);

  // Focus input on open without triggering any unwanted outer page scroll jump
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus({ preventScroll: true });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Keyboard accessibility: Escape to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSendMessage = async (textToSend) => {
    const messageText = (textToSend || inputValue).trim();
    if (!messageText || isLoading) return;

    setErrorInfo(null);

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    // Instant FAQ Fast-Path (< 150ms instant response without external network latency)
    const instantReply = findInstantFaq(messageText);
    if (instantReply) {
      setTimeout(() => {
        const aiReplyMessage = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: instantReply,
          model: 'instant-knowledge-base',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, aiReplyMessage]);
        setIsLoading(false);
      }, 150);
      return;
    }

    const historyPayload = newMessages
      .filter((m) => m.id !== 'welcome-msg')
      .slice(-6)
      .map((m) => ({
        role: m.role,
        content: m.content
      }));

    try {
      const apiBase = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL)
        ? import.meta.env.VITE_API_URL.replace(/\/$/, '')
        : 'https://ravzel-backend.onrender.com';
      const response = await fetch(`${apiBase}/api/ai-assistant/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: messageText,
          history: historyPayload
        })
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.message || data.error || 'Failed to connect to the AI Assistant.';
        setErrorInfo({
          message: errorMsg,
          needsApiKey: data.needsApiKey || response.status === 503,
          lastUserMessage: messageText
        });
        setIsLoading(false);
        return;
      }

      const aiReplyMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'I am here to help you explore RAVZEL services and projects.',
        model: data.model,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, aiReplyMessage]);
    } catch (err) {
      console.error('Chat error:', err);
      setErrorInfo({
        message: 'Network error: Unable to communicate with the RAVZEL AI backend. Please verify your connection or try again.',
        lastUserMessage: messageText
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleRetry = () => {
    if (errorInfo?.lastUserMessage) {
      handleSendMessage(errorInfo.lastUserMessage);
    }
  };

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative w-full min-w-0 flex flex-col items-center lg:items-end xl:items-end">
      
      {/* ============================================================== */}
      {/* 1. ROBOT MASCOT INTEGRATION (RIGHT SIDE OF HERO)               */}
      {/* Positioned naturally in the direction of Zia's hand gesture    */}
      {/* ============================================================== */}
      <div className="relative w-full flex flex-col items-center select-none translate-y-0 lg:translate-y-[2px] xl:translate-y-[6px] lg:translate-x-28 xl:translate-x-36">
        
        {/* Soft Natural Purple Ambient Aura behind the mascot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] sm:w-[150px] lg:w-[195px] xl:w-[210px] h-[120px] sm:h-[150px] lg:h-[195px] xl:h-[210px] bg-[#A78BFA]/15 rounded-full blur-[65px] pointer-events-none" />

        {/* Mascot Wrapper */}
        <div
          onClick={toggleChat}
          className="relative group cursor-pointer inline-block"
          role="button"
          tabIndex={0}
          aria-label="Click RAVZEL AI Assistant mascot to open chat"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleChat();
            }
          }}
        >
          {/* Exact 3D Purple Robot Image (Scaled slightly backward for realistic depth and natural spacing from Zia's hand) */}
          <div className="relative w-[104px] sm:w-[136px] md:w-[145px] lg:w-[155px] xl:w-[165px] aspect-[827/735] transition-transform duration-500 group-hover:scale-[1.03] active:scale-[0.98]">
            <img
              src="/assets/robot-mascot-transparent.png"
              alt="RAVZEL AI Assistant Mascot — Purple 3D Presenter Robot"
              className="w-full h-full object-contain pointer-events-none select-none"
              style={{
                filter: 'drop-shadow(0 15px 30px rgba(167, 139, 250, 0.28))'
              }}
            />

            {/* Glowing Interactive Presenter Hotspot at the Robot's Raised Hand */}
            <div
              className="absolute top-[58%] right-[4%] -translate-y-1/2 pointer-events-none flex items-center justify-center"
              title="Raised hand presenting RAVZEL AI Assistant"
            >
              <span className="w-3.5 h-3.5 rounded-full bg-[#A78BFA] animate-ping opacity-75" />
              <span className="absolute w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#A78BFA]" />
            </div>

            {/* Subtle Mascot Floating Tag */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0E0E0E]/90 border border-[#A78BFA]/30 backdrop-blur-md text-[9px] sm:text-[10px] font-mono text-[#F8F6EE] shadow-lg whitespace-nowrap group-hover:border-[#A78BFA] transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="font-semibold text-[#A78BFA]">RAVZEL AI</span>
              <span className="text-[#D9D9D9]/40">•</span>
              <span className="text-[#D9D9D9]/80 group-hover:text-white">
                {isOpen ? 'Chat Active' : 'Click to Chat'}
              </span>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* 2. CHATBOT PRESENTER TEASER (When Panel is Closed)             */}
        {/* Positioned neatly below the robot on the right                 */}
        {/* ============================================================== */}
        {!isOpen && (
          <div
            onClick={toggleChat}
            className="mt-2 sm:mt-3 w-full max-w-[270px] sm:w-[270px] lg:w-[265px] xl:w-[280px] p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[#141414]/90 hover:bg-[#181818]/95 border border-[#A78BFA]/30 hover:border-[#A78BFA] backdrop-blur-xl shadow-2xl shadow-black/80 cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group relative"
            role="button"
            tabIndex={0}
            aria-label="Open RAVZEL AI Assistant Chat"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleChat();
              }
            }}
          >
            {/* Visual connector arrow pointing up toward the robot's raised hand */}
            <div className="hidden sm:block absolute -top-2 right-[25%] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-[#A78BFA]/40 pointer-events-none" />

            <div className="flex items-center justify-between gap-2 mb-1.5 sm:mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#A78BFA] font-bold">
                  AI ASSISTANT PRESENTS
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#D9D9D9]/60 group-hover:text-[#A78BFA] transition-colors flex items-center gap-0.5">
                <span>OPEN</span>
                <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>

            <p className="text-[11px] sm:text-[13px] text-[#F8F6EE] font-medium leading-snug mb-1.5 sm:mb-2.5">
              "Hi! Looking for a website or web app? Ask me anything about RAVZEL."
            </p>

            <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-[#D9D9D9]/10 text-[10px] sm:text-[11px] font-mono text-[#D9D9D9]/70">
              <span className="flex items-center gap-1 text-[#A78BFA]">
                <Sparkles className="w-3 h-3" />
                <span>11 Live Projects</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-[#A78BFA]/10 border border-[#A78BFA]/20 text-[#A78BFA] group-hover:bg-[#A78BFA] group-hover:text-[#0E0E0E] transition-all font-semibold">
                Chat with AI →
              </span>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* 3. FULL CHATBOT INTERFACE PANEL (When Opened)                  */}
        {/* Fits neatly inside Home section | Mobile-optimized             */}
        {/* ============================================================== */}
        {isOpen && (
          <div
            ref={chatContainerRef}
            className="w-full max-w-[calc(100vw-2rem)] sm:max-w-md mx-auto h-[400px] sm:h-[460px] flex flex-col overflow-hidden rounded-2xl bg-[#0E0E0E]/95 backdrop-blur-2xl border border-[#A78BFA]/40 shadow-2xl shadow-black/90 transition-all duration-300 animate-in fade-in zoom-in-95 mt-3 relative"
            style={{
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 35px -5px rgba(167, 139, 250, 0.25)'
            }}
          >
            {/* Visual connector arrow toward robot's raised hand on desktop */}
            <div className="hidden lg:block absolute -top-2.5 right-[25%] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-[#A78BFA]/50 pointer-events-none" />

            {/* Chat Panel Header */}
            <div className="px-3.5 py-2.5 bg-[#141414] border-b border-[#D9D9D9]/15 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="relative w-7 h-7 rounded-lg bg-[#0E0E0E] border border-[#A78BFA]/40 flex items-center justify-center overflow-hidden shadow-inner">
                  <img
                    src="/assets/robot-mascot-transparent.png"
                    alt="AI Avatar"
                    className="w-full h-full object-cover scale-150 select-none"
                  />
                  <span className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-[#F8F6EE] tracking-tight">
                      RAVZEL AI Assistant
                    </h3>
                    <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-[#A78BFA]/15 text-[#A78BFA] font-medium border border-[#A78BFA]/30">
                      Live AI
                    </span>
                  </div>
                  <p className="text-[9px] font-mono text-[#D9D9D9]/60 flex items-center gap-1">
                    <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Verified studio information</span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 min-w-[34px] min-h-[34px] flex items-center justify-center rounded-lg bg-[#0E0E0E] border border-[#D9D9D9]/20 text-[#D9D9D9] hover:text-white hover:border-[#A78BFA] hover:bg-[#A78BFA]/10 transition-all active:scale-90"
                aria-label="Close chat"
                title="Close chat (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Thread */}
            <div
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-2.5 w-full scrollbar-thin scrollbar-thumb-[#A78BFA]/20 scrollbar-track-transparent overscroll-contain"
            >
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={isUser ? 'flex justify-end w-full pl-6 items-start gap-1.5 sm:gap-2' : 'flex justify-start w-full pr-6 items-start gap-1.5 sm:gap-2'}
                  >
                    {!isUser && (
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md shrink-0 flex items-center justify-center text-[9px] font-mono border bg-[#181818] text-[#A78BFA] border-[#D9D9D9]/20 mt-0.5">
                        <Bot className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                    )}

                    <div
                      className={`w-fit max-w-[85%] px-3 py-2 text-xs sm:text-sm leading-relaxed break-words whitespace-pre-wrap rounded-2xl shadow-md ${
                        isUser
                          ? 'bg-[#2E1065]/70 border border-[#A78BFA]/40 text-[#F8F6EE] rounded-tr-xs'
                          : 'bg-[#141414] border border-[#D9D9D9]/15 text-[#F8F6EE] rounded-tl-xs'
                      }`}
                    >
                      <FormattedMessage content={msg.content} />

                      <div
                        className={`mt-1 flex items-center text-[8px] sm:text-[9px] font-mono text-[#D9D9D9]/40 ${
                          isUser ? 'justify-end' : 'justify-between'
                        }`}
                      >
                        {!isUser && <span>RAVZEL AI</span>}
                        <span>{msg.timestamp}</span>
                      </div>
                    </div>

                    {isUser && (
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md shrink-0 flex items-center justify-center text-[9px] font-mono border bg-[#A78BFA] text-[#0E0E0E] border-[#A78BFA] mt-0.5">
                        <User className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex justify-start w-full pr-6 items-start gap-1.5 sm:gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-md bg-[#181818] border border-[#A78BFA]/30 flex items-center justify-center text-[#A78BFA] shrink-0 mt-0.5">
                    <Bot className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-pulse" />
                  </div>
                  <div className="w-fit max-w-[85%] p-2.5 rounded-2xl bg-[#141414] border border-[#D9D9D9]/15 rounded-tl-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-bounce" style={{ animationDelay: '300ms' }} />
                    <span className="text-[10px] font-mono text-[#D9D9D9]/60 ml-1">Consulting knowledge base...</span>
                  </div>
                </div>
              )}

              {/* Error Box with Retry */}
              {errorInfo && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1.5">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-300 text-[11px]">
                        {errorInfo.needsApiKey ? 'Gemini API Configuration Required' : 'Service Notice'}
                      </p>
                      <p className="text-[10px] leading-relaxed text-amber-200/90 font-light">
                        {errorInfo.message.split(/(https?:\/\/[^\s]+)/g).map((chunk, idx) =>
                          chunk.startsWith('http') ? (
                            <a
                              key={idx}
                              href={chunk}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline font-mono text-amber-300 hover:text-white break-all"
                            >
                              {chunk}
                            </a>
                          ) : (
                            chunk
                          )
                        )}
                      </p>
                    </div>
                  </div>

                  {errorInfo.needsApiKey && (
                    <div className="pt-1 border-t border-amber-500/20 text-[9px] font-mono text-amber-300/80">
                      <span>Add </span>
                      <code className="px-1 py-0.5 rounded bg-black/40 text-white font-mono">
                        GEMINI_API_KEY
                      </code>
                      <span> to </span>
                      <code className="px-1 py-0.5 rounded bg-black/40 text-white font-mono">.env</code>
                    </div>
                  )}

                  <div className="pt-1 flex items-center justify-end">
                    <button
                      onClick={handleRetry}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-mono text-[9px] transition-colors"
                    >
                      <RefreshCw className="w-2.5 h-2.5" />
                      <span>Retry</span>
                    </button>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            <div className="bg-[#101010] border-t border-[#D9D9D9]/10 shrink-0 w-full">
              <div className="flex items-center justify-between px-3 pt-1.5 pb-0.5">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#A78BFA] font-medium flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  <span>SUGGESTED QUESTIONS</span>
                </span>
                <span className="text-[9px] font-mono text-[#D9D9D9]/40">Tap to ask</span>
              </div>

              <div className="flex overflow-x-auto no-scrollbar gap-1.5 px-3 py-1.5 w-full whitespace-nowrap touch-pan-x">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleSendMessage(q);
                    }}
                    disabled={isLoading}
                    className="shrink-0 px-2.5 py-1 rounded-full bg-[#181818] hover:bg-[#A78BFA]/15 border border-[#D9D9D9]/15 hover:border-[#A78BFA]/50 text-xs text-[#D9D9D9] hover:text-[#F8F6EE] transition-all active:scale-95 text-left disabled:opacity-50 whitespace-nowrap cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSendMessage();
              }}
              className="flex items-center gap-2 p-2.5 sm:p-3 w-full bg-[#141414] border-t border-[#D9D9D9]/15 shrink-0"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about our services, projects, or enquiry..."
                maxLength={1000}
                disabled={isLoading}
                className="flex-1 min-w-0 text-base sm:text-sm px-3 py-2 bg-[#0E0E0E] border border-[#D9D9D9]/20 focus:border-[#A78BFA] rounded-xl text-[#F8F6EE] placeholder-[#D9D9D9]/40 outline-none transition-colors"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="shrink-0 px-3.5 py-2 rounded-xl bg-[#A78BFA] text-[#0E0E0E] hover:bg-white font-bold text-xs sm:text-sm tracking-wide transition-all active:scale-95 disabled:opacity-40 disabled:hover:bg-[#A78BFA] disabled:active:scale-100 flex items-center justify-center gap-1.5 shadow-md shadow-[#A78BFA]/20 min-h-[40px] min-w-[40px]"
                aria-label="Send message"
              >
                <Send className="w-3.5 h-3.5 text-[#0E0E0E]" />
                <span className="hidden sm:inline text-xs font-semibold">Send</span>
              </button>
            </form>

            {/* Bottom Footer Notice */}
            <div className="px-3 py-1 bg-[#0A0A0A] border-t border-[#D9D9D9]/5 flex items-center justify-between text-[8px] font-mono text-[#D9D9D9]/50 shrink-0 w-full">
              <span>RAVZEL AI • Grounded in studio facts</span>
              <a
                href="https://wa.me/919360977952"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#A78BFA] transition-colors"
              >
                WhatsApp: +91 93609 77952
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default AiAssistantChat;
