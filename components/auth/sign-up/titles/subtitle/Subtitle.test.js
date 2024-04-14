import { render } from '@testing-library/react-native'
import Subtitle from './Subtitle'

describe('Subtitle', () => {
	it('renders the correct text content', () => {
		const { getByText } = render(<Subtitle />)
		const subtitle = getByText('Become a Travel Mate today')
		expect(subtitle).toBeDefined()
	})
})