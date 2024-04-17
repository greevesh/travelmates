import { fireEvent, render } from '@testing-library/react-native'
import Eye from './Eye'

jest.useFakeTimers()

describe('Eye', () => {
	it('registers a click event', () => {
		const handleClick = jest.fn()
		const { getByTestId } = render(<Eye onPress={handleClick} />)
		const eye = getByTestId('eye')

		fireEvent.press(eye)
		expect(handleClick).toHaveBeenCalledTimes(1)
	})
})