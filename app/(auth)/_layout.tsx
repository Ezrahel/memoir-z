import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    return <Redirect href={'/(tabs)/profile'} />
  } try {
    // Some operation that might fail
    throw new Error("Something went wrong!");
} catch (error) {
    console.error("Error occurred:", error);
}


  return <Stack />
}