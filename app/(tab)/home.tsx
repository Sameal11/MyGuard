// app/home.tsx
import React from 'react';
import ResidentHome from '../components/ResidentHome';
import GuardHome from '../components/GuardHome';
import { View, Text } from 'react-native';
import { useUser } from '../../lib/userContext';

export default function HomeScreen() {
  const { currentUser } = useUser();
  
  // If no user is logged in, show a message
  if (!currentUser) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Please log in to access your dashboard</Text>
      </View>
    );
  }

  // Show appropriate home screen based on userType
  return (
    <View style={{ flex: 1 }}>
      {currentUser.userType === 'resident' ? (
        <ResidentHome />
      ) : (
        <GuardHome />
      )}  
      
    </View>
  );
}



