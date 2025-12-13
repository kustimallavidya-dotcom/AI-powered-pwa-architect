import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, AlertCircle } from 'lucide-react';
import { ChatMessage } from '../types';
import { analyzeErrorLog } from '../services/geminiService';

const StepTroubleshoot: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "नमस्ते! मी तुमचा PWA असिस्टंट आहे. जर Netlify किंवा Google Play Console वर काही एरर येत असतील, तर त्या इथे पेस्ट करा. मी तुम्हाला मदत करेन.",
      timestamp: Date.now()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // We assume the context is general PWA deployment
      const response = await analyzeErrorLog(userMsg.text, "User is deploying a PWA created with React/HTML to Netlify and using PWABuilder for Android. The user likely speaks Marathi.");
      
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
         id: (Date.now() + 1).toString(),
         role: 'model',
         text: "AI सेवेशी संपर्क साधताना त्रुटी आली. कृपया तुमची इंटरनेट कनेक्टिव्हिटी किंवा API की तपासा.",
         timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Adjusted height for mobile (accounting for bottom nav) vs desktop
  return (
    <div className="h-[calc(100vh-140px)] md:h-[calc(100vh-8rem)] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">त्रुटी निवारण (Troubleshoot)</h2>
        <p className="text-gray-400 text-sm md:text-base">येणाऱ्या एरर लॉग्स इथे पेस्ट करा, AI तुम्हाला लगेच उपाय सांगेल.</p>
      </div>

      <div className="flex-1 bg-gray-800 border border-gray-700 rounded-xl overflow-hidden flex flex-col shadow-lg">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-blue-600' : 'bg-purple-600'
              }`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>
              <div className={`max-w-[85%] p-3 md:p-4 rounded-2xl text-sm md:text-base ${
                msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : 'bg-gray-700 text-gray-200 rounded-tl-none'
              }`}>
                <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0">
                <Bot size={14} />
              </div>
              <div className="bg-gray-700 text-gray-200 p-3 rounded-2xl rounded-tl-none">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-3 md:p-4 bg-gray-900 border-t border-gray-700">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="एरर येथे पेस्ट करा..."
              className="w-full bg-gray-800 border border-gray-700 rounded-xl p-3 md:p-4 pr-12 text-white text-sm md:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none h-20 md:h-24 scrollbar-hide"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-3 bottom-3 p-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 text-white rounded-lg transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepTroubleshoot;
