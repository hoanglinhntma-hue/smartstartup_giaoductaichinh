import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Target, TrendingUp, DollarSign } from 'lucide-react';
import MathDisplay from './MathDisplay';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const StartupTab: React.FC = () => {
  // --- STATE DỮ LIỆU ---
  const [fixedCost, setFixedCost] = useState(1000000); // Vốn cố định
  const [variableCost, setVariableCost] = useState(50000); // Giá vốn/SP
  const [sellingPrice, setSellingPrice] = useState(85000); // Giá bán/SP

  // --- TÍNH TOÁN ---
  const breakEvenPoint = useMemo(() => {
    // Tránh chia cho 0 hoặc số âm
    if (sellingPrice <= variableCost) return Infinity;
    return Math.ceil(fixedCost / (sellingPrice - variableCost));
  }, [fixedCost, variableCost, sellingPrice]);

  const profitPerUnit = sellingPrice - variableCost;
  const margin = sellingPrice > 0 ? (profitPerUnit / sellingPrice) * 100 : 0;

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

  // --- STYLE CHUẨN (Cỡ chữ to) ---
  const inputClass = "w-full p-4 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-bold text-xl shadow-sm text-slate-700 placeholder-gray-300";
  const labelClass = "block text-sm font-bold text-slate-600 uppercase tracking-wider mb-2";

  return (
    <div className="p-6 md:p-10 space-y-10 animate-in fade-in duration-500">
      <div className="border-l-8 border-blue-500 pl-6">
        <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-2">Dự Án Khởi Nghiệp</h2>
        <p className="text-base text-slate-600 font-medium">Phân tích điểm hòa vốn để tối ưu hóa mô hình kinh doanh.</p>
      </div>

      <div className="grid md:grid-cols-12 gap-10">
        {/* CỘT TRÁI: NHẬP LIỆU */}
        <div className="md:col-span-5 space-y-8">
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 space-y-6">
            <div>
              <label className={labelClass}>Vốn đầu tư cố định (VND)</label>
              <input type="number" value={fixedCost} onChange={(e) => setFixedCost(Number(e.target.value))} className={inputClass} />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Giá vốn/SP (VND)</label>
                <input type="number" value={variableCost} onChange={(e) => setVariableCost(Number(e.target.value))} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>Giá bán/SP (VND)</label>
                <input type="number" value={sellingPrice} onChange={(e) => setSellingPrice(Number(e.target.value))} className={inputClass} />
              </div>
            </div>

            {/* KẾT QUẢ QUAN TRỌNG */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="bg-indigo-50 p-6 rounded-3xl text-center border border-indigo-100 shadow-sm hover:scale-105 transition-transform">
                <Target className="mx-auto text-indigo-500 mb-3" size={32} />
                <p className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-1">Điểm hòa vốn</p>
                <p className="text-4xl font-black text-indigo-700 my-2">{breakEvenPoint === Infinity ? "∞" : breakEvenPoint}</p>
                <p className="text-sm text-indigo-400 font-bold">Sản phẩm</p>
              </div>
              <div className="bg-emerald-50 p-6 rounded-3xl text-center border border-emerald-100 shadow-sm hover:scale-105 transition-transform">
                <TrendingUp className="mx-auto text-emerald-500 mb-3" size={32} />
                <p className="text-sm font-bold text-emerald-400 uppercase tracking-widest mb-1">Lãi mỗi SP</p>
                <p className="text-2xl font-black text-emerald-700 my-2">{formatCurrency(profitPerUnit)}</p>
                <div className="inline-block bg-emerald-200/50 px-3 py-1 rounded-full">
                   <p className="text-sm text-emerald-600 font-bold">{margin.toFixed(1)}% Biên LN</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CỘT PHẢI: BIỂU ĐỒ & CÔNG THỨC */}
        <div className="md:col-span-7 space-y-8">
          <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            <h3 className="text-sm font-bold text-slate-400 mb-6 text-center uppercase tracking-widest">Cấu trúc giá bán & Lợi nhuận</h3>
            
            {/* Biểu đồ tròn  */}
            <div className="h-[300px] w-full relative mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={[
                      { name: 'Giá vốn (Chi phí)', value: variableCost },
                      { name: 'Lợi nhuận gộp', value: profitPerUnit }
                    ]} 
                    innerRadius={80} 
                    outerRadius={110} 
                    paddingAngle={5} 
                    dataKey="value"
                  >
                    <Cell fill="#94a3b8" /> {/* Màu xám cho chi phí */}
                    <Cell fill="#10b981" /> {/* Màu xanh cho lợi nhuận */}
                  </Pie>
                  <Tooltip formatter={(val: number) => formatCurrency(val)} contentStyle={{ borderRadius: '16px', border: 'none', fontSize: '14px', fontWeight: 'bold' }} />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Số liệu ở giữa biểu đồ */}
              <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                 <span className="text-sm font-bold text-slate-400 uppercase mb-1">Giá Bán Lẻ</span>
                 <span className="text-2xl font-black text-slate-700">{formatCurrency(sellingPrice)}</span>
              </div>
            </div>
            
            {/* Chú thích biểu đồ */}
            <div className="flex justify-center gap-8 text-sm font-bold text-slate-500 mb-8">
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-slate-400"></div> Giá vốn</div>
              <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-emerald-500"></div> Lợi nhuận gộp</div>
            </div>

            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 mt-auto">
              <div className="flex items-start gap-5">
                <div className="p-3 bg-white rounded-2xl border border-slate-100 shadow-sm shrink-0"><DollarSign className="text-slate-600" size={24} /></div>
                <div className="space-y-4 w-full">
                  <p className="font-bold text-slate-700 uppercase text-sm tracking-widest">Cơ sở mô hình hóa</p>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-inner">
                    {/* CÔNG THỨC CHUẨN: Dùng block math $$ */}
                    <MathDisplay content={"$$P(x) = (S - C) \\times x - K$$"} className="text-2xl md:text-3xl text-slate-800" />
                  </div>
                  <div className="text-base text-slate-600 leading-relaxed font-medium">
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                      {"**Chú thích:** $S$: Giá bán | $C$: Giá vốn | $K$: Vốn đầu tư | $x$: Số lượng"}
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

export default StartupTab;