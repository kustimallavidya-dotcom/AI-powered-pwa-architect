import React, { useState } from 'react';
import { GeneratedAssets } from '../types';
import { Copy, Check } from 'lucide-react';

interface StepCodeProps {
  assets: GeneratedAssets;
  onNext: () => void;
}

const StepCode: React.FC<StepCodeProps> = ({ assets, onNext }) => {
  const [activeTab, setActiveTab] = useState<keyof GeneratedAssets>('indexHtml');
  const [copied, setCopied] = useState(false);

  const files: { key: keyof GeneratedAssets; label: string; lang: string }[] = [
    { key: 'indexHtml', label: 'index.html', lang: 'html' },
    { key: 'manifest', label: 'manifest.json', lang: 'json' },
    { key: 'serviceWorker', label: 'sw.js', lang: 'javascript' },
    { key: 'netlifyToml', label: 'netlify.toml', lang: 'toml' },
    { key: 'privacyPolicy', label: 'privacy.md', lang: 'markdown' },
  ];

  const handleCopy = () => {
    const content = assets[activeTab];
    if (content) {
      navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
           <h2 className="text-3xl font-bold text-white mb-2">कोड रिव्ह्यू (Review Code)</h2>
           <p className="text-gray-400">हा कोड कॉपी करून तुमच्या प्रोजेक्ट फोल्डरमध्ये सेव्ह करा.</p>
        </div>
        <button
          onClick={onNext}
           className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-6 rounded-lg transition-all shadow-lg shadow-blue-900/30"
        >
          डिप्लॉयमेंट कडे जा &rarr;
        </button>
      </div>

      <div className="flex-1 flex flex-col bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
        <div className="flex border-b border-gray-700 bg-gray-900/50">
          {files.map((file) => (
            <button
              key={file.key}
              onClick={() => setActiveTab(file.key)}
              className={`px-4 py-3 text-sm font-medium transition-colors border-r border-gray-700 ${
                activeTab === file.key
                  ? 'bg-gray-800 text-blue-400 border-t-2 border-t-blue-500'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800'
              }`}
            >
              {file.label}
            </button>
          ))}
          <div className="flex-1"></div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
          >
            {copied ? <Check size={16} className="text-green-500"/> : <Copy size={16} />}
            <span className="text-xs uppercase font-bold tracking-wider">{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <div className="flex-1 relative bg-[#1e1e1e] overflow-auto">
          <pre className="p-6 text-sm font-mono text-gray-300 leading-relaxed">
            <code>{assets[activeTab] || "// कोड अद्याप तयार झालेला नाही"}</code>
          </pre>
        </div>
      </div>
      
      <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 text-sm text-blue-200">
        <strong>टिप:</strong> तुमच्या कॉम्प्युटरवर एक नवीन फोल्डर बनवा. वर दिलेली सर्व फाईल्स त्यांच्या नावाप्रमाणे (उदा. <code>index.html</code>) तयार करा आणि त्यात कोड पेस्ट करा. आयकॉन इमेज <code>icon.png</code> नावाने त्याच फोल्डरमध्ये सेव्ह करा.
      </div>
    </div>
  );
};

export default StepCode;
