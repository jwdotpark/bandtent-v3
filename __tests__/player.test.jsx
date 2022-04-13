import { render, screen } from '@testing-library/react'
import Player from '../components/utils/Player'

describe('Player', () => {
  it('renders transport buttons', async () => {
    render(<Player />)
    const player = await screen.findByTestId('playPause')
    const setting = await screen.findByTestId('setting')

    expect(player).toBeInTheDocument()
    expect(setting).toBeInTheDocument()
  })
})
