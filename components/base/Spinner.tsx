import { ViewStyle } from "react-native"
import { ActivityIndicator } from "react-native-paper"

interface ISpinnerProps {
    style?: ViewStyle
}

export default function Spinner({ style }: ISpinnerProps) {
    return (
        <ActivityIndicator style={[ style, { position: 'absolute', right: 20 } ]} color="#fff" size={20} />
    )
}