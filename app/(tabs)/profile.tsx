import { Link } from 'expo-router';
import {Text, View} from 'react-native';

export default function profile() {
   return(
   <View>
        <Text>
            This is the Profile page
        </Text>
            <Link href='/(auth)/signup'>
            <Text>Sign in</Text>
            </Link>

    </View>
   )
}