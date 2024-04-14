import { render } from '@testing-library/react-native'
import ForgotPassword from './ForgotPassword'

describe('App', () => {
	it('renders the correct text content', () => {
		const { getByText } = render(<ForgotPassword />)
		const forgotPassword = getByText('Forgot your password?')
		expect(forgotPassword).toBeDefined()
	})
})
