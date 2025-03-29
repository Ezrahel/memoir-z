import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Slot } from 'expo-router'


export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
    <SafeAreaProvider>
      <Slot />
      <SafeAreaView style={{
        backgroundColor: "black", 
        flex:1}}>

  <Stack screenOptions={{
    headerShown: false
  }}/>
  {/* <Tabs>
    <Tabs.Screen 
    name='Dashboard' options={{
      tabBarIcon:({size,color})=> <Ionicons name='menu' size={size} color={color}/>
      }} />
      
      </Tabs> */}
    </SafeAreaView>
    </SafeAreaProvider>
      </ClerkProvider>
  )
}
