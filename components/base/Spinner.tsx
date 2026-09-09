import { ViewStyle, ActivityIndicator } from "react-native"

interface ISpinnerProps {
    style?: ViewStyle
    color?: string
}

export default function Spinner({ style, color }: ISpinnerProps) {
    return (
        <ActivityIndicator style={[ style, { position: 'absolute' } ]} color={color} size={20} />
    )
}