
import React from 'react';
import { ShieldCheck, Rocket, BrainCircuit, ArrowRight } from 'lucide-react';

interface WelcomeModalProps {
  onStart: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ onStart }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-500">
      <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl border border-white/20 relative">
        <div className="bg-green-700 p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_white,transparent)]"></div>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight relative z-10 mb-3 leading-tight">Chào mừng đến với <br/> SMART STARTUP</h2>
          <div className="inline-block px-5 py-1.5 bg-green-800/50 rounded-full border border-green-600/50">
            <p className="text-green-50 text-xs font-bold uppercase tracking-[0.2em] relative z-10">Hệ sinh thái Tài chính Gen Z</p>
          </div>
        </div>

        <div className="p-8 md:p-10 space-y-8 bg-white">
          <div className="flex gap-5 items-start">
            <div className="p-4 bg-green-50 rounded-2xl shrink-0 text-green-600"><Rocket size={28} /></div>
            <div>
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-[0.15em] mb-2">Phương pháp Học tập</h3>
              <p className="text-slate-600 text-base leading-relaxed font-medium">Học qua trải nghiệm thực tế. Thao tác với các mô hình: <span className="font-bold text-green-700">Trả góp, Lãi kép, Khởi nghiệp</span> để tự rút ra bài học.</p>
            </div>
          </div>
          <div className="flex gap-5 items-start">
            <div className="p-4 bg-blue-50 rounded-2xl shrink-0 text-blue-600"><BrainCircuit size={28} /></div>
            <div>
              <h3 className="font-bold text-slate-800 text-xs uppercase tracking-[0.15em] mb-2">Trợ lý AI Mentor</h3>
              <p className="text-slate-600 text-base leading-relaxed font-medium"><span className="font-bold text-blue-700">Chị Mai Mentor</span> sẽ đồng hành, giải đáp và phản biện ý tưởng. AI đóng vai trò người dẫn dắt, không làm thay.</p>
            </div>
          </div>
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 flex gap-4 items-center">
            <ShieldCheck className="text-slate-400 shrink-0" size={24} />
            <p className="text-xs text-slate-500 font-bold italic leading-relaxed uppercase tracking-wider">Mọi dữ liệu tài chính em nhập chỉ được xử lý cục bộ. Chúng tôi tôn trọng quyền riêng tư tuyệt đối.</p>
          </div>
        </div>

        <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-center">
          <button onClick={onStart} className="group relative px-10 py-5 bg-green-600 hover:bg-green-700 text-white font-black rounded-2xl shadow-xl shadow-green-200 transition-all active:scale-95 w-full md:w-auto flex items-center justify-center gap-3 text-sm uppercase tracking-[0.2em]">Bắt đầu Hành trình <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} /></button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;
