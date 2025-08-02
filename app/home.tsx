// app/home.tsx
import React from 'react';
import ResidentHome from './components/ResidentHome';
import GuardHome from './components/GuardHome';

// You can later fetch this from context/store/auth
const userType = 'resident'; // or 'guard'

export const options = {
  title: userType === 'resident' ? 'Resident Dashboard' : 'Guard Dashboard',
};

export default function HomeScreen() {
  return userType === 'resident' ? <ResidentHome /> : <GuardHome />;
}
