import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Slot } from 'expo-router'
import InitialLayout from "@/components/InitialLayout";

const publishableKey= process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
if (!publishableKey){
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}
export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
     
    <SafeAreaProvider>
 
      <SafeAreaView style={{
        backgroundColor: "black", 
        flex:1}}>

<InitialLayout/>

    </SafeAreaView>
    </SafeAreaProvider>
      </ClerkLoaded>
      </ClerkProvider>
  )
}
