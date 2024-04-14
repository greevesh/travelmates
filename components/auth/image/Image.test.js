import { render } from '@testing-library/react-native'
import AuthImage from './Image'
import authImage from '../../../assets/img/travel-mates.jpg'

describe('AuthImage', () => {
	it('renders the correct image', () => {
		const { getByTestId } = render(<AuthImage />)
		const img = getByTestId('auth-img')
		expect(img.props.source).toEqual(authImage)
	})
})