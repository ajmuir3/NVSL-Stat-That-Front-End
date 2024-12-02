import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import FilterDropdown from '../components/FilterDropdown';
import RankingsTable from '../components/Rankings-Table';
import './Rankings.css';

// Mock data for testing
const mockData = [
  {
    rank: 1,
    teamName: 'Chesterbrook',
    division: 1,
    seasonYear: '2024',
    winCount: 5,
    lossCount: 0,
    tieCount: 0,
    dmPoints: 228.5,
    drPoints: 190.3,
    dPoints: 210.0,
    arPoints: 89.5,
    aPoints: 120.0,
    tPoints: 150.0,
    gtPoints: 1883.0,
    powerRanking: 1.77,
    champs: true,
  },
  {
    rank: 2,
    teamName: 'Tuckahoe',
    division: 1,
    seasonYear: '2024',
    winCount: 4,
    lossCount: 1,
    tieCount: 0,
    dmPoints: 220.3,
    drPoints: 180.2,
    dPoints: 200.0,
    arPoints: 85.0,
    aPoints: 115.0,
    tPoints: 140.0,
    gtPoints: 1825.5,
    powerRanking: 2.15,
    champs: false,
  },
  {
    rank: 3,
    teamName: 'Overlee',
    division: 1,
    seasonYear: '2024',
    winCount: 3,
    lossCount: 2,
    tieCount: 0,
    dmPoints: 215.4,
    drPoints: 175.0,
    dPoints: 195.0,
    arPoints: 82.0,
    aPoints: 112.0,
    tPoints: 138.0,
    gtPoints: 1720.0,
    powerRanking: 3.10,
    champs: false,
  },
  {
    rank: 4,
    teamName: 'Donaldson Run',
    division: 1,
    seasonYear: '2024',
    winCount: 2,
    lossCount: 3,
    tieCount: 0,
    dmPoints: 210.2,
    drPoints: 170.8,
    dPoints: 190.0,
    arPoints: 78.5,
    aPoints: 110.0,
    tPoints: 135.0,
    gtPoints: 1600.0,
    powerRanking: 4.50,
    champs: false,
  },
];


function RankingsPage() {
  const [filteredYear, setFilteredYear] = useState<string | null>('2024');
  const [filteredTeam, setFilteredTeam] = useState<string | null>(null);
  const [filteredDivision, setFilteredDivision] = useState<number | null>(null);

  const years = ['2024', '2023', '2022', '2021'];
  const all_teams = [
    'Annandale', 'Arlington Forest', 'Brandywine', 'Broyhill Crest', 'Brookfield', 'Burke Station',
    'Chesterbrook', 'Camelot', 'Country Club Hills', 'Cardinal Hill', 'Crosspointe', 'Commonwealth',
    'Cottontail', 'Canterbury Woods', 'Dominion Hills', 'Dunn Loring', 'Rolling Hills', 'Woodley',
    'Laurel Hill', 'Fox Mill Estates', 'Overlee', 'Vienna Woods', 'Highland Park', 'Hunter Mill',
    'Wakefield Chapel', 'Ilda Community', 'Sleepy Hollow B & R', 'Sleepy Hollow Rec', 'Sideburn Run',
    'Village West', 'Kings Ridge', 'Ravensworth Farm', 'Little Rocky Run', 'Tuckahoe', 'Greenbriar',
    'Fairfax', 'Rutherford', 'Mosby Woods', 'Mount Vernon Park', 'Stratford', 'Lincolnia Park',
    'Fox Mill Woods', 'Great Falls', 'Holmes Run Acres', 'Orange Hunt', 'Poplar Heights',
    'Fair Oaks', 'Lake Braddock', 'Virginia Hills', 'Rolling Valley', 'Springfield',
    'McLean', 'Vienna Aquatic', 'Burke Station', 'Poplar Tree', 'Oakton', 'Long Branch', 'Dowden Terrace',
    'Sully Station', 'Cardinal Hill', 'Donaldson Run', 'Lakevale Estates', 'Parklawn', 'Parliament',
    'Hunter Mill', 'Chesterbrook', 'Herndon', 'Pleasant Valley', 'Fairfax Station',
    'Newington Forest', 'Sideburn Run', 'Woodley', 'Fox Hunt', 'Daventry',
    'Dunn Loring', 'Truro', 'Hamlet', 'Fox Mill Woods', 'High Point Pool', 'Camelot', 'Sleepy Hollow',
    'Lincolnia Park', 'Commonwealth', 'Lakeview', 'Holmes Run Acres', 'Fairfax Station', 'Waynewood',
    'Parliament', 'South Run', 'Riverside Gardens', 'Walden Glen', 'Mount Vernon Park', 'Virginia Run'
  ].sort();
  const teams = [...new Set(all_teams)];
  const divisions = Array.from({ length: 17 }, (_, i) => i + 1);

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

  const filteredData = mockData.filter((item) => {
    const matchesYear = filteredYear ? item.seasonYear.toString() === filteredYear : true;
    const matchesTeam = filteredTeam ? item.teamName === filteredTeam : true;
    const matchesDivision = filteredDivision ? item.division === filteredDivision : true;
    return matchesYear && matchesTeam && matchesDivision;
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">Rankings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="header-section">
          <h1 className="page-header">Team Rankings</h1>
        </div>
        <div className="filter-section">
          <FilterDropdown label="Year" options={[...years]} onChange={(value) => handleFilterChange('year', value)} />
          <FilterDropdown label="Team" options={[...teams]} onChange={(value) => handleFilterChange('team', value)} />
          <FilterDropdown
            label="Division"
            options={['All Divisions', ...divisions.map((div) => div.toString())]}
            onChange={(value) => handleFilterChange('division', value === 'All Divisions' ? null : Number(value))}
          />
        </div>
        <RankingsTable data={filteredData} />
      </IonContent>
    </IonPage>
  );
}

export default RankingsPage;
