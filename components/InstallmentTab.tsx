import React, { useState, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Info, CheckCircle2, HelpCircle } from 'lucide-react';
import MathDisplay from './MathDisplay';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const InstallmentTab: React.FC = () => {
  const [price, setPrice] = useState(20000000);
  const [downPayment, setDownPayment] = useState(5000000);
  const [interestRate, setInterestRate] = useState(1.5);
  const [months, setMonths] = useState(12);
  const [userGuess, setUserGuess] = useState('');
  const [checkStatus, setCheckStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  useEffect(() => {
    setCheckStatus('idle');
    setUserGuess('');
  }, [price, downPayment, interestRate, months]);

  const results = useMemo(() => {
    const P = price - downPayment;
    const r = interestRate / 100;
    const n = months;
    if (P <= 0) return { monthly: 0, total: downPayment, interest: 0 };
    const monthly = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const total = monthly * n + downPayment;
    const interest = total - price;
    return { monthly, total, interest };
  }, [price, downPayment, interestRate, months]);

  const handleCheckAnswer = () => {
    if (!userGuess) return;
    const cleanUserNumber = Number(userGuess.replace(/\./g, '').replace(/,/g, ''));
    if (Math.abs(cleanUserNumber - results.monthly) < 10000) {
      setCheckStatus('correct');
    } else {
      setCheckStatus('incorrect');
    }
  };

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

  // --- CẬP NHẬT CỠ CHỮ TO HƠN TẠI ĐÂY ---
  // Input: Tăng lên text-xl (20px)
  const inputClass = "w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all font-bold text-xl shadow-sm text-slate-700 placeholder-gray-300";
  // Label: Tăng lên text-sm (14px) - đậm hơn
  const labelClass = "block text-sm font-bold text-slate-600 uppercase tracking-wider mb-2";

  return (
    <div className="p-6 md:p-10 space-y-10 animate-in fade-in duration-500">
      <div className="border-l-8 border-green-600 pl-6">
        {/* Tiêu đề to hẳn lên text-3xl (30px) */}
        <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-2">Mua Sắm Trả Góp</h2>
        <p className="text-base text-slate-600 font-medium">Làm chủ dòng tiền cá nhân bằng toán học tài chính.</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        {/* CỘT TRÁI */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 space-y-6">
            <div className="space-y-6">
              <div>
                <label className={labelClass}>Giá trị sản phẩm (VND)</label>
                <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Số tiền trả trước (VND)</label>
                <input type="number" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className={inputClass} />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Lãi suất (%/tháng)</label>
                  <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Kỳ hạn (tháng)</label>
                  <input type="number" value={months} onChange={(e) => setMonths(Number(e.target.value))} className={inputClass} />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-gray-100">
              {checkStatus !== 'correct' ? (
                <div className="space-y-4 bg-yellow-50 p-6 rounded-2xl border border-yellow-100">
                  <div className="flex items-center gap-3 text-yellow-800 font-bold uppercase text-sm tracking-widest">
                    <HelpCircle size={20} /> <span>Thử thách của Chị Mai</span>
                  </div>
                  <div className="flex gap-3">
                    <input 
                      type="number" 
                      value={userGuess} 
                      onChange={(e) => setUserGuess(e.target.value)} 
                      placeholder="Nhập số tiền..." 
                      className="w-full p-4 bg-white border border-yellow-200 rounded-xl outline-none font-bold text-lg text-slate-700 focus:ring-2 focus:ring-yellow-400" 
                    />
                    <button onClick={handleCheckAnswer} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-6 rounded-xl shadow-lg transition-all active:scale-95 whitespace-nowrap text-base">Kiểm tra</button>
                  </div>
                  {checkStatus === 'incorrect' && (
                    <div className="text-sm font-bold text-red-600 bg-red-50 p-3 rounded-xl border border-red-100">
                      Chưa đúng rồi! Em hãy áp dụng công thức bên phải nhé.
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-green-600 rounded-2xl p-8 text-white shadow-xl space-y-4 animate-in zoom-in duration-300">
                  <div className="flex items-center gap-2 text-green-100 font-bold uppercase text-sm tracking-widest">
                    <CheckCircle2 size={24} /> <span>Chính xác tuyệt vời!</span>
                  </div>
                  <p className="text-5xl font-black tracking-tight">{formatCurrency(results.monthly)}</p>
                  <p className="text-base font-bold opacity-90 uppercase">Tổng lãi phải trả: {formatCurrency(results.interest)}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CỘT PHẢI */}
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            <h3 className="text-sm font-bold text-slate-400 mb-8 text-center uppercase tracking-widest">Cơ cấu tài chính dự án</h3>
            
            <div className={`h-[320px] w-full mb-8 transition-all duration-700 ${checkStatus === 'correct' ? 'opacity-100' : 'opacity-30 blur-sm'}`}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{ name: 'Giá gốc', value: price }, { name: 'Tổng trả', value: results.total }]}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={14} fontWeight="bold" stroke="#475569" />
                  <YAxis hide />
                  <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', fontSize: '14px', fontWeight: 'bold' }} />
                  <Bar dataKey="value" radius={[12, 12, 12, 12]} barSize={80}>
                    <Cell fill="#10b981" /><Cell fill="#f59e0b" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              {checkStatus !== 'correct' && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-base font-bold text-slate-500 bg-white/95 px-6 py-3 rounded-full border border-slate-200 shadow-lg">🔒 Hoàn thành bài toán để xem biểu đồ</span>
                </div>
              )}
            </div>

            <div className="bg-blue-50/50 p-8 rounded-3xl border border-blue-100 mt-auto">
              <div className="flex items-start gap-5">
                <div className="p-3 bg-blue-100 rounded-2xl shrink-0"><Info className="text-blue-600" size={24} /></div>
                <div className="space-y-4 w-full">
                  <p className="font-bold text-blue-800 uppercase text-sm tracking-widest">Cơ sở mô hình hóa toán học</p>
                  <div className="bg-white p-6 rounded-2xl border border-blue-100 text-center shadow-sm">
                    {/* Công thức to hơn nữa */}
                    <MathDisplay content={"$$M = P \\times \\frac{r(1 + r)^n}{(1 + r)^n - 1}$$"} className="text-2xl md:text-3xl text-blue-900" />
                  </div>
                  <div className="text-base text-blue-700 leading-relaxed font-medium">
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                      {"**Chú thích:** $M$: Số tiền trả tháng | $P$: Dư nợ gốc | $r$: Lãi suất tháng | $n$: Số tháng"}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallmentTab;