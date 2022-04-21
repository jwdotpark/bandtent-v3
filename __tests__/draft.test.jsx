import { render, screen, waitFor } from './test-utils'
import user from '@testing-library/user-event'
import Draft from '../pages/create'

describe('Create page', () => {
  it('form is rendered', async () => {
    render(<Draft />)
    const newItem = await screen.findByText('New Item')
    const artist = await screen.findByText('Artist')
    const title = await screen.findByText('Title')
    const image = screen.getByText(/add audio\(\*\.png, \*\.jpg, \*\.bmp\)/i)
    const file = screen.getByText(
      /add music\(\*\.mp3, \*\.wav, \*\.aiff, \*\.ogg\)/i
    )
    const submitButton = await screen.findByText('Not available')
    const cancelButton = screen.getByRole('button', {
      name: /cancel/i,
    })

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

describe('Create page form', () => {
  it('accepts input', async () => {
    render(<Draft />)
    const artist = screen.getByTestId('artist')
    user.type(artist, 'some artist')

    await waitFor(() => {
      expect(artist).toBeInTheDocument()
    })
  })
})
