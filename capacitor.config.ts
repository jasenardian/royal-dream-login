import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hdi.login',
  appName: 'Royal Dream',
  webDir: 'dist',
  plugins: {
    StatusBar: {
      overlaysWebView: true,
      style: 'DARK',
      backgroundColor: '#ffffffff',
    },
  },
};

export default config;