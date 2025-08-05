import { Stack } from "expo-router";
import { ThemeProvider, useTheme } from "../lib/themeContext";
import { UserProvider } from "../lib/userContext";

function AppLayout() {
  const { theme } = useTheme();
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTintColor: theme.text,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tab)" options={{ headerShown: false }} />
      <Stack.Screen name="auth" options={{ title: "Login" }} />
      <Stack.Screen name="verification" options={{ title: "Verification" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
      <Stack.Screen
        name="pre-approve-visitor"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="visitor-history"
        options={{ title: "Visitor History" }}
      />
      <Stack.Screen
        name="vehicle-management"
        options={{ title: "Vehicle Management" }}
      />
      <Stack.Screen name="courier-entry" options={{ headerShown: false }} />
      <Stack.Screen name="taxi-entry" options={{ headerShown: false }} />
      <Stack.Screen
        name="office-visitor-entry"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="construction-entry"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="scanner" options={{ title: "Scanner" }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <UserProvider>
      <ThemeProvider>
        <AppLayout />
      </ThemeProvider>
    </UserProvider>
  );
}
