import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import InitialLayout from "@/components/InitialLayout";
import ClerkAndConvexProvider from "@/providers/clerkConvexProvider";

const publishableKey= process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
if (!publishableKey){
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}
export default function RootLayout() {
  return (
     <ClerkAndConvexProvider>

    <SafeAreaProvider>
      <SafeAreaView style={{
        backgroundColor: "black", 
        flex:1}}>
<InitialLayout/>
    </SafeAreaView>
    </SafeAreaProvider>
          </ClerkAndConvexProvider>
  )
}
