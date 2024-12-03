import React, { useState, useEffect, useMemo } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import FilterDropdown from '../components/FilterDropdown';
import RankingsTable from '../components/Rankings-Table';
import './Rankings.css';

// Default filter constants
const DEFAULT_FILTERS = {
  year: 'All Years',
  team: 'All Teams',
  division: 'All Divisions',
};

// Dropdown Data
const years = ['2021', '2022', '2023', '2024'];
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
  'Parliament', 'South Run', 'Riverside Gardens', 'Walden Glen', 'Mount Vernon Park', 'Virginia Run',
].sort();
const teams = [...new Set(all_teams)];
const divisions = Array.from({ length: 17 }, (_, i) => (i + 1).toString());

function RankingsPage() {
  const [filteredYear, setFilteredYear] = useState<string | null>(DEFAULT_FILTERS.year);
  const [filteredTeam, setFilteredTeam] = useState<string | null>(DEFAULT_FILTERS.team);
  const [filteredDivision, setFilteredDivision] = useState<string | null>(DEFAULT_FILTERS.division);
  const [rankingsData, setRankingsData] = useState<any[]>([]);

  // Fetch and process JSON data
  const fetchJSONData = async (): Promise<void> => {
    try {
      const [teams, seasons] = await Promise.all([
        fetch('/data/team.json').then((res) => res.json()),
        fetch('/data/season.json').then((res) => res.json()),
      ]);

      const processedData = seasons.map((season: any) => {
        const team = teams.find((t: any) => t.teamID === season.teamID);
        return {
          teamName: team?.teamName || 'Unknown',
          division: season.division.toString(),
          seasonYear: season.year.toString(),
          winCount: parseInt(season.meetsWon, 10) || 0,
          lossCount: parseInt(season.meetsLost, 10) || 0,
          tieCount: parseInt(season.meetsTied, 10) || 0,
          dmPoints: parseFloat(season.dmPoints) || 0,
          drPoints: parseFloat(season.drPoints) || 0,
          dPoints: parseFloat(season.dPoints) || 0,
          arPoints: parseFloat(season.arPoints) || 0,
          aPoints: parseFloat(season.aPoints) || 0,
          tPoints: parseFloat(season.tPoints) || 0,
          gtPoints: parseFloat(season.gtPoints) || 0,
          powerRanking: parseFloat(season.powerRanking) || 0,
        };
      });
      
      console.log(processedData);
      setRankingsData(processedData);
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
  };

  // Apply filters
  const filteredData = useMemo(() => {
    return rankingsData.filter((entry) => {
      const matchesYear = filteredYear === 'All Years' || !filteredYear || entry.seasonYear === filteredYear;
      const matchesTeam = filteredTeam === 'All Teams' || !filteredTeam || entry.teamName === filteredTeam;
      const matchesDivision = filteredDivision === 'All Divisions' || !filteredDivision || entry.division === filteredDivision;
  
      return matchesYear && matchesTeam && matchesDivision;
    });
  }, [filteredYear, filteredTeam, filteredDivision, rankingsData]);

  useEffect(() => {
    fetchJSONData();
  }, []);

  const handleFilterChange = (key: string, value: string | number | null) => {
    const normalizedValue = typeof value === 'number' ? value.toString() : value;
    if (key === 'year') setFilteredYear(normalizedValue === 'All Years' ? null : normalizedValue);
    if (key === 'team') setFilteredTeam(normalizedValue === 'All Teams' ? null : normalizedValue);
    if (key === 'division') setFilteredDivision(normalizedValue === 'All Divisions' ? null : normalizedValue);
  };

  console.log('Filtered Year:', filteredYear);
  console.log('Filtered Team:', filteredTeam);
  console.log('Filtered Division:', filteredDivision);
  console.log('Filtered Data:', filteredData);

  

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
        <div className="description">
          <h2>Use the following page to filter and sort the NVSL's season rankings</h2>
          <h3>Hover over the column headers for more information regarding the data</h3>
        </div>
        <div className="filter-section">
          <FilterDropdown
            label="Year"
            options={[...years]} // Years remain strings
            onChange={(value: string | null) =>
              handleFilterChange('year', value === 'All Years' ? null : value)
            }
          />
          <FilterDropdown
            label="Team"
            options={[...teams]} // Teams remain strings
            onChange={(value: string | null) =>
              handleFilterChange('team', value === 'All Teams' ? null : value)
            }
          />
          <FilterDropdown
            label="Division"
            options={[...divisions]} // Divisions are already strings
            onChange={(value: string | null) =>
              handleFilterChange('division', value === 'All Divisions' ? null : value)
            }
          />
        </div>
        <RankingsTable data={filteredData} />
      </IonContent>
    </IonPage>
  );
}

export default RankingsPage;
