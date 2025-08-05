// app/home.tsx
import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../../lib/themeContext';
import { useUser } from '../../lib/userContext';
import GuardHome from '../components/GuardHome';
import ResidentHome from '../components/ResidentHome';

export default function HomeScreen() {
  const { currentUser } = useUser();
  const { theme } = useTheme();
  
  // If no user is logged in, show a message
  if (!currentUser) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.background }}>
        <Text style={{ color: theme.text }}>Please log in to access your dashboard</Text>
      </View>
    );
  }

  // Show appropriate home screen based on userType
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      {currentUser.userType === 'resident' ? (
        <ResidentHome />
      ) : (
        <GuardHome />
      )}
    </View>
  );
}
