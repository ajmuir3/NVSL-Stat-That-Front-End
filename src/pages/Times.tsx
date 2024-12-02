import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import FilterDropdown from '../components/FilterDropdown';
import TopTimesTable from '../components/TopTime-Table';
import './Times.css';

const mockTopTimesData = [
  { rank: 1, name: 'Anthony Grimm', team: 'Fair Oaks', time: '25.40', powerIndex: '824.75', year: '2024', meet: 'Dual Meet', ageGroup: '15-18', gender: 'Boys', type: 'Individual', event: '25 Free', course: 'Meters', division: 1 },
  { rank: 2, name: 'AJ Muir',  team: 'Rolling Hills', time: '27.82', powerIndex: '535.35', year: '2023', meet: 'Divisionals', ageGroup: '9-10', gender: 'Girls', type: 'Relay', event: '50 Fly', course: 'Yards', division: 2 },
  { rank: 3, name: 'Jacob Macrina',  team: 'Fox Hunt', time: '28.00', powerIndex: '530.63', year: '2022', meet: 'All Stars', ageGroup: 'Mixed Age', gender: 'Boys', type: 'Individual', event: '100 IM', course: 'Meters', division: 3 },
  { rank: 4, name: 'Eric Lundgren',  team: 'Brandywine', time: '28.10', powerIndex: '529.23', year: '2021', meet: 'All Meets', ageGroup: '13-14', gender: 'Girls', type: 'Individual', event: '50 Back', course: 'Yards', division: 4 },
  // Add more mock data...
];

function TopTimesPage() {
  const [filteredYear, setFilteredYear] = useState<string | null>(null);
  const [filteredTeam, setFilteredTeam] = useState<string | null>(null);
  const [filteredMeet, setFilteredMeet] = useState<string | null>(null);
  const [filteredAgeGroup, setFilteredAgeGroup] = useState<string | null>(null);
  const [filteredGender, setFilteredGender] = useState<string | null>(null);
  const [filteredType, setFilteredType] = useState<string | null>(null);
  const [filteredEvent, setFilteredEvent] = useState<string | null>(null);
  const [filteredCourse, setFilteredCourse] = useState<string | null>(null);
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
  const meets = ['Dual Meet', 'Division Relay Carnival', 'Divisionals', 'All Star Relay Carnival', 'All Stars'];
  const ageGroups = ['8&U', '9-10', '11-12', '13-14', '15-18', 'Mixed Age'];
  const genders = ['Boys', 'Girls'];
  const types = ['Individual', 'Relay'];
  const events = ['25 Free', '25 Back', '25 Breast', '25 Fly', '50 Free', '50 Back', '50 Breast', '50 Fly', '100 IM', '100 Free Relay', '100 Medley Relay', '200 Medley Relay', '200 Free Relay'];
  const courses = ['Meters', 'Yards'];
  const divisions = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleFilterChange = (filterType: string, value: string | number | null) => {
    switch (filterType) {
      case 'year':
        setFilteredYear(value as string | null);
        break;
      case 'team':
        setFilteredTeam(value as string | null);
        break;
      case 'meet':
        setFilteredMeet(value as string | null);
        break;
      case 'ageGroup':
        setFilteredAgeGroup(value as string | null);
        break;
      case 'gender':
        setFilteredGender(value as string | null);
        break;
      case 'type':
        setFilteredType(value as string | null);
        break;
      case 'event':
        setFilteredEvent(value as string | null);
        break;
      case 'course':
        setFilteredCourse(value as string | null);
        break;
      case 'division':
        setFilteredDivision(value as number | null);
        break;
      default:
        break;
    }
  };

  const filteredData = mockTopTimesData.filter((item) => {
    const matchesYear = filteredYear ? item.year === filteredYear : true;
    const matchesTeam = filteredTeam ? item.team === filteredTeam : true;
    const matchesMeet = filteredMeet ? item.meet === filteredMeet : true;
    const matchesAgeGroup = filteredAgeGroup ? item.ageGroup === filteredAgeGroup : true;
    const matchesGender = filteredGender ? item.gender === filteredGender : true;
    const matchesType = filteredType ? item.type === filteredType : true;
    const matchesEvent = filteredEvent ? item.event === filteredEvent : true;
    const matchesCourse = filteredCourse ? item.course === filteredCourse : true;
    const matchesDivision = filteredDivision ? item.division === filteredDivision : true;
    return matchesYear && matchesTeam && matchesMeet && matchesAgeGroup && matchesGender && matchesType && matchesEvent && matchesCourse && matchesDivision;
  });

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
          <FilterDropdown label="Year" options={[...years]} onChange={(value) => handleFilterChange('year', value)} />
          <FilterDropdown label="Team" options={[...teams]} onChange={(value) => handleFilterChange('team', value)} />
          <FilterDropdown label="Meet Type" options={[...meets]} onChange={(value) => handleFilterChange('meet', value)} />
          <FilterDropdown label="Age Group" options={[...ageGroups]} onChange={(value) => handleFilterChange('ageGroup', value)} />
          <FilterDropdown label="Gender" options={[...genders]} onChange={(value) => handleFilterChange('gender', value)} />
          <FilterDropdown label="Type" options={[...types]} onChange={(value) => handleFilterChange('type', value)} />
          <FilterDropdown label="Event" options={[...events]} onChange={(value) => handleFilterChange('event', value)} />
          <FilterDropdown label="Course" options={[...courses]} onChange={(value) => handleFilterChange('course', value)} />
          <FilterDropdown label="Division" options={[...divisions]} onChange={(value) => handleFilterChange('division', value)} />
        </div>
        <TopTimesTable data={filteredData} />
      </IonContent>
    </IonPage>
  );
}

export default TopTimesPage;
