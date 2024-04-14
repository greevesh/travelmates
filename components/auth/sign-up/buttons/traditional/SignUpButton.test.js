import { render } from '@testing-library/react-native'
import SignUpButton from './SignUpButton'

describe('SignUpButton', () => {
	it('renders the correct text content', () => {
		const { getByText } = render(<SignUpButton />)
		const button = getByText('Sign up')
		expect(button).toBeDefined()
	})
})