import { Button } from 'react-native'

interface IBaseButtonProps {
    children: string
	testId: string
}

export default function BaseButton({children, testId}: IBaseButtonProps) {
	return (
		<Button title={children} testID={testId} />
	)
}