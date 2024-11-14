import React from 'react';

interface StripedRowExampleProps {
  data: Array<{ [key: string]: any }>; // Adjust this type based on the actual structure of your data
}

const StripedRowExample: React.FC<StripedRowExampleProps> = ({ data }) => {
  return (
    <table className="rankings-table">
      <thead>
        <tr>
          {/* Example column headers, adjust as needed */}
          <th>Rank</th>
          <th>Team Name</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {/* Example row rendering, adjust based on data structure */}
            <td>{index + 1}</td>
            <td>{item.teamName}</td>
            <td>{item.totalPoints}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StripedRowExample;
