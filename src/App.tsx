import {
  IonApp,
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  setupIonicReact,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import './App.css';

//* Pages
import HomePage from './pages/Home';
import ResultsPage from './pages/Results';
import TimesPage from './pages/Times';
import RankingsPage from './pages/Rankings';
import TeamsPage from './pages/Teams';
import TeamProfile from './pages/TeamProfile';

//* Icons
import { home, newspaper, body, cellular, trophy } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import MeetResultsPage from './pages/MeetResults';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonHeader>
      <IonToolbar>
        <IonTitle className="header">NVSL-Stat-That</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          {/* Define Routes */}
          <Route path="/home" component={HomePage} exact={true} />
          <Route path="/results" component={ResultsPage} exact={true} />
          <Route path="/results/:meetId" component={MeetResultsPage} exact />
          <Route path="/top-times" component={TimesPage} exact={true} />
          <Route path="/rankings" component={RankingsPage} exact={true} />
          <Route path="/teams" component={TeamsPage} exact={true} />
          <Route path="/teams/:teamId" component={TeamProfile} exact />
          <Redirect exact from="/" to="/home" />
        </IonRouterOutlet>

        {/* Tab Bar */}
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="results" href="/results">
            <IonIcon icon={newspaper} />
            <IonLabel>Results</IonLabel>
          </IonTabButton>

          <IonTabButton tab="rankings" href="/rankings">
            <IonIcon icon={cellular} />
            <IonLabel>Rankings</IonLabel>
          </IonTabButton>

          <IonTabButton tab="times" href="/top-times">
            <IonIcon icon={body} />
            <IonLabel>Times</IonLabel>
          </IonTabButton>

          <IonTabButton tab="teams" href="/teams">
            <IonIcon icon={trophy} />
            <IonLabel>Teams</IonLabel>
          </IonTabButton>

        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
