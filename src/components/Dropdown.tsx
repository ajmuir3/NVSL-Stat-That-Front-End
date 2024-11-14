import { IonSelect, IonSelectOption } from '@ionic/react';
import './Dropdown.css';

interface DropdownProps {
  label: string;
  options: Array<{ value: string | number; label: string }>;
  onChange: (value: string | number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, onChange }) => {
  return (
    <div className='dropdown'>
      <IonSelect
        label={label}
        labelPlacement="floating"
        className='dropdown-select'
        onIonChange={(e) => onChange(e.detail.value)}
      >
        {options.map((option) => (
          <IonSelectOption key={option.value} value={option.value}>
            {option.label}
          </IonSelectOption>
        ))}
      </IonSelect>
    </div>
  );
};

export default Dropdown;
