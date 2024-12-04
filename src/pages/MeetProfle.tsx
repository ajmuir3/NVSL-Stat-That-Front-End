import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from "@ionic/react";
import "./MeetProfile.css";

interface MeetData {
  meetID: string;
  date: string;
  location: string;
  course: string;
  name: string;
}

interface EventResult {
  eventID: string;
  name: string;
  teamID: string;
  time: number;
  powerIndex: number;
  place: number;
}

const MeetProfile: React.FC = () => {
  const { meetID } = useParams<{ meetID: string }>();
  const history = useHistory();

  const [meetData, setMeetData] = useState<MeetData | null>(null);
  const [eventResults, setEventResults] = useState<Record<string, EventResult[]>>({});
  const [teamScores, setTeamScores] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data for meetID:", meetID);
        setLoading(true);

        // Fetch meet, events, results, and related data
        const [meets, results, swimmers, events] = await Promise.all([
          fetch("/data/meet.json").then((res) => res.json()),
          fetch("/data/result.json").then((res) => res.json()),
          fetch("/data/swimmer.json").then((res) => res.json()),
          fetch("/data/event.json").then((res) => res.json()),
        ]);

        console.log("Meets data:", meets);
        console.log("Results data:", results);
        console.log("Swimmers data:", swimmers);
        console.log("Events data:", events);

        // Find the selected meet
        const meet = meets.find((m: any) => m.meetID === meetID);
        if (!meet) throw new Error(`Meet with ID ${meetID} not found`);

        console.log("Selected meet:", meet);

        // Process results by event
        const resultsByEvent: Record<string, EventResult[]> = {};
        const scores: Record<string, number> = {};

        results
          .filter((result: any) => result.meet_eventID.includes(meetID)) // Filter results by meetID
          .forEach((result: any) => {
            const event = events.find((e: any) => e.eventID === result.eventID);
            const swimmer = swimmers.find((sw: any) => sw.swimmerID === result.swimmerID);
            const teamID = swimmer?.teamID || "Unknown";

            console.log("Processing result:", result);
            console.log("Associated event:", event);
            console.log("Associated swimmer:", swimmer);

            if (!event || !swimmer) return;

            if (!resultsByEvent[event.eventID]) {
              resultsByEvent[event.eventID] = [];
            }

            resultsByEvent[event.eventID].push({
              eventID: event.eventID,
              name: swimmer.name,
              teamID,
              time: parseFloat(result.time),
              powerIndex: parseFloat(result.powerIndex),
              place: result.place,
            });

            // Calculate scores for each team
            scores[teamID] = (scores[teamID] || 0) + (result.points || 0);
          });

        console.log("Processed results by event:", resultsByEvent);
        console.log("Calculated team scores:", scores);

        setMeetData(meet);
        setEventResults(resultsByEvent);
        setTeamScores(scores);
      } catch (err: any) {
        console.error("Error fetching or processing data:", err);
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [meetID]);

  if (loading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Loading...</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="loading-container">Loading meet details...</div>
        </IonContent>
      </IonPage>
    );
  }

  if (error) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Error</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className="error-container">{error}</div>
          <IonButton onClick={() => history.goBack()}>Back to Results</IonButton>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{meetData?.name || "Meet Details"}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton className="back-button" onClick={() => history.push("/results")}>
          &lt; Back to Results
        </IonButton>
        <div className="meet-info">
          <h1>Meet Details</h1>
          <p><strong>Date:</strong> {meetData?.date}</p>
          <p><strong>Location:</strong> {meetData?.location}</p>
          <p><strong>Course:</strong> {meetData?.course}</p>
        </div>
        <div className="team-scores">
          <h2>Team Scores</h2>
          <ul>
            {Object.entries(teamScores).map(([teamID, score]) => (
              <li key={teamID}>
                <strong>{teamID}:</strong> {score} points
              </li>
            ))}
          </ul>
        </div>
        <div className="event-results">
          <h2>Event Results</h2>
          {Object.entries(eventResults).map(([eventID, results]) => (
            <div key={eventID} className="event-result">
              <h3>Event: {eventID}</h3>
              <table>
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
                  {results.map((result, idx) => (
                    <tr key={idx}>
                      <td>{result.place}</td>
                      <td>{result.name}</td>
                      <td>{result.teamID}</td>
                      <td>{result.time.toFixed(2)}</td>
                      <td>{result.powerIndex.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MeetProfile;
