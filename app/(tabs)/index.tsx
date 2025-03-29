import { Text, View, Image } from "react-native";
import {styles} from '../../styles/auth.styles.js'
import {Link} from 'expo-router'
export default function Index() {
  return (
    <View
    style={styles.container}
    >
      <Text >Edit app/index.tsx to edit this screen, Israel.</Text>
     
      <Image source={require("../../assets/images/icon.png")} style={{
        width: 100,height:100}}/>
        <Link href="/notifications">
          Feed screen
        </Link>
    </View>
  );
}

