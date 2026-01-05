import React, { useState, useMemo, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sparkles, TrendingUp, HelpCircle, CheckCircle2, XCircle } from 'lucide-react';
import MathDisplay from './MathDisplay';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const CompoundTab: React.FC = () => {
  // --- STATE DỮ LIỆU ---
  const [monthlySaving, setMonthlySaving] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8); 
  const [years, setYears] = useState(5);
  
  // --- STATE TƯƠNG TÁC ---
  const [userGuess, setUserGuess] = useState('');
  const [checkStatus, setCheckStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  // Reset khi đổi số liệu
  useEffect(() => {
    setCheckStatus('idle');
    setUserGuess('');
  }, [monthlySaving, interestRate, years]);

  // --- TÍNH TOÁN ---
  const { data, total } = useMemo(() => {
    const r = interestRate / 100 / 12; // Lãi suất tháng
    const months = years * 12;
    const chartData = [];
    let currentBalance = 0;

    for (let m = 0; m <= months; m++) {
      if (m > 0) {
        // Công thức gửi đầu kỳ (Annuity Due): Có nhân thêm (1+r) vì gửi đầu tháng
        currentBalance = (currentBalance + monthlySaving) * (1 + r);
      }
      // Chỉ lấy mốc từng năm để vẽ biểu đồ cho đỡ rối
      if (m % 12 === 0 || m === months) {
        chartData.push({
          name: `Năm ${m / 12}`,
          value: Math.round(currentBalance)
        });
      }
    }

    return { data: chartData, total: currentBalance };
  }, [monthlySaving, interestRate, years]);

  // --- KIỂM TRA ĐÁP ÁN ---
  const handleCheckAnswer = () => {
    if (!userGuess) return;
    const cleanUserNumber = Number(userGuess.replace(/\./g, '').replace(/,/g, ''));
    
    // Cho phép sai số 50k
    if (Math.abs(cleanUserNumber - total) < 50000) {
      setCheckStatus('correct');
    } else {
      setCheckStatus('incorrect');
    }
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

  // --- STYLE CHUẨN (Cỡ chữ to) ---
  const inputClass = "w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all font-bold text-xl shadow-sm text-slate-700 placeholder-gray-300";
  const labelClass = "block text-sm font-bold text-slate-600 uppercase tracking-wider mb-2";

  return (
    <div className="p-6 md:p-10 space-y-10 animate-in fade-in duration-500">
      <div className="border-l-8 border-emerald-500 pl-6">
        <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-2">Kỳ Quan Lãi Kép</h2>
        <p className="text-base text-slate-600 font-medium">Thấy được sức mạnh bùng nổ của tài sản qua thời gian.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* CỘT TRÁI: NHẬP LIỆU */}
        <div className="space-y-8">
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Tiết kiệm định kỳ (VND/tháng)</label>
              <input type="number" value={monthlySaving} onChange={(e) => setMonthlySaving(Number(e.target.value))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Lãi suất kỳ vọng (%/năm)</label>
              <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Thời gian tích lũy: <span className="text-emerald-600 text-xl ml-2">{years} năm</span></label>
              <input 
                type="range" 
                min="1" 
                max="40" 
                value={years} 
                onChange={(e) => setYears(Number(e.target.value))} 
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600 mt-2" 
              />
            </div>
          </div>

          {checkStatus !== 'correct' ? (
            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 space-y-5 shadow-sm">
              <div className="flex items-center gap-3 text-amber-800 font-bold uppercase text-sm tracking-widest">
                <HelpCircle size={20} /> <span>Thử thách tư duy</span>
              </div>
              <p className="text-base text-slate-700 font-medium leading-relaxed">
                Nếu mỗi tháng em để dành <span className="font-bold">{formatCurrency(monthlySaving)}</span> với lãi suất này, sau <span className="font-bold">{years} năm</span> em sẽ có bao nhiêu tiền?
              </p>
              
              <div className="flex gap-3">
                <input 
                  type="number" 
                  value={userGuess} 
                  onChange={(e) => setUserGuess(e.target.value)} 
                  placeholder="Nhập dự đoán..." 
                  className="w-full p-4 bg-white border border-amber-200 rounded-xl focus:ring-2 focus:ring-amber-400 outline-none font-bold text-lg text-slate-700" 
                />
                <button onClick={handleCheckAnswer} className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 rounded-xl shadow-lg transition-all active:scale-95 whitespace-nowrap text-base">Kiểm tra</button>
              </div>

              {checkStatus === 'incorrect' && (
                <div className="flex items-start gap-3 text-red-600 bg-red-50 p-4 rounded-xl border border-red-100 animate-in slide-in-from-top-2">
                  <XCircle size={20} className="shrink-0 mt-0.5" />
                  <div className="text-sm font-medium">
                    <p className="font-bold">Chưa đúng rồi!</p>
                    <p>Gợi ý: Em nhớ đổi lãi suất năm ({interestRate}%) ra tháng (chia 12) nhé. Đây là bài toán gửi tiền đều đặn hàng tháng.</p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-emerald-600 rounded-2xl p-8 text-white shadow-2xl relative overflow-hidden group animate-in zoom-in duration-500">
              <Sparkles className="absolute -top-4 -right-4 opacity-10 scale-150 transition-transform group-hover:rotate-12" size={150} />
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-emerald-400/30">
                  <CheckCircle2 className="text-emerald-300" size={24}/>
                  <span className="font-bold uppercase tracking-widest text-sm text-emerald-100">Chính xác! Chúc mừng em</span>
                </div>
                
                <div>
                  <p className="text-emerald-100 font-bold uppercase tracking-[0.2em] text-xs mb-1">Tổng tài sản thực tế</p>
                  <p className="text-5xl font-black tracking-tight">{formatCurrency(total)}</p>
                </div>
                
                <div className="h-px bg-white/20 w-full my-4"></div>
                <p className="text-sm text-emerald-50 opacity-90 leading-relaxed italic font-medium">
                  "Lãi kép là kỳ quan thứ 8 của thế giới. Ai hiểu nó sẽ kiếm được tiền, ai không hiểu sẽ phải trả tiền cho nó." - Albert Einstein
                </p>
              </div>
            </div>
          )}
        </div>

        {/* CỘT PHẢI: BIỂU ĐỒ & CÔNG THỨC */}
        <div className="space-y-8">
          {/* Biểu đồ */}
          <div className={`bg-white rounded-[2.5rem] p-8 h-[350px] border border-gray-100 shadow-sm relative transition-all duration-700 ${checkStatus === 'correct' ? '' : 'filter grayscale blur-sm opacity-60'}`}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} fontWeight="bold" stroke="#64748b" />
                <YAxis hide />
                <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', fontSize: '14px', fontWeight: 'bold' }} />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
            
            {checkStatus !== 'correct' && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                 <div className="bg-white/95 px-6 py-3 rounded-full border border-gray-100 font-bold text-slate-500 text-base shadow-lg flex items-center gap-2">
                   🔒 Hãy tính ra kết quả để mở khóa biểu đồ
                 </div>
              </div>
            )}
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-emerald-100 shadow-sm hover:shadow-lg transition-all">
            <h4 className="font-bold text-emerald-800 mb-6 flex items-center gap-3 uppercase text-sm tracking-widest">
              <TrendingUp size={20} /> Cơ sở toán học SGK
            </h4>
            <div className="space-y-5">
              <div className="p-6 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-center">
                <p className="text-xs mb-3 font-bold text-emerald-600 uppercase text-left tracking-wider">Hàm tích lũy chuỗi tiền gửi:</p>
                {/* Công thức to, rõ, block math */}
                <MathDisplay content={"$$FV = A \\times \\frac{(1+r)^n - 1}{r} \\times (1+r)$$"} className="text-2xl md:text-3xl text-emerald-900" />
              </div>
              <div className="text-base text-slate-500 leading-relaxed font-medium px-2">
                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                  {"Trong đó: $A$: Tiền gửi tháng | $r$: Lãi suất tháng | $n$: Tổng tháng. Số mũ $n$ tạo nên đường cong tăng trưởng."}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompoundTab;