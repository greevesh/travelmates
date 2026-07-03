import { View, StyleSheet } from "react-native"
import { Icon } from "react-native-paper"

interface PlaneIcon {
    style?: {}
}

export default function PlaneIcon({ style }: PlaneIcon) {
    return (
        <View style={[styles.planeContainer, style]}>    
            <Icon size={40} source="airplane" color='#3a9fff' />
        </View>
    )
}

const styles = StyleSheet.create({
    planeContainer: {
        position: 'absolute', 
    },
})