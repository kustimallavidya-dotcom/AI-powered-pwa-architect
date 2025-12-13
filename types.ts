export interface AppConfig {
  name: string;
  shortName: string;
  description: string;
  themeColor: string;
  backgroundColor: string;
  display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';
  orientation: 'any' | 'portrait' | 'landscape';
  startUrl: string;
}

export interface GeneratedAssets {
  manifest: string;
  indexHtml: string;
  serviceWorker: string;
  iconUrl: string | null;
  privacyPolicy: string;
  netlifyToml: string;
}

export enum AppStep {
  DETAILS = 'DETAILS',
  ASSETS = 'ASSETS',
  CODE = 'CODE',
  DEPLOY = 'DEPLOY',
  TROUBLESHOOT = 'TROUBLESHOOT'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
