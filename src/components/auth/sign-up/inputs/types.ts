import { Control } from 'react-hook-form'

interface FieldValues {
	username: string
	password: string
	passwordConfirmation: string
}

export interface IInputProps {
	control: Control<FieldValues>
}