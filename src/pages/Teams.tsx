import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Home.css';
import TeamDropdown from '../components/TeamDropdown';
import TeamProfile from './TeamProfile';
import TeamTable from '../components/TeamTable';
import { useState } from 'react';
import { Route,useRouteMatch } from 'react-router';

const teams = [
  { team_name: "Rolling Hills", url: "/teams/rolling-hills" },
  { team_name: "Sleepy Hollow B & R", url: "/teams/sleepy-hollow" },
  { team_name: "Annandale", url: "/teams/annandale" },
  { team_name: "Great Falls", url: "/teams/great-falls" },
  { team_name: "Dominion Hills", url: "/teams/dominion-hills" },
];

const TeamsPage: React.FC = () => {
  const { path } = useRouteMatch();

  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const handleTeamChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedTeam(value === "All Teams" ? null : value);
  };

  return (
    <div>
      <h1>Teams</h1>
      <select onChange={handleTeamChange}>
        <option value="All Teams">All Teams</option>
        {teams.map((team) => (
          <option key={team.team_name} value={team.team_name}>
            {team.team_name}
          </option>
        ))}
      </select>
      <TeamTable data={teams} name={selectedTeam} />
      <div>
        <Route>
        <Route path={`${path}/profile`} component={TeamProfile} />
        </Route>
      </div>
    </div>
  );
};

export default TeamsPage;
