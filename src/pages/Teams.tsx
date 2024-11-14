import React, { useState } from 'react';
import { IonSelect, IonSelectOption, IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol } from '@ionic/react';
import { Link } from 'react-router-dom';

const teams = [
  'Annandale',
  'Arlington Forest',
  'Brandywine',
  'Broyhill Crest',
  'Brookfield',
  'Burke Station',
  'Camelot',
  'Canterbury Woods',
  'Cardinal Hill',
  'Chesterbrook',
  'Commonwealth',
  'Cottontail',
  'Country Club Hills',
  'Crosspointe',
  'Daventry',
  'Dominion Hills',
  'Donaldson Run',
  'Dowden Terrace',
  'Dunn Loring',
  'Edsall Park',
  'Fair Oaks',
  'Fairfax',
  'Fairfax Club Estates',
  'Fairfax Station',
  'Forest Hollow',
  'Fox Hunt',
  'Fox Mill Estates',
  'Fox Mill Woods',
  'Great Falls',
  'Greenbriar',
  'Hollin Hills',
  'Hunter Mill',
  'Hunt Valley',
  'Kent Gardens',
  'Kings Ridge',
  'Langley',
  'Lakevale Estates',
  'Little Hunting Park',
  'Long Branch',
  'Mantua',
  'Mclean',
  'Mosby Woods',
  'Mount Vernon Park',
  'Newport',
  'Oakton',
  'Old Keene Mill',
  'Orange Hunt',
  'Parliament',
  'Pinecrest',
  'Poplar Tree',
  'Ravensworth Farm',
  'Riverside Gardens',
  'Rolling Forest',
  'Rolling Hills',
  'Rolling Valley',
  'Rutherford',
  'Shouse Village',
  'Sideburn Run',
  'Sleepy Hollow B & R',
  'Sleepy Hollow Rec',
  'Somerset Olde Creek',
  'South Run',
  'Springboard',
  'Springfield',
  'Stratford',
  'Sully Station',
  'Sully Station II',
  'Truro',
  'Tuckahoe',
  'Vienna Aquatic',
  'Vienna Woods',
  'Villa Aquatic',
  'Village West',
  'Virginia Hills',
  'Virginia Run',
  'Wakefield Chapel',
  'Walden Glen',
  'Waynewood',
  'Woodley',
];


const TeamsPage: React.FC = () => {
  const [filterLetter, setFilterLetter] = useState<string>('All');

  // Filter teams by selected letter
  const filteredTeams = filterLetter === 'All'
    ? teams
    : teams.filter((team) => team.startsWith(filterLetter));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">Teams</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="header-section">
          <h1 className="page-header">Teams in the NVSL</h1>
        </div>
        <div className="filter-section">
          <IonSelect
            label="Your Team"
            labelPlacement="floating"
            value={filterLetter}
            onIonChange={(e) => setFilterLetter(e.detail.value)}
          >
            <IonSelectOption value="All">All Teams</IonSelectOption>
            {[...'ABCDEFGHKLMNOPRSTVW'].map((letter) => (
              <IonSelectOption key={letter} value={letter}>
                {letter}
              </IonSelectOption>
            ))}
          </IonSelect>
        </div>
        <IonGrid>
          {Object.entries(
            filteredTeams.reduce((acc: Record<string, string[]>, team) => {
              const letter = team[0].toUpperCase();
              if (!acc[letter]) acc[letter] = [];
              acc[letter].push(team);
              return acc;
            }, {})
          ).map(([letter, teamList]) => (
            <IonRow key={letter}>
              <IonCol size="12">
                <h2>{letter}</h2>
              </IonCol>
              {teamList.map((team) => (
                <IonCol size="6" sizeMd="3" key={team}>
                  <Link to={`/teams/${team.replace(/\s/g, '-').toLowerCase()}`} className="team-link">
                    {team}
                  </Link>
                </IonCol>
              ))}
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default TeamsPage;
