import { Text, View, Image } from "react-native";
import {styles} from '../styles/auth.styles.js'
import {Link} from 'expo-router'
export default function Dashboard() {
  return (
    <View
    style={styles.container}
    >
      
        <Link href="/notifications">
          Dashboard
        </Link>
    </View>
  );
}

