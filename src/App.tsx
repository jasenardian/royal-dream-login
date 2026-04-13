
import { useEffect } from 'react';
import { Capacitor } from '@capacitor/core';
import { StatusBar } from '@capacitor/status-bar';
import Home from './components/Home'

function App() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const setFullScreen = async () => {
      try {
        await StatusBar.hide();
      } catch (err) {
      }
    };
    
    setFullScreen();
  }, []);

  return <Home />
}

export default App
