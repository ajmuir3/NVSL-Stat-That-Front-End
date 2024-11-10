// FilterDropdown.tsx

import React, { useState } from 'react';
import { IonSelect, IonSelectOption, IonItem } from '@ionic/react';

interface FilterDropdownProps {
  years: string[];
  teams: string[];
  divisions: number[];
  onFilterChange: (year: string | null, team: string | null, division: number | null) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ years, teams, divisions, onFilterChange }) => {
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [selectedDivision, setSelectedDivision] = useState<number | null>(null);

  const handleYearChange = (event: CustomEvent) => {
    const value = event.detail.value;
    setSelectedYear(value === "All-Years" ? null : value);
    onFilterChange(value === "All-Years" ? null : value, selectedTeam, selectedDivision);
  };

  const handleTeamChange = (event: CustomEvent) => {
    const value = event.detail.value;
    setSelectedTeam(value === "All-Teams" ? null : value);
    onFilterChange(selectedYear, value === "All-Teams" ? null : value, selectedDivision);
  };

  const handleDivisionChange = (event: CustomEvent) => {
    const value = event.detail.value;
    setSelectedDivision(value === "All-Divisions" ? null : parseInt(value, 10));
    onFilterChange(selectedYear, selectedTeam, value === "All-Divisions" ? null : parseInt(value, 10));
  };

  return (
    <div>
      <IonItem>
        <IonSelect placeholder="Select Year" onIonChange={handleYearChange}>
          <IonSelectOption value="All-Years">All Years</IonSelectOption>
          {years.map((year) => (
            <IonSelectOption key={year} value={year}>
              {year}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonSelect placeholder="Select Team" onIonChange={handleTeamChange}>
          <IonSelectOption value="All-Teams">All Teams</IonSelectOption>
          {teams.map((team) => (
            <IonSelectOption key={team} value={team}>
              {team}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonSelect placeholder="Select Division" onIonChange={handleDivisionChange}>
          <IonSelectOption value="All-Divisions">All Divisions</IonSelectOption>
          {divisions.map((division) => (
            <IonSelectOption key={division} value={division.toString()}>
              {division}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
    </div>
  );
};

export default FilterDropdown;
