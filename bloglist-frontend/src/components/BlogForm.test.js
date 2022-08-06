import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const input = screen.getByPlaceholderText('write the title here')
  const sendButton = screen.getByText('save')

  screen.debug(input)
  screen.debug(sendButton)

  await user.type(input, 'testing a form...')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
})