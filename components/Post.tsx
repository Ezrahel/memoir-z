import { Link } from "expo-router";
import {View, Text, TouchableOpacity} from "react-native";
import {Image} from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
export default function Post({post}:{post:any}){
    return (
        <View>
            <View>
                <Link href={"/(tabs)"}>
                    <TouchableOpacity>
                        <Image 
                        source={post.author.image}
                        contentFit="cover"
                        transition={200}
                        cachePolicy="memory-disk"/>
                        <Text>
                            {post.author.username}
                        </Text>
                    </TouchableOpacity>
                </Link>
                <TouchableOpacity>
                    <Ionicons name="ellipsis-horizontal" size={20} color={COLORS.white}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}