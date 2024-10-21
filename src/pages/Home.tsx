import { IonCol, IonContent, IonGrid, IonHeader, IonImg, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import SectionHeader from '../components/SectionHeader';
import logo from '../assets/nvsl-logo.png'
import video from '../assets/CCS Nationals 50 Back Final.mp4';
import walden from '../assets/walden_glen.jpeg';
import rolling from '../assets/rolling_hills.jpeg';

const HomePage: React.FC = () => {
  return (
    <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="header-section">
            <img src={logo} alt="NVSL Logo" className="logo" />
            <h1 className="page-header">Welcome to<br></br>NVSL-STAT-THAT</h1>
          </div>
          <IonGrid>
            <IonRow className='row-even'>
              <IonCol>
                <h2 className='section-header'>What is NVSL-Stat-That?</h2>
                <p className='section-text'>
                  NVSL-Stat-That is a tool for Swimmers, 
                  Coaches, and League Officials to 
                  breakdown NVSL Swim Meet Data.
                  <br></br><br></br>
                  This tool provides an enhanced for users to view 
                  Meet Results, Top Times, Team Rankings, 
                  and more with added performance based statistics.
                  <br></br><br></br>
                  Watch the video below to learn more about NVSL-Stat-That</p>
              </IonCol>
              <IonCol className = "media">
                <video className='row-video' controls>
                  <source src={video} type="video/mp4" />
                </video>
              </IonCol>
            </IonRow>
            <IonRow className='row-odd'>
              <IonCol className = "media">
                <img src={rolling} alt="NVSL Logo" className="row-img"/>
              </IonCol>
              <IonCol>
                <h2 className='section-header'>More About the NVSL</h2>
                <p className='section-text'>
                  The Northern Virginia Swim League was 
                  founded in 1956 to sponsor competitive 
                  swimming and diving among the community 
                  swimming pools in that area of Northern Virginia.
                  <br></br><br></br>
                  Comprised of 102 teams spanning 17 divisions, 
                  the NVSL is regarded as one of the nation's 
                  largest recreational summer swim leagues.
                </p>
              </IonCol>
            </IonRow>
            <IonRow className='row-even'>
              <IonCol>
                <h2 className='section-header'>More About the Creator</h2>
                <p className='section-text'>
                  AJ Muir swam in the NVSL for 15 years 
                  with the Walden Glen Wahoos and Rolling Hills Seahawks. 
                  <br></br><br></br>
                  Swimming and coaching around the country, 
                  Muir has picked up a set of skills in writing 
                  competitive meets thorugh performance based statistics</p>
              </IonCol>
              <IonCol className = "media">
                <img src={walden} alt="NVSL Logo" className="row-img"/>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
    </IonPage>
  );
};

export default HomePage;
