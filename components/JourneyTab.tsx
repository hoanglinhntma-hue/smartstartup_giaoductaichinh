import React, { useState } from 'react';
import { BookOpen, Clock, Target, MessageSquare, Lightbulb, PenTool, Save } from 'lucide-react';

const JourneyTab: React.FC = () => {
  const [reflection, setReflection] = useState('');

  // Dữ liệu giả định (Sau này có thể nối với Backend thật)
  const stats = [
    { icon: <Clock size={28} className="text-blue-500" />, label: "Thời gian tư duy", value: "45 phút", color: "bg-blue-50 border-blue-100" },
    { icon: <BookOpen size={28} className="text-emerald-500" />, label: "Biến số định nghĩa", value: "12 biến", color: "bg-emerald-50 border-emerald-100" },
    { icon: <Target size={28} className="text-purple-500" />, label: "Mô hình đã chọn", value: "5 mô hình", color: "bg-purple-50 border-purple-100" },
    { icon: <MessageSquare size={28} className="text-orange-500" />, label: "Phản biện thành công", value: "8 lần", color: "bg-orange-50 border-orange-100" },
  ];

  const logs = [
    { title: "Mô hình hóa bán hoa 20/10", time: "Hôm nay", desc: "Em đã hiểu điểm hòa vốn phụ thuộc rất lớn vào chi phí cố định ban đầu." },
    { title: "Bẫy lãi suất trả góp", time: "Hôm qua", desc: "Tự mình tính ra lãi suất thực tế lên tới 30%/năm, khác xa con số quảng cáo." },
  ];

  return (
    <div className="p-6 md:p-10 space-y-10 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="border-l-8 border-indigo-500 pl-6">
        <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-2">Hành Trình Học Tập</h2>
        <p className="text-base text-slate-600 font-medium">Ghi dấu những bước tiến trong tư duy tài chính của em.</p>
      </div>

      {/* 1. Thống kê (Stats Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((item, idx) => (
          <div key={idx} className={`p-6 rounded-[2rem] border ${item.color} flex flex-col items-center text-center shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default group`}>
            <div className="mb-4 p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{item.label}</p>
            <p className="text-2xl md:text-3xl font-black text-slate-800">{item.value}</p>
          </div>
        ))}
      </div>

      {/* 2. Nhật ký (Logs) */}
      <div className="space-y-6">
        <h3 className="flex items-center gap-3 text-sm font-bold text-slate-500 uppercase tracking-widest">
          <TrendingUpIcon size={20} /> Nhật ký tư duy gần đây
        </h3>
        
        <div className="grid gap-6">
          {logs.map((log, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row gap-6 items-start md:items-center">
              <div className="flex-grow space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-bold text-slate-800">{log.title}</h4>
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${idx === 0 ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                    {log.time}
                  </span>
                </div>
                <p className="text-base text-slate-600 italic">"{log.desc}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Phản chiếu (Reflection) - Khối xanh nổi bật */}
      <div className="bg-green-700 rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden group">
        {/* Họa tiết trang trí nền */}
        <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
          <Lightbulb size={200} />
        </div>

        <div className="relative z-10 space-y-6 max-w-4xl">
          <div>
             <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2 flex items-center gap-3">
               Hôm nay em nhận ra điều gì mới?
             </h3>
             <p className="text-green-100 text-base font-medium opacity-90">Viết ra suy nghĩ giúp em khắc sâu kiến thức hơn.</p>
          </div>

          <div className="relative">
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Ví dụ: Lãi kép thực sự mạnh nếu mình bắt đầu sớm..."
              className="w-full h-40 p-6 rounded-3xl bg-green-800/50 border-2 border-green-600/50 text-white placeholder-green-200/50 text-lg font-medium focus:bg-green-800 focus:border-white outline-none transition-all resize-none shadow-inner"
            />
            <PenTool className="absolute bottom-6 right-6 text-green-400 opacity-50" size={24} />
          </div>

          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-8 py-4 bg-white text-green-800 font-black rounded-2xl shadow-lg hover:bg-green-50 transition-all active:scale-95 uppercase tracking-widest text-sm group-hover:shadow-green-900/50">
              <Save size={18} /> Lưu suy nghĩ của em
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component icon phụ trợ (định nghĩa nội bộ để tránh lỗi import)
const TrendingUpIcon = ({ size }: { size: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
);

export default JourneyTab;