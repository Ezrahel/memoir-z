import { Pressable, Text, TouchableOpacity, View } from "react-native";
import {styles} from '../styles/auth.styles.js'
export default function Index() {
  return (
    <View
    style={styles.container}
    >
      <Text >Edit app/index.tsx to edit this screen, Israel.</Text>
      <TouchableOpacity onPress={()=>alert("Roger that!")}>
        <Text> Hey, I'm a button</Text>
      </TouchableOpacity>
      <Pressable onPress={()=>alert("Roger that!")}>
    <Text>testing</Text>
      </Pressable>
    </View>
  );
}

