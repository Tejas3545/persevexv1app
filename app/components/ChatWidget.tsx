"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Phone, MessageCircle, Home, MessageCircleMore, Send, Loader2 } from "lucide-react";

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  time: string;
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'conversation'>('home');
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      text: 'Hi there! 👋 How can we help you today?', 
      sender: 'bot', 
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) 
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (activeTab === 'conversation') {
      scrollToBottom();
    }
  }, [messages, activeTab, isTyping]);

  useEffect(() => {
    // Show tooltip after a short delay
    const timer = setTimeout(() => {
      if (!isOpen) setShowTooltip(true);
    }, 3000);
    
    // Hide tooltip after 10 seconds
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 13000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, [isOpen]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };

    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponses = [
        "Thanks for reaching out! Could you please provide your email address so our team can get back to you?",
        "We've received your message. An expert will review it and contact you shortly.",
        "That sounds interesting! Can you provide a bit more detail?",
        "Our team is currently offline, but your message has been safely recorded."
      ];
      
      // If it's the first user message, give a specific response
      const responseText = messages.length === 1 
        ? "Thanks for reaching out! Our team is currently offline. Please leave your email address and we'll get back to you as soon as possible."
        : botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const newBotMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      
      setMessages(prev => [...prev, newBotMsg]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5s and 2.5s
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[calc(100vw-3rem)] sm:w-[350px] bg-white dark:bg-[#121212] rounded-2xl shadow-2xl overflow-hidden border border-border flex flex-col"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-6 relative">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                <span className="text-blue-600 font-bold text-xl">P</span>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">Persevex Learning Private Limited</h3>
              <p className="text-sm text-blue-100 leading-relaxed">
                We are not available right now. Please leave us a voice mail or a message. We'll get back as soon as possible.
              </p>
            </div>

            {/* Body */}
            <div className="bg-slate-50 dark:bg-[#0a0a0a] flex-1 flex flex-col h-[350px] overflow-hidden">
              <AnimatePresence mode="wait">
                {activeTab === 'home' ? (
                  <motion.div 
                    key="home"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="relative p-4 flex flex-col gap-3 h-full overflow-y-auto"
                  >
                    <button 
                      onClick={() => setActiveTab('conversation')}
                      className="w-full bg-white dark:bg-[#1a1a1a] border border-border rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-foreground">Leave a message</span>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-foreground transition-colors"><path d="m9 18 6-6-6-6"/></svg>
                    </button>

                    <button 
                      onClick={() => setActiveTab('conversation')}
                      className="w-full bg-white dark:bg-[#1a1a1a] border border-border rounded-xl p-4 flex items-center justify-between hover:shadow-md transition-shadow group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-foreground">Leave a voice message</span>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground group-hover:text-foreground transition-colors"><path d="m9 18 6-6-6-6"/></svg>
                    </button>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="conversation"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col h-full"
                  >
                    {/* Chat Messages */}
                    <div className="relative flex-1 p-4 overflow-y-auto flex flex-col gap-4">
                      {messages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'}`}
                        >
                          <div 
                            className={`px-4 py-2 rounded-2xl ${
                              msg.sender === 'user' 
                                ? 'bg-blue-600 text-white rounded-br-sm' 
                                : 'bg-white dark:bg-[#1a1a1a] border border-border text-foreground rounded-bl-sm'
                            }`}
                          >
                            <p className="text-sm">{msg.text}</p>
                          </div>
                          <span className="text-[10px] text-muted-foreground mt-1 px-1">{msg.time}</span>
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className="self-start flex flex-col max-w-[85%] items-start">
                          <div className="px-4 py-3 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-border rounded-bl-sm flex items-center gap-1">
                            <motion.div className="w-1.5 h-1.5 bg-blue-600 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                            <motion.div className="w-1.5 h-1.5 bg-blue-600 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                            <motion.div className="w-1.5 h-1.5 bg-blue-600 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Chat Input */}
                    <div className="p-3 bg-white dark:bg-[#121212] border-t border-border">
                      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <input 
                          type="text" 
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Type your message..." 
                          className="flex-1 bg-slate-100 dark:bg-[#1a1a1a] border-none rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/50 text-foreground"
                        />
                        <button 
                          type="submit"
                          disabled={!inputValue.trim() || isTyping}
                          className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors shrink-0"
                        >
                          {isTyping ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4 ml-0.5" />}
                        </button>
                      </form>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer Tabs */}
            <div className="border-t border-border bg-white dark:bg-[#121212] flex items-center justify-around p-2">
              <button 
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center gap-1 p-2 w-1/2 relative transition-colors ${activeTab === 'home' ? 'text-blue-600' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <Home className="w-5 h-5" />
                <span className="text-[10px] font-medium">Home</span>
                {activeTab === 'home' && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-blue-600 rounded-t-full" />
                )}
              </button>
              <button 
                onClick={() => setActiveTab('conversation')}
                className={`flex flex-col items-center gap-1 p-2 w-1/2 relative transition-colors ${activeTab === 'conversation' ? 'text-blue-600' : 'text-muted-foreground hover:text-foreground'}`}
              >
                <MessageCircleMore className="w-5 h-5" />
                <span className="text-[10px] font-medium">Conversation</span>
                {activeTab === 'conversation' && (
                  <motion.div layoutId="activeTab" className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-blue-600 rounded-t-full" />
                )}
              </button>
            </div>
            
            {/* Branding */}
            <div className="bg-slate-50 dark:bg-[#0a0a0a] py-2 text-center border-t border-border">
              <span className="text-[10px] text-muted-foreground flex items-center justify-center gap-1">
                <span className="text-red-500">⚡</span> Driven by Persevex AI
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4">
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="bg-white dark:bg-[#1a1a1a] border border-border shadow-lg rounded-xl py-3 px-4 relative"
            >
              <div className="font-semibold text-foreground mb-0.5">We're offline</div>
              <div className="text-sm text-muted-foreground">Leave a message</div>
              {/* Tooltip Arrow */}
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-4 bg-white dark:bg-[#1a1a1a] border-r border-t border-border rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(!isOpen);
            setShowTooltip(false);
          }}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-xl flex items-center justify-center transition-colors z-50"
          aria-label="Toggle chat"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="chat"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
