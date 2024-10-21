import './SectionHeader.css';
import { IonContent, IonImg, IonTitle } from '@ionic/react';

const SectionHeader: React.FC< {title: string; url: string} > = ({ title, url }) => {
  return (
    <IonContent>
      <div id="container">
          <IonImg id = "section-img" src={url} alt="NVSL Logo" />
          <IonTitle id = "section-title">{title}</IonTitle>
      </div>
    </IonContent>
  );
};

export default SectionHeader;
