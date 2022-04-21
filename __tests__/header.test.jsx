import { act, fireEvent, render, screen, waitFor } from './test-utils'
import Header from '../components/Layout'
import SearchButton from '../components/nav/SearchButton'

describe('Header Component with session has', () => {
  it('feed button', async () => {
    render(<Header />)
    const feed = await screen.findByText('Feed')
    const add = await screen.findByText('Add')
    const search = await screen.findByPlaceholderText('Search')
    const themeButton = await screen.findByTestId('themeButton')

    await waitFor(() => {
      expect(feed).toBeInTheDocument()
      expect(add).toBeInTheDocument()
      expect(search).toBeInTheDocument()
      expect(themeButton).toBeInTheDocument()
    })
  })
})

describe('Search button', () => {
  it('can not be triggered with empty string', async () => {
    const mockOnSubmit = jest.fn()
    render(<SearchButton onClick={mockOnSubmit} />)
    await act(async () => {
      fireEvent.click(screen.getByPlaceholderText('Search'), {
        target: { value: '' },
      })
    })
    await act(async () => {
      fireEvent.click(screen.getByRole('button'))
    })
    expect(mockOnSubmit).toHaveBeenCalledTimes(0)
  })
})
