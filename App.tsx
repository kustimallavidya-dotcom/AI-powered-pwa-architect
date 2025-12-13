import React, { useState } from 'react';
import Layout from './components/Layout';
import StepDetails from './components/StepDetails';
import StepAssets from './components/StepAssets';
import StepCode from './components/StepCode';
import StepDeploy from './components/StepDeploy';
import StepTroubleshoot from './components/StepTroubleshoot';
import { AppStep, AppConfig, GeneratedAssets } from './types';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.DETAILS);

  const [config, setConfig] = useState<AppConfig>({
    name: '',
    shortName: '',
    description: '',
    themeColor: '#3b82f6',
    backgroundColor: '#ffffff',
    display: 'standalone',
    orientation: 'portrait',
    startUrl: '/'
  });

  const [assets, setAssets] = useState<GeneratedAssets>({
    manifest: '',
    indexHtml: '',
    serviceWorker: '',
    iconUrl: null,
    privacyPolicy: '',
    netlifyToml: ''
  });

  const renderStep = () => {
    switch (currentStep) {
      case AppStep.DETAILS:
        return (
          <StepDetails 
            config={config} 
            setConfig={setConfig} 
            onNext={() => setCurrentStep(AppStep.ASSETS)} 
          />
        );
      case AppStep.ASSETS:
        return (
          <StepAssets 
            config={config} 
            assets={assets} 
            setAssets={setAssets} 
            onNext={() => setCurrentStep(AppStep.CODE)} 
          />
        );
      case AppStep.CODE:
        return (
          <StepCode 
            assets={assets} 
            onNext={() => setCurrentStep(AppStep.DEPLOY)} 
          />
        );
      case AppStep.DEPLOY:
        return (
          <StepDeploy 
            config={config} 
            onNext={() => setCurrentStep(AppStep.TROUBLESHOOT)} 
          />
        );
      case AppStep.TROUBLESHOOT:
        return <StepTroubleshoot />;
      default:
        return null;
    }
  };

  return (
    <Layout currentStep={currentStep} setStep={setCurrentStep}>
      {renderStep()}
    </Layout>
  );
};

export default App;
