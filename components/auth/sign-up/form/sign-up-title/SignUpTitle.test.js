import { render } from '@testing-library/react-native'
import SignUpTitle from './SignUpTitle'

describe('SignUpTitle', () => {
	it('renders the correct text content', () => {
		const { getByText } = render(<SignUpTitle />)
		const signUpTitle = getByText('Sign up')
		expect(signUpTitle).toBeDefined()
	})
})