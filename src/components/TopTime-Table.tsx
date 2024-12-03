import React, { useState, useEffect } from 'react';
import './Table.css';

// Define the data structure for Top Times row
interface RowData {
  name: string;
  team: string;
  time: number;
  powerIndex: number;
  year: string;
  stroke: string;
  distance: number;
  course: string;
  division: number;
  ageGroup: string;
}

// Props for the TopTimesTable
interface TopTimesTableProps {
  data: RowData[];
}

const TopTimesTable: React.FC<TopTimesTableProps> = ({ data }) => {
 
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof RowData; direction: 'asc' | 'desc' } | null>(null);

  useEffect(() => {
    // Initialize sortedData with the incoming data
    setSortedData(data);
  }, [data]);

  const handleSort = (key: keyof RowData) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sorted = [...sortedData].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'asc' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setSortedData(sorted);
    setSortConfig({ key, direction });
  };

  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th onClick={() => handleSort('name')}>Name</th>
          <th onClick={() => handleSort('team')}>Team</th>
          <th onClick={() => handleSort('division')}>Division</th>
          <th onClick={() => handleSort('time')}>Time</th>
          <th onClick={() => handleSort('powerIndex')}>Power Index</th>
          <th onClick={() => handleSort('ageGroup')}>Age Group</th>
          <th onClick={() => handleSort('distance')}>Distance</th>
          <th onClick={() => handleSort('stroke')}>Stroke</th>
          <th onClick={() => handleSort('course')}>Course</th>
          <th onClick={() => handleSort('year')}>Year</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <tr key={index}>
            <td>{row.name}</td>
            <td>{row.team}</td>
            <td>{row.division}</td>
            <td>{row.time.toFixed(2)}</td>
            <td>{row.powerIndex.toFixed(2)}</td>
            <td>{row.ageGroup}</td>
            <td>{row.distance}</td>
            <td>{row.stroke}</td>
            <td>{row.course}</td>
            <td>{row.year}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TopTimesTable;
