import React, { useState } from 'react';
import { AppConfig, GeneratedAssets } from '../types';
import { generateAppIcon, generatePwaCode } from '../services/geminiService';
import { Wand2, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

interface StepAssetsProps {
  config: AppConfig;
  assets: GeneratedAssets;
  setAssets: React.Dispatch<React.SetStateAction<GeneratedAssets>>;
  onNext: () => void;
}

const StepAssets: React.FC<StepAssetsProps> = ({ config, assets, setAssets, onNext }) => {
  const [isGeneratingIcon, setIsGeneratingIcon] = useState(false);
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateIcon = async () => {
    setIsGeneratingIcon(true);
    setError(null);
    try {
      const iconDataUrl = await generateAppIcon(config.description, config.themeColor);
      if (iconDataUrl) {
        setAssets((prev) => ({ ...prev, iconUrl: iconDataUrl }));
      } else {
        setError("आयकॉन तयार करण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा.");
      }
    } catch (e) {
      setError("आयकॉन जनरेट करताना त्रुटी. API Key तपासा.");
    } finally {
      setIsGeneratingIcon(false);
    }
  };

  const handleGenerateCode = async () => {
    setIsGeneratingCode(true);
    setError(null);
    try {
      const code = await generatePwaCode(config);
      setAssets((prev) => ({
        ...prev,
        manifest: code.manifest,
        indexHtml: code.indexHtml,
        serviceWorker: code.serviceWorker,
        netlifyToml: code.netlifyToml,
        privacyPolicy: code.privacyPolicy
      }));
    } catch (e) {
      setError("कोड जनरेट करताना त्रुटी. कृपया पुन्हा प्रयत्न करा.");
    } finally {
      setIsGeneratingCode(false);
    }
  };

  const isReady = assets.iconUrl && assets.manifest;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">अॅसेट्स आणि जनरेशन</h2>
        <p className="text-gray-400">AI चा वापर करून आयकॉन आणि कोड तयार करा.</p>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500/50 text-red-200 p-4 rounded-lg flex items-center gap-3">
          <AlertTriangle size={20} />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Icon Section */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-white">ॲप आयकॉन (App Icon)</h3>
            {assets.iconUrl && <CheckCircle className="text-green-500" size={20} />}
          </div>
          <p className="text-sm text-gray-400">
            तुमच्या ॲप वर्णनावर आधारित युनिक आयकॉन तयार करा.
          </p>
          
          <div className="flex flex-col items-center justify-center min-h-[200px] border-2 border-dashed border-gray-700 rounded-lg bg-gray-900/50">
            {isGeneratingIcon ? (
              <div className="flex flex-col items-center text-blue-400 animate-pulse">
                <Loader2 size={32} className="animate-spin mb-2" />
                <span className="text-sm">आयकॉन बनवत आहे...</span>
              </div>
            ) : assets.iconUrl ? (
              <img src={assets.iconUrl} alt="App Icon" className="w-32 h-32 rounded-2xl shadow-xl object-cover" />
            ) : (
              <div className="text-gray-600 text-sm">अद्याप आयकॉन नाही</div>
            )}
          </div>

          <button
            onClick={handleGenerateIcon}
            disabled={isGeneratingIcon}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {isGeneratingIcon ? 'बनवत आहे...' : (
              <>
                <Wand2 size={16} /> आयकॉन तयार करा
              </>
            )}
          </button>
        </div>

        {/* Code Section */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 space-y-4">
           <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-white">PWA सोर्स कोड</h3>
            {assets.manifest && <CheckCircle className="text-green-500" size={20} />}
          </div>
          <p className="text-sm text-gray-400">
            manifest.json, service worker आणि index.html जनरेट करा.
          </p>

           <div className="flex flex-col gap-2 min-h-[200px] justify-center">
              <div className="flex items-center gap-3 p-3 bg-gray-900 rounded border border-gray-700">
                <div className={`w-3 h-3 rounded-full ${assets.manifest ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                <span className="text-gray-300 font-mono text-sm">manifest.json</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-900 rounded border border-gray-700">
                <div className={`w-3 h-3 rounded-full ${assets.indexHtml ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                <span className="text-gray-300 font-mono text-sm">index.html</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-900 rounded border border-gray-700">
                <div className={`w-3 h-3 rounded-full ${assets.serviceWorker ? 'bg-green-500' : 'bg-gray-600'}`}></div>
                <span className="text-gray-300 font-mono text-sm">sw.js</span>
              </div>
           </div>

           <button
            onClick={handleGenerateCode}
            disabled={isGeneratingCode}
            className="w-full bg-teal-600 hover:bg-teal-500 disabled:bg-teal-800 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
             {isGeneratingCode ? 'जनरेट करत आहे...' : (
              <>
                <Wand2 size={16} /> कोड तयार करा
              </>
            )}
          </button>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          disabled={!isReady}
          className={`font-semibold py-3 px-8 rounded-lg transition-all flex items-center gap-2 ${
            isReady 
              ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/30 cursor-pointer' 
              : 'bg-gray-700 text-gray-400 cursor-not-allowed'
          }`}
        >
          कोड तपासा (Next) &rarr;
        </button>
      </div>
    </div>
  );
};

export default StepAssets;
