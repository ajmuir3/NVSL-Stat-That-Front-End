import './Table.css';

const RankingsTable: React.FC< {title: string; url: string} > = ({ title, url }) => {
    return (
    <table className="styled-table">
        <thead>
            <tr>
                <th>Year</th>
                <th>Team</th>
                <th>Division</th>
                <th>Wins</th>
                <th>Loss</th>
                <th>Ties</th>
                <th>Dual Meet Points</th>
                <th>Division Relay Points</th>
                <th>All Star Relay Points</th>
                <th>Total Points</th>
                <th>Divisional Points</th>
                <th>All Star Points</th>
                <th>Grand Total Points</th>
                <th>Power Ranking</th>

            </tr>
        </thead>
        <tbody>
            <tr>
                <td>2024</td>
                <td>Rolling Hills</td>
                <td>7</td>
                <td>4</td>
                <td>1</td>
                <td>0</td>
                <td>1313.0</td>
                <td>128.0</td>
                <td>100.0</td>
                <td>1541.0</td>
                <td>1600</td>
                <td>46</td>
                <td>3187</td>
                <td>25.37</td>
            </tr>
            
            <tr>
                <td>2024</td>
                <td>Rolling Hills</td>
                <td>7</td>
                <td>4</td>
                <td>1</td>
                <td>0</td>
                <td>1313.0</td>
                <td>128.0</td>
                <td>100.0</td>
                <td>1541.0</td>
                <td>1600</td>
                <td>46</td>
                <td>3187</td>
                <td>25.37</td>
            </tr>
        </tbody>
    </table>
  );
}

export default RankingsTable;