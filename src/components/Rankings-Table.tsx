import React from 'react';
import './Table.css'; // Ensure this file has the correct styles

interface TeamData {
  rank: number;
  teamName: string;
  division: number;
  seasonYear: string; // Use string to match consistency
  winCount: number;
  lossCount: number;
  tieCount: number;
  dmPoints: number;
  drPoints: number;
  dPoints: number;
  arPoints: number;
  aPoints: number;
  tPoints: number;
  gtPoints: number;
  powerRanking: number;
}

interface RankingsTableProps {
  data: TeamData[];
}

const RankingsTable: React.FC<RankingsTableProps> = ({ data }) => {
  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Team Name</th>
          <th>Division</th>
          <th>Year</th>
          <th>Wins</th>
          <th>Losses</th>
          <th>Ties</th>
          <th>DM Points</th>
          <th>DR Points</th>
          <th>D Points</th>
          <th>AR Points</th>
          <th>A Points</th>
          <th>T Points</th>
          <th>GT Points</th>
          <th>Power Ranking</th>
        </tr>
      </thead>
      <tbody>
        {data.map((team, index) => (
          <tr key={index}>
            <td>{team.rank}</td>
            <td>{team.teamName}</td>
            <td>{team.division}</td>
            <td>{team.seasonYear}</td>
            <td>{team.winCount}</td>
            <td>{team.lossCount}</td>
            <td>{team.tieCount}</td>
            <td>{team.dmPoints.toFixed(1)}</td>
            <td>{team.drPoints.toFixed(1)}</td>
            <td>{team.dPoints.toFixed(1)}</td>
            <td>{team.arPoints.toFixed(1)}</td>
            <td>{team.aPoints.toFixed(1)}</td>
            <td>{team.tPoints.toFixed(1)}</td>
            <td>{team.gtPoints.toFixed(1)}</td>
            <td>{team.powerRanking.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RankingsTable;
