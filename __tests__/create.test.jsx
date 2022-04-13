import { act, fireEvent, render, screen } from '@testing-library/react'
// import { act, fireEvent, render, screen } from './test-utils'
import Draft from '../pages/create'

// FIXME session mock should be placed beforeEach
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

describe('Create post page', () => {
  it('is rendered', async () => {
    render(<Draft />)
    const create = await screen.findByText('New Item')
    const title = screen.queryByPlaceholderText('Artist')
    expect(create).toBeInTheDocument()
    expect(title).toBeInTheDocument()
  })
})

describe('Create post page', () => {
  describe('with invalid input', () => {
    it('cannot be called', async () => {
      const mockOnSubmit = jest.fn()
      const { getByPlaceholderText, getByTestId } = render(
        <Draft onSubmit={mockOnSubmit} />
      )

      await act(async () => {
        fireEvent.click(getByPlaceholderText('Artist'), {
          target: { value: 'some artist name' },
        })
        fireEvent.click(getByTestId('titleInput'), {
          target: { value: 'some title name' },
        })
      })

      await act(async () => {
        fireEvent.click(getByTestId('submitButton'))
      })

      expect(mockOnSubmit).toHaveBeenCalledTimes(0)
    })
  })
})
