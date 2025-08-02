import { Stack } from "expo-router";
import { UserProvider } from "../lib/userContext";

export default function RootLayout() {
  return (
    <UserProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tab)" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ title: "Login" }} />
        <Stack.Screen name="verification" options={{ title: "Verification" }} />
        <Stack.Screen name="settings" options={{ title: "Settings" }} />
        <Stack.Screen name="pre-approve-visitor" options={{ headerShown: false }} />
        <Stack.Screen name="visitor-history" options={{ title: "Visitor History" }} />
        <Stack.Screen name="vehicle-management" options={{ title: "Vehicle Management" }} />
        <Stack.Screen name="courier-entry" options={{ headerShown: false }} />
        <Stack.Screen name="taxi-entry" options={{ headerShown: false }} />
        <Stack.Screen name="office-visitor-entry" options={{ headerShown: false }} />
        <Stack.Screen name="construction-entry" options={{ headerShown: false }} />
      </Stack>
    </UserProvider>
  );
}
