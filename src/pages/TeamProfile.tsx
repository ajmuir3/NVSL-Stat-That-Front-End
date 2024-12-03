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
  winPercentage: string;
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
  avgPowerRanking: number;
  history: HistoryEntry[];
}

const TeamProfile: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const history = useHistory();
  const [teamData, setTeamData] = useState<TeamData | null>(null);

  const calculateAverages = (teamSeasons: any[], yearsCount: number) => {
    const sumValues = (key: string) =>
      teamSeasons.reduce((sum: number, season: any) => sum + parseFloat(season[key] || 0), 0);

    return {
      avgDualMeet: parseFloat((sumValues("dmPoints") / yearsCount).toFixed(1)) || 0,
      avgRelayCarnival: parseFloat((sumValues("drPoints") / yearsCount).toFixed(1)) || 0,
      avgAllStarRelay: parseFloat((sumValues("arPoints") / yearsCount).toFixed(1)) || 0,
      avgDivisional: parseFloat((sumValues("dPoints") / yearsCount).toFixed(1)) || 0,
      avgAllStar: parseFloat((sumValues("aPoints") / yearsCount).toFixed(1)) || 0,
      avgTotalPoints: parseFloat((sumValues("tPoints") / yearsCount).toFixed(1)) || 0,
      avgGrandTotalPoints: parseFloat((sumValues("gtPoints") / yearsCount).toFixed(1)) || 0,
      avgPowerRanking: parseFloat((sumValues("powerRanking") / yearsCount).toFixed(2)) || 0,
    };
  };

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const [teams, seasons] = await Promise.all([
          fetch("/data/team.json").then((res) => res.json()),
          fetch("/data/season.json").then((res) => res.json()),
        ]);

        const teamName = teamId.replace(/-/g, " ");
        const team = teams.find((t: any) => t.teamName === teamName);
        if (!team) {
          console.error(`Team with name "${teamName}" not found.`);
          return;
        }

        const teamSeasons = seasons.filter((s: any) => s.teamID === team.teamID);
        if (teamSeasons.length === 0) {
          console.error(`No season data found for team "${teamName}".`);
          return;
        }

        const yearsCount = teamSeasons.length;
        const totalDivision = teamSeasons.reduce(
          (sum: number, season: any) => sum + parseInt(season.division || "0", 10),
          0
        );
        const totalWins = teamSeasons.reduce(
          (sum: number, season: any) => sum + parseInt(season.meetsWon || "0", 10),
          0
        );
        const totalLosses = teamSeasons.reduce(
          (sum: number, season: any) => sum + parseInt(season.meetsLost || "0", 10),
          0
        );
        const totalTies = teamSeasons.reduce(
          (sum: number, season: any) => sum + parseInt(season.meetsTied || "0", 10),
          0
        );

        const winPercentage =
          totalWins + totalLosses > 0
            ? ((totalWins / (totalWins + totalLosses)) * 100).toFixed(2)
            : "0.00";

        const averages = calculateAverages(teamSeasons, yearsCount);

        const history = teamSeasons.map((season: any) => ({
          year: season.year,
          division: season.division,
          win: parseInt(season.meetsWon || "0", 10),
          loss: parseInt(season.meetsLost || "0", 10),
          tie: parseInt(season.meetsTied || "0", 10),
          points: parseFloat((season.tPoints || "0").toString()),
          grandTotalPoints: parseFloat((season.gtPoints || "0").toString()),
          powerIndex: parseFloat((season.powerRanking || "0").toString()),
        }));

        const avgDivision = totalDivision / yearsCount;

        setTeamData({
          name: team.teamName,
          teamID: team.teamID,
          avgDivision: parseFloat(avgDivision.toFixed(1)),
          championships: 0, // No championships data available
          winPercentage,
          totalWins,
          totalLosses,
          totalTies,
          ...averages,
          history,
        });
      } catch (error) {
        console.error("Error fetching or processing data:", error);
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
          <IonButton className="back-button" onClick={() => history.push("/teams")}>
            &lt; Back to Teams
          </IonButton>
          <h1>
            {teamData.name} ({teamData.teamID})
          </h1>
        </div>

        <div className="team-stats grid-stats">
          <div>
            <strong>Avg. Division:</strong> {teamData.avgDivision}
          </div>
          <div>
            <strong>Win Percentage:</strong> {teamData.winPercentage}%
          </div>
          <br></br>
          <div>
            <strong>Total Wins:</strong> {teamData.totalWins}
          </div>
          <div>
            <strong>Total Losses:</strong> {teamData.totalLosses}
          </div>
          <div>
            <strong>Total Ties:</strong> {teamData.totalTies}
          </div>
          <div>
            <strong>Avg. Dual Meet:</strong> {teamData.avgDualMeet}
          </div>
          <div>
            <strong>Avg. Relay Carnival:</strong> {teamData.avgRelayCarnival}
          </div>
          <div>
            <strong>Avg. All Star Relay:</strong> {teamData.avgAllStarRelay}
          </div>
          <div>
            <strong>Avg. Divisional:</strong> {teamData.avgDivisional}
          </div>
          <div>
            <strong>Avg. All Star:</strong> {teamData.avgAllStar}
          </div>
          <div>
            <strong>Avg. Total Points:</strong> {teamData.avgTotalPoints}
          </div>
          <div>
            <strong>Avg. Grand Total Points:</strong> {teamData.avgGrandTotalPoints}
          </div>
          <div>
            <strong>Avg. Power Ranking:</strong> {teamData.avgPowerRanking}
          </div>
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
