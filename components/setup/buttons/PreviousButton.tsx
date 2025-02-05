import { Button } from 'react-native-paper'

interface IPreviousButtonProps {
    decrement: () => void
}

export default function PreviousButton({ decrement }: IPreviousButtonProps) {
	return (
		<Button style={{ borderRadius: 7, marginLeft: -13 }} buttonColor='#fff' textColor='#6E6E6E' onPress={decrement}>Previous</Button>
	)
}