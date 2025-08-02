import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function IndexRedirect() {
  const router = useRouter();
  const [isRouterReady, setIsRouterReady] = useState(false);

  // Simulate authentication and user type
  const isAuthenticated = false; // Set to false to test login flow from beginning
  const userType = 'resident'; // 'resident' or 'guard'

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsRouterReady(true);
    }, 0);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!isRouterReady) return;

    if (!isAuthenticated) {
      router.replace('/auth');
      return;
    }

    // Authenticated: route based on userType
    if (userType === 'resident') {
      router.replace('/(tab)/home');
    } else if (userType === 'guard') {
      router.replace('/home'); // Or a guard-specific tab if you add one
    } else {
      router.replace('/home');
    }
  }, [isRouterReady, isAuthenticated, router]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Redirecting...</Text>
    </View>
  );
}
