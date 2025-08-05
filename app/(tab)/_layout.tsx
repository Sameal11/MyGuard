// app/(tab)/_layout.tsx
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { useTheme } from '../../lib/themeContext';
import { useUser } from '../../lib/userContext';

export default function TabLayout() {
  const { currentUser } = useUser();
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarStyle: {
          backgroundColor: theme.card,
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.text,
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.text,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      {/* Only show visitor management for residents */}
      
      <Tabs.Screen
        name="visitor-management"
        options={{
          title: 'Visitors',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="people" size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="society"
        options={{
          title: 'Society',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="apartment" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="helpdesk"
        options={{
          title: 'Helpdesk',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="support-agent" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
