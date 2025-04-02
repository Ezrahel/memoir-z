import {Text, View, TouchableOpacity} from 'react-native';
import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'

export default function notifications() {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk()
    
  const handleSignOut = async () => {
    try {
      await signOut()
      // Redirect to your desired page
      Linking.openURL(Linking.createURL('/(auth)/signup'))
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }
  return(  <View>
    <Text>
            This is the notification page
            
    </Text>
    <TouchableOpacity onPress={handleSignOut}>
          <Text>Sign out</Text>
        </TouchableOpacity>
    </View>
    
        
    
    
  )
}