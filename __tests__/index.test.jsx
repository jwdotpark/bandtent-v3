import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Layout from '../components/Layout'

describe('Layout', () => {
  it('contains header, body and footer', () => {
    render(<Layout />)

    const heading = screen.getByRole('heading', {
      name: /welcome to next\.js!/i,
    })

    expect(heading).toBeInTheDocument()
  })
})
