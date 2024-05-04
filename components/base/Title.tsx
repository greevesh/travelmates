import { StyleProp, Text, TextStyle } from 'react-native'

interface IBaseTitleProps {
  children: string
  style?: StyleProp<TextStyle>
}

export default function BaseTitle({children, style}: IBaseTitleProps) {
	return <Text style={style}>{children}</Text>
}
