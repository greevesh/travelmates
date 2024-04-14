import { StyleProp, Text, TextStyle } from 'react-native'

interface IBaseTitleProps {
  children: string
  style?: StyleProp<TextStyle>
  testId: string
}

export default function BaseTitle({children, style, testId}: IBaseTitleProps) {
	return <Text style={style} testID={testId}>{children}</Text>
}
