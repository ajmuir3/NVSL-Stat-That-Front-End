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
  powerIndex: number;
}

interface TeamData {
  name: string;
  abbreviation: string;
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

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const [teams, seasons, dualMeets, champsMeets] = await Promise.all([
          fetch('/data/team.json').then((res) => res.json()),
          fetch('/data/season.json').then((res) => res.json()),
          fetch('/data/dual_meet.json').then((res) => res.json()),
          fetch('/data/champs_meet.json').then((res) => res.json()),
        ]);

        // Convert teamId from hyphenated format to original format
        const teamName = teamId.replace(/-/g, ' ');

        const team = teams.find((t: any) => t.name === teamName);
        if (!team) {
          console.error(`Team with name "${teamName}" not found.`);
          return;
        }

        const teamSeasons = seasons.filter((s: any) => s.teamID === team.teamID);
        const yearsCount = teamSeasons.length;

        const totalDualMeetPoints = teamSeasons.reduce((sum: number, season: any) => sum + (season.dmPoints || 0), 0);
        const totalRelayPoints = teamSeasons.reduce((sum: number, season: any) => sum + (season.drPoints || 0), 0);
        const totalDivisionalPoints = teamSeasons.reduce((sum: number, season: any) => sum + (season.dPoints || 0), 0);
        const totalAllStarRelayPoints = teamSeasons.reduce((sum: number, season: any) => sum + (season.arPoints || 0), 0);
        const totalAllStarPoints = teamSeasons.reduce((sum: number, season: any) => sum + (season.aPoints || 0), 0);

        const championships = champsMeets.filter(
          (meet: any) => meet.teamID === team.teamID && meet.meet_type === 'Divisionals'
        ).length;

        const meetsWon = dualMeets.filter((meet: any) => meet.team_home === team.teamID && meet.home_points > meet.away_points).length +
          dualMeets.filter((meet: any) => meet.team_away === team.teamID && meet.away_points > meet.home_points).length;

        const meetsLost = dualMeets.filter((meet: any) => meet.team_home === team.teamID && meet.home_points < meet.away_points).length +
          dualMeets.filter((meet: any) => meet.team_away === team.teamID && meet.away_points < meet.home_points).length;

        const winLossRatio = meetsLost > 0 ? (meetsWon / meetsLost).toFixed(2) : 'Infinity';

        const history = teamSeasons.map((season: any) => ({
          year: season.year,
          division: season.division,
          win: season.meetsWon || 0,
          loss: season.meetsLost || 0,
          tie: season.meetsTied || 0,
          points: season.gpPoints || 0,
          powerIndex: season.PowerRanking || 0,
        }));

        setTeamData({
          name: team.name,
          abbreviation: team.abbreviation || 'N/A',
          avgDivision: parseFloat((teamSeasons.reduce((sum: number, season: any) => sum + season.division, 0) / yearsCount).toFixed(1)),
          championships,
          winLossRatio,
          totalWins: meetsWon,
          totalLosses: meetsLost,
          totalTies: teamSeasons.reduce((sum: number, season: any) => sum + (season.meetsTied || 0), 0),
          avgDualMeet: parseFloat((totalDualMeetPoints / (yearsCount * 5)).toFixed(1)),
          avgRelayCarnival: parseFloat((totalRelayPoints / (yearsCount * 5)).toFixed(1)),
          avgAllStarRelay: parseFloat((totalAllStarRelayPoints / (yearsCount * 5)).toFixed(1)),
          avgDivisional: parseFloat((totalDivisionalPoints / (yearsCount * 5)).toFixed(1)),
          avgAllStar: parseFloat((totalAllStarPoints / (yearsCount * 5)).toFixed(1)),
          avgTotalPoints: parseFloat((teamSeasons.reduce((sum: number, season: any) => sum + (season.tPoints || 0), 0) / yearsCount).toFixed(1)),
          avgGrandTotalPoints: parseFloat((teamSeasons.reduce((sum: number, season: any) => sum + (season.gpPoints || 0), 0) / yearsCount).toFixed(1)),
          powerRanking: parseFloat((teamSeasons.reduce((sum: number, season: any) => sum + (season.PowerRanking || 0), 0) / yearsCount).toFixed(2)),
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
