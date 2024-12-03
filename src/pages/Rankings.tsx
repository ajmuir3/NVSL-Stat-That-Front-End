import React, { useState, useEffect, useMemo } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import FilterDropdown from '../components/FilterDropdown';
import RankingsTable from '../components/Rankings-Table';
import './Rankings.css';

// Default filter constants
const DEFAULT_FILTERS = {
  year: '2021',
  team: 'All Teams',
  division: 'All Divisions',
};

// Mocked Dropdown Data
const years = ['2021'];
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
const divisions = [1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17];

function RankingsPage() {
  const [filteredYear, setFilteredYear] = useState<string>(DEFAULT_FILTERS.year);
  const [filteredTeam, setFilteredTeam] = useState<string>(DEFAULT_FILTERS.team);
  const [filteredDivision, setFilteredDivision] = useState<string>(DEFAULT_FILTERS.division);
  const [rankingsData, setRankingsData] = useState<any[]>([]);

  // Fetch and process JSON data
  const fetchJSONData = async (): Promise<void> => {
    try {
      const [teams, seasons] = await Promise.all([
        fetch('/data/team.json').then((res) => res.json()),
        fetch('/data/season.json').then((res) => res.json()),
      ]);

      const processedData = seasons.map((season: any, index: number) => {
        const team = teams.find((t: any) => t.teamID === season.teamID);
        if (!team) {
          console.error(`No team found for teamID: ${season.teamID}`);
          return null;
        }

        return {
          rank: index + 1,
          teamName: team.teamName,
          division: season.division,
          seasonYear: season.year,
          winCount: season.meetsWon,
          lossCount: season.meetsLost,
          tieCount: season.meetsTied,
          dmPoints: season.dmPoints,
          drPoints: season.drPoints,
          dPoints: season.dPoints,
          arPoints: season.arPoints,
          aPoints: season.aPoints,
          tPoints: season.tPoints,
          gtPoints: season.gtPoints,
          powerRanking: season.powerRanking,
          champs: season.division === 1 && season.meetsWon > 4, // Example logic
        };
      }).filter(Boolean);

      setRankingsData(processedData);
    } catch (error) {
      console.error('Error fetching or processing data:', error);
    }
  };

  // Apply filters to the rankings data
  const filteredData = useMemo(() => {
    return rankingsData.filter((entry) => {
      const matchesYear = filteredYear === 'All Years' || entry.seasonYear.toString() === filteredYear;
      const matchesTeam = filteredTeam === 'All Teams' || entry.teamName === filteredTeam;
      const matchesDivision = filteredDivision === 'All Divisions' || entry.division.toString() === filteredDivision;
      return matchesYear && matchesTeam && matchesDivision;
    });
  }, [filteredYear, filteredTeam, filteredDivision, rankingsData]);

  useEffect(() => {
    fetchJSONData();
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    if (key === 'year') setFilteredYear(value);
    if (key === 'team') setFilteredTeam(value);
    if (key === 'division') setFilteredDivision(value);
  };

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
        <FilterDropdown 
        label="Year" 
        options={years} 
        onChange={(value) => handleFilterChange('year', String(value))} 
      />
      <FilterDropdown 
        label="Team" 
        options={[...teams]} 
        onChange={(value) => handleFilterChange('team', String(value))} 
      />
      <FilterDropdown
        label="Division"
        options={[...divisions]}
        onChange={(value) => handleFilterChange('division', value === 'All Divisions' ? 'All Divisions' : String(value))}
      />

        </div>
        <RankingsTable data={filteredData} />
      </IonContent>
    </IonPage>
  );
}

export default RankingsPage;
