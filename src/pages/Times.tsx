import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import TopTimesTable from '../components/TopTimeTable';
import TopTimeFilter, { FilterCriteria } from '../components/TopTimeFilter';
import './Times.css';
import { useState } from 'react';

const mockData = [
  { rank: 1, name: 'Anthony Grimm', time: '25.40', powerIndex: '824.75', year: '2024' },
  { rank: 2, name: 'AJ Muir', time: '27.82', powerIndex: '535.35', year: '2024' },
  // Add mock data
];

const TimesPage: React.FC = () => {
  const [filteredData, setFilteredData] = useState(mockData);

  const handleFilterChange = (filters: FilterCriteria) => {
    // Apply your filtering logic here based on filters
    const data = mockData.filter((item) => {
      const matchesYear = filters.year ? item.year === filters.year : true;
      return matchesYear;
    });
    setFilteredData(data);
  };

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
        <TopTimeFilter onFilterChange={handleFilterChange} />
        <IonButton expand="block" color="primary">Find Times</IonButton>
        <TopTimesTable data={filteredData}/>
      </IonContent>
    </IonPage>
  );
};

export default TimesPage;