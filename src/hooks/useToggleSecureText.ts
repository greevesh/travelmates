import { useState } from 'react'

export default function useToggleSecureText(val: boolean) {
	const [secureText, setSecureText] = useState(val)

	const handleClick = () => {
		setSecureText(!secureText)
	}

	const secureTextProps = {
		secureText,
		setSecureText: handleClick,
		icon: secureText ? 'eye-off-outline' : 'eye-outline'
	}

	return secureTextProps
}