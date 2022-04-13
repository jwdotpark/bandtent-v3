import { act, fireEvent, render, screen } from '@testing-library/react'
// import '@testing-library/jest-dom'
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
      return { data: mockSession, status: 'authenticated' } // return type is [] in v3 but changed to {} in v4
    }),
  }
})

describe('Header Component', () => {
  it('contains add button with session', async () => {
    render(<Header />)
    const button = await screen.findByText('Add')
    expect(button).toBeInTheDocument()
  })
  it('contains search input', async () => {
    render(<Header />)
    const search = await screen.findByPlaceholderText('Search')
    expect(search).toBeInTheDocument()
  })

  describe('Search Button', () => {
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
})
