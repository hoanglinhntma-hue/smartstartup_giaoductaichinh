import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, Loader2, Camera, Lightbulb, Trash2 } from 'lucide-react';
import { getMentorResponse } from '../services/gemini';
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
    "Bán hoa vốn 1 triệu thì cần bán bao nhiêu?",
    "Lãi suất kép là gì?"
  ];

  useEffect(() => {
    setMessages([
      {
        role: 'assistant',
        content:
          'Chào em 🌸 Chị là **Mai Mentor**. Em cứ nêu bài toán, chị sẽ cùng em **tư duy từng bước**, không giải hộ đâu nhé!'
      }
    ]);
    setSuggestions(initialSuggestions);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = (customText?: string) => {
    const rawInput = customText || input;
    if (!rawInput.trim() && !selectedImage) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: rawInput || '[Hình ảnh bài toán]',
      image: selectedImage || undefined
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setSelectedImage(null);
    setLoading(true);
    setSuggestions([]);

    // AI giả lập – không async
    const data = getMentorResponse(rawInput);

    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.text }
      ]);
      setSuggestions(data.suggestedActions);
      setLoading(false);
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setSelectedImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Chúng ta bắt đầu lại nhé 😊 Em đang gặp bài toán gì nào?'
      }
    ]);
    setSuggestions(initialSuggestions);
  };

  return (
    <div className="flex flex-col h-[750px] bg-white rounded-b-[2.5rem] border">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b bg-green-50">
        <span className="font-bold text-green-700">Mai Mentor</span>
        <button onClick={clearChat}>
          <Trash2 size={18} />
        </button>
      </div>

      {/* Chat */}
      <div className="flex-grow overflow-y-auto p-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className="flex gap-3 max-w-[80%]">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                msg.role === 'user' ? 'bg-white border' : 'bg-green-600'
              }`}>
                {msg.role === 'user' ? <User size={18} /> : <Sparkles size={18} className="text-white" />}
              </div>
              <div className={`p-4 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-green-600 text-white'
                  : 'bg-white border'
              }`}>
                <MathDisplay content={msg.content} />
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-slate-400">
            <Loader2 className="animate-spin" size={18} />
            Chị đang suy nghĩ...
          </div>
        )}

        {!loading && suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button
                key={i}
                onClick={() => handleSend(s)}
                className="px-4 py-2 text-sm border rounded-xl hover:bg-green-600 hover:text-white"
              >
                <Lightbulb size={14} className="inline mr-1" />
                {s}
              </button>
            ))}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t flex gap-3">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <button onClick={() => fileInputRef.current?.click()}>
          <Camera />
        </button>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nhập câu hỏi..."
          className="flex-grow border rounded-xl px-4 py-2"
        />
        <button onClick={() => handleSend()}>
          <Send />
        </button>
      </div>
    </div>
  );
};

export default AIAdvisorTab;
