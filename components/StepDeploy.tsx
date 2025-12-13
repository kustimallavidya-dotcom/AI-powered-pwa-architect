import React, { useState } from 'react';
import { ExternalLink, Smartphone, Cloud, ArrowRight } from 'lucide-react';
import { AppConfig } from '../types';

interface StepDeployProps {
  config: AppConfig;
  onNext: () => void;
}

const StepDeploy: React.FC<StepDeployProps> = ({ config, onNext }) => {
  const [netlifyUrl, setNetlifyUrl] = useState('');

  const getPwaBuilderUrl = () => {
    if (!netlifyUrl) return 'https://www.pwabuilder.com/';
    // Clean URL
    let cleanUrl = netlifyUrl.trim();
    if (!cleanUrl.startsWith('http')) {
      cleanUrl = `https://${cleanUrl}`;
    }
    return `https://www.pwabuilder.com/?url=${encodeURIComponent(cleanUrl)}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">डिप्लॉय आणि APK (Deploy & Publish)</h2>
        <p className="text-gray-400">Netlify वर वेबसाइट लाइव्ह करा आणि नंतर APK बनवा.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Netlify Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden flex flex-col">
          <div className="bg-gradient-to-r from-teal-900 to-gray-800 p-6 border-b border-gray-700">
             <div className="flex items-center gap-3 mb-2">
                <Cloud className="text-teal-400" size={24} />
                <h3 className="text-xl font-bold text-white">1. Netlify वर डिप्लॉय करा</h3>
             </div>
             <p className="text-gray-300 text-sm">तुमची PWA वेबसाइट मोफत होस्ट करा.</p>
          </div>
          <div className="p-6 space-y-4 flex-1">
            <ol className="list-decimal list-inside space-y-3 text-gray-300 text-sm">
              <li>तुमच्या कॉम्प्युटरवरील फोल्डरमध्ये सर्व फाईल्स (html, manifest, sw.js, icon) असल्याची खात्री करा.</li>
              <li><a href="https://app.netlify.com/drop" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-1 font-semibold">Netlify Drop <ExternalLink size={12}/></a> वर जा.</li>
              <li>तुमचा फोल्डर तिथे ड्रॅग आणि ड्रॉप करा.</li>
              <li>अपलोड पूर्ण झाल्यावर तुम्हाला एक लिंक मिळेल (उदा. <code>https://my-site.netlify.app</code>).</li>
            </ol>
            
            <div className="mt-4 pt-4 border-t border-gray-700">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">
                तुमची Netlify लिंक येथे पेस्ट करा:
              </label>
              <input 
                type="text" 
                placeholder="https://..." 
                value={netlifyUrl}
                onChange={(e) => setNetlifyUrl(e.target.value)}
                className="w-full bg-gray-900 border border-gray-600 rounded p-2 text-white text-sm focus:border-teal-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Play Store Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden flex flex-col">
           <div className="bg-gradient-to-r from-blue-900 to-gray-800 p-6 border-b border-gray-700">
             <div className="flex items-center gap-3 mb-2">
                <Smartphone className="text-blue-400" size={24} />
                <h3 className="text-xl font-bold text-white">2. APK तयार करा (Play Store)</h3>
             </div>
             <p className="text-gray-300 text-sm">तुमच्या साइटवरून Android APK मिळवा.</p>
          </div>
          <div className="p-6 space-y-4 flex-1 flex flex-col">
             <div className="text-gray-300 text-sm space-y-2 mb-4">
                <p>डाव्या बाजूला तुमची लिंक पेस्ट केल्यानंतर, खालील बटण दाबा. हे तुम्हाला PWABuilder वर नेईल जिथे तुमचे APK तयार होईल.</p>
             </div>
             
             <a 
               href={getPwaBuilderUrl()} 
               target="_blank" 
               rel="noreferrer"
               className={`mt-auto w-full py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all ${
                 netlifyUrl 
                   ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/50' 
                   : 'bg-gray-700 text-gray-400 cursor-not-allowed'
               }`}
               onClick={(e) => !netlifyUrl && e.preventDefault()}
             >
               APK तयार करा <ArrowRight size={16} />
             </a>
             
             <div className="bg-gray-900 p-3 rounded border border-gray-700 text-xs text-gray-500 mt-3">
              तिथे गेल्यावर <strong>Package for Stores</strong> वर क्लिक करा आणि Android निवडा.
            </div>
          </div>
        </div>
      </div>

      <div className="bg-amber-900/20 border border-amber-700/50 p-6 rounded-xl">
        <h4 className="text-amber-400 font-semibold mb-2">काही त्रुटी (Error) येत आहेत?</h4>
        <p className="text-gray-300 text-sm mb-4">
          जर Play Store ने तुमचे AAB/APK रिजेक्ट केले किंवा AssetLinks ची एरर आली, तर पुढील टॅबमध्ये जा. आमचे AI तुम्हाला ती एरर सोडवून देईल.
        </p>
        <button
          onClick={onNext}
          className="bg-amber-700 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          त्रुटी निवारण (Troubleshoot) कडे जा
        </button>
      </div>
    </div>
  );
};

export default StepDeploy;
