import {COLORS} from "@/constants/theme";
import { ActivityIndicator} from "react-native";

export function Loader () {
    return(
        <view style={{flex:1,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:COLORS.background
        }}>
            <ActivityIndicator size="large" color={COLORS.primary}/>

        </view>
    )
}