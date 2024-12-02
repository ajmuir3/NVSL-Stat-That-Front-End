import React, { useState, useEffect } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import './MeetResults.css';

interface EventResult {
  event: string;
  ageGroup: string;
  gender: string;
  distance: string;
  stroke: string;
  points: { home: number; away: number };
  results: Array<{
    place: number;
    name: string;
    team: string;
    time: string;
    powerIndex: number;
  }>;
}

interface MeetData {
  date: string;
  location: string;
  course: string;
  homeTeam: string;
  awayTeam: string;
  events: EventResult[];
}

const mockMeetData: Record<string, MeetData> = {
  'dominion-hills-vs-rolling-hills': {
    date: '6/15/24',
    location: 'Springfield',
    course: '25M',
    homeTeam: 'Rolling Hills',
    awayTeam: 'Dominion Hills',
    events: [
      {
        event: 'Event 1: Boys 8&U 25M Freestyle',
        ageGroup: '8&U',
        gender: 'Boys',
        distance: '25',
        stroke: 'Freestyle',
        points: { home: 8, away: 1 },
        results: [
          { place: 1, name: 'Winston Morgan', team: 'RH', time: '17.03', powerIndex: 697 },
          { place: 2, name: 'Keegan Donnelly', team: 'RH', time: '17.60', powerIndex: 600 },
          { place: 3, name: 'Andrew M Aldonas', team: 'DH', time: '19.14', powerIndex: 423 },
          { place: 4, name: 'Hunter J Giroux', team: 'RH', time: '21.03', powerIndex: 325 },
          { place: 5, name: 'Will D Ryan', team: 'DH', time: '21.25', powerIndex: 300 },
          { place: 6, name: 'Wilder Jones', team: 'DH', time: '26.39', powerIndex: 250 },
        ],
      },
      {
        event: 'Event 2: Girls 8&U 25M Freestyle',
        ageGroup: '8&U',
        gender: 'Girls',
        distance: '25',
        stroke: 'Freestyle',
        points: { home: 8, away: 1 },
        results: [
          { place: 1, name: 'Winston Morgan', team: 'RH', time: '17.03', powerIndex: 697 },
          { place: 2, name: 'Keegan Donnelly', team: 'RH', time: '17.60', powerIndex: 600 },
          { place: 3, name: 'Andrew M Aldonas', team: 'DH', time: '19.14', powerIndex: 423 },
          { place: 4, name: 'Hunter J Giroux', team: 'RH', time: '21.03', powerIndex: 325 },
          { place: 5, name: 'Will D Ryan', team: 'DH', time: '21.25', powerIndex: 300 },
          { place: 6, name: 'Wilder Jones', team: 'DH', time: '26.39', powerIndex: 250 },
        ],
      },
    ],
  },
};

const MeetResultsPage: React.FC = () => {
  const { meetId } = useParams<{ meetId: string }>();
  const history = useHistory();

  const meetData = mockMeetData[meetId];

  if (!meetData) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Meet Not Found</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <p className="error-message">Sorry, the meet you are looking for does not exist.</p>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Meet Results</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="meet-header">
          <IonButton className="back-button" onClick={() => history.push('/results')}>
            &lt; Back to Results
          </IonButton>
          <h1>Meet Results for {meetData.awayTeam} at {meetData.homeTeam}</h1>
          <div className="meet-info">
            <p><strong>Date:</strong> {meetData.date}</p>
            <p><strong>Location:</strong> {meetData.location}</p>
            <p><strong>Course:</strong> {meetData.course}</p>
          </div>
        </div>
        {meetData.events.map((event, index) => (
          <div key={index} className="event-section">
            <div className="event-header">
              <h2>{event.event}</h2>
              <p>RH: {event.points.home} | DH: {event.points.away}</p>
            </div>
            <table className="event-table">
              <thead>
                <tr>
                  <th>Place</th>
                  <th>Name</th>
                  <th>Team</th>
                  <th>Time</th>
                  <th>Power Index</th>
                </tr>
              </thead>
              <tbody>
                {event.results.map((result, idx) => (
                  <tr key={idx}>
                    <td>{result.place}</td>
                    <td>{result.name}</td>
                    <td>{result.team}</td>
                    <td>{result.time}</td>
                    <td>{result.powerIndex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default MeetResultsPage;
