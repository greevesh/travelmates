import { Button } from 'react-native'

interface IBaseButtonProps {
    children: string
}

export default function BaseButton({children}: IBaseButtonProps) {
	return (
		<Button title={children} />
	)
}