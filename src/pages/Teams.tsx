import React, { useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import FilterDropdown from '../components/FilterDropdown'; // Assuming you use the FilterDropdown
import './Teams.css';

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

function TeamsPage() {
  const [filteredTeam, setFilteredTeam] = useState<string | null>(null);

  const handleFilterChange = (team: string | null) => {
    setFilteredTeam(team);
  };

  const filteredTeams = filteredTeam
    ? teams.filter((team) => team.toLowerCase().includes(filteredTeam.toLowerCase()))
    : teams;

  const groupedTeams = filteredTeams.reduce((groups: { [key: string]: string[] }, team) => {
    const firstLetter = team.charAt(0).toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(team);
    return groups;
  }, {});

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">Teams</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className='teams-page'>
          <div className="teams-header">
            <h1>Teams in the NVSL</h1>
          </div>
          <FilterDropdown
            label="Team Name"
            options={['All Teams', ...teams]}
            onChange={(value) => handleFilterChange(value as string | null)}
          />
          <div className="teams-container">
            {Object.keys(groupedTeams).sort().map((letter) => (
              <div key={letter} className="team-group">
                <h2>{letter}</h2>
                <div className="team-list">
                  {groupedTeams[letter].map((team) => (
                    <IonButton
                      key={team}
                      fill="clear"
                      className="team-button"
                      href={`/teams/team-profile/${team.toLowerCase().replace(/\s/g, '-')}`}
                    >
                      {team}
                    </IonButton>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default TeamsPage;
