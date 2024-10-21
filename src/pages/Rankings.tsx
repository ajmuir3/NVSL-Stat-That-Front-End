import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Rankings.css';
import Dropdown from '../components/Dropdown';
import Buttons from '../components/Button';
import StripedRowExample from '../components/Table';
import logo from '../assets/nvsl-logo.png'
 
const RankingsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">Rankings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="header-section">
          <h1 className="page-header">Rankings</h1>
        </div>
        <div className = "content-container">
          <h2>Team Rankings for</h2>
        
          <Dropdown />
        
          <Buttons />
        
          <StripedRowExample />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RankingsPage;

