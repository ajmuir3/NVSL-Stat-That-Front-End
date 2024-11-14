import React, { useState } from 'react';
import { IonCol, IonGrid, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
//import './TopTimeFilter.css';

interface TopTimeFilterProps {
  onFilterChange: (filters: FilterCriteria) => void;
}

export interface FilterCriteria {
  meetType: string | null;
  year: string | null;
  team: string | null;
  division: string | null;
  ageGroup: string | null;
  gender: string | null;
  individualRelay: string | null;
  distance: string | null;
  course: string | null;
  stroke: string | null;
}

const TopTimeFilter: React.FC<TopTimeFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterCriteria>({
    meetType: null,
    year: null,
    team: null,
    division: null,
    ageGroup: null,
    gender: null,
    individualRelay: null,
    distance: null,
    course: null,
    stroke: null,
  });

  const handleFilterChange = (key: keyof FilterCriteria, value: string | null) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <IonGrid>
    <IonRow>
        <IonCol size="12" sizeMd="4">
          <IonSelect
            label="Meet Type"
            labelPlacement="floating"
            className="dropdown"
            value={filters.meetType}
            onIonChange={(e) => handleFilterChange('meetType', e.detail.value)}
          >
            <IonSelectOption value="All">All Meet Types</IonSelectOption>
            <IonSelectOption value="Dual Meet">Dual Meet</IonSelectOption>
            <IonSelectOption value="Division Relay Carnival">Division Relay Carnival</IonSelectOption>
            <IonSelectOption value="Divisionals">Divisionals</IonSelectOption>
            <IonSelectOption value="All Star Relay Carninval">All Star Relay Carninval</IonSelectOption>
            <IonSelectOption value="All Stars">All Stars</IonSelectOption>
          </IonSelect>
        </IonCol>
    </IonRow>
    <IonRow>
        <IonCol size="12" sizeMd="4">
          <IonSelect
            label="Year"
            labelPlacement="floating"
            className="dropdown"
            value={filters.year}
            onIonChange={(e) => handleFilterChange('year', e.detail.value)}
          >
            <IonSelectOption value="All-Years">All Years</IonSelectOption>
            <IonSelectOption value="2024">2024</IonSelectOption>
            <IonSelectOption value="2023">2023</IonSelectOption>
            <IonSelectOption value="2022">2022</IonSelectOption>
            <IonSelectOption value="2021">2021</IonSelectOption>
          </IonSelect>
        </IonCol>

        <IonCol size="12" sizeMd="4">
          <IonSelect
            label="Team"
            labelPlacement="floating"
            className="dropdown"
            value={filters.team}
            onIonChange={(e) => handleFilterChange('team', e.detail.value)}
          >
            <IonSelectOption value="All-Teams">All Teams</IonSelectOption>
            <IonSelectOption value="Annandale">Annandale</IonSelectOption>
            <IonSelectOption value="Arlington-Forest">Arlington Forest</IonSelectOption>
            <IonSelectOption value="Brandywine">Brandywine</IonSelectOption>
            <IonSelectOption value="Brookfield">Brookfield</IonSelectOption>
            <IonSelectOption value="Broyhill-Crest">Broyhill Crest</IonSelectOption>
            <IonSelectOption value="Burke-Station">Burke Station</IonSelectOption>
            <IonSelectOption value="Camelot">Camelot</IonSelectOption>
            <IonSelectOption value="Canterbury-Woods">Canterbury Woods</IonSelectOption>
            <IonSelectOption value="Cardinal-Hill">Cardinal Hill</IonSelectOption>
            <IonSelectOption value="Chesterbrook">Chesterbrook</IonSelectOption>
            <IonSelectOption value="Commonwealth">Commonwealth</IonSelectOption>
            <IonSelectOption value="Cottontail">Cottontail</IonSelectOption>
            <IonSelectOption value="Country-Club-Hills">Country Club Hills</IonSelectOption>
            <IonSelectOption value="Crosspointe">Crosspointe</IonSelectOption>
            <IonSelectOption value="Daventry">Daventry</IonSelectOption>
            <IonSelectOption value="Dominion-Hills">Dominion Hills</IonSelectOption>
            <IonSelectOption value="Donaldson-Run">Donaldson Run</IonSelectOption>
            <IonSelectOption value="Dowden-Terrace">Dowden Terrace</IonSelectOption>
            <IonSelectOption value="Dunn-Loring">Dunn Loring</IonSelectOption>
            <IonSelectOption value="Edsall-Park">Edsall Park</IonSelectOption>
            <IonSelectOption value="Fair-Oaks">Fair Oaks</IonSelectOption>
            <IonSelectOption value="Fairfax">Fairfax</IonSelectOption>
            <IonSelectOption value="Fairfax-Club-Estates">Fairfax Club Estates</IonSelectOption>
            <IonSelectOption value="Fairfax-Station">Fairfax Station</IonSelectOption>
            <IonSelectOption value="Forest-Hollow">Forest Hollow</IonSelectOption>
            <IonSelectOption value="Fox-Hunt">Fox Hunt</IonSelectOption>
            <IonSelectOption value="Fox-Mill-Estates">Fox Mill Estates</IonSelectOption>
            <IonSelectOption value="Fox-Mill-Woods">Fox Mill Woods</IonSelectOption>
            <IonSelectOption value="Great-Falls">Great Falls</IonSelectOption>
            <IonSelectOption value="Greenbriar">Greenbriar</IonSelectOption>
            <IonSelectOption value="Hollin-Hills">Hollin Hills</IonSelectOption>
            <IonSelectOption value="Hunter-Mill">Hunter Mill</IonSelectOption>
            <IonSelectOption value="Hunt-Valley">Hunt Valley</IonSelectOption>
            <IonSelectOption value="Kent-Gardens">Kent Gardens</IonSelectOption>
            <IonSelectOption value="Kings-Ridge">Kings Ridge</IonSelectOption>
            <IonSelectOption value="Langley">Langley</IonSelectOption>
            <IonSelectOption value="Lakevale-Estates">Lakevale Estates</IonSelectOption>
            <IonSelectOption value="Little-Hunting-Park">Little Hunting Park</IonSelectOption>
            <IonSelectOption value="Long-Branch">Long Branch</IonSelectOption>
            <IonSelectOption value="Mantua">Mantua</IonSelectOption>
            <IonSelectOption value="Mclean">Mclean</IonSelectOption>
            <IonSelectOption value="Mosby-Woods">Mosby Woods</IonSelectOption>
            <IonSelectOption value="Mount-Vernon-Park">Mount Vernon Park</IonSelectOption>
            <IonSelectOption value="Newport">Newport</IonSelectOption>
            <IonSelectOption value="Oakton">Oakton</IonSelectOption>
            <IonSelectOption value="Old-Keene-Mill">Old Keene Mill</IonSelectOption>
            <IonSelectOption value="Orange-Hunt">Orange Hunt</IonSelectOption>
            <IonSelectOption value="Parliament">Parliament</IonSelectOption>
            <IonSelectOption value="Pinecrest">Pinecrest</IonSelectOption>
            <IonSelectOption value="Poplar-Tree">Poplar Tree</IonSelectOption>
            <IonSelectOption value="Ravensworth-Farm">Ravensworth Farm</IonSelectOption>
            <IonSelectOption value="Riverside-Gardens">Riverside Gardens</IonSelectOption>
            <IonSelectOption value="Rolling-Forest">Rolling Forest</IonSelectOption>
            <IonSelectOption value="Rolling-Hills">Rolling Hills</IonSelectOption>
            <IonSelectOption value="Rolling-Valley">Rolling Valley</IonSelectOption>
            <IonSelectOption value="Rutherford">Rutherford</IonSelectOption>
            <IonSelectOption value="Shouse-Village">Shouse Village</IonSelectOption>
            <IonSelectOption value="Sideburn-Run">Sideburn Run</IonSelectOption>
            <IonSelectOption value="Sleepy-Hollow-B-&-R">Sleepy Hollow B & R</IonSelectOption>
            <IonSelectOption value="Sleepy-Hollow-Rec">Sleepy Hollow Rec</IonSelectOption>
            <IonSelectOption value="Somerset-Olde-Creek">Somerset Olde Creek</IonSelectOption>
            <IonSelectOption value="South-Run">South Run</IonSelectOption>
            <IonSelectOption value="Springboard">Springboard</IonSelectOption>
            <IonSelectOption value="Springfield">Springfield</IonSelectOption>
            <IonSelectOption value="Stratford">Stratford</IonSelectOption>
            <IonSelectOption value="Sully-Station">Sully Station</IonSelectOption>
            <IonSelectOption value="Sully-Station-II">Sully Station II</IonSelectOption>
            <IonSelectOption value="Truro">Truro</IonSelectOption>
            <IonSelectOption value="Tuckahoe">Tuckahoe</IonSelectOption>
            <IonSelectOption value="Vienna-Aquatic">Vienna Aquatic</IonSelectOption>
            <IonSelectOption value="Vienna-Woods">Vienna Woods</IonSelectOption>
            <IonSelectOption value="Villa-Aquatic">Villa Aquatic</IonSelectOption>
            <IonSelectOption value="Village-West">Village West</IonSelectOption>
            <IonSelectOption value="Virginia-Hills">Virginia Hills</IonSelectOption>
            <IonSelectOption value="Virginia-Run">Virginia Run</IonSelectOption>
            <IonSelectOption value="Wakefield-Chapel">Wakefield Chapel</IonSelectOption>
            <IonSelectOption value="Walden-Glen">Walden Glen</IonSelectOption>
            <IonSelectOption value="Waynewood">Waynewood</IonSelectOption>
            <IonSelectOption value="Woodley">Woodley</IonSelectOption>
        </IonSelect>
        </IonCol>

        <IonCol size="12" sizeMd="4">
          <IonSelect
            label="Division"
            labelPlacement="floating"
            className="dropdown"
            value={filters.division}
            onIonChange={(e) => handleFilterChange('division', e.detail.value)}
          >
            <IonSelectOption value="All-Divisions">All Divisions</IonSelectOption>
            {[...Array(17).keys()].map((division) => (
              <IonSelectOption key={division + 1} value={(division + 1).toString()}>
                {division + 1}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonCol>
      </IonRow>

      <IonRow>
        <IonCol size="12" sizeMd="4">
          <IonSelect
            label="Age Group"
            labelPlacement="floating"
            className="dropdown"
            value={filters.ageGroup}
            onIonChange={(e) => handleFilterChange('ageGroup', e.detail.value)}
          >
            <IonSelectOption value="All">All Age Groups</IonSelectOption>
            <IonSelectOption value="8">8 & Under</IonSelectOption>
            <IonSelectOption value="9">9-10</IonSelectOption>
            <IonSelectOption value="9">11-12</IonSelectOption>
            <IonSelectOption value="9">13-14</IonSelectOption>
            <IonSelectOption value="9">15-18</IonSelectOption>
            <IonSelectOption value="9">Mixed Age</IonSelectOption>
          </IonSelect>
        </IonCol>

        <IonCol size="12" sizeMd="4">
          <IonSelect
            label="Gender"
            labelPlacement="floating"
            className="dropdown"
            value={filters.gender}
            onIonChange={(e) => handleFilterChange('gender', e.detail.value)}
          >
            <IonSelectOption value="All">All Genders</IonSelectOption>
            <IonSelectOption value="Male">Boys</IonSelectOption>
            <IonSelectOption value="Female">Girls</IonSelectOption>
          </IonSelect>
        </IonCol>
        <IonCol size="12" sizeMd="4">
          <IonSelect
            label="Individual/Relay"
            labelPlacement="floating"
            className="dropdown"
            value={filters.gender}
            onIonChange={(e) => handleFilterChange('individualRelay', e.detail.value)}
          >
            <IonSelectOption value="Individual">Individual</IonSelectOption>
            <IonSelectOption value="Relay">Relay</IonSelectOption>
          </IonSelect>
        </IonCol>
        <IonCol size="12" sizeMd="4">
          <IonSelect
            label="Event"
            labelPlacement="floating"
            className="dropdown"
            value={filters.gender}
            onIonChange={(e) => handleFilterChange('stroke', e.detail.value)}
          >
            <IonSelectOption value="All">All Events</IonSelectOption>
            <IonSelectOption value="25 Free">25 Free</IonSelectOption>
            <IonSelectOption value="25 Back">25 Back</IonSelectOption>
            <IonSelectOption value="25 Breast">25 Breast</IonSelectOption>
            <IonSelectOption value="25 Fly">25 Fly</IonSelectOption>
            <IonSelectOption value="50 Free">50 Free</IonSelectOption>
            <IonSelectOption value="50 Back">50 Back</IonSelectOption>
            <IonSelectOption value="50 Breast">50 Breast</IonSelectOption>
            <IonSelectOption value="50 Fly">50 Fly</IonSelectOption>
            <IonSelectOption value="100 IM">100 IM</IonSelectOption>
            <IonSelectOption value="100 Free Relay">100 Free Relay</IonSelectOption>
            <IonSelectOption value="100 Medley Relay">100 Medley Relay</IonSelectOption>
            <IonSelectOption value="200 Medley Relay">200 Medley Relay</IonSelectOption>
            <IonSelectOption value="200 Free Relay">200 Free Relay</IonSelectOption>
          </IonSelect>
        </IonCol>
        <IonCol size="12" sizeMd="4">
          <IonSelect
            label="Course"
            labelPlacement="floating"
            className="dropdown"
            value={filters.gender}
            onIonChange={(e) => handleFilterChange('course', e.detail.value)}
          >
            <IonSelectOption value="All">All Courses</IonSelectOption>
            <IonSelectOption value="Meters">Meters</IonSelectOption>
            <IonSelectOption value="Yards">Yards</IonSelectOption>
            
          </IonSelect>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default TopTimeFilter;
