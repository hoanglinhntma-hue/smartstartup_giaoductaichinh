import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, Loader2, Camera, Lightbulb, Trash2, StopCircle } from 'lucide-react';
import { getGeminiResponse } from '../services/gemini';
import { ChatMessage } from '../types';
import MathDisplay from './MathDisplay';

const AIAdvisorTab: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initialSuggestions = [
    "Làm sao tiết kiệm 10 triệu sau 3 năm?",
    "Bán hoa vốn 1 triệu thì cần bán bao nhiêu SP?",
    "Lãi suất kép là gì?"
  ];

  // Khởi tạo tin nhắn chào mừng
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ 
        role: 'assistant', 
        content: 'Chào em, Chị là **Mai Mentor**. Hãy gửi ảnh bài tập hoặc câu hỏi. Chị sẽ không giải giúp ngay đâu, mà chị em mình cùng đi tìm đáp án nhé!' 
      }]);
      setSuggestions(initialSuggestions);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (customText?: string) => {
    const rawInput = customText || input;
    if (!rawInput.trim() && !selectedImage) return;

    const userMsg: ChatMessage = { 
      role: 'user', 
      content: rawInput || "[Hình ảnh dữ kiện]", 
      image: selectedImage || undefined 
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setSelectedImage(null);
    setLoading(true);
    setSuggestions([]); 

    // SYSTEM PROMPT: Kịch bản sư phạm Socratic (Hỏi gợi mở)
    const systemInstruction = `
    \n\n[VAI TRÒ]: Bạn là "Chị Mai Mentor" - trợ lý giáo dục phương pháp Socratic.
    
    [QUY TẮC PHẢN HỒI]:
    1. TUYỆT ĐỐI KHÔNG giải bài ngay. Hãy hỏi ngược lại để học sinh tự tư duy (Ví dụ: "Em xác định đâu là vốn gốc?").
    2. Chỉ đưa đáp án khi học sinh đã trả lời các câu hỏi gợi ý.
    3. Luôn dùng định dạng LaTeX cho toán học: $a^2 + b^2 = c^2$.
    4. Giọng điệu: Thân thiện, chị gái khuyên nhủ.
    `;

    const textToSend = rawInput + systemInstruction;

    try {
      const data = await getGeminiResponse(textToSend, userMsg.image);
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      
      if (data.suggestedActions && data.suggestedActions.length > 0) {
        setSuggestions(data.suggestedActions);
      }
    } catch (error) {
      console.error("Lỗi Gemini:", error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Mạng hơi yếu rồi. Em kiểm tra lại kết nối giúp chị nhé!' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Nút xóa lịch sử chat để làm mới
  const clearChat = () => {
    setMessages([{ 
      role: 'assistant', 
      content: 'Chào em, chúng ta bắt đầu chủ đề mới nhé! Em cần chị giúp gì nào?' 
    }]);
    setSuggestions(initialSuggestions);
  };

  return (
    <div className="flex flex-col h-[750px] bg-white relative rounded-b-[2.5rem] overflow-hidden shadow-sm border border-slate-100">
      
      {/* Header Chỉ báo & Công cụ */}
      <div className="flex justify-between items-center bg-green-50/80 backdrop-blur-sm py-4 px-6 border-b border-green-100 sticky top-0 z-10">
        <div className="flex gap-4">
          {['Trực quan', 'Toán học', 'Phản biện'].map((label) => (
            <div key={label} className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-sm animate-pulse" />
              <span className="text-xs font-bold text-green-800 uppercase tracking-widest">{label}</span>
            </div>
          ))}
        </div>
        <button onClick={clearChat} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all" title="Xóa đoạn chat">
          <Trash2 size={18} />
        </button>
      </div>

      {/* Khu vực Chat */}
      <div className="flex-grow overflow-y-auto p-6 md:p-8 space-y-8 scroll-smooth bg-slate-50/30">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
            <div className={`flex gap-4 max-w-[85%] md:max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              {/* Avatar */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md border-2 ${
                msg.role === 'user' ? 'bg-white border-green-100' : 'bg-green-600 border-green-700'
              }`}>
                {msg.role === 'user' ? <User size={24} className="text-green-700" /> : <Sparkles size={24} className="text-white" />}
              </div>

              {/* Bong bóng chat */}
              <div className="space-y-3">
                {msg.image && (
                  <img src={msg.image} alt="User upload" className="max-w-[250px] rounded-2xl border-4 border-white shadow-lg mb-2" />
                )}
                
                <div className={`p-6 rounded-3xl shadow-sm text-base leading-7 ${
                  msg.role === 'user' 
                    ? 'bg-green-600 text-white rounded-tr-sm' 
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'
                }`}>
                  <MathDisplay content={msg.content} />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Hiệu ứng đang gõ... */}
        {loading && (
          <div className="flex justify-start">
            <div className="flex gap-4 max-w-[80%]">
               <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 bg-green-600 border-2 border-green-700 shadow-md">
                 <Loader2 size={24} className="text-white animate-spin" /> 
               </div>
               <div className="bg-white border border-slate-200 p-6 rounded-3xl rounded-tl-sm shadow-sm flex items-center gap-1">
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                 <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
               </div>
            </div>
          </div>
        )}

        {/* Gợi ý câu hỏi (Chips) */}
        {!loading && suggestions.length > 0 && (
          <div className="pl-16 flex flex-wrap gap-3 animate-in fade-in duration-500">
            {suggestions.map((chip, i) => (
              <button 
                key={i} 
                onClick={() => handleSend(chip)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-green-200 rounded-2xl text-sm font-bold text-green-700 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all shadow-sm group hover:-translate-y-0.5"
              >
                <Lightbulb size={16} className="text-amber-400 group-hover:text-white transition-colors" />
                {chip}
              </button>
            ))}
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Khu vực Nhập liệu (Footer) */}
      <div className="p-6 bg-white border-t border-slate-100 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] z-20">
        <div className="flex gap-4 items-end max-w-4xl mx-auto">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            className="hidden" 
            accept="image/*"
          />
          <button 
            onClick={() => fileInputRef.current?.click()} 
            className={`p-4 rounded-2xl transition-all mb-1 shadow-sm border ${
              selectedImage ? 'bg-green-100 text-green-700 border-green-200' : 'bg-slate-50 text-slate-400 border-slate-200 hover:text-green-600 hover:border-green-300'
            }`}
            title="Gửi ảnh bài toán"
          >
            <Camera size={26} />
          </button>
          
          <div className="flex-grow relative">
            {selectedImage && (
              <div className="absolute -top-16 left-0 flex items-center gap-3 px-5 py-2.5 bg-green-50 rounded-2xl border border-green-200 text-sm text-green-800 animate-in slide-in-from-bottom-2 shadow-lg z-30">
                <span className="font-bold">📸 Đã đính kèm ảnh</span>
                <button onClick={() => setSelectedImage(null)} className="hover:text-red-500 hover:bg-red-50 p-1 rounded-full transition-colors"><Trash2 size={16}/></button>
              </div>
            )}
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Hỏi Chị Mai Mentor..."
              className="w-full pl-6 pr-16 py-4 bg-slate-50 border-2 border-slate-200 rounded-3xl focus:ring-4 focus:ring-green-100 focus:border-green-400 focus:bg-white outline-none text-lg font-medium text-slate-700 transition-all placeholder-slate-400"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || (!input.trim() && !selectedImage)}
              className="absolute right-2 top-2 p-2.5 bg-green-600 text-white rounded-2xl hover:bg-green-700 disabled:bg-slate-200 disabled:cursor-not-allowed transition-all shadow-md active:scale-95"
            >
              <Send size={22} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAdvisorTab;