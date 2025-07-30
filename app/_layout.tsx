import { Stack, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { useEffect}from "react"; 

function RouteGuard({children}:{children: React.ReactNode}) {
  
  const router=useRouter();
  const isAuthenticated = false; // Replace with actual authentication logic
  
  useEffect(()=>{
    if(!isAuthenticated){
      router.replace("/auth");
    }
  });
  
  return<>{children}</>
}

export default function RootLayout() {
  return (
    <RouteGuard>
      <Stack>
        {/* <Stack.Screen name ="index" options={{title: 'Home'}} /> */}
        <Stack.Screen name="auth" options={{title: 'Login '}} />
      </Stack>
    </RouteGuard>
  );
}
