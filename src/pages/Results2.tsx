import React, { useState } from 'react';
import './MeetResults.css'; // For styling

const MeetResults = () => {
  const [year, setYear] = useState('2024');
  const [teamName, setTeamName] = useState('');
  const [division, setDivision] = useState('7');
  const meetResults = [
    { date: '6/15/24', homeTeam: 'RH', homePoints: 243, awayTeam: 'DH', awayPoints: 177, division: 7 },
    { date: '6/15/24', homeTeam: 'SHBR', homePoints: 191, awayTeam: 'PL', awayPoints: 229, division: 7 },
    { date: '6/26/24', homeTeam: 'Divisional Relay', homePoints: 123, awayTeam: 'RH', awayPoints: 229. , division: 7 },
    // Add more data points from the image
  ];

  const filteredResults = meetResults.filter(result => {
    return (
      (year ? result.date.includes(year) : true) &&
      (teamName ? result.homeTeam === teamName || result.awayTeam === teamName : true) &&
      (division ? result.division.toString() === division : true)
    );
  });

  return (
    <div className="results-page">
      <h1>Meet Results for</h1>
      <div className="filter-controls">
        <label>
          Year:
          <input type="text" value={year} onChange={(e) => setYear(e.target.value)} />
        </label>
        <label>
          Team Name:
          <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
        </label>
        <label>
          Division:
          <input type="text" value={division} onChange={(e) => setDivision(e.target.value)} />
        </label>
        <button>Find Meets</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Home Team</th>
            <th>Home Points</th>
            <th>Away Team</th>
            <th>Away Points</th>
            <th>Division</th>
            <th>Results</th>
          </tr>
        </thead>
        <tbody>
          {filteredResults.map((result, index) => (
            <tr key={index}>
              <td>{result.date}</td>
              <td>{result.homeTeam}</td>
              <td>{result.homePoints}</td>
              <td>{result.awayTeam}</td>
              <td>{result.awayPoints}</td>
              <td>{result.division}</td>
              <td><a href="#">HERE</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MeetResults;
