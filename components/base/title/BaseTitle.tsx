import { Text } from 'react-native'

interface IBaseTitleProps {
  children: string;
}

export default function BaseTitle({children}: IBaseTitleProps) {
	return <Text style={{fontSize: 28}}>{children}</Text>
}
