import React, { useEffect, useState } from 'react';
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
  grandTotalPoints: number;
  powerIndex: number;
}

interface TeamData {
  name: string;
  teamID: string;
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

const TeamProfile: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const history = useHistory();
  const [teamData, setTeamData] = useState<TeamData | null>(null);

  // Utility to calculate reduced ratios
  const calculateReducedRatio = (wins: number, losses: number): string => {
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(wins, losses);
    return `${wins / divisor}:${losses / divisor}`;
  };

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const [teams, seasons] = await Promise.all([
          fetch('/data/team.json').then((res) => res.json()),
          fetch('/data/season.json').then((res) => res.json()),
        ]);

        const teamName = teamId.replace(/-/g, ' ');
        console.log(`Searching for team with name: ${teamName}`);

        const team = teams.find((t: any) => t.teamName === teamName);
        if (!team) {
          console.error(`Team with name "${teamName}" not found.`);
          return;
        }

        console.log('Team found:', team);

        const teamSeasons = seasons.filter((s: any) => s.teamID === team.teamID);
        console.log('Team Seasons:', teamSeasons);

        if (teamSeasons.length === 0) {
          console.error(`No season data found for team "${teamName}".`);
          return;
        }

        const yearsCount = teamSeasons.length;

        const totalWins = teamSeasons.reduce((sum: number, season: any) => sum + (season.meetsWon || 0), 0);
        const totalLosses = teamSeasons.reduce((sum: number, season: any) => sum + (season.meetsLost || 0), 0);
        const totalTies = teamSeasons.reduce((sum: number, season: any) => sum + (season.meetsTied || 0), 0);

        const winLossRatio = calculateReducedRatio(totalWins, totalLosses);

        const history = teamSeasons.map((season: any) => ({
          year: season.year,
          division: season.division,
          win: season.meetsWon || 0,
          loss: season.meetsLost || 0,
          tie: season.meetsTied || 0,
          points: season.tPoints || 0,
          grandTotalPoints: season.gtPoints || 0,
          powerIndex: season.powerRanking || 0,
        }));

        setTeamData({
          name: team.teamName,
          teamID: team.teamID,
          avgDivision: parseFloat((teamSeasons.reduce((sum: number, season: any) => sum + season.division, 0) / yearsCount).toFixed(1)),
          championships: 0, // Championships data is not available in Season
          winLossRatio,
          totalWins,
          totalLosses,
          totalTies,
          avgDualMeet: parseFloat((teamSeasons.reduce((sum: number, season: any) => sum + (season.dmPoints || 0), 0) / yearsCount).toFixed(1)),
          avgRelayCarnival: parseFloat((teamSeasons.reduce((sum: number, season: any) => sum + (season.drPoints || 0), 0) / yearsCount).toFixed(1)),
          avgAllStarRelay: parseFloat((teamSeasons.reduce((sum: number, season: any) => sum + (season.arPoints || 0), 0) / yearsCount).toFixed(1)),
          avgDivisional: parseFloat((teamSeasons.reduce((sum: number, season: any) => sum + (season.dPoints || 0), 0) / yearsCount).toFixed(1)),
          avgAllStar: parseFloat((teamSeasons.reduce((sum: number, season: any) => sum + (season.aPoints || 0), 0) / yearsCount).toFixed(1)),
          avgTotalPoints: parseFloat((teamSeasons.reduce((sum: number, season: any) => sum + (season.tPoints || 0), 0) / yearsCount).toFixed(1)),
          avgGrandTotalPoints: parseFloat((teamSeasons.reduce((sum: number, season: any) => sum + (season.gtPoints || 0), 0) / yearsCount).toFixed(1)),
          powerRanking: parseFloat((teamSeasons.reduce((sum: number, season: any) => sum + (season.powerRanking || 0), 0) / yearsCount).toFixed(2)),
          history,
        });
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
    };

    fetchTeamData();
  }, [teamId]);

  if (!teamData) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Loading...</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <p className="loading-message">Loading team data...</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{`${teamData.name} (${teamData.teamID})`}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="team-detail-header">
          <IonButton className="back-button" onClick={() => history.push('/teams')}>
            &lt; Back to Teams
          </IonButton>
          <h1>
            {teamData.name} ({teamData.teamID})
          </h1>
        </div>

        <div className="team-stats grid-stats">
          <div><strong>Avg. Division:</strong> {teamData.avgDivision}</div>
          <div><strong>Win:Loss Ratio:</strong> {teamData.winLossRatio}</div>
          <br></br>
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
          <div><strong>Avg. Power Ranking:</strong> {teamData.powerRanking}</div>
        </div>

        <table className="history-table">
          <thead>
            <tr>
              <th>Year</th>
              <th>Division</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>Ties</th>
              <th>Total Points</th>
              <th>Grand Total Points</th>
              <th>Power Ranking</th>
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
                <td>{entry.grandTotalPoints}</td>
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
