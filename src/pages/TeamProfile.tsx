import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import './TeamProfile.css';

interface HistoryEntry {
  year: number;
  division: number;
  win: number;
  loss: number;
  tie: number;
  points: number;
  powerIndex: number;
}

interface TeamData {
  name: string;
  abbreviation: string;
  years: string;
  avgDivision: number;
  championships: number;
  winLossRatio: string;
  totalWins: number;
  totalLosses: number;
  totalTies: number;
  avgDualMeet: number;
  avgRelayCarnival: number;
  avgAllStarRelay: number;
  avgDivisional: number;
  avgAllStar: number;
  avgTotalPoints: number;
  avgGrandTotalPoints: number;
  powerRanking: number;
  history: HistoryEntry[];
}

const mockTeamData: Record<string, TeamData> = {
  'rolling-hills': {
    name: 'Rolling Hills',
    abbreviation: 'RH',
    years: '2021 - 2024',
    avgDivision: 9.6,
    championships: 1,
    winLossRatio: '2:1',
    totalWins: 16,
    totalLosses: 8,
    totalTies: 1,
    avgDualMeet: 226.76,
    avgRelayCarnival: 180.20,
    avgAllStarRelay: 71.60,
    avgDivisional: 1455.20,
    avgAllStar: 234.80,
    avgTotalPoints: 1385.60,
    avgGrandTotalPoints: 3075.60,
    powerRanking: 25.69,
    history: [
      { year: 2024, division: 7, win: 4, loss: 1, tie: 0, points: 1419.0, powerIndex: 17.65 },
      { year: 2023, division: 8, win: 2, loss: 2, tie: 1, points: 1420.0, powerIndex: 21.02 },
      { year: 2022, division: 9, win: 4, loss: 1, tie: 0, points: 1542.0, powerIndex: 20.70 },
      { year: 2021, division: 12, win: 5, loss: 0, tie: 0, points: 1464.0, powerIndex: 27.66 },
    ],
  },
};

const TeamProfile: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const history = useHistory();

  const teamData = mockTeamData[teamId.toLowerCase()];

  if (!teamData) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Team Not Found</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <p className="error-message">Sorry, the team you are looking for does not exist.</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{teamData.name}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="team-detail-header">
          <IonButton className="back-button" onClick={() => history.push('/teams')}>
            &lt; Back to Teams
          </IonButton>
          <h1>
            {teamData.name} ({teamData.abbreviation})
          </h1>
          <h2>{teamData.years}</h2>
        </div>

        <div className="team-stats grid-stats">
          <div><strong>Avg. Division:</strong> {teamData.avgDivision}</div>
          <div><strong>Total Championships:</strong> {teamData.championships}</div>
          <div><strong>Win:Loss Ratio:</strong> {teamData.winLossRatio}</div>
          <div><strong>Total Wins:</strong> {teamData.totalWins}</div>
          <div><strong>Total Losses:</strong> {teamData.totalLosses}</div>
          <div><strong>Total Ties:</strong> {teamData.totalTies}</div>
          <div><strong>Avg. Dual Meet:</strong> {teamData.avgDualMeet}</div>
          <div><strong>Avg. Relay Carnival:</strong> {teamData.avgRelayCarnival}</div>
          <div><strong>Avg. All Star Relay:</strong> {teamData.avgAllStarRelay}</div>
          <div><strong>Avg. Divisional:</strong> {teamData.avgDivisional}</div>
          <div><strong>Avg. All Star:</strong> {teamData.avgAllStar}</div>
          <div><strong>Avg. Total Points:</strong> {teamData.avgTotalPoints}</div>
          <div><strong>Avg. Grand Total Points:</strong> {teamData.avgGrandTotalPoints}</div>
          <div><strong>Power Ranking:</strong> {teamData.powerRanking}</div>
        </div>

        <table className="history-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Division</th>
              <th>Win</th>
              <th>Loss</th>
              <th>Tie</th>
              <th>Points</th>
              <th>PowerIndex</th>
            </tr>
          </thead>
          <tbody>
            {teamData.history.map((entry, index) => (
              <tr key={index}>
                <td>{entry.year}</td>
                <td>{entry.division}</td>
                <td>{entry.win}</td>
                <td>{entry.loss}</td>
                <td>{entry.tie}</td>
                <td>{entry.points}</td>
                <td>{entry.powerIndex}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </IonContent>
    </IonPage>
  );
};

export default TeamProfile;
