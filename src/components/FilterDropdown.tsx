import React, { useState } from 'react';
import { IonSelect, IonSelectOption, IonItem } from '@ionic/react';
import './FilterDropdown.css'; // Import the custom styles

interface FilterDropdownProps {
  label: string;
  options: string[];
  onChange: (value: string | null) => void; // Restrict to string | null
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, options, onChange }) => {
  const [selectedValue, setSelectedValue] = useState<string | number | null>(null);

  // Create a unique set of options to remove duplicates
  const uniqueOptions = Array.from(new Set(options));

  const handleChange = (event: CustomEvent) => {
    const value = event.detail.value;
    setSelectedValue(value === `All ${label}s` ? null : value);
    onChange(value === `All ${label}s` ? null : value);
  };

  return (
    <div className="filter-dropdown-container">
      <IonItem>
        <IonSelect
          placeholder={`Select ${label}`}
          value={selectedValue}
          onIonChange={handleChange}
        >
          <IonSelectOption value={`All ${label}s`}>All {label}s</IonSelectOption>
          {uniqueOptions.map((option) => (
            <IonSelectOption key={option.toString()} value={option}>
              {option}
            </IonSelectOption>
          ))}
        </IonSelect>
      </IonItem>
    </div>
  );
};

export default FilterDropdown;
