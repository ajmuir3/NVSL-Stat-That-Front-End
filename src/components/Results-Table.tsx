import './Table.css';

// Define an interface for the row data structure
interface RowData {
    date: string;
    year: string;     // Define the type for year
    home_team: string;     // Define the type for name (assuming it's a string)
    home_points: string;
    away_team: string;     // Define the type for name (assuming it's a string)
    away_points: string;
    division: number;
    url: string; // Define the type for division
    // Add other properties as needed (e.g., scores, points, etc.)
  }
  
  // Specify the type for data (array of RowData)
  interface ResultsTableProps {
    data: RowData[];  // Array of objects with the structure defined by RowData
    year: string | null;     // Filter year should be a number (or a string if that's your use case)
    name: string | null;     // Assuming name is a string, specify its type
    division: string | null; // Assuming division is a string
  }

const ResultsTable: React.FC<(ResultsTableProps)> = ({ data, year, name, division }) => {

    const filteredData = year
    ? data.filter((item) => item.year === year)
    : data; // If year is null, return all data
  
    return (
    <table className="styled-table">
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
            {filteredData.map((row, index) => (
                <tr key={index}>
                    <td>{row.date}</td>
                    <td>{row.home_team}</td>
                    <td>{row.home_points}</td>
                    <td>{row.away_team}</td>
                    <td>{row.away_points}</td>
                    <td>{row.division}</td>
                    <td><a href={row.url} target='_blank'>RESULTS HERE</a></td>
                </tr>
            ))}
        </tbody>
    </table>
  );
}

export default ResultsTable;