import React from 'react';
import { useParams } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';

const TeamProfile: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{teamId.replace(/-/g, ' ')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="team-profile">
          <h1>{teamId.replace(/-/g, ' ')}</h1>
          <p>Details about {teamId.replace(/-/g, ' ')} will go here.</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default TeamProfile;
