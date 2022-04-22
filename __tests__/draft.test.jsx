import { render, screen, waitFor } from './test-utils'
import '@testing-library/jest-dom'
import user from '@testing-library/user-event'
import Draft from '../pages/create'

describe('Create page', () => {
  it('form is rendered', async () => {
    render(<Draft />)
    const newItem = await screen.findByText('New Item')
    const artist = await screen.findByText('Artist')
    const title = await screen.findByText('Title')
    const image = screen.getByText(/add cover \(\*\.png, \*\.jpg, \*\.bmp\)/i)
    const file = screen.getByText(
      /add audio \(\*\.mp3, \*\.wav, \*\.aiff, \*\.ogg\)/i
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

describe('Create page', () => {
  it('text inputs accepts input', async () => {
    render(<Draft />)

    const artistInput = screen.getByTestId('artist')
    await user.type(artistInput, 'Some artist')
    expect(artistInput).toHaveValue('Some artist')
    await user.type(artistInput, 'asdf')
    expect(artistInput).not.toHaveValue('qwer')

    const titleInput = screen.getByTestId('title')
    await user.type(titleInput, 'some title')
    expect(titleInput).toHaveValue('some title')

    const imageInput = screen.getByTestId('image')
    await user.type(imageInput, 'some image')
    expect(imageInput).toHaveValue('some image')
  })
})
