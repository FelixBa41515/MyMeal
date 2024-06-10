import {CapacitorConfig} from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.bastijns.felix.mymeal',
  appName: 'MyMeal',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    FirebaseAuthentication: {
      skipNativeAuth: true,
      providers: ['phone', 'google.com', 'github.com'],
    },
  }
}

export default config
