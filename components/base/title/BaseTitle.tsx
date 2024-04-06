import { Text } from 'react-native'

interface IBaseTitleProps {
  children: string
  testId: string
}

export default function BaseTitle({children, testId}: IBaseTitleProps) {
	return <Text style={{fontSize: 28}} testID={testId}>{children}</Text>
}
