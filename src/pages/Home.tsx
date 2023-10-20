import { AndroidFullScreen } from '@awesome-cordova-plugins/android-full-screen';
import { Device } from '@capacitor/device';
import { StatusBar } from '@capacitor/status-bar';
import { IonContent, IonPage } from '@ionic/react';

import MainApp from '../components/MainApp';

import { useRef } from 'react';
import './Home.css';

const Home: React.FC = () => {
  Device.getInfo().then((info) => {
    if (info.platform === 'android') {
      StatusBar.hide();
      AndroidFullScreen.immersiveMode();
    }
  });

  return (
    <IonPage>
      <IonContent fullscreen>
        <MainApp />
      </IonContent>
    </IonPage>
  );
};

export default Home;
