import React, { useState, useEffect, useMemo } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import FilterDropdown from '../components/FilterDropdown';
import TopTimesTable from '../components/TopTime-Table';
import './Times.css';

const DEFAULT_FILTERS = {
  year: "All Years",
  team: "All Teams",
  ageGroup: "All Age Groups",
  gender: "All Genders",
  event: "All Events",
  type: "All Types",
  course: "All Courses",
  division: "All Divisions",
};

const years = ["2021"];
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
const ageGroups = ["8&U", "9-10", "11-12", "13-14", "15-18", "Mixed Age"];
const genders = ["Boys", "Girls"];
const types = ["Individual", "Relay"];
const events = ['25 Free', '25 Back', '25 Breast', '25 Fly', '50 Free', '50 Back', '50 Breast', '50 Fly', '100 IM', '100 Free Relay', '100 Medley Relay', '200 Medley Relay', '200 Free Relay'];
const courses = ["Meters", "Yards"];
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
  gender: string;
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

      const [teams, swimmers, seasons, meets, meetParticipants, meetEvents, events, results] = await Promise.all([
        fetch("/data/team.json").then((res) => res.json()),
        fetch("/data/swimmer.json").then((res) => res.json()),
        fetch("/data/season.json").then((res) => res.json()),
        fetch("/data/meet.json").then((res) => res.json()),
        fetch("/data/meet_participant.json").then((res) => res.json()),
        fetch("/data/meet_event.json").then((res) => res.json()),
        fetch("/data/event.json").then((res) => res.json()),
        fetch("/data/test-results.json").then((res) => res.json()),
      ]);

      const processedData = results
        .map((result: any) => {
          const meetEvent = meetEvents.find((me: { meetEventID: any }) => me.meetEventID === result.meetEventID);
          const event = events.find((e: { eventID: any }) => e.eventID === meetEvent?.eventID);
          const meet = meets.find((m: { meetID: any }) => m.meetID === meetEvent?.meetID);
          const relatedParticipants = meetParticipants.filter((mp: { meetID: any }) => mp.meetID === meet?.meetID);
          const teamIDs = relatedParticipants.map((mp: { teamID: any }) => mp.teamID);
          const team = teams.find((t: { teamID: any }) => teamIDs.includes(t.teamID));
          const swimmer = swimmers.find((sw: { teamID: any }) => sw.teamID === team?.teamID);
          const season = seasons.find((s: { teamID: any; year: number }) => s.teamID === team?.teamID);

          if (!swimmer || !team || !season) {
            return null;
          }

          return {
            name: swimmer.name || "Unknown",
            team: team.teamName || "Unknown",
            time: parseFloat(result.time || "0"),
            powerIndex: parseFloat(result.powerIndex || "0"),
            year: String(season.year),
            gender: event.gender || "Unknown",
            stroke: event.stroke || "Unknown",
            distance: parseInt(result.time || "0"),
            course: meet.course || "Unknown",
            division: season.division || 0,
            ageGroup: event.ageGroup || "Unknown",
            type: event.individual ? "Individual" : "Relay",
          };
        })
        .filter((entry: null) => entry !== null) as TopTime[];

      console.log("Processed Data:", processedData);
      setTopTimesData(processedData);
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  };

  useEffect(() => {
    fetchJSONData();
  }, []);

  const handleFilterChange = (key: string, value: string | number | null) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = useMemo(() => {
    return topTimesData
      .filter((entry) => {
        return (
          (filters.year === "All Years" || entry.year === filters.year) &&
          (filters.team === "All Teams" || entry.team === filters.team) &&
          (filters.ageGroup === "All Age Groups" || entry.ageGroup === filters.ageGroup) &&
          (filters.gender === "All Genders" || entry.gender === filters.gender) &&
          (filters.event === "All Events" || entry.event === filters.event) &&
          (filters.type === "All Types" || entry.type === filters.type) &&
          (filters.course === "All Courses" || entry.course === filters.course) &&
          (filters.division === "All Divisions" || String(entry.division) === filters.division)
        );
      })
      .sort((a, b) => a.time - b.time)
      .slice(0, 100);
  }, [topTimesData, filters]);

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
        <div className="filter-section">
          <FilterDropdown label="Year" options={years} onChange={(value) => handleFilterChange("year", value)} />
          <FilterDropdown label="Team" options={teams} onChange={(value) => handleFilterChange("team", value)} />
          <FilterDropdown label="Age Group" options={ageGroups} onChange={(value) => handleFilterChange("ageGroup", value)} />
          <FilterDropdown label="Gender" options={genders} onChange={(value) => handleFilterChange("gender", value)} />
          <FilterDropdown label="Event" options={events} onChange={(value) => handleFilterChange("event", value)} />
          <FilterDropdown label="Individual/Relay" options={types} onChange={(value) => handleFilterChange("type", value)} />
          <FilterDropdown label="Course" options={courses} onChange={(value) => handleFilterChange("course", value)} />
          <FilterDropdown label="Division" options={divisions} onChange={(value) => handleFilterChange("division", value)} />
        </div>
        <TopTimesTable data={filteredData} />
      </IonContent>
    </IonPage>
  );
}

export default TopTimesPage;
