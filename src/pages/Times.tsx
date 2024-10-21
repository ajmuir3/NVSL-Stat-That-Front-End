import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import Nav from '../components/Nav';

const TimesPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
          <IonToolbar>
            <IonTitle size="large">Top Times</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <ExploreContainer />
        </IonContent>
    </IonPage>
  );
};

export default TimesPage;
