
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { X, BookOpen } from 'lucide-react';

// DỮ LIỆU CÔNG THỨC CHUẨN LATEX (ĐÃ ĐƯỢC FIX DOUBLE BACKSLASH)
const formulaData = [
  {
    id: 'lai-kep',
    title: "1. LÃI SUẤT KÉP (GỬI 1 LẦN)",
    latex: "$$FV = PV \\times (1+r)^n$$",
    desc: "Dùng khi em gửi một khoản tiền lớn (Vốn) vào ngân hàng và để đó sinh lời theo thời gian.",
    vars: [
      { sym: "$FV$", mean: "Giá trị tương lai (Tiền gốc + Lãi)." },
      { sym: "$PV$", mean: "Số tiền gửi ban đầu (Hiện giá)." },
      { sym: "$r$", mean: "Lãi suất mỗi kỳ (Ví dụ: 0.5%/tháng)." },
      { sym: "$n$", mean: "Số kỳ gửi (Số tháng hoặc năm)." }
    ]
  },
  {
    id: 'tich-luy',
    title: "2. TÍCH LŨY ĐỊNH KỲ (NUÔI HEO)",
    latex: "$$FV = A \\times \\frac{(1+r)^n - 1}{r} \\times (1+r)$$",
    desc: "Dùng khi em muốn tiết kiệm một số tiền nhỏ đều đặn mỗi tháng.",
    vars: [
      { sym: "$A$", mean: "Số tiền em gửi vào hàng tháng." },
      { sym: "$r$", mean: "Lãi suất kỳ hạn." },
      { sym: "$n$", mean: "Tổng số tháng em gửi." }
    ]
  },
  {
    id: 'tra-gop',
    title: "3. VAY TRẢ GÓP (MUA NỢ)",
    latex: "$$M = P \\times \\frac{r(1+r)^n}{(1+r)^n - 1}$$",
    desc: "Công thức tính số tiền cố định phải đóng mỗi tháng để tất toán nợ gốc và lãi.",
    vars: [
      { sym: "$M$", mean: "Số tiền phải trả cố định mỗi tháng." },
      { sym: "$P$", mean: "Số tiền nợ ban đầu (Giá máy - Trả trước)." },
      { sym: "$r$", mean: "Lãi suất vay (chia theo tháng)." },
      { sym: "$n$", mean: "Tổng số tháng vay." }
    ]
  }
];

interface FormulaDictionaryProps {
  isOpen: boolean;
  onClose: () => void;
}

const FormulaDictionary: React.FC<FormulaDictionaryProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl border border-green-100 flex flex-col animate-fade-in">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-green-50">
          <div className="flex items-center gap-3 text-green-800">
            <BookOpen className="w-6 h-6" />
            <h2 className="text-xl font-bold uppercase tracking-tight">Từ Điển Công Thức</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white rounded-full transition-colors text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8 overflow-y-auto bg-gray-50/30">
          {formulaData.map((item) => (
            <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm mb-4 italic">{item.desc}</p>
              
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-6 mb-4 flex justify-center overflow-x-auto min-h-[100px] items-center shadow-inner">
                <div className="text-xl md:text-2xl text-indigo-700">
                  <ReactMarkdown 
                    remarkPlugins={[remarkMath]} 
                    rehypePlugins={[rehypeKatex]}
                  >
                    {item.latex}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {item.vars.map((v, idx) => (
                  <div key={idx} className="flex items-start gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <span className="font-bold text-indigo-600 min-w-[40px] flex justify-center">
                      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                        {v.sym}
                      </ReactMarkdown>
                    </span>
                    <span className="text-slate-700">{v.mean}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-6 border-t border-gray-100 bg-white text-center">
          <button 
            onClick={onClose}
            className="px-10 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg shadow-green-100 transition-all active:scale-95 uppercase tracking-widest text-xs"
          >
            Đã Hiểu, Quay Lại Tính Toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormulaDictionary;
