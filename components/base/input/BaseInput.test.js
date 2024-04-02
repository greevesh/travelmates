import App from '../../../App'
import { render, fireEvent } from '@testing-library/react-native'

jest.useFakeTimers()

describe('App', () => {
	it('renders', () => {
		const { getByTestId } = render(<App />)
		expect(getByTestId('base-input')).toBeDefined()
	})

	it('value updates on change', () => {
		const { getByTestId } = render(<App />)
		fireEvent.changeText(getByTestId('base-input'), 'mock')
		expect(getByTestId('base-input').props.value).toBe('mock')
	})
})