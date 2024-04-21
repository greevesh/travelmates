import { useState } from 'react'

export default function useSetValue(initialVal: string = '') {
	const [value, setValue] = useState(initialVal)

	const handleChange = (val: string) => {
		setValue(val)
	}

	const valueProps = {
		value,
		setValue: handleChange,
	}

	return valueProps
}