import React, { useState, useEffect, useMemo } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
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
  year: "2021",
  team: "All Teams",
  ageGroup: "All Age Groups",
  event: "All Events",
  type: "All Types",
  course: "All Courses",
  division: "All Divisions",
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
  'McLean', 'Vienna Aquatic', 'Burke Station', 'Poplar Tree', 'Oakton', 'Long Branch', 'Dowden Terrace',
  'Sully Station', 'Cardinal Hill', 'Donaldson Run', 'Lakevale Estates', 'Parklawn', 'Parliament',
  'Hunter Mill', 'Chesterbrook', 'Herndon', 'Pleasant Valley', 'Fairfax Station',
  'Newington Forest', 'Sideburn Run', 'Woodley', 'Fox Hunt', 'Daventry',
  'Dunn Loring', 'Truro', 'Hamlet', 'Fox Mill Woods', 'High Point Pool', 'Camelot', 'Sleepy Hollow',
  'Lincolnia Park', 'Commonwealth', 'Lakeview', 'Holmes Run Acres', 'Fairfax Station', 'Waynewood',
  'Parliament', 'South Run', 'Riverside Gardens', 'Walden Glen', 'Mount Vernon Park', 'Virginia Run',
].sort();
const teams = [...new Set(all_teams)];
const ageGroups = ["8&U", "9-10", "11-12", "13-14", "15-18"];
const events = ['25 Free', '25 Back', '25 Breast', '25 Fly', '50 Free', '50 Back', '50 Breast', '50 Fly', '100 IM'];
const courses = ["25 Meters", " 25 Yards"];
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

  const fetchJSONData = async (): Promise<void> => {
    try {
      console.log("Filters:", filters);
  
      // Fetch all necessary data files
      const [
        teams,
        swimmers,
        seasons,
        meets,
        meetParticipants,
        meetEvents,
        events,
        results,
        swimmerResults, // New JSON file
      ] = await Promise.all([
        fetch("/data/team.json").then((res) => res.json()),
        fetch("/data/swimmer.json").then((res) => res.json()),
        fetch("/data/season.json").then((res) => res.json()),
        fetch("/data/meet.json").then((res) => res.json()),
        fetch("/data/meet_participant.json").then((res) => res.json()),
        fetch("/data/meet_event.json").then((res) => res.json()),
        fetch("/data/event.json").then((res) => res.json()),
        fetch("/data/results.json").then((res) => res.json()),
        fetch("/data/swimmer_result.json").then((res) => res.json()), // Load swimmer_result.json
      ]);
  
      const processedData = results
        .map((result: any) => {
          const meetEvent = meetEvents.find((me: { meetEventID: any }) => me.meetEventID === result.meetEventID);
          const event = events.find((e: { eventID: any }) => e.eventID === meetEvent?.eventID);
          const meet = meets.find((m: { meetID: any }) => m.meetID === meetEvent?.meetID);
          const relatedParticipants = meetParticipants.filter((mp: { meetID: any }) => mp.meetID === meet?.meetID);
          const teamIDs = relatedParticipants.map((mp: { teamID: any }) => mp.teamID);
          const team = teams.find((t: { teamID: any }) => teamIDs.includes(t.teamID));
          const swimmerResult = swimmerResults.find(
            (sr: { resultID: any }) => sr.resultID === result.resultID
          ); // Map resultID to swimmerResult
          const swimmer = swimmers.find((sw: { swimmerID: any }) => sw.swimmerID === swimmerResult?.swimmerID); // Use swimmerID from swimmerResult
          const season = seasons.find((s: { teamID: any; year: number }) => s.teamID === team?.teamID);
  
          if (!swimmer || !team || !season || !event || event.individual === false) {
            return null; // Exclude non-individual events
          }
  
          return {
            name: swimmer.name || "Unknown", // Retrieve swimmer name from swimmer.json
            team: team.teamName || "Unknown",
            time: parseFloat(result.time || "0"),
            powerIndex: parseFloat(result.powerIndex || "0"),
            year: String(season.year),
            stroke: event.stroke || "Unknown",
            distance: parseInt(event.distance || "0"),
            course: meet.course || "Unknown",
            division: season.division || 0,
            ageGroup: event.age_group || "Unknown",
          };
        })
        .filter((entry: any) => entry !== null) as TopTime[];
  
      console.log("Processed Data (Filtered):", processedData);
      setTopTimesData(processedData);
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  };

  useEffect(() => {
    fetchJSONData();
  }, []);

const normalizeFilters = (filters: typeof DEFAULT_FILTERS): typeof DEFAULT_FILTERS => {
  const normalized = { ...filters };

  Object.keys(normalized).forEach((key) => {
    if (
      typeof normalized[key as keyof typeof DEFAULT_FILTERS] === "string" &&
      normalized[key as keyof typeof DEFAULT_FILTERS]?.startsWith("All")
    ) {
      normalized[key as keyof typeof DEFAULT_FILTERS] = null;
    }
  });

  return normalized;
};

const handleFilterChange = (key: keyof typeof DEFAULT_FILTERS, value: string | number | null) => {
  const newFilters = { ...filters, [key]: value };
  setFilters(normalizeFilters(newFilters));
};

  


  const filteredData = useMemo(() => {
    const normalizedFilters = normalizeFilters(filters);
  
    return topTimesData
      .filter((entry) => {
        return (
          (!normalizedFilters.year || entry.year === normalizedFilters.year) &&
          (!normalizedFilters.team || entry.team === normalizedFilters.team) &&
          (!normalizedFilters.ageGroup || entry.ageGroup === normalizedFilters.ageGroup) &&
          (!normalizedFilters.event || `${entry.distance} ${entry.stroke}` === normalizedFilters.event) &&
          (!normalizedFilters.course || entry.course === normalizedFilters.course) &&
          (!normalizedFilters.division || String(entry.division) === normalizedFilters.division)
        );
      })
      .sort((a, b) => a.time - b.time)
      .slice(0, 100);
  }, [topTimesData, filters]);
  
  
  console.log("Filtered Data:", filteredData);
  console.log("Filters Applied:", filters);
  console.log("Normalized Filters Applied:", normalizeFilters(filters));
  console.log("Top Times Data:", topTimesData);
  
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
        <div className='.description'>
          <h2>Use the following page to find the top times in the NVSL</h2>
        </div>
        <div className="filter-section">
          <FilterDropdown label="Year" options={years} onChange={(value) => handleFilterChange("year", value)} />
          <FilterDropdown label="Team" options={teams} onChange={(value) => handleFilterChange("team", value)} />
          <FilterDropdown label="Age Group" options={ageGroups} onChange={(value) => handleFilterChange("ageGroup", value)} />
          <FilterDropdown label="Event" options={events} onChange={(value) => handleFilterChange("event", value)} />
          <FilterDropdown label="Course" options={courses} onChange={(value) => handleFilterChange("course", value)} />
          <FilterDropdown label="Division" options={divisions} onChange={(value) => handleFilterChange("division", value)} />
        </div>
        <TopTimesTable data={filteredData} />
      </IonContent>
    </IonPage>
  );
}

export default TopTimesPage;
