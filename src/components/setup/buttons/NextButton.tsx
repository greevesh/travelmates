import { Button } from 'react-native-paper'

interface INextButtonProps {
    increment: () => void
}

export default function NextButton({ increment }: INextButtonProps) {
	return (
		<Button textColor='#6E6E6E' onPress={increment}>Next</Button>
	)
}