
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { X, BookOpen, GraduationCap } from 'lucide-react';

const formulaData = [
  {
    id: 'lai-kep',
    title: "1. LÃI SUẤT KÉP (GỬI 1 LẦN)",
    latex: "$$FV = PV \\times (1+r)^n$$",
    desc: "Sức mạnh bùng nổ của thời gian khi em gửi một khoản vốn ban đầu.",
    vars: [
      { sym: "$FV$", mean: "Giá trị tương lai." },
      { sym: "$PV$", mean: "Số vốn hiện tại." },
      { sym: "$r$", mean: "Lãi suất kỳ hạn." },
      { sym: "$n$", mean: "Số kỳ gửi." }
    ]
  },
  {
    id: 'tich-luy',
    title: "2. TÍCH LŨY ĐỊNH KỲ (NUÔI HEO)",
    latex: "$$FV = A \\times \\frac{(1+r)^n - 1}{r} \\times (1+r)$$",
    desc: "Mô hình tích lũy đều đặn hàng tháng (Annuity Due).",
    vars: [
      { sym: "$A$", mean: "Tiền gửi định kỳ." },
      { sym: "$r$", mean: "Lãi suất tháng." },
      { sym: "$n$", mean: "Số tháng tích lũy." }
    ]
  },
  {
    id: 'tra-gop',
    title: "3. VAY TRẢ GÓP (MUA NỢ)",
    latex: "$$M = P \\times \\frac{r(1+r)^n}{(1+r)^n - 1}$$",
    desc: "Tính toán nghĩa vụ nợ cố định hàng tháng.",
    vars: [
      { sym: "$M$", mean: "Tiền trả tháng." },
      { sym: "$P$", mean: "Nợ gốc ban đầu." },
      { sym: "$r$", mean: "Lãi suất vay." },
      { sym: "$n$", mean: "Thời gian vay." }
    ]
  }
];

interface FormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FormulaModal: React.FC<FormulaModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl z-[9999] flex items-center justify-center p-4 md:p-10">
      <div className="bg-white rounded-[3rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/20 flex flex-col animate-in zoom-in duration-300">
        
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-emerald-50/50">
          <div className="flex items-center gap-4 text-emerald-800">
            <div className="p-3 bg-emerald-100 rounded-2xl"><GraduationCap className="w-8 h-8" /></div>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-tight">Từ Điển Công Thức</h2>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest opacity-70">Toán học tài chính ứng dụng</p>
            </div>
          </div>
          <button onClick={onClose} className="p-4 hover:bg-white hover:shadow-md rounded-2xl transition-all text-slate-400 hover:text-red-500">
            <X className="w-8 h-8" />
          </button>
        </div>

        <div className="p-8 space-y-10 overflow-y-auto">
          {formulaData.map((item) => (
            <div key={item.id} className="group relative">
              <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-8 transition-all duration-300 hover:border-emerald-200 hover:shadow-xl">
                <h3 className="text-xl font-black text-slate-800 mb-2 uppercase tracking-tight">{item.title}</h3>
                <p className="text-slate-500 text-sm mb-6 font-medium italic">{item.desc}</p>
                
                <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-10 mb-8 flex justify-center items-center shadow-inner overflow-x-auto">
                  <div className="text-2xl md:text-3xl text-emerald-700 font-bold">
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                      {item.latex}
                    </ReactMarkdown>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {item.vars.map((v, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center text-center">
                      <span className="font-black text-emerald-600 text-lg mb-1">
                        <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{v.sym}</ReactMarkdown>
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-tight">{v.mean}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-8 border-t border-slate-100 bg-white text-center">
          <button 
            onClick={onClose} 
            className="px-12 py-5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl shadow-2xl transition-all active:scale-95 uppercase tracking-[0.25em] text-xs"
          >
            Đã nắm rõ lý thuyết
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormulaModal;
