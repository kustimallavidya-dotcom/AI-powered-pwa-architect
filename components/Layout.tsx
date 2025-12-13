import React from 'react';
import { Layout as LayoutIcon, Code, UploadCloud, AlertCircle, Settings } from 'lucide-react';
import { AppStep } from '../types';

interface LayoutProps {
  currentStep: AppStep;
  setStep: (step: AppStep) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentStep, setStep, children }) => {
  const navItems = [
    { id: AppStep.DETAILS, label: 'माहिती', fullLabel: 'ॲप माहिती', icon: Settings },
    { id: AppStep.ASSETS, label: 'डिझाइन', fullLabel: 'डिझाइन', icon: LayoutIcon },
    { id: AppStep.CODE, label: 'कोड', fullLabel: 'सोर्स कोड', icon: Code },
    { id: AppStep.DEPLOY, label: 'डिप्लॉय', fullLabel: 'डिप्लॉय आणि APK', icon: UploadCloud },
    { id: AppStep.TROUBLESHOOT, label: 'मदत', fullLabel: 'मदत आणि त्रुटी', icon: AlertCircle },
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden flex-col md:flex-row">
      {/* Desktop Sidebar - Hidden on Mobile */}
      <aside className="hidden md:flex w-64 bg-gray-800 border-r border-gray-700 flex-col">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            PWA Architect
          </h1>
          <p className="text-xs text-gray-400 mt-1">Netlify & Play Store Ready</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setStep(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                currentStep === item.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <item.icon size={18} />
              <span className="font-medium">{item.fullLabel}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <div className="bg-gray-900 rounded p-3 text-xs text-gray-500">
            Powered by Gemini 2.5 Flash
          </div>
        </div>
      </aside>

      {/* Mobile Top Bar */}
       <div className="md:hidden bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between z-10 shrink-0">
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              PWA Architect
            </h1>
          </div>
          <div className="text-xs text-gray-500 flex items-center gap-1">
             <span className="w-2 h-2 rounded-full bg-green-500"></span> Online
          </div>
       </div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gray-900 relative">
        <div className="max-w-5xl mx-auto p-4 md:p-8 pb-24 md:pb-20"> 
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation - Visible only on Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 flex justify-around p-2 z-50 safe-area-bottom shadow-2xl">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setStep(item.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all w-full active:scale-95 ${
              currentStep === item.id
                ? 'text-blue-400 bg-gray-700/50'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <item.icon size={22} className={currentStep === item.id ? 'stroke-[2.5px]' : 'stroke-2'} />
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
