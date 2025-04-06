import { Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import {styles} from '../../styles/feed.styles'
import {Link} from 'expo-router'
import { useClerk } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { STORIES } from "@/constants/mock-data";
import { COLORS } from "@/constants/theme";
import Story from "@/components/story";
import * as Linking from 'expo-linking'
export default function index() {
    const { signOut } = useClerk()
      
    const handleSignOut = async () => {
      try {
        await signOut()
        // Redirect to your desired page
        Linking.openURL(Linking.createURL('/(auth)/login'))
      } catch (err) {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(err, null, 2))
      }
    }
  return (
    <View
    style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Memoir-Z
        </Text>
        <TouchableOpacity onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={24} color={COLORS.white}/>
        </TouchableOpacity>
      </View>
       <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.storiesContainer}>
          {STORIES.map((story)=>(<Story key={story.id} story={story}/>))}
        </ScrollView>
       </ScrollView>
    </View>
  );
}

