
import React, { useState } from 'react';
import { LayoutDashboard, TrendingUp, Rocket, BrainCircuit, BookOpen } from 'lucide-react';

import InstallmentTab from './components/InstallmentTab';
import CompoundTab from './components/CompoundTab';
import StartupTab from './components/StartupTab';
import AIAdvisorTab from './components/AIAdvisorTab';
import JourneyTab from './components/JourneyTab';
import FormulaModal from './components/FormulaModal';
import WelcomeModal from './components/WelcomeModal';

function App() {
  const [activeTab, setActiveTab] = useState('installment');
  const [isFormulaOpen, setIsFormulaOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 selection:bg-emerald-100">
      
      {/* HEADER */}
      <header className="bg-emerald-700 text-white shadow-2xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="bg-white/15 p-2.5 rounded-2xl backdrop-blur-md border border-white/20 shadow-inner">
                <TrendingUp size={28} className="text-emerald-100" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight leading-none mb-1">SMART STARTUP</h1>
                <p className="text-[11px] font-bold text-emerald-200 tracking-[0.2em] uppercase">Giáo dục Tài chính 4.0</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsFormulaOpen(true)}
              className="flex items-center gap-2.5 bg-white/10 hover:bg-white/20 px-5 py-2.5 rounded-2xl transition-all duration-300 text-sm font-bold border border-white/10 group shadow-lg"
            >
              <BookOpen size={18} className="group-hover:scale-110 transition-transform" />
              <span className="hidden md:inline uppercase tracking-widest">Từ điển công thức</span>
            </button>
          </div>

          {/* TAB NAVIGATION */}
          <nav className="flex gap-2 overflow-x-auto pb-0 scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0">
            {[
              { id: 'installment', icon: LayoutDashboard, label: 'TRẢ GÓP' },
              { id: 'compound', icon: TrendingUp, label: 'LÃI KÉP' },
              { id: 'startup', icon: Rocket, label: 'KHỞI NGHIỆP' },
              { id: 'mentor', icon: BrainCircuit, label: 'MENTOR AI', highlight: true },
              { id: 'journey', icon: BookOpen, label: 'HÀNH TRÌNH' }
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)} 
                className={`flex items-center gap-2.5 px-6 py-4 border-b-[5px] transition-all duration-300 whitespace-nowrap text-sm font-black tracking-widest ${
                  activeTab === tab.id 
                    ? (tab.highlight ? 'border-yellow-400 text-yellow-300' : 'border-white text-white') 
                    : 'border-transparent text-emerald-200 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon size={20} /> {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* CONTENT AREA */}
      <main className="max-w-7xl mx-auto p-4 md:p-10 pb-32">
        <div className="bg-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-200 min-h-[700px] overflow-hidden relative animate-slide-up">
          {activeTab === 'installment' && <InstallmentTab />}
          {activeTab === 'compound' && <CompoundTab />}
          {activeTab === 'startup' && <StartupTab />}
          {activeTab === 'mentor' && <AIAdvisorTab />}
          {activeTab === 'journey' && <JourneyTab />}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="fixed bottom-0 w-full bg-white/90 backdrop-blur-xl border-t border-slate-200 py-5 text-center text-xs text-slate-500 font-bold uppercase tracking-[0.3em] z-30">
        © 2025 Smart Startup • Tư duy kiến tạo tương lai
      </footer>

      {/* MODALS */}
      <FormulaModal isOpen={isFormulaOpen} onClose={() => setIsFormulaOpen(false)} />
      {showWelcome && <WelcomeModal onStart={() => setShowWelcome(false)} />}
    </div>
  );
}

export default App;
 // Cap nhat lan cuoi cùng