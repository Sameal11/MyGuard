import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text } from "react-native";

export default function IndexRedirect() {
  const router = useRouter();
  const [isRouterReady, setIsRouterReady] = useState(false);

  const isAuthenticated = true; // 🔁 Change to false to test redirect
    
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsRouterReady(true);
    }, 0); // Ensures it's called after router is mounted

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isRouterReady) return;

    if (isAuthenticated) {
      router.replace("/Screens/home"); // Redirect to home if authenticated
    } else {
      router.replace("/Screens/auth"); // Redirect to auth if not authenticated
    }
  }, [isRouterReady]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Redirecting...</Text>
    </View>
  );
}
