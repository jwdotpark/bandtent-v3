// import { act, fireEvent, render, screen, waitFor } from './test-utils'
import { render, screen } from './test-utils'
import user from '@testing-library/user-event'
import Me from '../pages/auth/[authorId]'
import { waitFor } from '@testing-library/react'

describe('Profile page', () => {
  it('is rendered properly', async () => {
    render(<Me />)

    const profileImage = screen.getByRole('img')
    expect(profileImage).toBeInTheDocument()

    const user = screen.getByTestId('user-name')
    expect(user).toBeInTheDocument()

    const website = screen.getByTestId('website')
    expect(website).toBeInTheDocument()

    const editButton = screen.getByRole('button', {
      name: /edit/i,
    })
    expect(editButton).toBeInTheDocument()
  })
})

describe('Edit button', () => {
  it('can be clicked to open a modal', async () => {
    const onSubmit = jest.fn()
    render(<Me onSubmit={onSubmit} />)
    const editButton = screen.getByRole('button', {
      name: /edit/i,
    })
    user.click(editButton)
    waitFor(() => {
      expect(screen.getByTestId('profile-modal')).toBeInTheDocument()
      const profileEditImage = screen.getByTestId('profile-edit-image')
      expect(profileEditImage).toBeInTheDocument()

      const nameInput = screen.getByTestId('profile-edit-name')
      expect(nameInput).toBeInTheDocument()
      user.type(nameInput, '1')
      expect(
        screen.getByText(/minimum length should be 2/i)
      ).toBeInTheDocument()

      const emailInput = screen.getByRole('textbox', {
        name: /email address/i,
      })
      expect(emailInput).toBeInTheDocument()
      user.type(emailInput, '1')
      expect(
        screen.getByText(/minimum length should be 4/i)
      ).toBeInTheDocument()
      user.type(emailInput, 'test@test.com')
      expect(
        screen.getByText(/minimum length should be 4/i)
      ).not.toBeInTheDocument()

      const websiteInput = screen.getByRole('textbox', {
        name: /website/i,
      })
      expect(websiteInput).toBeInTheDocument()
      user.type(websiteInput, 'hello')
      expect(screen.getByText(/invalid url/i)).toBeInTheDocument()

      const submitButton = getByRole('button', { name: 'Submit' })
      expect(submitButton).toBeInTheDocument()
      expect(submitButton).toHaveAttribute('disabled')

      // amend
      user.type(nameInput, 'some artist name')
      user.type(emailInput, 'test@test.com')
      user.type(websiteInput, 'https://test.com')
      expect(submitButton).not.toHaveAttribute('disabled')

      user.click(submitButton)
      expect(onSubmit).toHaveBeenCalled()
    })
  })
})
