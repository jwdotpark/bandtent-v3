import { render, screen } from '@testing-library/react'
// import '@testing-library/jest-dom'
import Header from '../components/Layout'

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
    const logout = await screen.findByText('Add')

    // expect(container).toMatchSnapshot()
    expect(logout).toBeInTheDocument()
  })
})
