import { render, screen, waitFor } from './test-utils'
import Draft from '../pages/create'

describe('Create page', () => {
  it('form is rendered', async () => {
    render(<Draft />)

    const newItem = await screen.findByText('New Item')
    const artist = await screen.findByText('Artist')
    const title = await screen.findByText('Title')
    const image = await screen.findByText('Add Audio(*.png, *.jpg, *.bmp)')
    const file = await screen.findByText(
      'Add Music(*.mp3, *.wav, *.aiff, *.ogg)'
    )
    const submitButton = await screen.findByText('Not available')
    const cancelButton = await screen.findByText('Cancel')

    await waitFor(() => {
      expect(newItem).toBeInTheDocument()
      expect(artist).toBeInTheDocument()
      expect(title).toBeInTheDocument()
      expect(image).toBeInTheDocument()
      expect(file).toBeInTheDocument()
      expect(submitButton).toBeInTheDocument()
      expect(submitButton).toHaveAttribute('disabled')
      expect(cancelButton).toBeInTheDocument()
    })
  })
})
