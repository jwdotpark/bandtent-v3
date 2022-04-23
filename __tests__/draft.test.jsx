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
    const onSubmit = jest.fn()
    render(<Draft onSubmit={onSubmit} />)

    const artistInput = screen.getByTestId('artist')
    await user.type(artistInput, 'Some artist')
    expect(artistInput).toHaveValue('Some artist')

    const titleInput = screen.getByTestId('title')
    await user.type(titleInput, 'some title')
    expect(titleInput).toHaveValue('some title')

    const imageFile = new File(['image'], 'image.jpg', { type: 'image/*' })
    const imageInput = screen.getByTestId('image')
    await user.upload(imageInput, imageFile)
    expect(imageInput.files[0]).toStrictEqual(imageFile)

    const audioFile = new File(['audio'], 'some-audio.wav', { type: 'audio/*' })
    const audioInput = screen.getByTestId('audio')
    await user.upload(audioInput, audioFile)
    expect(audioInput.files[0]).toStrictEqual(audioFile)

    const submitButton = screen.getByTestId('submitButton')
    expect(submitButton).not.toHaveAttribute('disabled')
    expect(submitButton).toHaveTextContent('Submit')

    // FIXME image/audio input validation
    // await act(async () => {
    //   user.click(submitButton)
    // })
    // expect(onSubmit).toHaveBeenCalled()
  })
})

describe('Creat page', () => {
  it('doesn not accept invalid input', async () => {
    const onSubmit = jest.fn()
    render(<Draft onSubmit={onSubmit} />)

    const artistInput = screen.getByTestId('artist')
    await user.type(artistInput, '1')

    const titleInput = screen.getByTestId('title')
    await user.type(titleInput, '2')

    const imageFile = new File(['image'], 'image.jpg', { type: 'image/*' })
    const imageInput = screen.getByTestId('image')
    await user.upload(imageInput, imageFile)
    expect(imageInput.files[0]).toStrictEqual(imageFile)

    const audioFile = new File(['audio'], 'some-audio.wav', { type: 'audio/*' })
    const audioInput = screen.getByTestId('audio')
    await user.upload(audioInput, audioFile)
    expect(audioInput.files[0]).toStrictEqual(audioFile)

    const submitButton = screen.getByTestId('submitButton')
    expect(submitButton).toHaveTextContent('Submit')
    user.click(submitButton)
    expect(onSubmit).not.toHaveBeenCalled()

    // amend input
    await user.type(artistInput, 'more than 2 char name')
    await user.type(titleInput, 'more than 2 char title')
    expect(submitButton).not.toHaveAttribute('disabled')
  })
})
