import { Button } from 'react-native-paper'

interface IPreviousButtonProps {
    decrement: () => void
}

export default function PreviousButton({ decrement }: IPreviousButtonProps) {
	return (
		<Button textColor='#6E6E6E' onPress={decrement}>Previous</Button>
	)
}