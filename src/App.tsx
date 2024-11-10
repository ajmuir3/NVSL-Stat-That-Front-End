import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, setupIonicReact, IonHeader, IonToolbar, IonTitle } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';
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

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonHeader>
      <IonToolbar>
        <IonTitle className='header'>NVSL-Stat-That</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/" to="/home" />
          {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
          <Route path="/home" render={() => <HomePage />} exact={true} />
          <Route path="/results" render={() => <ResultsPage />} exact={true} />
          <Route path="/top-times" render={() => <TimesPage />} exact={true} />
          <Route path="/rankings" render={() => <RankingsPage />} exact={true} />
          <Route path="/teams" render={() => <TeamsPage />} exact={true} />
          <Route path="/teams/team-profile" render={() => <TeamProfile />} exact={true} /> {/* Route for TeamProfile */}
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="results" href="/results">
            <IonIcon icon={newspaper} />
            <IonLabel>Results</IonLabel>
          </IonTabButton>

          <IonTabButton tab="times" href="/top-times">
            <IonIcon icon={body} />
            <IonLabel>Top Times</IonLabel>
          </IonTabButton>

          <IonTabButton tab="rankings" href="/rankings">
            <IonIcon icon={cellular} />
            <IonLabel>Rankings</IonLabel>
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
