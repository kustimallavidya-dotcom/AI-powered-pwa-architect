import React from 'react';
import { AppConfig } from '../types';

interface StepDetailsProps {
  config: AppConfig;
  setConfig: React.Dispatch<React.SetStateAction<AppConfig>>;
  onNext: () => void;
}

const StepDetails: React.FC<StepDetailsProps> = ({ config, setConfig, onNext }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setConfig((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">प्रकल्प माहिती (Project Details)</h2>
        <p className="text-gray-400">तुमच्या PWA ची मुख्य माहिती येथे भरा.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">ॲपचे नाव (App Name)</label>
          <input
            type="text"
            name="name"
            value={config.name}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="उदा. माझे सुपर ॲप"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">लहान नाव (Short Name)</label>
          <input
            type="text"
            name="shortName"
            value={config.shortName}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="उदा. मायॲप"
          />
        </div>

        <div className="col-span-1 md:col-span-2 space-y-2">
          <label className="text-sm font-medium text-gray-300">वर्णन (Description)</label>
          <textarea
            name="description"
            value={config.description}
            onChange={handleChange}
            rows={3}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            placeholder="तुमचे ॲप काय करते याचे वर्णन करा..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">थीम कलर (Theme Color)</label>
          <div className="flex gap-2">
            <input
              type="color"
              name="themeColor"
              value={config.themeColor}
              onChange={handleChange}
              className="h-12 w-12 rounded cursor-pointer bg-transparent border-0"
            />
            <input
              type="text"
              name="themeColor"
              value={config.themeColor}
              onChange={handleChange}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">बॅकग्राउंड कलर (Background Color)</label>
          <div className="flex gap-2">
            <input
              type="color"
              name="backgroundColor"
              value={config.backgroundColor}
              onChange={handleChange}
              className="h-12 w-12 rounded cursor-pointer bg-transparent border-0"
            />
            <input
              type="text"
              name="backgroundColor"
              value={config.backgroundColor}
              onChange={handleChange}
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">डिस्प्ले मोड (Display Mode)</label>
          <select
            name="display"
            value={config.display}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="standalone">Standalone (App सारखे)</option>
            <option value="fullscreen">Fullscreen (पूर्ण स्क्रीन)</option>
            <option value="minimal-ui">Minimal UI</option>
            <option value="browser">Browser</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">ओरिएंटेशन (Orientation)</label>
          <select
            name="orientation"
            value={config.orientation}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          >
            <option value="any">Any (ऑटोमॅटिक)</option>
            <option value="portrait">Portrait (उभे)</option>
            <option value="landscape">Landscape (आडवे)</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-8 rounded-lg transition-all shadow-lg shadow-blue-900/30 flex items-center gap-2"
        >
          पुढील स्टेप &rarr;
        </button>
      </div>
    </div>
  );
};

export default StepDetails;
