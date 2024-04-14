import { render } from '@testing-library/react-native'
import Password from './Password'

jest.useFakeTimers()

describe('Password', () => {
	it('has correct placeholder text', () => {
		const { getByPlaceholderText } = render(<Password />)
		const input = getByPlaceholderText('Password')
		expect(input).toBeTruthy()
	})

	it('has secure text', () => {
		const { getByPlaceholderText } = render(<Password />)
		const input = getByPlaceholderText('Password')
		expect(input.findByProps({secureTextEntry: true})).toBeDefined()
	})
})