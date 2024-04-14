import { render } from '@testing-library/react-native'
import Title from './Title'

describe('Title', () => {
	it('renders the correct text content', () => {
		const { getByText } = render(<Title />)
		const title = getByText('Sign up')
		expect(title).toBeDefined()
	})
})