import { IonButton } from '@ionic/react';
import './Button.css';

function Buttons() {
  return (
    <>
      <div className='buttons'>
        <IonButton>Submit</IonButton>
        <IonButton>Clear</IonButton>
      </div>
    </>
  );
}
export default Buttons;