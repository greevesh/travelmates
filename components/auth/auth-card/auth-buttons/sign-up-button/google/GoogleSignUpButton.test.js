import { render } from '@testing-library/react-native'
import GoogleSignUpButton from './GoogleSignUpButton'

describe('GoogleSignUpButton', () => {
	it('renders the correct text content', () => {
		const { getByText } = render(<GoogleSignUpButton />)
		const signUpButton = getByText('Sign up with Google')
		expect(signUpButton).toBeDefined()
	})
})