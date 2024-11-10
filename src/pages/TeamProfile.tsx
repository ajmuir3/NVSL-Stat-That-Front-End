// TeamProfile.tsx
import React from 'react';
import { useLocation } from 'react-router-dom';

const team = "Rolling Hills";

const TeamProfile: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const team = queryParams.get('team');

  console.log("Team parameter from URL:", team); // Debugging line

  return (
    <div>
      <h1>Team Profile</h1>
      <h1>Team Profile</h1>
      <h1>Team Profile</h1>
      <h1>Team Profile</h1>
      <h1>Team Profile</h1>
      <h1>Team Profile</h1>
      <h1>Team Profile</h1>
      <h1>Team Profile</h1>
      <h1>Team Profile</h1>
    </div>
  );
};

export default TeamProfile;
