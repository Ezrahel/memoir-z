import { useAuth } from "@clerk/clerk-expo"
import { useSegments, useRouter, Stack } from "expo-router"
import {useEffect} from "react"
export default function InitialLayout(){
        const {isLoaded, isSignedIn}=useAuth()

        const segments=useSegments();
         const router = useRouter();
         useEffect(()=>{
            if (!isLoaded) return
            const inAuthScreen= segments[0]==="(auth)"
            if (!isSignedIn&&!inAuthScreen) router.replace("/(auth)/login")
                else if (isSignedIn&&inAuthScreen) router.replace("/(tabs)/profile")
         }, [isLoaded, isSignedIn, segments])
         if (!isLoaded) return null
         return <Stack screenOptions={{headerShown:false}}/>;
}