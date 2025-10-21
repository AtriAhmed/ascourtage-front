import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'tn.ascourtage.sante',
  appName: 'AS Courtage',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
