import { render } from '@testing-library/react-native'
import SignUpSubtitle from './SignUpSubtitle'

describe('SignUpSubtitle', () => {
	it('renders the correct text content', () => {
		const { getByText } = render(<SignUpSubtitle />)
		const signUpSubtitle = getByText('Become a Travel Mate today')
		expect(signUpSubtitle).toBeDefined()
	})
})