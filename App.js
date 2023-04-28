import {useCallback} from 'react';
import { AuthProvider } from './app/auth.js';
import Router from './app/router.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as Font from 'expo-font';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

const App = () => {
  // Config fonts
  const [fontsLoaded] = useFonts({
    'oswald-semi-bold': require('./app/assets/fonts/Oswald-SemiBold.ttf'),
    'oswald-medium': require('./app/assets/fonts/Oswald-Medium.ttf'),
    'oswald-regular': require('./app/assets/fonts/Oswald-Regular.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider onLayout={onLayoutRootView}>
      <Router />
    </AuthProvider>
  );
};

export default App;
