import { render } from '@testing-library/react-native'
import AlreadyHaveAccount from './AlreadyHaveAccount'

describe('AlreadyHaveAccount', () => {
	it('renders the correct text content', () => {
		const { getByText } = render(<AlreadyHaveAccount />)
		const text = getByText('Already have an account?')
		expect(text).toBeDefined()
	})
})
