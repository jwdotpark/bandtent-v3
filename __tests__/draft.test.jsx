import { render, screen, waitFor } from './test-utils'
import Draft from '../pages/create'
// import { waitFor } from '@testing-library/react'

describe('Create page', () => {
  it('is rendered', async () => {
    render(<Draft />)
    
    const newItem = await screen.findByText('New Item')
    const artist = await screen.findByText('Artist')
    const title = await screen.findByText('Title')

    await waitFor(() => {
      expect(newItem).toBeInTheDocument()
      expect(artist).toBeInTheDocument()
      expect(title).toBeInTheDocument()
    })
  })
})
