import { render, screen } from './test-utils'
import Header from '../components/Layout'

describe('NavBar Component', () => {
  it('can see add button when has session', async () => {
    render(<Header />)
    const logout = await screen.findByText('Add')

    // expect(container).toMatchSnapshot()
    expect(logout).toBeInTheDocument()
  })
})
