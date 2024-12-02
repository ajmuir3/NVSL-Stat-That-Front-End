import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import FilterDropdown from '../components/FilterDropdown';
import ResultsTable from '../components/Results-Table';
import './Results.css';

const mockResultsData = [
  { date: "6/22/24", year: "2024", home_team: "Rolling Hills", home_points: "243", away_team: "Sleepy Hollow B & R", away_points: "177", division: 7, url: "https://mynvsl.com/results/27199?back=dv" },
  { date: "6/19/21", year: "2021", home_team: "Rolling Hills", home_points: "260", away_team: "Annandale", away_points: "150", division: 12, url: "https://mynvsl.com/results/25125?back=dv" },
  { date: "7/6/22", year: "2022", home_team: "Rolling Hills", home_points: "267", away_team: "Great Falls", away_points: "148", division: 9, url: "https://mynvsl.com/results/26417?back=dv" },
  { date: "7/6/23", year: "2023", home_team: "Rolling Hills", home_points: "204", away_team: "Dominion Hills", away_points: "211", division: 8, url: "https://mynvsl.com/results/27301?back=dv" },
];

function ResultsPage() {
  const [filteredYear, setFilteredYear] = useState<string | null>(null);
  const [filteredTeam, setFilteredTeam] = useState<string | null>(null);
  const [filteredDivision, setFilteredDivision] = useState<number | null>(null);

  const years = ["2024", "2023", "2022", "2021"];
  const teams = ["Rolling Hills", "Sleepy Hollow B & R", "Annandale", "Great Falls", "Dominion Hills"].sort();
  const divisions = [7, 8, 9, 12];

  const handleFilterChange = (filterType: string, value: string | number | null) => {
    switch (filterType) {
      case 'year':
        setFilteredYear(value as string | null);
        break;
      case 'team':
        setFilteredTeam(value as string | null);
        break;
      case 'division':
        setFilteredDivision(value as number | null);
        break;
      default:
        break;
    }
  };

  const filteredData = mockResultsData.filter((item) => {
    const matchesYear = filteredYear ? item.year === filteredYear : true;
    const matchesTeam = filteredTeam ? [item.home_team, item.away_team].includes(filteredTeam) : true;
    const matchesDivision = filteredDivision ? item.division === filteredDivision : true;
    return matchesYear && matchesTeam && matchesDivision;
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">Results</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="header-section">
          <h1 className="page-header">Meet Results</h1>
        </div>
        <div className="filter-section">
          <FilterDropdown label="Year" options={[...years]} onChange={(value) => handleFilterChange('year', value)} />
          <FilterDropdown label="Team" options={[...teams]} onChange={(value) => handleFilterChange('team', value)} />
          <FilterDropdown label="Division" options={[...divisions]} onChange={(value) => handleFilterChange('division', value)} />
        </div>
        <ResultsTable data={filteredData} />
      </IonContent>
    </IonPage>
  );
}

export default ResultsPage;
