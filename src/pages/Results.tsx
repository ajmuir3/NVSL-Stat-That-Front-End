import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import FilterDropdown from '../components/FilterDropdown';
import ResultsTable from '../components/Results-Table';
import './Results.css';
import { Link } from 'react-router-dom';

function ResultsPage() {
  const [resultsData, setResultsData] = useState<any[]>([]);
  const [filteredYear, setFilteredYear] = useState<string | null>(null);
  const [filteredTeam, setFilteredTeam] = useState<string | null>(null);
  const [filteredDivision, setFilteredDivision] = useState<number | null>(null);

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
  const divisions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  useEffect(() => {
    const fetchResultsData = async () => {
      try {
        const [teams, meets, meetParticipants, seasons, dualMeets] = await Promise.all([
          fetch('/data/team.json').then((res) => res.json()),
          fetch('/data/meet.json').then((res) => res.json()),
          fetch('/data/meet_participant.json').then((res) => res.json()),
          fetch('/data/season.json').then((res) => res.json()),
          fetch('/data/dual_meet.json').then((res) => res.json()),
        ]);

        const processedResults = dualMeets.map((dualMeet: any) => {
          const homeTeam = teams.find((team: any) => team.teamID === dualMeet.homeTeamID);
          const awayTeam = teams.find((team: any) => team.teamID === dualMeet.awayTeamID);
          const meet = meets.find((m: any) => m.meetID === dualMeet.meetID);
          const season = seasons.find((s: any) => s.teamID === dualMeet.homeTeamID);

          return {
            date: meet?.date || 'Unknown',
            year: meet?.year?.toString() || 'Unknown', // Ensure year is a string
            home_team: homeTeam?.teamName || 'Unknown',
            home_points: dualMeet.homeTeamPoints || 0,
            away_team: awayTeam?.teamName || 'Unknown',
            away_points: dualMeet.awayTeamPoints || 0,
            division: season?.division?.toString() || 'Unknown', // Ensure division is a string
            meet_id: meet?.meetID || 'Unknown'
          };
        });

        setResultsData(processedResults);
      } catch (error) {
        console.error('Error fetching or processing data:', error);
      }
    };

    fetchResultsData();
  }, []);

  const handleFilterChange = (filterType: string, value: string | number | null) => {
    switch (filterType) {
      case 'year':
        setFilteredYear(value as string | null);
        break;
      case 'team':
        setFilteredTeam(value as string | null);
        break;
      case 'division':
        setFilteredDivision(value !== null ? parseInt(value as string, 10) : null); // Ensure division is a number
        break;
      default:
        break;
    }
  };

  const filteredData = resultsData.filter((item) => {
    // Extract the year from the date string (assumes date is in YYYY-MM-DD format)
    const itemYear = item.date ? item.date.split('-')[0] : null;
  
    // Match conditions
    const matchesYear = filteredYear ? itemYear === filteredYear : true;
    const matchesTeam = filteredTeam ? [item.home_team, item.away_team].includes(filteredTeam) : true;
    const matchesDivision = filteredDivision !== null ? parseInt(item.division, 10) === filteredDivision : true;
  
    return matchesYear && matchesTeam && matchesDivision;
  });

  console.log("Filtered Year:", filteredYear);
  console.log("Filtered Team:", filteredTeam);
  console.log("Filtered Division:", filteredDivision);
  console.log("Filtered Data:", filteredData);
  console.log("Results Data Example:", resultsData[0]);

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
        <div className="description">
          <h2>Use the following page to filter and sort Meet Results</h2>
        </div>
        <div className="filter-section">
          <FilterDropdown label="Year" options={[...years]} onChange={(value) => handleFilterChange('year', value === 'All Years' ? null : value)} />
          <FilterDropdown label="Team" options={[...teams]} onChange={(value) => handleFilterChange('team', value === 'All Teams' ? null : value)} />
          <FilterDropdown label="Division" options={[...divisions.map(String)]} onChange={(value) => handleFilterChange('division', value === 'All Divisions' ? null : value)} />
        </div>
        <ResultsTable data={filteredData} />
        <div className="description">
          <h2>
            <Link to={`/results/meet/dominion-hills-vs-rolling-hills`}>View Meet Results Example</Link>
          </h2>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default ResultsPage;