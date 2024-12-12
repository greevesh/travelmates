import { Button } from 'react-native-paper'

interface INextButtonProps {
    increment: () => void
}

export default function NextButton({ increment }: INextButtonProps) {
	return (
		<Button style={{ borderRadius: 7 }} buttonColor='#28A745' textColor='#fff' onPress={increment}>Next</Button>
	)
}