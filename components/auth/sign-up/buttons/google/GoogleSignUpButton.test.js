import { render } from '@testing-library/react-native'
import GoogleSignUpButton from './GoogleSignUpButton'

describe('GoogleSignUpButton', () => {
	it('renders the correct text content', () => {
		const { getByText } = render(<GoogleSignUpButton />)
		const button = getByText('Sign up with Google')
		expect(button).toBeDefined()
	})
})