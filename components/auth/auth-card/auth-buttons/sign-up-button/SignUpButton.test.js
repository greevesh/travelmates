import { render } from '@testing-library/react-native'
import SignUpButton from './SignUpButton'

describe('App', () => {
	it('renders the correct text content', () => {
		const { getByText } = render(<SignUpButton />)
		const signUpButton = getByText('Sign up')
		expect(signUpButton).toBeDefined()
	})
})