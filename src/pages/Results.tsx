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
  
        const processedDualResults = dualMeets.map((dualMeet: any) => {
          const homeTeam = teams.find((team: any) => team.teamID === dualMeet.homeTeamID);
          const awayTeam = teams.find((team: any) => team.teamID === dualMeet.awayTeamID);
          const meet = meets.find((m: any) => m.meetID === dualMeet.meetID);
          const season = seasons.find((s: any) => s.teamID === dualMeet.homeTeamID);
  
          return {
            date: meet?.date || "Unknown",
            year: meet?.year || "Unknown",
            home_team: homeTeam?.teamName || "Unknown",
            home_points: dualMeet.homeTeamPoints || 0,
            away_team: awayTeam?.teamName || "Unknown",
            away_points: dualMeet.awayTeamPoints || 0,
            division: season?.division || "Unknown",
          };
        });
  
        console.log("Processed Dual Meet Results:", processedDualResults);
  
        // Add only unique results
        setResultsData((prevResults) => [
          ...prevResults,
          ...processedDualResults.filter(
            (result: { date: any; home_team: any; away_team: any; }) =>
              !prevResults.some(
                (prevResult) =>
                  prevResult.date === result.date &&
                  prevResult.home_team === result.home_team &&
                  prevResult.away_team === result.away_team
              )
          ),
        ]);
      } catch (error) {
        console.error("Error fetching or processing dual meet data:", error);
      }
    };
  
    const fetchChampionshipResultsData = async () => {
      try {
        const [teams, meets, meetParticipants, seasons, champsMeets] = await Promise.all([
          fetch('/data/team.json').then((res) => res.json()),
          fetch('/data/meet.json').then((res) => res.json()),
          fetch('/data/meet_participant.json').then((res) => res.json()),
          fetch('/data/season.json').then((res) => res.json()),
          fetch('/data/champs_meets.json').then((res) => res.json()),
        ]);
  
        const processedChampsResults = champsMeets.map((champsMeet: any) => {
          const meet = meets.find((m: any) => m.meetID === champsMeet.meetID);
          const participants = meetParticipants.filter((mp: any) => mp.meetID === champsMeet.meetID);
  
          return participants.map((participant: any) => {
            const team = teams.find((t: any) => t.teamID === participant.teamID);
            const season = seasons.find((s: any) => s.teamID === participant.teamID);
  
            let away_points = 0;
            if (meet?.title === "Divisional Relays") {
              away_points = season?.drPoints || 0;
            } else if (meet?.title === "Divisionals") {
              away_points = season?.dPoints || 0;
            } else if (meet?.title === "All Star Relay Carnival") {
              away_points = season?.arPoints || 0;
            } else if (meet?.title === "All Stars") {
              away_points = season?.aPoints || 0;
            }
  
            return {
              date: meet?.date || "Unknown",
              home_team: meet?.title || "Unknown",
              home_points: 0, // Assuming home points are not relevant for these meets
              away_team: team?.teamName || "Unknown",
              away_points,
              division: season?.division || "Unknown",
            };
          });
        });
  
        console.log("Processed Championship Meet Results:", processedChampsResults);
  
        // Add only unique results
        setResultsData((prevResults) => [
          ...prevResults,
          ...processedChampsResults.flat().filter(
            (result: { date: any; home_team: any; away_team: any; }) =>
              !prevResults.some(
                (prevResult) =>
                  prevResult.date === result.date &&
                  prevResult.home_team === result.home_team &&
                  prevResult.away_team === result.away_team
              )
          ),
        ]);
      } catch (error) {
        console.error("Error fetching or processing championship meet data:", error);
      }
    };
  
    fetchResultsData();
    fetchChampionshipResultsData();
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
        setFilteredDivision(value as number | null);
        break;
      default:
        break;
    }
  };

  const filteredData = resultsData.filter((item) => {
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
        <div className="description">
          <h2>Use the folowing page to filter and sort Meet Results</h2>
        </div>
        <div className="filter-section">
          <FilterDropdown label="Year" options={[...years]} onChange={(value) => handleFilterChange('year', value === "All Years" ? null : value)} />
          <FilterDropdown label="Team" options={[...teams]} onChange={(value) => handleFilterChange('team', value === "All Teams" ? null : value)} />
          <FilterDropdown label="Division" options={[...divisions.map(String)]} onChange={(value) => handleFilterChange('division', value === "All Divisions" ? null : parseInt(value as string, 10))} />
        </div>
        <ResultsTable data={filteredData} />
        <div className="description">
          <h2><Link to={`/results/meet/dominion-hills-vs-rolling-hills`}>View Meet Results Example</Link></h2>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default ResultsPage;
