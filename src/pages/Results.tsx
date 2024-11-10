import React, { useState } from 'react';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ResultsTable from '../components/Results-Table';
import FilterDropdown from '../components/FilterDropdown';
import './Rankings.css';

const mockData = [
  {
    date: "2024-06-22",
    year: "2024",
    home_team: "Rolling Hills",
    home_points: "243.0",
    away_team: "Sleepy Hollow B & R",
    away_points: "177.0",
    division: 7,
    url: "https://mynvsl.com/results/27199?back=dv"
  },
  {
    date: "2021-06-19",
    year: "2021",
    home_team: "Rolling Hills",
    home_points: "260.0",
    away_team: "Annandale",
    away_points: "150.0",
    division: 12,
    url: "https://mynvsl.com/results/25125?back=dv"
  },
  {
    date: "2022-07-06",
    year: "2022",
    home_team: "Rolling Hills",
    home_points: "267.0",
    away_team: "Great Falls",
    away_points: "148.0",
    division: 9,
    url: "https://mynvsl.com/results/26417?back=dv"
  },
  {
    date: "2023-07-06",
    year: "2023",
    home_team: "Rolling Hills",
    home_points: "204.0",
    away_team: "Dominion Hills",
    away_points: "211.0",
    division: 8,
    url: "https://mynvsl.com/results/27301?back=dv"
  }
];

function ResultsPage() {
  const [filteredYear, setFilteredYear] = useState<string | null>(null);
  const [filteredTeam, setFilteredTeam] = useState<string | null>(null);
  const [filteredDivision, setFilteredDivision] = useState<number | null>(null);

  const years = ["2024", "2023", "2022", "2021"];
  const teams = ["Rolling Hills", "Sleepy Hollow B & R", "Annandale", "Great Falls", "Dominion Hills"].sort();
  const divisions = [7, 8, 9, 12];

  const handleFilterChange = (year: string | null, team: string | null, division: number | null) => {
    setFilteredYear(year);
    setFilteredTeam(team);
    setFilteredDivision(division);
  };

  // Filter the mock data based on the selected filters
  const filteredData = mockData.filter((item) => {
    const matchesYear = filteredYear ? item.year === filteredYear : true;
    const matchesTeam = filteredTeam ? item.home_team === filteredTeam || item.away_team === filteredTeam : true;
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
          <h1 className="page-header">Results</h1>
        </div>
        <div className="content-container">
          <h2>Meet Results for</h2>
          <FilterDropdown
            years={years}
            teams={teams}
            divisions={divisions}
            onFilterChange={handleFilterChange}
          />
          <ResultsTable data={filteredData} year={filteredYear} name={filteredTeam} division={filteredDivision?.toString() || ""}/>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ResultsPage;
