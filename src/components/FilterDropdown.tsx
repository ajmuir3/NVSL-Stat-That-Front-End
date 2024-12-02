import React, { useState } from 'react';
import { IonSelect, IonSelectOption, IonItem } from '@ionic/react';
import './FilterDropdown.css'; // Import the custom styles

interface FilterDropdownProps {
  label: string; // Add a label prop for dynamic labels
  options: (string | number)[]; // Handle both strings and numbers for flexibility
  onChange: (value: string | number | null) => void; // Handle change events
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
