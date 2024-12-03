import React, { useState, useEffect, useMemo } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonProgressBar,
  IonAlert,
} from '@ionic/react';
import FilterDropdown from '../components/FilterDropdown';
import TopTimesTable from '../components/TopTime-Table';
import './Times.css';

const DEFAULT_FILTERS: {
  year: string | null;
  team: string | null;
  ageGroup: string | null;
  event: string | null;
  type: string | null;
  course: string | null;
  division: string | null;
} = {
  year: '2021',
  team: 'All Teams',
  ageGroup: 'All Age Groups',
  event: 'All Events',
  type: 'All Types',
  course: 'All Courses',
  division: 'All Divisions',
};

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
].sort();
const teams = [...new Set(all_teams)];
const ageGroups = ['8&U', '9-10', '11-12', '13-14', '15-18'];
const events = ['25 Free', '25 Back', '25 Breast', '25 Fly', '50 Free', '50 Back', '50 Breast', '50 Fly', '100 IM'];
const courses = ['25 Meters', '25 Yards'];
const divisions = Array.from({ length: 17 }, (_, i) => (i + 1).toString());

interface TopTime {
  type: string;
  event: string;
  ageGroup: string;
  name: string;
  team: string;
  time: number;
  powerIndex: number;
  year: string;
  stroke: string;
  distance: number;
  course: string;
  division: number;
}

function TopTimesPage() {
  const [topTimesData, setTopTimesData] = useState<TopTime[]>([]);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const fetchJSONData = async (): Promise<void> => {
    try {
      setLoading(true); // Show progress bar
      setProgress(0);

      const allData = await Promise.all(
        [
          '/data/team.json',
          '/data/swimmer.json',
          '/data/season.json',
          '/data/meet.json',
          '/data/meet_participant.json',
          '/data/meet_event.json',
          '/data/event.json',
          '/data/test-results.json',
          '/data/swimmer_result.json',
        ].map((url, index) =>
          fetch(url)
            .then((res) => res.json())
            .then((data) => {
              setProgress((prev) => prev + 1 / 9); // Increment progress
              return data;
            })
        )
      );

      const [teams, swimmers, seasons, meets, meetParticipants, meetEvents, events, results, swimmerResults] = allData;

      const processedData = results
        .map((result: any) => {
          console.log("Processing Result:", result);

          const meetEvent = meetEvents.find((me: { meetEventID: any }) => me.meetEventID === result.meetEventID);
          console.log("Meet Event Found:", meetEvent);

          const event = events.find((e: { eventID: any }) => e.eventID === meetEvent?.eventID);
          console.log("Event Found:", event);

          const meet = meets.find((m: { meetID: any }) => m.meetID === meetEvent?.meetID);
          console.log("Meet Found:", meet);

          const swimmerResult = swimmerResults.find(
            (sr: { resultID: any }) => sr.resultID === result.resultID
          );
          console.log("Swimmer Result Found:", swimmerResult);

          const swimmer = swimmers.find((sw: { swimmerID: any }) => sw.swimmerID === swimmerResult?.swimmerID);
          console.log("Swimmer Found:", swimmer);

          const team = teams.find((t: { teamID: any }) => t.teamID === swimmer?.teamID);
          console.log("Team Found:", team);

          const season = seasons.find(
            (s: { teamID: string; year: number }) =>
              s.teamID === team?.teamID && s.year === result.year
          );
          console.log("Season Found (for Division):", season);

          if (!swimmer || !event || !season || event.individual === false) {
            console.warn("Excluding entry due to missing data or non-individual event:", {
              swimmer,
              event,
              season,
            });
            return null; // Exclude non-individual events and missing data
          }

          const processedEntry = {
            name: swimmer.name || 'Unknown',
            team: team?.teamName || 'Unknown',
            time: parseFloat(result.time || '0'),
            powerIndex: parseFloat(result.powerIndex || '0'),
            year: String(season.year),
            stroke: event.stroke || 'Unknown',
            distance: parseInt(event.distance || '0'),
            course: meet?.course || 'Unknown',
            division: season.division || 'Unknown', // Division from Season table
            ageGroup: event.age_group || 'Unknown',
          };

          console.log("Processed Entry:", processedEntry);

          return processedEntry;
        })
        .filter((entry: any) => entry !== null) as TopTime[];

      console.log("Final Processed Data:", processedData);


      console.log("Final Processed Data:", processedData);

      
          console.log(processedData);
          setTopTimesData(processedData);
          setProgress(1); // Complete progress bar
        } catch (error) {
          setAlertMessage('Error loading data. Please try again.');
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

  useEffect(() => {
    fetchJSONData();
  }, []);

  const handleFilterChange = (key: keyof typeof DEFAULT_FILTERS, value: string | null) => {
    setFilters({ ...filters, [key]: value });
  };

  const filteredData = useMemo(() => {
    return topTimesData.filter((entry) => {
      return (
        (!filters.year || entry.year === filters.year) &&
        (!filters.team || entry.team === filters.team) &&
        (!filters.ageGroup || entry.ageGroup === filters.ageGroup) &&
        (!filters.event || `${entry.distance} ${entry.stroke}` === filters.event) &&
        (!filters.course || entry.course === filters.course) &&
        (!filters.division || String(entry.division) === filters.division)
      );
    });
  }, [filters, topTimesData]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">Top Times</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="header-section">
          <h1 className="page-header">Top Times</h1>
        </div>
        <div className=".description">
          <h2>Use the following page to find the top times in the NVSL</h2>
        </div>
        {loading && <IonProgressBar value={progress}></IonProgressBar>}
        <div className="filter-section">
          <FilterDropdown label="Year" options={years} onChange={(value) => handleFilterChange('year', value)} />
          <FilterDropdown label="Team" options={teams} onChange={(value) => handleFilterChange('team', value)} />
          <FilterDropdown label="Age Group" options={ageGroups} onChange={(value) => handleFilterChange('ageGroup', value)} />
          <FilterDropdown label="Event" options={events} onChange={(value) => handleFilterChange('event', value)} />
          <FilterDropdown label="Course" options={courses} onChange={(value) => handleFilterChange('course', value)} />
          <FilterDropdown label="Division" options={divisions} onChange={(value) => handleFilterChange('division', value)} />
        </div>
        <TopTimesTable data={filteredData} />
        {alertMessage && (
          <IonAlert
            isOpen={!!alertMessage}
            onDidDismiss={() => setAlertMessage(null)}
            header="Error"
            message={alertMessage}
            buttons={['OK']}
          />
        )}
      </IonContent>
    </IonPage>
  );
}

export default TopTimesPage;
