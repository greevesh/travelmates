import { render } from '@testing-library/react-native'
import Email from './Email'

jest.useFakeTimers()

describe('Email', () => {
	it('has correct placeholder text', () => {
		const { getByPlaceholderText } = render(<Email />)
		const input = getByPlaceholderText('Email')
		expect(input).toBeTruthy()
	})

	it('does not have secure text', () => {
		const { getByPlaceholderText } = render(<Email />)
		const input = getByPlaceholderText('Email')
		expect(input.findByProps({secureTextEntry: false})).toBeDefined()
	})
})