import React from 'react';
import './Table.css';

// Define the data structure for Top Times row
interface RowData {
  rank: number;
  name: string;
  time: string;
  powerIndex: string;
  year: string; // Ensure filtering by year works
}

// Props for the TopTimesTable
interface TopTimesTableProps {
  data: RowData[];
}

const TopTimesTable: React.FC<TopTimesTableProps> = ({ data }) => {
  // Apply year filtering if a specific year is selected

  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Time</th>
          <th>PowerIndex</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{row.rank}</td>
            <td>{row.name}</td>
            <td>{row.time}</td>
            <td>{row.powerIndex}</td>
            <td>{row.year}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TopTimesTable;
