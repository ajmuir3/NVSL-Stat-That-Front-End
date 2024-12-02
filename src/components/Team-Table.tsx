// TeamTable.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import './Table.css';

// Define an interface for the row data structure
interface RowData {
  team_name: string;
  url: string;
}

// Specify the type for data (array of RowData)
interface ResultsTableProps {
  data: RowData[];
  name: string | null;
}

const TeamTable: React.FC<ResultsTableProps> = ({ data, name }) => {
  // Filter the data if a specific team name is provided
  const filteredData = name ? data.filter((item) => item.team_name === name) : data;

  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>Team Profiles</th>
        </tr>
      </thead>
      <tbody>
        {filteredData.map((row, index) => (
          <tr key={index}>
            <td>
              <Link to={`/teams/team-profile?team=${encodeURIComponent(row.team_name)}`}>
                {row.team_name}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TeamTable;
