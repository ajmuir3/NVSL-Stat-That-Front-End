import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSpinner } from '@ionic/react';
import './Rankings.css';
import Dropdown from '../components/Dropdown';
import StripedRowExample from '../components/Rankings-Table';

const RankingsPage: React.FC = () => {
  const [rankings, setRankings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [year, setYear] = useState<number | null>(2024); // Default year
  const [team, setTeam] = useState<string | null>(null);
  const [division, setDivision] = useState<number | null>(null);

  const nvslTeams = [
    "Annandale",
    "Arlington Forest",
    "Brandywine",
    "Bren Mar",
    "Bren Mar-Edsall Park",
    "Brookfield",
    "Broyhill Crest",
    "Burke Station",
    "Camelot",
    "Canterbury Woods",
    "Cardinal Hill",
    "Chesterbrook",
    "Commonwealth",
    "Cottontail",
    "Country Club Hills",
    "Crosspointe",
    "Daventry",
    "Dominion Hills",
    "Donaldson Run",
    "Dowden Terrace",
    "Dunn Loring",
    "Edsall Park",
    "Fair Oaks",
    "Fair Oaks (prov)",
    "Faircrest",
    "Fairfax",
    "Fairfax Club Estates",
    "Fairfax Station",
    "Forest Hollow",
    "Fox Hunt",
    "Fox Mill Estates",
    "Fox Mill Woods",
    "Freedom Park",
    "Great Falls",
    "Greenbriar",
    "Hamlet",
    "Hayfield Farm",
    "Herndon",
    "Hiddenbrook",
    "High Point Pool",
    "Highland Park",
    "Highlands Swim",
    "Hollin Hills",
    "Hollin Meadows",
    "Holmes Run Acres",
    "Hunt Valley",
    "Hunter Mill",
    "Ilda Community",
    "Kent Gardens",
    "Kings Ridge",
    "Lake Braddock",
    "Lakevale Estates",
    "Lakeview",
    "Langley",
    "Laurel Hill",
    "Lee Graham",
    "Lincolnia Park",
    "Little Hunting Park",
    "Little Rocky Run",
    "Long Branch",
    "Lorton Station",
    "Mansion House",
    "Mantua",
    "McLean",
    "Mosby Woods",
    "Mount Vernon Park",
    "Newington Forest",
    "Newington Station",
    "North Springfield",
    "Oakton",
    "Old Keene Mill",
    "Orange Hunt",
    "Overlee",
    "Parklawn",
    "Parliament",
    "Penderbrook",
    "Pinecrest",
    "Pinewood Lake",
    "Pleasant Valley",
    "Poplar Heights",
    "Poplar Tree",
    "Ravensworth Farm",
    "Riverside Gardens",
    "Rolling Forest",
    "Rolling Hills",
    "Rolling Valley",
    "Royal Pool",
    "Rutherford",
    "Shouse Village",
    "Sideburn Run",
    "Sleepy Hollow B & R",
    "Sleepy Hollow Rec",
    "Somerset-Olde Creek",
    "South Run",
    "Springboard",
    "Springfield",
    "Stratford",
    "Sully Station",
    "Sully Station II",
    "Truro",
    "Tuckahoe",
    "Vienna Aquatic",
    "Vienna Woods",
    "Villa Aquatic",
    "Village West",
    "Virginia Hills",
    "Virginia Run",
    "Wakefield Chapel",
    "Walden Glen",
    "Waynewood",
    "Woodley"
  ];

  useEffect(() => {
    const fetchRankings = async () => {
      setLoading(true);
      setError(null);

      let url = `http://3.85.216.18:3000/team-rankings?year=${year}`;
      if (team && team !== 'All-Teams') url += `&team=${encodeURIComponent(team)}`;
      if (division && division.toString() !== 'All-Divisions') url += `&division=${division}`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error fetching rankings: ${response.statusText}`);
        }
        const data = await response.json();
        setRankings(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRankings();
  }, [year, team, division]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">Rankings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="header-section">
          <h1 className="page-header">Rankings</h1>
        </div>
        <div className="content-container">
          <h2>Team Rankings</h2>

          <Dropdown
            label="Select Year"
            options={[
              { value: 'All-Years', label: 'All Years' },
              { value: 2024, label: '2024' },
              { value: 2023, label: '2023' },
              { value: 2022, label: '2022' },
              { value: 2021, label: '2021' },
            ]}
            onChange={(value) => setYear(Number(value))}
          />

          <Dropdown
            label="Select Team"
            options={[
              { value: 'All-Teams', label: 'All Teams' },
              ...nvslTeams.map((team) => ({ value: team, label: team })),
            ]}
            onChange={(value) => setTeam(value.toString())}
          />

          <Dropdown
            label="Select Division"
            options={[
              { value: 'All-Divisions', label: 'All Divisions' },
              ...Array.from({ length: 17 }, (_, i) => ({ value: i + 1, label: (i + 1).toString() })),
            ]}
            onChange={(value) => setDivision(value === 'All-Divisions' ? null : Number(value))}
          />

          {loading ? (
            <IonSpinner name="crescent" />
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <StripedRowExample data={rankings} />
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RankingsPage;
