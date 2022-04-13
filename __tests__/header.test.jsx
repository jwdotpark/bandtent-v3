import { act, fireEvent, render, screen } from '@testing-library/react'
import Header from '../components/Layout'
import SearchButton from '../components/nav/SearchButton'

jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react')
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: { username: 'admin' },
  }
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      // return type is [] in v3 but changed to {} in v4
      return { data: mockSession, status: 'authenticated' }
    }),
  }
})

describe('Header Component with session has', () => {
  it('feed button', async () => {
    render(<Header />)
    const feed = await screen.findByText('Feed')
    const add = await screen.findByText('Add')
    const search = await screen.findByPlaceholderText('Search')
    const themeButton = await screen.findByTestId('themeButton')

    expect(feed).toBeInTheDocument()
    expect(add).toBeInTheDocument()
    expect(search).toBeInTheDocument()
    expect(themeButton).toBeInTheDocument()
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
