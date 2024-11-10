import React, { useState } from 'react';
import { IonSelect, IonSelectOption } from '@ionic/react';

interface FilterDropdownProps {
  teams: string[];
  onFilterChange: (team: string | null) => void;
}

const TeamDropdown: React.FC<FilterDropdownProps> = ({teams, onFilterChange }) => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

    const handleTeamChange = (event: CustomEvent) => {
        const value = event.detail.value;
        const team = value === "All-Teams" ? null : value;
        setSelectedTeam(team);
        onFilterChange(team);
    };

    return (
        <div>
            <IonSelect placeholder="Select Team" onIonChange={handleTeamChange} value={selectedTeam}>
                <IonSelectOption value="All-Teams">All Teams</IonSelectOption>
                {teams.map((team) => (
                <IonSelectOption key={team} value={team}>
                    {team}
                </IonSelectOption>
                ))}
            </IonSelect>
        </div>
    );
};

export default TeamDropdown;
