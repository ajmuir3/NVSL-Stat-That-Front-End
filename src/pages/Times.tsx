import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from "@ionic/react";
import { useMemo, useState } from "react";
import FilterDropdown from "../components/FilterDropdown";
import TopTimesTable from "../components/TopTime-Table";
import './Times.css';

// Constants
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
  "Annandale", "Arlington Forest", "Brandywine", "Broyhill Crest", "Brookfield", "Burke Station",
  "Chesterbrook", "Camelot", "Country Club Hills", "Cardinal Hill", "Crosspointe", "Commonwealth"
].sort();
const ageGroups = ["8&U", "9-10", "11-12", "13-14", "15-18", "Mixed Age"];
const genders = ["Boys", "Girls"];
const types = ["Individual", "Relay"];
const events = [
  "25 Free", "25 Back", "25 Breast", "25 Fly", "50 Free", "50 Back", 
  "50 Breast", "50 Fly", "100 IM", "100 Free Relay", "200 Medley Relay"
];
const courses = ["Meters", "Yards"];
const divisions = Array.from({ length: 5 }, (_, i) => (i + 1).toString());

// Generate Mock Data
const generateDummyData = () => {
  const data = [];
  for (const team of all_teams) {
    for (const ageGroup of ageGroups) {
      for (const gender of genders) {
        for (const type of types) {
          for (const event of events) {
            for (const course of courses) {
              for (const division of divisions) {
                data.push({
                  name: `Swimmer ${Math.floor(Math.random() * 1000)}`,
                  team,
                  ageGroup,
                  gender,
                  type,
                  event,
                  time: parseFloat((Math.random() * 100).toFixed(2)),
                  powerIndex: parseFloat((Math.random() * 10).toFixed(2)),
                  year: "2021",
                  stroke: event.split(" ")[1] || "Free",
                  distance: parseInt(event.split(" ")[0], 10) || 50,
                  course,
                  division: parseInt(division, 10),
                });
              }
            }
          }
        }
      }
    }
  }
  return data;
};

const dummyData = generateDummyData();

function TopTimesPage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const handleFilterChange = (key: string, value: string | number | null) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = useMemo(() => {
    return dummyData
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
  }, [filters]);

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
          <FilterDropdown label="Team" options={all_teams} onChange={(value) => handleFilterChange("team", value)} />
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
