import { render, screen } from './test-utils'
import Header from '../components/Layout'

describe('NavBar Component', () => {
  it('can see add button when has session', async () => {
    render(<Header />)
    const login = await screen.findByText('Log In')

    // expect(container).toMatchSnapshot()
    expect(login).toBeInTheDocument()
  })
})
